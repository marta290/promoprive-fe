import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { basepath } from "../constants/constants";
import { type ITokenResponse } from "../types/Config.Interface"; 

const AuthValidator = ({ children }: { children: React.ReactNode }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<"missing" | "expired" | null>(null);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const validateAuth = async () => {
      const uuid = searchParams.get("uuid");
      const tenantId = searchParams.get("tenantId");
      const existingToken = localStorage.getItem("userToken");

      // CASO 1: Parametri presenti nell'URL 
      if (uuid && tenantId) {
        initialized.current = true;
        setLoading(true);

        try {
          const res = await axios.get<ITokenResponse>(`${basepath}/api/token`, { 
            params: { uuid, tenantId } 
          });

          const token = res.data.token;
          const config = res.data.configuration;

          if (token) {
            localStorage.setItem("userToken", token);
            localStorage.setItem("was_logged", "true"); 
            
            localStorage.setItem("uuid", uuid);
            localStorage.setItem("tenantId", tenantId);

            if (config) {
              localStorage.setItem("app_config", JSON.stringify(config));
              if (config.sections) {
                localStorage.setItem("app_sections", JSON.stringify(config.sections));
              }
            }

            setError(null);
            setLoading(false);
            navigate(window.location.pathname, { replace: true });
          } else {
            setError("expired");
            setLoading(false);
          }
        } catch (err) {
          console.error("ERRORE API:", err);
          setError("expired");
          setLoading(false);
        }
        return;
      }

      // CASO 2: Token presente nel localStorage 
      if (existingToken) {
        setError(null);
      } else {
        const wasLogged = localStorage.getItem("was_logged");
        setError(wasLogged === "true" ? "expired" : "missing");
      }
      
      setLoading(false);
      initialized.current = true;
    };

    validateAuth();
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 text-center font-ubuntu">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#D91A1A]"></div>
        <h2 className="mt-4 text-lg font-semibold text-gray-700">Verifica credenziali...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gray-50 p-6 text-center font-ubuntu">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-red-50 max-w-md">
          <h2 className="text-2xl font-bold text-gray-800">
            {error === "missing" ? "Accesso richiesto" : "Sessione Scaduta"}
          </h2>
          <p className="text-gray-600 mt-2 mb-6 leading-relaxed">
            {error === "missing"
              ? "Parametri UUID o TenantId mancanti."
              : "La tua sessione è scaduta o il token è stato rimosso. Effettua nuovamente l'accesso."}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthValidator;
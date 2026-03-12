import { useQuery } from "@tanstack/react-query";
import { createContext, type ReactNode } from "react";
import { getAppConfigurationData } from "../services/ConfigService";
import { type IConfigContextType, type ITokenResponse } from "../types/Config.Interface";
// import { TOKEN } from "../constants/token"; 


const ConfigContext = createContext<IConfigContextType | null>(null);
// TEST PER CONTROLLARE EVENTUALI AGGIUNTE NEL TOKEN E VEDERE SE SI VEDONO LE FRECCE DEL CAROUSEL
/*
const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const uuid = localStorage.getItem("uuid");
  const tenantId = localStorage.getItem("tenantId");
  const token = localStorage.getItem("userToken");

  const { data, isLoading, isError } = useQuery<ITokenResponse | null>({
    queryKey: ["appConfig", uuid, tenantId],
    queryFn: () => getAppConfigurationData(uuid, tenantId),
    enabled: !!uuid && !!tenantId && !!token,
  });
  const isTestingArrows = true; 
  const value: IConfigContextType = isTestingArrows 
    ? {
      
        configuration: TOKEN.configuration as unknown as IConfiguration,
        sections: TOKEN.configuration.sections as any,
        isLoading: false,
        isError: false
      }
    : {
        configuration: data?.configuration || null,
        sections: data?.configuration?.sections || null,
        isLoading,
        isError
      };
  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  );
};
*/


const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const uuid = localStorage.getItem("uuid");
  const tenantId = localStorage.getItem("tenantId");
  const token = localStorage.getItem("userToken");

  const { data, isLoading, isError } = useQuery<ITokenResponse | null>({
    queryKey: ["appConfig", uuid, tenantId],
    queryFn: () => getAppConfigurationData(uuid, tenantId),
    enabled: !!uuid && !!tenantId && !!token,
    
  });

  const value: IConfigContextType = {
    configuration: data?.configuration || null,
    sections: data?.configuration?.sections || null,
    isLoading,
    isError
  };

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  );
};





export { ConfigContext, ConfigProvider };

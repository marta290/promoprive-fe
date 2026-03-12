import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../../../router";
import { ConfigContext } from "../../../contexts/ConfigContext";
import { ICON_PATH } from "@src/constants/constants";

// Definiamo un tipo per le sezioni del menu mobile
type SectionKey = "promo" | "area";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const context = useContext(ConfigContext);

  // Dati dal context
  const logoDesktop = context?.configuration?.logo || "";
  const logoMobile = context?.configuration?.logoMobile || logoDesktop;

  // Controllo se cashback è abilitato per mostrare o nascondere il wallet
  const isCashbackEnabled = context?.sections?.cashback;

  const rootRoute = routes.find((route) => route.path === "/");
  const navElements = rootRoute?.children || [];

  // Stato per gestire l'apertura/chiusura delle sezioni nel menu mobile
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>(
    {
      promo: true,
      area: true,
    },
  );

  // Funzione per gestire l'apertura di una sezione nel menu mobile
  const toggleSection = (section: SectionKey) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };


  return (
    <header className="w-full bg-white border-b border-gray-100 relative font-ubuntu z-[100]">
      <div className="flex items-center justify-between h-[64px] md:h-[72px] px-4 md:px-[24px]">
        <div className="flex items-center gap-3">
          <div
            className="md:hidden cursor-pointer text-[#1D1D1B]"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg width="24" height="24">
              <use href={`${ICON_PATH}#icon-menu`} />
            </svg>
          </div>
          {/* Logo in versione Desktop/Mobile gestito con picture e source */}
          <NavLink to="/" className="flex items-center">
            <picture>
              <source media="(max-width: 767px)" srcSet={logoMobile} />
              <img
                src={logoDesktop}
                alt="Logo"
                className="w-auto h-[27px] md:h-[32px] object-contain"
              />
            </picture>
          </NavLink>
        </div>

        <div className="flex items-center text-[#1D1D1B]">
          {isCashbackEnabled && (
            <div className="flex items-center cursor-pointer gap-[8px] bg-[#F5F5F5] rounded-full px-[12px] py-[6px] mr-[12px] md:bg-transparent md:rounded-none md:p-0 md:mr-[32px] hover:opacity-80 transition-opacity">
              <svg width="24" height="24">
                <use href={`${ICON_PATH}#icon-wallet`} />
              </svg>
              <span className="text-[14px] font-medium hidden md:block">
                0,00€
              </span>

              <svg width="16" height="16" className=" md:block">
                <use href={`${ICON_PATH}#icon-chevron`} />
              </svg>
            </div>
          )}

          <div className="flex items-center gap-[16px] md:gap-[24px]">
            <div className="cursor-pointer hover:opacity-70 transition-opacity">
              <svg width="20" height="20">
                <use href={`${ICON_PATH}#icon-cart`} />
              </svg>
            </div>
            <div className="hidden md:flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity">
              <svg width="24" height="24">
                <use href={`${ICON_PATH}#icon-user-circle`} />
              </svg>
              <svg width="16" height="16">
                <use href={`${ICON_PATH}#icon-chevron`} />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Gestione overlay lato mobile */}
      <div
        className={`fixed inset-0 bg-black/40 md:hidden transition-opacity duration-300 ${isMenuOpen ? "z-[9998] opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Sidebar Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white md:hidden flex flex-col z-[9999] transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 flex justify-end">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-400 hover:text-black transition-colors"
          >
            <svg width="24" height="24">
              <use href={`${ICON_PATH}#icon-close`} />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-4">
            <div
              onClick={() => toggleSection("promo")}
              className="flex items-center justify-between py-4 text-[#1D1D1B] font-bold cursor-pointer"
            >
              <span>Scopri Promo Privè</span>
              <svg
                className={`transition-transform duration-200 ${openSections.promo ? "rotate-180" : ""}`}
                width="12"
                height="12"
              >
                <use href={`${ICON_PATH}#icon-chevron`} />
              </svg>
            </div>
            {openSections.promo && (
              <nav className="flex flex-col gap-1 pb-2">
                {navElements.map((route) => {
                  const label = (route.handle as any)?.label;
                  if (!label) return null;

                  // Filtro per le rotte della sidebar (es: non mostrare "Cashback" se disabilitato)
                  const sectionKey = route.path as string;
                  if (
                    context?.sections &&
                    context.sections[
                      sectionKey as keyof typeof context.sections
                    ] === false
                  ) {
                    return null;
                  }

                  return (
                    <NavLink
                      key={label}
                      to={route.index ? "/" : `/${route.path}`}
                      onClick={() => setIsMenuOpen(false)}
                      style={({ isActive }) => ({
                        color: isActive ? "#575756" : "#1D1D1B",
                      })}
                      className={({ isActive }) =>
                        `px-4 py-3 rounded-full text-[14px] ${isActive ? "bg-[#EBEEF0] font-bold" : "text-[#575756]"}`
                      }
                    >
                      {label}
                    </NavLink>
                  );
                })}
              </nav>
            )}
          </div>

          <div className="h-[1px] bg-gray-100 mx-4" />

          {/* Area Personale */}
          <div className="px-4">
            <div
              onClick={() => toggleSection("area")}
              className="flex items-center justify-between py-4 text-[#1D1D1B] font-bold cursor-pointer"
            >
              <span>Area personale</span>
              <svg
                className={`transition-transform duration-200 ${openSections.area ? "rotate-180" : ""}`}
                width="12"
                height="12"
              >
                <use href={`${ICON_PATH}#icon-chevron`} />
              </svg>
            </div>
            {openSections.area && (
              <nav className="flex flex-col gap-1 pb-2">
                <div className="px-4 py-3 text-[#575756] hover:bg-gray-50 rounded-lg cursor-pointer">
                  I miei ordini
                </div>
                <div className="px-4 py-3 text-[#575756] hover:bg-gray-50 rounded-lg cursor-pointer">
                  Profilo
                </div>
                <div className="px-4 py-3 text-[#575756] hover:bg-gray-50 rounded-lg cursor-pointer">
                  Password
                </div>
              </nav>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-gray-100">
          <button className="w-full bg-[#32373D] text-white rounded-full py-[14px] px-6 flex items-center gap-3 hover:opacity-90 transition-opacity">
            <svg width="18" height="18">
              <use href={`${ICON_PATH}#icon-logout`} />
            </svg>
            <span className="font-semibold text-[16px]">Esci</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

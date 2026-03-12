import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { routes } from "../../../router";
import { ConfigContext } from "../../../contexts/ConfigContext";
import { type ISectionsStatus } from "../../../types/Config.Interface";

const Navbar = () => {
  // Recupero del contesto
  const context = useContext(ConfigContext);
  const sections = (context?.sections || {}) as ISectionsStatus;
  // Recupero delle rotte
  const rootRoute = routes.find((route) => route.path === "/");
  const allRoutes = rootRoute?.children || [];
  // Gestione elementi della navbar
  const navElements = allRoutes.filter((route) => {
    const label = route.handle?.label;
    if (!label) return false;
    if (route.index) return true;
    return sections[route.path as string] !== false;
  });

  return (
    <nav className="hidden lg:flex items-center px-6 border-b border-gray-100 h-12 font-ubuntu bg-white shadow-sm">
      <ul className="flex items-center space-x-8 h-full">
        {navElements.map((route) => {
          const label = route.handle?.label || "";
          const targetPath = route.index ? "/" : `/${route.path}`;

          return (
            <li key={label} className="h-full">
              <NavLink
                to={targetPath}
                end={route.index}
                className={({ isActive }) =>
                  `relative flex items-center h-full text-[14px] transition-colors cursor-pointer ${
                    isActive
                      ? "text-black font-bold"
                      : "text-gray-500 hover:text-black"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <div
                        className="absolute left-0 w-full h-[2px] bottom-0"
                        style={{ backgroundColor: "#c72828" }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>

      <div className="h-6 w-px bg-gray-200 mx-8" />
      {/* Sezione ancora gestita staticamente ma che poi verrà cambiata in seguito*/}
      <div className="text-[14px] text-gray-500 hover:text-black cursor-pointer transition-colors">
        Aiuto e contatti
      </div>
    </nav>
  );
};

export default Navbar;

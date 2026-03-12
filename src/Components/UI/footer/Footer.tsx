import { useContext } from "react";
import { ConfigContext } from "../../../contexts/ConfigContext"; 
import Subfooter from "../../UI/footer/Subfooter";
import iconsSprite from "../../../assets/icons.svg";

const Footer = () => {
  const context = useContext(ConfigContext);

  const logoDesktop = context?.configuration?.logo || "";
  const logoMobile = context?.configuration?.logoMobile || logoDesktop;

  return (
    <footer className="w-full flex flex-col font-ubuntu">
      <div className="w-full bg-[#f8f9fa] py-10 md:py-8 flex justify-center">
        <div className="w-full max-w-[1440px] px-6 md:px-[120px] flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0">
          
          <div className="flex flex-row items-center gap-6 md:gap-[60px]">
            {/* Logo */}
            <div className="flex items-center">
              {logoDesktop ? (
                <picture>
                  <source media="(max-width: 767px)" srcSet={logoMobile} />
                  <img 
                    src={logoDesktop} 
                    alt="Logo" 
                    className="w-auto h-[27px] md:h-[32px] object-contain" 
                  />
                </picture>
              ) : (
                <div className="h-[32px] w-[100px] bg-gray-200 animate-pulse rounded" /> 
              )}
            </div>

            <div className="h-[60px] md:h-[100px] w-[1px] bg-gray-300"></div>

            {/* Links che in questa fase sono ancora statici ma andranno gestiti dinamicamente */}
            <div className="flex flex-col gap-1 text-[#666666] text-left">
              <a href="#" className="text-[13px] md:text-[16px] leading-tight hover:text-black transition-colors">Termini e condizioni</a>
              <a href="#" className="text-[13px] md:text-[16px] leading-tight hover:text-black transition-colors">Privacy</a>
              <a href="#" className="text-[13px] md:text-[16px] leading-tight hover:text-black transition-colors">Spedizioni e Resi</a>
              <a href="#" className="hidden md:block text-[14px] md:text-[16px] hover:text-black transition-colors">Regolamento</a>
            </div>
          </div>

          {/* Metodi di pagamento */}
          <div className="bg-white rounded-[24px] px-6 py-8 md:bg-[#E9EFF1] md:rounded-[12px] md:px-10 md:py-6 flex flex-col items-center gap-6 md:gap-4 w-full max-w-[380px] md:min-w-[320px]">
            <p className="text-[14px] md:text-[12px] font-bold text-[#080808] md:normal-case">
              Puoi pagare con
            </p>
            <div className="flex flex-row items-center justify-center gap-5 md:gap-6">
              <svg width="49" height="30">
                <use href={`${iconsSprite}#logo-mastercard`} />
              </svg>
              <svg width="75" height="24">
                <use href={`${iconsSprite}#logo-visa`} />
              </svg>
              <svg width="81" height="32">
                <use href={`${iconsSprite}#logo-googlepay`} />
              </svg>
              <svg width="32" height="32" className="text-black">
                <use href={`${iconsSprite}#logo-satispay`} />
              </svg>
            </div>
          </div>

        </div>
      </div>
      <Subfooter />
    </footer>
  );
};

export default Footer;
import { useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import LexicalRenderer from "../UI/lexicalRenderer/LexicalRenderer";
import { ConfigContext } from "../../contexts/ConfigContext";

import "swiper/css";
import "swiper/css/navigation";
import { ICON_PATH } from "@src/constants/constants";

const HomePageBanner = () => {
  const context = useContext(ConfigContext);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!context?.configuration?.homepage?.banner) return null;

  const banners = context.configuration.homepage.banner;
  const isCashbackEnabled = context?.sections?.cashback ?? false;
  const hasMultipleBanners = banners.length > 1;

  const currentBanner = banners[activeIndex];

  return (
    <div className="relative w-full mt-[-120px] md:mt-0">
      {/* Cashback versione mobile  */}
      {isCashbackEnabled && (
        <div className="md:hidden bg-[#F5F5F7] w-full pt-4 pb-2 z-20">
          <div className="flex justify-between items-center px-6">
            <div className="flex flex-col items-center flex-1">
              <div className="flex items-baseline leading-none">
                <span className="text-[38px] font-light text-[#1D1D1B]">0</span>
                <span className="text-[18px] font-medium text-[#1D1D1B]">,00€</span>
              </div>
              <p className="text-[10px] text-gray-400 font-medium uppercase">Credito disponibile</p>
            </div>
            <div className="bg-white rounded-[12px] py-3 px-2 flex-1 flex flex-col items-center justify-center shadow-sm min-h-[70px]">
              <p className="text-[14px] text-[#1D1D1B] font-bold">0€</p>
              <p className="text-[10px] text-gray-500 text-center leading-tight">in attesa di conversione</p>
            </div>
          </div>
        </div>
      )}

      {/* Contenitore principale (Desktop) */}
      <div className="relative w-full md:rounded-[24px] md:overflow-hidden md:shadow-lg bg-[#F5F5F7]">
        <div className="hidden md:block">
          <div className="absolute left-0 top-0 z-30 w-[30%] lg:w-[28%] h-[480px] bg-[#F5F5F7] p-[40px] flex flex-col justify-center">
            <div className="min-h-[220px]">
              <h2 key={`d-t-${activeIndex}`} className="text-[38px] lg:text-[42px] font-bold text-[#1D1D1B] leading-tight">
                {currentBanner.title}
              </h2>
              <div key={`d-s-${activeIndex}`} className="text-[16px] text-gray-700 mt-4">
                <LexicalRenderer descrizioneFormattata={currentBanner.subtitle} />
              </div>
            </div>
            <button className="mt-6 bg-[#D70915] text-white font-bold py-4 px-10 rounded-[4px] uppercase text-[13px] w-fit shadow-md">
              ENTRA IN PROMO PRIVÈ
            </button>
          </div>

          {/* Cashback Desktop */}
          {isCashbackEnabled && (
            <div className="absolute right-[40px] top-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center w-[305px] h-[325px] px-[24px] py-[16px] gap-[16px] rounded-[24px] bg-white/70 backdrop-blur-md border border-white/50 shadow-2xl">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-baseline leading-none">
                  <span className="text-[56px] font-medium text-[#1D1D1B]">0</span>
                  <span className="text-[24px] font-medium text-[#1D1D1B]">,00€</span>
                </div>
                <p className="text-[14px] text-gray-500 font-medium uppercase text-center tracking-wide">Credito disponibile</p>
              </div>
              <div className="bg-[#f2f2f2]/60 rounded-[12px] px-[16px] py-[12px] w-full text-center border border-gray-100">
                <p className="text-[14px] text-gray-700 leading-tight"><span className="text-black font-bold">0€</span> in attesa di conversione</p>
              </div>
              <div className="pt-2">
                <a href="#" className="text-[#0070E0] text-[13px] font-bold underline uppercase tracking-wider">VEDI TRANSAZIONI</a>
              </div>
            </div>
          )}
        </div>

        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          loop={hasMultipleBanners}
          navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full md:h-[480px] z-10"
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <div className="w-full aspect-[16/10] md:h-full">
                <img
                  src={banner.mobileImage || banner.image}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '100% center' }} 
                  alt=""
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Info Mobile */}
      <div className="md:hidden p-6 flex flex-col bg-[#F5F5F7]">
        <div className="min-h-[110px] flex flex-col justify-center">
          <h2 key={`m-t-${activeIndex}`} className="text-[30px] font-bold text-[#1D1D1B] leading-tight">
            {currentBanner.title}
          </h2>
          <div key={`m-s-${activeIndex}`} className="text-[14px] text-gray-600 mt-2">
            <LexicalRenderer descrizioneFormattata={currentBanner.subtitle} />
          </div>
        </div>
        <button className="mt-8 bg-[#D70915] text-white font-bold py-4 w-full rounded-[6px] uppercase text-[15px] shadow-sm">
          ENTRA IN PROMO PRIVÈ
        </button>
        {hasMultipleBanners && (
          <div className="flex justify-center items-center w-full gap-6 pb-4 transform translate-y-15">
            <button className="custom-prev w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center">
              <svg width="24" height="24"><use href={`${ICON_PATH}#nav-prev`} /></svg>
            </button>
            <button className="custom-next w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center">
              <svg width="24" height="24"><use href={`${ICON_PATH}#nav-next`} /></svg>
            </button>
          </div>
        )}
      </div>

      {/* Frecce desktop  */}
      {hasMultipleBanners && (
        <div className="hidden md:block">
          <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[25px] z-50 w-12 h-12 rounded-full shadow-xl flex items-center justify-center text-black bg-white border border-gray-100 cursor-pointer">
            <svg width="24" height="24"><use href={`${ICON_PATH}#nav-prev`} /></svg>
          </button>
          <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-[25px] z-50 w-12 h-12 rounded-full shadow-xl flex items-center justify-center text-black bg-white border border-gray-100 cursor-pointer">
            <svg width="24" height="24"><use href={`${ICON_PATH}#nav-next`} /></svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePageBanner;
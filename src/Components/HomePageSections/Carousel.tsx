import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CardCarousel from "../UI/Card/CardCarousel";
import { type ICardCarouselProps } from "../../types/CardCarousel.Interface";
import iconsSprite from "@src/assets/icons.svg";


interface IGenericCarouselProps {
  data: Partial<ICardCarouselProps>[];
  sectionId: string;
  title: string;
  description: string;
}

const Carousel = ({data,sectionId,title,description,}: IGenericCarouselProps) => {
  if (!data || data.length === 0) return null;

  const showNavigation = data.length > 3;
  const prevClass = `${sectionId}-prev`;
  const nextClass = `${sectionId}-next`;

  return (
    <div className="relative w-full">
      <div className="mb-12 text-start">
        <h2 className="text-[32px] font-medium text-[#080808] mb-2">{title}</h2>
        {description && (
          <p className="text-[16px] text-[#666666] max-w-[1000px] leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="relative w-full">
        {showNavigation && (
          <>
            <button
              className={`${prevClass} hidden lg:flex absolute left-[-110px] top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white border border-gray-100 rounded-full items-center justify-center shadow-xl hover:scale-110 transition-all cursor-pointer text-black`}
            >
              <svg width="24" height="24">
                <use href={`${iconsSprite}#nav-prev`} />
              </svg>
            </button>
            <button
              className={`${nextClass} hidden lg:flex absolute right-[-110px] top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white border border-gray-100 rounded-full items-center justify-center shadow-xl hover:scale-110 transition-all cursor-pointer text-black`}
            >
              <svg width="24" height="24">
                <use href={`${iconsSprite}#nav-next`} />
              </svg>
            </button>
          </>
        )}

        <div className="lg:overflow-hidden overflow-visible">
          <Swiper
            key={data.length}
            modules={[Navigation]}
            spaceBetween={16}
            loop={showNavigation}
            observer={true}
            observeParents={true}
            navigation={{
              nextEl: `.${nextClass}`,
              prevEl: `.${prevClass}`,
            }}
            slidesPerView={1.04}
            breakpoints={{
              640: { slidesPerView: 2.2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="py-6 !overflow-visible lg:!overflow-clip"
          >
            {data.map((item, index) => (
              <SwiperSlide key={index} className="h-auto flex justify-center">
                <CardCarousel
                  {...(item as ICardCarouselProps)}
                  onClick={item.onClick || (() => {})}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Carousel;

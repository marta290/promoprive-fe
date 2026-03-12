import { type ICardCarouselProps } from "../../../types/CardCarousel.Interface";

const CardCarousel = ({image, headerImage, title, description, subtitle, buttonText, showBadge = true, onClick}: Partial<ICardCarouselProps>) => {
  return (
    <div className="w-full max-w-[380px] mx-auto my-2 p-4 rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex flex-col font-ubuntu bg-white border border-transparent h-full">
      <div className="w-full flex justify-center items-center h-[42px] mb-4">
        {headerImage && <img src={headerImage} alt={title} className="h-full w-auto object-contain" />}
      </div>
      <div className="w-full mb-4">
        <div className="w-full aspect-[4/3] rounded-[12px] overflow-hidden bg-white">
          {image && <img src={image} alt={title} className="w-full h-full object-cover" />}
        </div>
      </div>
      <div className="w-full flex flex-col flex-1 text-start">
        <h4 className="text-[20px] font-medium text-[#080808] leading-tight">{title}</h4>
        {description && <p className="text-[15px] text-[#666666] mt-4 line-clamp-2">{description}</p>}
      </div>
      <div className="mt-6 w-full flex items-center justify-between">
        <div className="flex-1">
          {showBadge && subtitle && (
            <div className="w-fit px-4 py-2 rounded-[6px] bg-[#D1F6ED]">
              <span className="text-[#00A651] text-[15px] font-medium whitespace-nowrap">
                {subtitle}
              </span>
            </div>
          )}
        </div>
        <button 
          onClick={onClick} 
          className="ml-auto bg-[#D91A1A] text-white px-8 py-2.5 rounded-full text-[15px] font-bold hover:bg-[#b31515] transition-all cursor-pointer whitespace-nowrap"
        >
          {buttonText || "Attiva"}
        </button>
      </div>

    </div>
  );
};

export default CardCarousel;
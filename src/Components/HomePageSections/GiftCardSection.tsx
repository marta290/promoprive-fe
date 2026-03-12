import { useContext } from "react";
import Carousel from "./Carousel";
import iconsSprite from "../../assets/icons.svg";
import { ConfigContext } from "../../contexts/ConfigContext";
import { type ICarouselItem } from "../../types/Config.Interface"; 
import { type ICardCarouselProps } from "../../types/CardCarousel.Interface";

const GiftCardSection = () => {
  const context = useContext(ConfigContext);

  if (!context || !context.sections?.giftcard || !context.configuration?.homepage?.giftCardCarousel) {
    return null;
  }

  const { configuration } = context;

  const mappedData: Partial<ICardCarouselProps>[] = configuration.homepage.giftCardCarousel.map(
    (item: ICarouselItem) => ({
      image: item.image,
      headerImage: item.headerImage || "",
      title: item.title,
      subtitle: item.subtitle || "",
      description: item.description || "",
      buttonText: "Acquista",
      showBadge: false,
      onClick: () => console.log("Selezionata Gift Card:", item.title),
    })
  );

  return (
    <section className="w-full flex justify-center font-ubuntu bg-white py-12">
      <div className="w-full max-w-[1440px] px-4 md:px-[120px] relative">
        <Carousel
          data={mappedData}
          sectionId="giftcard"
          title="Le Gift Card"
          description="Regalati la libertà di scelta: le Gift Card dei migliori marchi a prezzi riservati."
        />
        
        <div className="mt-10 flex justify-end">
          <a
            href="#"
            style={{ color: "#0066CC" }}
            className="flex items-center gap-2 text-[16px] font-medium hover:opacity-80 transition-colors underline decoration-2 underline-offset-4"
          >
            Scopri tutte le Gift Card
            <svg width="20" height="20" className="stroke-current fill-none">
              <use href={`${iconsSprite}#icon-arrow-right`} />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default GiftCardSection;
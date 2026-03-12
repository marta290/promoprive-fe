import { useContext } from "react";
import Carousel from "./Carousel";
import iconsSprite from "@src/assets/icons.svg";
import { ConfigContext } from "@src/contexts/ConfigContext";
import { type ICarouselItem } from "@src/types/Config.Interface"; 
import { type ICardCarouselProps } from "@src/types/CardCarousel.Interface";

const OffertePerTeSection = () => {
  const context = useContext(ConfigContext);

  if (!context || !context.sections?.offers || !context.configuration?.homepage?.offersCarousel) {
    return null;
  }

  const { configuration } = context;

  const mappedData: Partial<ICardCarouselProps>[] = configuration.homepage.offersCarousel.map(
    (item: ICarouselItem) => ({
      image: item.image,
      headerImage: item.headerImage || "",
      title: item.title,
      subtitle: item.subtitle || "",
      description: item.description || "",
      buttonText: "Richiedi", 
      showBadge: true,
      onClick: () => console.log("Dettaglio offerta:", item.title),
    })
  );

  return (
    <section className="w-full flex justify-center font-ubuntu bg-white py-12">
      <div className="w-full max-w-[1440px] px-4 md:px-[120px] relative">
        <Carousel
          data={mappedData}
          sectionId="offerte-per-te"
          title="Le Offerte per Te"
          description="Scopri ogni giorno nuove promozioni pensate per te."
        />
        
        <div className="mt-10 flex justify-end">
          <a
            href="#"
            style={{ color:"#0066CC" }}
            className="flex items-center gap-2 text-[16px] font-medium hover:opacity-80 transition-colors underline decoration-2 underline-offset-4"
          >
            Scopri tutte le Offerte per Te
            <svg width="20" height="20" className="stroke-current fill-none">
              <use href={`${iconsSprite}#icon-arrow-right`} />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default OffertePerTeSection;
import { useContext } from "react";
import Carousel from "./Carousel";
import iconsSprite from "@/assets/icons.svg";
import { ConfigContext } from "@src/contexts/ConfigContext";
import { type ICarouselItem } from "@src/types/Config.Interface"; 
import { type ICardCarouselProps } from "@src/types/CardCarousel.Interface";

const CashbackSection = () => {
  const context = useContext(ConfigContext);

  if (!context || !context.sections?.cashback || !context.configuration?.homepage?.cashbackCarousel) {
    return null;
  }

  const { configuration } = context;

  const mappedData: Partial<ICardCarouselProps>[] = configuration.homepage.cashbackCarousel.map(
    (item: ICarouselItem) => ({
      image: item.image,
      headerImage: item.headerImage || "",
      title: item.title,
      subtitle: item.subtitle || "",
      description: item.description || "",
      buttonText: "Attiva", 
      showBadge: true,
      onClick: () => console.log("Hai cliccato su:", item.title)
    })
  );

  return (
    <section className="w-full flex justify-center font-ubuntu bg-white pt-0 mt-[-50px] pb-12 md:pt-12 md:pb-12">
      <div className="w-full max-w-[1440px] px-4 md:px-[120px] relative">
        <Carousel
          data={mappedData}
          sectionId="cashback"
          title="Il Cashback"
          description="Guadagna ogni volta che acquisti! Il tuo cashback si trasforma in credito reale."
        />
        
        <div className="mt-10 flex justify-end">
          <a
            href="#"
            style={{ color: "#0066CC" }} 
            className="flex items-center gap-2 text-[16px] font-medium hover:opacity-80 transition-colors underline decoration-2 underline-offset-4"
          >
            Scopri tutti i merchant
            <svg width="20" height="20" className="stroke-current fill-none">
              <use href={`${iconsSprite}#icon-arrow-right`} />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CashbackSection;
import { useContext } from "react";
import LexicalRenderer from "../UI/lexicalRenderer/LexicalRenderer";
import { ConfigContext } from "../../contexts/ConfigContext";
import { type ITextAndImageSection } from "../../types/Config.Interface"; 

interface ITextAndImageSectionProps {
  type: "travel" | "health"; 
  reverseImage?: boolean;
}

const TextAndImageSection = ({ type, reverseImage = false }: ITextAndImageSectionProps) => {
  const context = useContext(ConfigContext);

  const isSectionEnabled = type === "travel" ? context?.sections?.travels : context?.sections?.health;
  
  const sectionData: ITextAndImageSection | undefined = type === "travel" 
    ? context?.configuration?.homepage?.travel?.[0]
    : context?.configuration?.homepage?.health?.[0];

  if (!isSectionEnabled || !sectionData) return null;

  return (
    <section className="w-full bg-[#f8f9fa] py-16 md:py-24"> 
      <div 
        className={`max-w-[1440px] mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-20 px-6 md:px-[120px]
        ${reverseImage ? 'md:flex-row-reverse' : 'md:flex-row'}`}
      >
        {/* Sezione Immagine */}
        <div className="w-full md:w-1/2 flex justify-center">
          <picture className="w-full">
            <source media="(max-width: 767px)" srcSet={sectionData.mobileImage || sectionData.image} />
            <img 
              src={sectionData.image} 
              alt={sectionData.title} 
              className="w-full h-auto object-contain rounded-[24px]" 
            />
          </picture>
        </div>

        {/* Sezione Testo */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start text-start">
          <h2 className="text-[32px] md:text-[42px] font-medium text-[#080808] mb-4 md:mb-6 leading-tight">
            {sectionData.title}
          </h2>
          <div className="text-[16px] md:text-[18px] text-[#666666] mb-8 md:mb-10 leading-relaxed">
            <LexicalRenderer descrizioneFormattata={sectionData.description} />
          </div>
          
          <button 
            style={{ backgroundColor: "#e31212" }}
            className="text-white px-10 py-3 rounded-full text-[14px] font-bold hover:brightness-90 transition-all transform hover:scale-105"
          >
            {sectionData.ctaText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TextAndImageSection;
import LexicalRenderer from '../../Components/UI/lexicalRenderer/LexicalRenderer'; 
import { type IDatiLexical } from '../../types/LexicalRenderer.Interface'; 

interface IGiftCardBannerProps {
  title: string;
  image: string;
  mobileImage?: string;
  description: IDatiLexical;
}

const GiftCardBanner = ({ title, image, mobileImage, description }: IGiftCardBannerProps) => {
  return (
    <div className="relative w-full h-[320px] md:h-[400px] overflow-hidden mb-10 font-ubuntu">
      <picture className="absolute inset-0 w-full h-full">
        {mobileImage && (
          <source media="(max-width: 767px)" srcSet={mobileImage} />
        )}
        <source media="(min-width: 768px)" srcSet={image} />
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover object-[60%_center] md:object-center" 
        />
      </picture>
      
      <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-white/90 via-white/40 to-transparent">
        
        <div className="w-full text-start px-6 md:px-16"> 
          <div className="max-w-[220px] md:max-w-2xl">
            <h1 className="text-[28px] md:text-[52px] font-bold text-[#A61A5C] leading-[1.1] mb-3">
              {title}
            </h1>
            <div className="text-[14px] md:text-[24px] text-[#A61A5C] font-medium leading-snug">
              <LexicalRenderer descrizioneFormattata={description} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GiftCardBanner;
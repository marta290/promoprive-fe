import { useContext } from "react";
import { ConfigContext } from "../../contexts/ConfigContext";
import HeroSection from "../../Components/HomePageHeroSection/HeroSection";
import CashbackSection from "../../Components/HomePageSections/CashbackSection";
import GiftCardSection from "../../Components/HomePageSections/GiftCardSection";
import OffertePerTeSection from "../../Components/HomePageSections/OffertePerTeSection";
import TextAndImageSection from "../../Components/textAndImageSection/textAndImageSection";

const HomePage = () => {
  const context = useContext(ConfigContext);
  if (!context || context.isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-[#D70915] border-t-transparent rounded-full animate-spin"></div>
          <p className="font-ubuntu text-gray-400 mt-4">Caricamento contenuti...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col bg-white font-ubuntu overflow-x-hidden">
      
      {/* HeroSection*/}
      <div className="pt-[120px] w-full">
        <HeroSection />
      </div>

      {/* Caroselli*/}
      <div className="flex flex-col gap-[120px] mt-[120px] mb-[120px]">
        <CashbackSection />
        <GiftCardSection />
        <OffertePerTeSection />
      </div>

      {/* TextAndImageSection*/}
      <div className="w-full flex flex-col">
        <TextAndImageSection type="health" reverseImage={false} />
        <TextAndImageSection type="travel" reverseImage={true} />
      </div>
      
    </div>
  );
};

export default HomePage;
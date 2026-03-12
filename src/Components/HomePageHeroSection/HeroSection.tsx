import HomePageBanner from "./HomePageBanner";

const HeroSection = () => {
  return (
    <section className="w-full bg-white p-0 md:py-[64px] md:px-[32px]">
      <div className="max-w-[1440px] mx-auto">
        <HomePageBanner />
      </div>
    </section>
  );
};
export default HeroSection;
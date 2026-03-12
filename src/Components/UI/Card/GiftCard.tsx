import { type IGiftCard } from "../../../types/GiftCard.Interface";

const GiftCard = ({ item }: { item: IGiftCard }) => {
  const isUnavailable = item.unavailable || item.status !== "VISIBLE";

  return (
    <div className="relative group">
      {item.featured && !isUnavailable && (
        <div className="absolute -top-4 left-1 z-0 bg-[#D1F1FF] text-[#080808] text-[10px] min-w-[100px] h-[30px] rounded-t-[12px] shadow-sm flex items-start justify-center pt-1">
          <span className="leading-none text-center font-ubuntu">In evidenza</span>
        </div>
      )}
      <div
        className={`relative z-10 flex flex-col bg-white border border-[#F2F2F2] rounded-[24px] p-3 shadow-sm transition-all h-full
        ${isUnavailable ? "opacity-80" : ""}`}
      >
        <div className="w-full aspect-[4/3] flex justify-center items-center mb-3 rounded-[16px] overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className={`max-h-full max-w-full object-contain ${isUnavailable ? "grayscale" : ""}`}
          />
        </div>
        <div className="flex flex-col flex-1 text-start px-1">
          <h4 className="text-[16px] font-bold text-[#080808] leading-tight mb-2 line-clamp-2 min-h-[40px]">
            {item.name}
          </h4>

          <div className="flex flex-col gap-1.5">
            <p className="text-[13px] text-[#666666]">
              A partire da{" "}
              <span className="font-bold text-[#080808]">
                {item.minDenomination}€
              </span>
            </p>

            {parseFloat(item.maxDiscount) > 0 && (
              <p className="text-[#00A651] text-[13px] font-medium">
                Sconti fino al{" "}
                <span className="font-bold">{item.maxDiscount}%</span>
              </p>
            )}

            {isUnavailable && (
              <p className="mt-1 text-[12px] text-[#080808] italic">
                {item.grayedMessage || "Esaurito"}
              </p>
            )}
          </div>
        </div>
        {!isUnavailable && (
          <div className="mt-4 flex justify-end">
            <button className="bg-[#D91A1A] text-white px-5 py-2 rounded-full text-[13px] font-bold hover:bg-[#b31515] transition-all active:scale-95 cursor-pointer">
              Acquista
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftCard;

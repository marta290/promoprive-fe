import { useState, useContext, useEffect, useMemo } from "react";
import GiftCardBanner from "./GiftCardBanner";
import GiftCard from "../../Components/UI/Card/GiftCard";
import { ConfigContext } from "../../contexts/ConfigContext";
import { GIFT_CARDS } from "../../constants/giftCard";
import type { IGiftCard } from "../../types/GiftCard.Interface";
import { ICON_PATH } from "@src/constants/constants";

const GiftCardPage = () => {
  const [visibleCount, setVisibleCount] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeBrandId] = useState<string | null>(null);
  const [activeCategoryId] = useState<string | null>(null);
  const [onlyPromo, setOnlyPromo] = useState(false);
  const [activePriceRange] = useState<string | null>(null);
  const [hasSidebar, setHasSidebar] = useState<boolean>(true);
  const [inputSearchTerm, setInputSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm.length >= 3) {
      setInputSearchTerm(searchTerm);
    } else {
      setInputSearchTerm("");
    }
  }, [searchTerm]);

  const context = useContext(ConfigContext);
  const bannerData = context?.configuration?.giftCardBanner?.[0];
  const initialData = { results: GIFT_CARDS };
  const filteredData = { results: GIFT_CARDS };
  const isLoadingInitial = false;
  const isLoadingFiltered = false;

  const allGiftCards = useMemo(() => {
    // Mi salvo la lista completa (anche poi i filtri) ricevuta dalla query iniziale.
    // Se initialData non è ancora disponibile, uso un array vuoto per evitare errori
    const initialList: IGiftCard[] = initialData?.results || [];
    const serverFilteredList: IGiftCard[] = filteredData?.results ?? [];
    // Rimuovi spazi e converti in minuscolo
    const term = searchTerm.toLowerCase();

    // Caso 1: L'utente sta usando la barra di ricerca
    if (term.length >= 3) {
      return initialList.filter((card) =>
        card.name.toLowerCase().includes(term),
      );
    }

    // Caso 2: L'utente sta usando i filtri della sidebar
    if (activeBrandId || activeCategoryId || activePriceRange || onlyPromo) {
      return serverFilteredList;
    }

    // Caso 3: Nessun filtro attivo
    return initialList;
  }, [
    initialData,
    filteredData,
    searchTerm,
    activeBrandId,
    activeCategoryId,
    activePriceRange,
    onlyPromo,
  ]);

  // Reset dei filtri quando si cerca
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setVisibleCount(12);
  };

  // Qui decido se mostrare la sidebar in base al numero di card
  useEffect(() => {
    // Se la query iniziale mi restituisce qualcosa controllo quanti sono e se sono >=12 la sidebar è presente
    if (initialData?.results) {
      setHasSidebar(initialData.results.length >= 12);
    }
  }, [initialData]);

  const isLoading =
    isLoadingInitial || (inputSearchTerm.length >= 3 && isLoadingFiltered);

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD] font-ubuntu text-start">
      {bannerData && <GiftCardBanner {...bannerData} />}

      <div className="max-w-[1440px] mx-auto px-6 py-10">
        <div className="mb-6 md:mb-8">
          <h2 className="text-[28px] md:text-[40px] font-bold text-gray-900 leading-tight">
            Gift Card di Epipoli
          </h2>
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2 mt-3">
            <p className="text-[14px] md:text-[16px] text-gray-600 leading-snug lg:whitespace-nowrap">
              Esplora l'ampio assortimento delle Gift Card dei grandi marchi.
              Vuoi saperne di più?
            </p>
            <button className="text-[#0070E0] text-[13px] font-bold mt-2 lg:mt-0 uppercase tracking-wide hover:underline text-left">
              SCOPRI I VANTAGGI
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* SIDEBAR */}
          {hasSidebar && (
            <aside className="hidden lg:block w-[260px] flex-shrink-0 lg:mt-20">
              <div className="sticky top-10 space-y-8">
                <div className="pb-6 border-b border-gray-100">
                  <label className="flex items-center gap-3 cursor-pointer text-[14px] text-gray-600">
                    <input
                      type="checkbox"
                      checked={onlyPromo}
                      onChange={() => {
                        setOnlyPromo(!onlyPromo);
                        setSearchTerm("");
                      }}
                      className="w-4 h-4 accent-red-600"
                    />
                    Solo <strong>In promozione</strong>
                  </label>
                </div>
              </div>
            </aside>
          )}

          <main className="flex-1 min-w-0">
            <div className="relative mb-8 max-w-md">
              <input
                type="text"
                placeholder="Cerca..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full outline-none focus:ring-2 focus:ring-red-50 shadow-sm transition-all"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5">
                  <use xlinkHref={`${ICON_PATH}#icon-search`} />
                </svg>
              </span>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-red-600" />
              </div>
            ) : (
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${
                  hasSidebar
                    ? "xl:grid-cols-4"
                    : "lg:grid-cols-4 xl:grid-cols-5"
                }`}
              >
                {allGiftCards.length > 0 ? (
                  allGiftCards
                    .slice(0, visibleCount)
                    .map((card) => <GiftCard key={card.id} item={card} />)
                ) : (
                  <p className="col-span-full text-center py-20 text-gray-400 italic">
                    Nessun risultato trovato per questa ricerca.
                  </p>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default GiftCardPage;

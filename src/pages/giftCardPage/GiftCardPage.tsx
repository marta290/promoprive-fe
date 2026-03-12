import { useState, useContext, useEffect, useMemo } from "react";
import GiftCardBanner from "../giftCardPage/GiftCardBanner";
import GiftCard from "../../Components/UI/Card/GiftCard";
import { ConfigContext } from "../../contexts/ConfigContext";
import type {
  IGiftCard,
  IGiftCardParams,
} from "../../types/GiftCard.Interface";
import { useQuery } from "@tanstack/react-query";
import axios from "../../interceptor";
import type { IFiltersResponse } from "../../types/Filter.Interface";
import { ICON_PATH } from "@src/constants/constants";

const GiftCardPage = () => {
  // Stati
  const [visibleCount, setVisibleCount] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeBrandId, setActiveBrandId] = useState<string | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [onlyPromo, setOnlyPromo] = useState(false);
  const [activePriceRange, setActivePriceRange] = useState<string | null>(null);
  const [hasSidebar, setHasSidebar] = useState<boolean>(true);
  const [inputSearchTerm, setInputSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm.length >= 3) {
      setInputSearchTerm(searchTerm);
    } else {
      setInputSearchTerm("");
    }
  }, [searchTerm]);

  // Stati filtri mobile
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [mobileCategoryExpanded, setCategoryExpanded] = useState(true);
  const [mobileBrandExpanded, setBrandExpanded] = useState(true);
  const [mobilePriceExpanded, setPriceExpanded] = useState(true);

  const context = useContext(ConfigContext);
  const bannerData = context?.configuration?.giftCardBanner?.[0];

  // Recupera tutte le giftCard appena si atterra nella pagina la prima volta
  const { data: initialData, isLoading: isLoadingInitial } = useQuery({
    queryKey: ["giftCardsInitial"],
    queryFn: async () => {
      const res = await axios.get("/api/giftcard");
      return res.data;
    },
  });

  // La query viene fatta quando si fa una ricerca o si applicano dei filtri
  const { data: filteredData, isLoading: isLoadingFiltered } = useQuery({
    // Se uno di questi parametri cambia,la richiesta viene rifatta
    queryKey: [
      "giftCards",
      inputSearchTerm,
      activeBrandId,
      activeCategoryId,
      onlyPromo,
      activePriceRange,
    ],
    queryFn: async () => {
      const [priceFrom, priceTo] = activePriceRange?.split("-") ?? [];
      const params: IGiftCardParams = {
        name: inputSearchTerm || undefined,
        category: activeCategoryId || undefined,
        brand: activeBrandId || undefined,
        onlyPromo: onlyPromo || undefined,
        priceFrom: priceFrom || undefined,
        priceTo: priceTo || undefined,
      };
      const res = await axios.get("/api/giftcard", { params });
      return res.data;
    },
  });
  // Calcolo la lista finale di gift card da mostrare, uso useMemo per evitare ricalcoli inutili ad ogni render.
  // Il calcolo viene rifatto solo quando cambia qualcosa.
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

  // Caricamento dei filtri per popolare la sidebar
  const { data: filters } = useQuery<IFiltersResponse>({
    queryKey: ["giftCardFilters"],
    queryFn: async () => {
      const response = await axios.get("/api/giftcard/filters");
      return response.data;
    },
  });

  // Qui decido se mostrare la sidebar in base al numero di card
  useEffect(() => {
    // Se la query iniziale mi restituisce qualcosa controllo quanti sono e se sono >=12 la sidebar è presente
    if (initialData?.results) {
      setHasSidebar(initialData.results.length >= 12);
    }
  }, [initialData]);

  const isLoading =
    isLoadingInitial || (inputSearchTerm.length >= 3 && isLoadingFiltered);

  // Array prezzi condiviso
  const rangePrezzi = [
    { label: "Meno di 10€", value: "0-10" },
    { label: "da 15€ a 25€", value: "15-25" },
    { label: "da 25€ a 50€", value: "25-50" },
    { label: "Oltre 50€", value: "50-1000" },
  ];

  // Contenuto filtri solo mobile
  const mobileFiltersContent = (
    <div className="flex flex-col bg-white">
      <div className="px-6 py-8 border-b border-gray-100 space-y-6">
        <label className="flex items-center gap-4 cursor-pointer">
          <input
            type="checkbox"
            checked={onlyPromo}
            onChange={() => setOnlyPromo(!onlyPromo)}
            className="w-6 h-6 border-gray-300 rounded accent-black"
          />
          <span className="text-[16px] text-gray-500">
            Solo{" "}
            <span className="text-gray-900 font-medium">In promozione</span>
          </span>
        </label>
      </div>

      {/* Categoria Mobile */}
      <div className="border-b border-gray-100">
        <button
          className="flex items-center justify-between w-full px-6 py-6"
          onClick={() => setCategoryExpanded(!mobileCategoryExpanded)}
        >
          <span className="font-bold text-[18px] text-gray-900">Categoria</span>
          <svg
            className={`w-6 h-6 text-gray-400 transition-transform ${mobileCategoryExpanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <use href={`${ICON_PATH}#icon-chevron`} />
          </svg>
        </button>
        <div className="border-b border-gray-100"></div>
        {mobileCategoryExpanded && (
          <ul className="pb-4">
            {filters?.categories.map((cat) => (
              <li
                key={cat.id}
                onClick={() =>
                  setActiveCategoryId(
                    activeCategoryId === cat.id ? null : cat.id,
                  )
                }
                className={`px-6 py-4 text-[16px] transition-colors ${
                  activeCategoryId === cat.id
                    ? "text-black font-bold bg-gray-50"
                    : "text-gray-500"
                }`}
              >
                {cat.value}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Brand Mobile */}
      <div className="border-b border-gray-100">
        <button
          className="flex items-center justify-between w-full px-6 py-6"
          onClick={() => setBrandExpanded(!mobileBrandExpanded)}
        >
          <span className="font-bold text-[18px] text-gray-900">Brand</span>
          <svg
            className={`w-6 h-6 text-gray-400 transition-transform ${mobileBrandExpanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <use href={`${ICON_PATH}#icon-chevron`} />
          </svg>
        </button>
        <div className="border-b border-gray-100"></div>
        {mobileBrandExpanded && (
          <ul className="pb-4">
            {filters?.brands.map((cat) => (
              <li
                key={cat.id}
                onClick={() =>
                  setActiveBrandId(activeBrandId === cat.id ? null : cat.id)
                }
                className={`px-6 py-4 text-[16px] transition-colors ${
                  activeBrandId === cat.id
                    ? "text-black font-bold bg-gray-50"
                    : "text-gray-500"
                }`}
              >
                {cat.value}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Prezzo Mobile */}
      <div className="border-b border-gray-100">
        <button
          className="flex items-center justify-between w-full px-6 py-6"
          onClick={() => setPriceExpanded(!mobilePriceExpanded)}
        >
          <span className="font-bold text-[18px] text-gray-900">Prezzo</span>
          <svg
            className={`w-6 h-6 text-gray-400 transition-transform ${mobilePriceExpanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <use href={`${ICON_PATH}#icon-chevron`} />
          </svg>
        </button>
        <div className="border-b border-gray-100"></div>
        {mobilePriceExpanded && (
          <ul className="pb-4">
            {rangePrezzi.map((range) => (
              <li
                key={range.value}
                onClick={() =>
                  setActivePriceRange(
                    activePriceRange === range.value ? null : range.value,
                  )
                }
                className={`px-6 py-4 text-[16px] transition-colors ${
                  activePriceRange === range.value
                    ? "text-black font-bold bg-gray-50"
                    : "text-gray-500"
                }`}
              >
                {range.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-[#FDFDFD] font-ubuntu text-start">
      {bannerData && <GiftCardBanner {...bannerData} />}

      {/* Filtri mobile */}
      <div
        className={`fixed inset-0 bg-black/40 lg:hidden transition-opacity duration-300 ${mobileFiltersOpen ? "z-[9998] opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileFiltersOpen(false)}
      />
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white lg:hidden flex flex-col z-[9999] transition-transform duration-300 ${mobileFiltersOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-5 flex items-center justify-between border-b border-gray-100">
          <span className="font-bold text-[20px] text-gray-900">Filtri</span>
          <button
            onClick={() => setMobileFiltersOpen(false)}
            className="text-gray-400"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <use href={`${ICON_PATH}#icon-close`} />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{mobileFiltersContent}</div>
      </div>

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
          {/* Bottone filtri mobile */}
          {(initialData?.results?.length ?? 0) >= 9 && (
            <div className="lg:hidden">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-full text-gray-600 text-[14px] bg-white shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M8.25 13.5H9.75C10.1625 13.5 10.5 13.1625 10.5 12.75C10.5 12.3375 10.1625 12 9.75 12H8.25C7.8375 12 7.5 12.3375 7.5 12.75C7.5 13.1625 7.8375 13.5 8.25 13.5ZM2.25 5.25C2.25 5.6625 2.5875 6 3 6H15C15.4125 6 15.75 5.6625 15.75 5.25C15.75 4.8375 15.4125 4.5 15 4.5H3C2.5875 4.5 2.25 4.8375 2.25 5.25ZM5.25 9.75H12.75C13.1625 9.75 13.5 9.4125 13.5 9C13.5 8.5875 13.1625 8.25 12.75 8.25H5.25C4.8375 8.25 4.5 8.5875 4.5 9C4.5 9.4125 4.8375 9.75 5.25 9.75Z"
                    fill="#6E6E73"
                  />
                </svg>
                Filtra
              </button>
            </div>
          )}

          {/* Sidebar desktop */}
          {hasSidebar ? (
            <aside className="hidden lg:block w-[260px] flex-shrink-0 lg:mt-20">
              <div className="sticky top-10 space-y-8">
                <div className="pb-6 border-b border-gray-100">
                  <label className="flex items-center gap-3 cursor-pointer text-[14px] text-gray-600">
                    <input
                      type="checkbox"
                      checked={onlyPromo}
                      onChange={() => setOnlyPromo(!onlyPromo)}
                      className="w-4 h-4 accent-red-600"
                    />
                    Solo <strong>In promozione</strong>
                  </label>
                </div>

                <div>
                  <h4 className="font-bold uppercase text-[12px] tracking-widest text-gray-900 mb-4">
                    Categoria
                  </h4>
                  <ul className="space-y-2 text-[14px]">
                    {filters?.categories.map((cat) => (
                      <li
                        key={cat.id}
                        onClick={() =>
                          setActiveCategoryId(
                            activeCategoryId === cat.id ? null : cat.id,
                          )
                        }
                        className={`cursor-pointer transition-colors ${activeCategoryId === cat.id ? "font-bold text-black" : "text-gray-500 hover:text-black"}`}
                      >
                        {cat.value}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold uppercase text-[12px] tracking-widest text-gray-900 mb-4">
                    Brand
                  </h4>
                  <ul className="space-y-2 text-[14px]">
                    {filters?.brands.map((b) => (
                      <li
                        key={b.id}
                        onClick={() =>
                          setActiveBrandId(activeBrandId === b.id ? null : b.id)
                        }
                        className={`cursor-pointer transition-colors ${activeBrandId === b.id ? "font-bold text-black" : "text-gray-500 hover:text-black"}`}
                      >
                        {b.value}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <h4 className="font-bold uppercase text-[12px] tracking-widest text-gray-900 mb-4">
                    Prezzo
                  </h4>
                  <ul className="space-y-2 text-[14px]">
                    {rangePrezzi.map((range) => (
                      <li
                        key={range.value}
                        onClick={() =>
                          setActivePriceRange(
                            activePriceRange === range.value
                              ? null
                              : range.value,
                          )
                        }
                        className={`cursor-pointer ${activePriceRange === range.value ? "font-bold text-black" : "text-gray-500 hover:text-black"}`}
                      >
                        {range.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          ) : (
            <div className="hidden lg:block w-[260px] flex-shrink-0" />
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

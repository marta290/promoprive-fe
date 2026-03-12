import { createBrowserRouter, type RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/",
    lazy: async () => ({ Component: (await import("./IndexPage")).default }),
    children: [
      {
        index: true,
        handle: { label: "Home" },
        lazy: async () => ({
          Component: (await import("./pages/homePage/HomePage")).default,
        }),
      },
      {
        path: "cashback",
        handle: { label: "Cashback" },
        lazy: async () => ({ 
          Component: (await import("./pages/cashbackPage/CashbackPage")).default 
        }),
      },
      {
        path: "giftcard",
        handle: { label: "Gift Card" },
        lazy: async () => ({ 
          //Component: (await import("./pages/giftCardPage/testGiftCard.tsx")).default
          Component: (await import("./pages/giftCardPage/GiftCardPage")).default 
        }),
      },
      {
        path: "offerte",
        handle: { label: "Offerte per te" },
        lazy: async () => ({ 
          Component: (await import("./pages/offertePerTe/OffertePerTe")).default 
        }),
      },
      {
        path: "salute",
        handle: { label: "Salute" },
        lazy: async () => ({ 
          Component: (await import("./pages/salutePage/SalutePage")).default 
        }),
      },
      {
        path: "viaggi",
        handle: { label: "Viaggi" },
        lazy: async () => ({ 
          Component: (await import("./pages/viaggiPage/ViaggiPage")).default 
        }),
      },
    ],
  },
  {
    path: "*",
    lazy: async () => ({ Component: (await import("./pages/Redirect")).default }),
  }
];

export const router = createBrowserRouter(routes);
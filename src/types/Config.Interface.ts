import { type IDatiLexical } from "./LexicalRenderer.Interface";

export interface ICarouselItem {
  id: string;
  index: number;
  image: string;
  title: string;
  headerImage?: string; 
  subtitle?: string;    
  description?: string; 
}

export interface IMainBanner {
  index: number;
  image: string;
  mobileImage: string;
  title: string;
  subtitle: IDatiLexical;
}

export interface ITextAndImageSection {
  image: string;
  mobileImage: string;
  title: string;
  description: IDatiLexical;
  ctaText: string;
  ctaLink: string;
}

export interface ISectionsStatus {
  giftcard: boolean;
  cashback: boolean;
  offers: boolean;
  travels: boolean;
  health: boolean;
  [key: string]: boolean | undefined;
}

export interface IConfiguration {
  logo: string;
  logoMobile?: string;
  primaryColor: string;
  secondaryColor: string;
  sections: ISectionsStatus;
  homepage: {
    banner: IMainBanner[];
    cashbackCarousel: ICarouselItem[];
    giftCardCarousel: ICarouselItem[];
    offersCarousel: ICarouselItem[];
    travel: ITextAndImageSection[];
    health: ITextAndImageSection[];
  };
  cashbackBanner: ITextAndImageSection[]; 
  giftCardBanner: ITextAndImageSection[];
}

export interface ICustomer {
  firstName: string;
  lastName: string;
  email: string;
  fiscalCode: string;
  city: string;
  id: string;
}

export interface ITokenResponse {
  token: string;
  fallbackUrl: string;
  customer: ICustomer;
  configuration: IConfiguration;
}

export interface IConfigContextType {
  configuration: IConfiguration | null;
  sections: ISectionsStatus | null; 
  isLoading: boolean;
  isError: boolean;
}

export interface ICardCarouselProps {
  image: string;
  headerImage: string;
  title: string;
  description: string;
  subtitle: string;
  buttonText: string;
  showBadge: boolean;
  onClick: () => void;
}

export interface ISectionCarouselProps {
  data: Partial<ICardCarouselProps>[];
}
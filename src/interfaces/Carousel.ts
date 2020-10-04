export interface CarouselSlide {
    title: string;
    subtitle: string;
    body: string;
    linkName: string;
    linkHref: string;
    linkAs: string;
    position: number;
    alt: string;
    image: string;
}

export interface Carousel {
    id: string;
    name: string;
    autoplay: boolean;
    indicators: boolean;
    interval: number;
    timeout: number;
    startAt: number;
    slides: CarouselSlide[];
}

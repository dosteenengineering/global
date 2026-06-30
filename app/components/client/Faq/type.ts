interface FaqItem {
    _id: string;
    question: string;
    answer: string;
}

interface FaqSection {
    title: string;
    subTitle: string;
    btnText: string;
    btnLink: string;
    items: FaqItem[];
}

interface BannerSection {
    title: string;
    image: string;
    imageAlt: string;
}

interface FaqData {
    bannerSection: BannerSection;
    firstSection: FaqSection;
    secondSection: FaqSection;
}

interface FaqPageProps {
    data: FaqData;
}

export type { FaqItem, FaqSection, FaqData, FaqPageProps };
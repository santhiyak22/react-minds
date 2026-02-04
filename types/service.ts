export type ServiceDetailsData = {
  breadcrumb: string[];
  hero: {
    title: string;
    description: string;
    image: string;
    cta: string;
    phone: string;
  };
  mainService: {
    title: string;
    description: string;
    detailedContent: string;
    shortNote: string;
  };
  developmentProcess: {
    number: string;
    title: string;
    points: string[];
  }[];
  whyChooseSection: {
    title: string;
    description: string;
    categories: {
      title: string;
      points: string[];
    }[];
  };
  benefits: {
    title: string;
    description: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
};

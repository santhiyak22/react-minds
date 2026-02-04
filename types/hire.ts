export interface HireDeveloperData {
  breadcrumb: string[];

  hero: {
    title: string;
    description: string;
    cta: string;
    image?: string;
  };

  services: {
    heading: {
      titleSmall: string;
      titleMain: string;
      description: string;
    };
    list: {
      title: string;
      description: string;
    }[];

    imageLeft?: string; // 👈 ADD THIS
  };

  applicationServices: {
    heading: {
      title: string;
      description: string;
    };
    list: {
      title: string;
      description: string;
    }[];
  };

  methodology: {
    heading: {
      title: string;
      subtitle: string;
    };
    steps: {
      title: string;
      desc: string;
    }[];
  };

  whyOpt: {
    description: string;
    imageLeft?: string;
    imageRight?: string;
    imageMobile?: string;
  };

  faq: {
    title: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
}

export interface HomePageData {
  hero: { titleLines: string[] };
  about: {
    title: string;
    text: string;
    images: { main: string; secondary: string };
  };
  dayAtFirstSchool: {
    title: string;
    intro: string;
    tiles: { title: string; image: string }[];
  };
  whyUs: { title: string; items: { icon: string; title: string }[] };
  videoSection: { title: string; text: string; image: string };
  safetyGrid: { items: { icon: string; title: string }[] };
  activityCentres: { title: string };
  whyFirstSchool: {
    tagline: string;
    title: string;
    image: string;
    points: string[];
  };
  earlyChildhoodFocus: {
    tagline: string;
    title: string;
    image: string;
    boxes: string[];
  };
  programmesSection: { tagline: string; titleLines: string[] };
  testimonialsSection: { tagline: string; titleLines: string[] };
  admissionModal: { heading: string; image: string };
}

export interface AboutPageData {
  intro: {
    tagline: string;
    title: string;
    paragraphs: string[];
    images: { main: string; secondary: string };
  };
  banner: { image: string };
  milestones: {
    tagline: string;
    title: string;
    items: string[];
    images: { main: string; secondary: string };
  };
}

export interface ContactPageData {
  heading: { tagline: string; titleLines: string[] };
  info: { phoneLabel: string; emailLabel: string };
}

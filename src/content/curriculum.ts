export interface CurriculumItem {
  slug: string;
  title: string;
  points: string[];
  image: string;
}

export const curriculum: CurriculumItem[] = [
  {
    slug: "language-literacy",
    title: "Language & Literacy",
    points: [
      "Develops speaking skills",
      "Promotes social interaction",
      "Develops reading and writing skills",
    ],
    image: "/images/curriculum/language-literacy.jpg",
  },
  {
    slug: "music-movement",
    title: "Music & Movement",
    points: [
      "Language development",
      "Improves concentration and thinking skills",
      "Social and emotional development",
    ],
    image: "/images/curriculum/music-movement.jpg",
  },
  {
    slug: "math-science",
    title: "Math & Science",
    points: [
      "Develops numeracy skills",
      "Builds counting and computation",
      "Recognize similarities and differences",
    ],
    image: "/images/curriculum/math-science.jpg",
  },
  {
    slug: "play-park",
    title: "Play Park",
    points: [
      "Develops fine motor and gross motor skills",
      "Builds emotional and social skills",
      "Develops sharing habits",
    ],
    image: "/images/curriculum/play-park.jpg",
  },
  {
    slug: "art-sensory",
    title: "Art & Sensory",
    points: [
      "Develops creativity",
      "Improves cognitive development",
      "Develops fine motor skills",
    ],
    image: "/images/curriculum/art-sensory.jpg",
  },
  {
    slug: "social-dramatics",
    title: "Social & Dramatics",
    points: [
      "Roleplay - Enacting stories",
      "Improves social behaviour",
      "Promotes team work",
    ],
    image: "/images/curriculum/social-dramatics.jpg",
  },
];

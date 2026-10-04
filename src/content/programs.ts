export interface Program {
  slug: string;
  title: string;
  age: string;
  description: string;
  image: string;
}

export const programs: Program[] = [
  {
    slug: "play-group",
    title: "Play Group",
    age: "2-3 Years",
    description:
      "Our playgroup children are provided with range of individual, small and large group activities, with exciting themes and innovative learning centres.",
    image: "/images/programs/play-group.jpg",
  },
  {
    slug: "pre-school",
    title: "Pre School",
    age: "3-4 Years",
    description:
      "In Pre school, children are engaged in school-readiness activities and problem-solving methods in a fun-filled way.",
    image: "/images/programs/pre-school.jpg",
  },
  {
    slug: "kindergarten",
    title: "Kindergarten",
    age: "LKG: 4-5 UKG: 5-6",
    description:
      "In addition to age-appropriate activities in kindergarten, we prepare children towards success in various other activities",
    image: "/images/programs/kindergarten.jpg",
  },
  {
    slug: "day-care",
    title: "Day Care",
    age: "",
    description:
      "The day care facility in Firstschool provides kids a significant learning environment which helps in social and emotional development of children. It also provides great supervision and care for infants and young children .",
    image: "/images/programs/day-care.jpg",
  },
];

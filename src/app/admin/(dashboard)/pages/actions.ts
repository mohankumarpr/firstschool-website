"use server";

import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { pages } from "@/db/schema";
import { parseLines, parsePairs } from "@/lib/admin-page-content";
import type { HomePageData, AboutPageData, ContactPageData } from "@/lib/page-content-types";

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

export async function updateHomePage(formData: FormData) {
  const data: HomePageData = {
    hero: { titleLines: parseLines(field(formData, "heroTitleLines")) },
    about: {
      title: field(formData, "aboutTitle"),
      text: field(formData, "aboutText"),
      images: { main: field(formData, "aboutImageMain"), secondary: field(formData, "aboutImageSecondary") },
    },
    dayAtFirstSchool: {
      title: field(formData, "dayTitle"),
      intro: field(formData, "dayIntro"),
      tiles: parsePairs(field(formData, "dayTiles")).map(({ a, b }) => ({ title: a, image: b })),
    },
    whyUs: {
      title: field(formData, "whyUsTitle"),
      items: parsePairs(field(formData, "whyUsItems")).map(({ a, b }) => ({ icon: a, title: b })),
    },
    videoSection: {
      title: field(formData, "videoTitle"),
      text: field(formData, "videoText"),
      image: field(formData, "videoImage"),
    },
    safetyGrid: {
      items: parsePairs(field(formData, "safetyItems")).map(({ a, b }) => ({ icon: a, title: b })),
    },
    activityCentres: { title: field(formData, "activityCentresTitle") },
    whyFirstSchool: {
      tagline: field(formData, "whyFsTagline"),
      title: field(formData, "whyFsTitle"),
      image: field(formData, "whyFsImage"),
      points: parseLines(field(formData, "whyFsPoints")),
    },
    earlyChildhoodFocus: {
      tagline: field(formData, "focusTagline"),
      title: field(formData, "focusTitle"),
      image: field(formData, "focusImage"),
      boxes: parseLines(field(formData, "focusBoxes")),
    },
    programmesSection: {
      tagline: field(formData, "programmesTagline"),
      titleLines: parseLines(field(formData, "programmesTitleLines")),
    },
    testimonialsSection: {
      tagline: field(formData, "testimonialsTagline"),
      titleLines: parseLines(field(formData, "testimonialsTitleLines")),
    },
    admissionModal: {
      heading: field(formData, "admissionModalHeading"),
      image: field(formData, "admissionModalImage"),
    },
  };

  await db.update(pages).set({ data, updatedAt: new Date() }).where(eq(pages.slug, "home"));
  redirect("/admin/pages/home");
}

export async function updateAboutPage(formData: FormData) {
  const data: AboutPageData = {
    intro: {
      tagline: field(formData, "introTagline"),
      title: field(formData, "introTitle"),
      paragraphs: parseLines(field(formData, "introParagraphs")),
      images: { main: field(formData, "introImageMain"), secondary: field(formData, "introImageSecondary") },
    },
    banner: { image: field(formData, "bannerImage") },
    milestones: {
      tagline: field(formData, "milestonesTagline"),
      title: field(formData, "milestonesTitle"),
      items: parseLines(field(formData, "milestonesItems")),
      images: {
        main: field(formData, "milestonesImageMain"),
        secondary: field(formData, "milestonesImageSecondary"),
      },
    },
  };

  await db.update(pages).set({ data, updatedAt: new Date() }).where(eq(pages.slug, "about"));
  redirect("/admin/pages/about");
}

export async function updateContactPage(formData: FormData) {
  const data: ContactPageData = {
    heading: {
      tagline: field(formData, "headingTagline"),
      titleLines: parseLines(field(formData, "headingTitleLines")),
    },
    info: {
      phoneLabel: field(formData, "phoneLabel"),
      emailLabel: field(formData, "emailLabel"),
    },
  };

  await db.update(pages).set({ data, updatedAt: new Date() }).where(eq(pages.slug, "contact"));
  redirect("/admin/pages/contact");
}

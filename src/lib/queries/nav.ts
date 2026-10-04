import { asc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { navItems } from "@/db/schema";

export interface NavItem {
  id: number;
  label: string;
  href: string;
  sortOrder: number;
}

export async function getNavItems(): Promise<NavItem[]> {
  return db.select().from(navItems).orderBy(asc(navItems.sortOrder));
}

export async function getNavItemById(id: number): Promise<NavItem | undefined> {
  const [row] = await db.select().from(navItems).where(eq(navItems.id, id));
  return row;
}

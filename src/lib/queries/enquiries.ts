import { desc } from "drizzle-orm";
import { db } from "@/db/client";
import { admissionEnquiries, contactEnquiries } from "@/db/schema";

export async function createAdmissionEnquiry(data: {
  parentName: string;
  contactNo: string;
  email: string;
  childName: string;
  program: string;
  location: string;
}) {
  await db.insert(admissionEnquiries).values(data);
}

export async function createContactEnquiry(data: {
  name: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
}) {
  await db.insert(contactEnquiries).values(data);
}

export function getAdmissionEnquiries() {
  return db.select().from(admissionEnquiries).orderBy(desc(admissionEnquiries.createdAt));
}

export function getContactEnquiries() {
  return db.select().from(contactEnquiries).orderBy(desc(contactEnquiries.createdAt));
}

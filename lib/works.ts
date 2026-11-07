import { sampleWorks } from "@/data/sample-works";
import type { Work } from "@/types/work";

export async function getWorks(): Promise<Work[]> {
  return sampleWorks;
}

export async function getWorkBySlug(slug: string): Promise<Work | undefined> {
  return sampleWorks.find((work) => work.slug === slug);
}

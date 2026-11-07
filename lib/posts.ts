import { samplePosts } from "@/data/sample-posts";
import type { Post } from "@/types/post";

export async function getPosts(): Promise<Post[]> {
  return [...samplePosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  return samplePosts.find((post) => post.slug === slug);
}

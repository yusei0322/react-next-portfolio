import "server-only";
import type { MicroCMSImage, MicroCMSListContent } from "microcms-js-sdk";
import { getMicroCMSClient } from "@/lib/microcms";
import { isCMSNotFound } from "@/lib/cms-errors";
import type { Post } from "@/types/post";

type CMSPost = {
  title: string;
  description?: string;
  content?: string;
  thumbnail?: MicroCMSImage;
} & MicroCMSListContent;

function toPost(item: CMSPost): Post {
  const image = item.thumbnail;
  const thumbnail = image && image.width && image.height
    ? { url: image.url, width: image.width, height: image.height }
    : undefined;
  return {
    id: item.id,
    slug: item.id,
    title: item.title,
    description: item.description ?? "",
    content: item.content ?? "",
    publishedAt: item.publishedAt ?? item.createdAt,
    thumbnail,
  };
}

// 標準課題は最大100件。100件を超える場合はページネーション課題へ進みます。
export async function getPosts(): Promise<Post[]> {
  const client = getMicroCMSClient();
  const response = await client.getList<CMSPost>({
    endpoint: "blogs",
    queries: { limit: 100, orders: "-publishedAt" },
    customRequestInit: { cache: "no-store" },
  });
  return response.contents.map(toPost);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const client = getMicroCMSClient();
  try {
    const item = await client.getListDetail<CMSPost>({
      endpoint: "blogs",
      contentId: encodeURIComponent(slug),
      customRequestInit: { cache: "no-store" },
    });
    return toPost(item);
  } catch (error) {
    if (!isCMSNotFound(error)) throw error;
    // API自体の設定ミスによる404を、記事がない404と取り違えないための確認です。
    await client.getList<CMSPost>({
      endpoint: "blogs",
      queries: { limit: 0 },
      customRequestInit: { cache: "no-store" },
    });
    return undefined;
  }
}

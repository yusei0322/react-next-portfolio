import "server-only";
import type { MicroCMSImage, MicroCMSListContent } from "microcms-js-sdk";
import { getMicroCMSClient } from "@/lib/microcms";
import { isCMSNotFound } from "@/lib/cms-errors";
import type { Work } from "@/types/work";

type CMSWork = {
  title: string;
  description?: string;
  content?: string;
  thumbnail?: MicroCMSImage;
} & MicroCMSListContent;

function toWork(item: CMSWork): Work {
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
    thumbnail,
  };
}

// 標準課題は最大100件。100件を超える場合はページネーション課題へ進みます。
export async function getWorks(): Promise<Work[]> {
  const client = getMicroCMSClient();
  const response = await client.getList<CMSWork>({
    endpoint: "works",
    queries: { limit: 100, orders: "-publishedAt" },
    customRequestInit: { cache: "no-store" },
  });
  return response.contents.map(toWork);
}

export async function getWorkBySlug(slug: string): Promise<Work | undefined> {
  const client = getMicroCMSClient();
  try {
    const item = await client.getListDetail<CMSWork>({
      endpoint: "works",
      contentId: encodeURIComponent(slug),
      customRequestInit: { cache: "no-store" },
    });
    return toWork(item);
  } catch (error) {
    if (!isCMSNotFound(error)) throw error;
    // API自体の設定ミスによる404を、記事がない404と取り違えないための確認です。
    await client.getList<CMSWork>({
      endpoint: "works",
      queries: { limit: 0 },
      customRequestInit: { cache: "no-store" },
    });
    return undefined;
  }
}

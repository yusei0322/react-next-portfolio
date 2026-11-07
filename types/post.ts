import type { Thumbnail } from "@/types/media";

export type Post = {
  id: string;
  slug: string;
  title: string;
  description: string;
  // 初期データは段落配列、CMS移行後はHTML文字列。表示はRichTextBodyが担当します。
  content: string | string[];
  publishedAt: string;
  thumbnail?: Thumbnail;
};

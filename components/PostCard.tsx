import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/format-date";
import type { Post } from "@/types/post";
import styles from "./ContentListItem.module.css";

type PostCardProps = {
  post: Post;
  headingLevel?: "h2" | "h3";
};

export function PostCard({
  post,
  headingLevel = "h2",
}: PostCardProps) {
  const Heading = headingLevel;
  const itemClassName = post.thumbnail
    ? `${styles.item} ${styles.withThumbnail}`
    : styles.item;

  return (
    <article className={itemClassName}>
      {post.thumbnail ? (
        <Link className={styles.thumbnailLink} href={`/blog/${post.slug}`}>
          <Image
            className={styles.thumbnail}
            src={post.thumbnail.url}
            alt={`${post.title}のサムネイル`}
            width={post.thumbnail.width}
            height={post.thumbnail.height}
            sizes="(max-width: 47.99rem) calc(100vw - 2.5rem), 15rem"
          />
        </Link>
      ) : null}
      <div className={styles.body}>
        <time className={styles.date} dateTime={post.publishedAt}>
          {formatDate(post.publishedAt)}
        </time>
        <Heading className={styles.title}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </Heading>
        <p className={styles.description}>{post.description}</p>
      </div>
    </article>
  );
}

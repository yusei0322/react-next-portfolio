import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/types/work";
import styles from "./ContentListItem.module.css";

type WorkCardProps = {
  work: Work;
  headingLevel?: "h2" | "h3";
};

export function WorkCard({
  work,
  headingLevel = "h2",
}: WorkCardProps) {
  const Heading = headingLevel;
  const itemClassName = work.thumbnail
    ? `${styles.item} ${styles.withThumbnail}`
    : styles.item;

  return (
    <article className={itemClassName}>
      {work.thumbnail ? (
        <Link className={styles.thumbnailLink} href={`/works/${work.slug}`}>
          <Image
            className={styles.thumbnail}
            src={work.thumbnail.url}
            alt={`${work.title}のサムネイル`}
            width={work.thumbnail.width}
            height={work.thumbnail.height}
            sizes="(max-width: 47.99rem) calc(100vw - 2.5rem), 15rem"
          />
        </Link>
      ) : null}
      <div className={styles.body}>
        <Heading className={styles.title}>
          <Link href={`/works/${work.slug}`}>{work.title}</Link>
        </Heading>
        <p className={styles.description}>{work.description}</p>
      </div>
    </article>
  );
}

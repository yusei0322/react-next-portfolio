import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { RichTextBody } from "@/components/RichTextBody";
import { getWorkBySlug } from "@/lib/works";
import styles from "./page.module.css";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);
  if (!work) return { title: "作品が見つかりません" };
  return { title: work.title, description: work.description };
}

export default async function DetailPage({ params }: PageProps) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);
  if (!work) notFound();
  return (
    <Container className={styles.page}>
      <article className={styles.article}>
        <header className={styles.header}>
          <Link className={styles.backLink} href="/works">作品一覧へ戻る</Link>
          <h1>{work.title}</h1>
          <p className={styles.description}>{work.description}</p>
          {work.thumbnail ? (
            <Image className={styles.thumbnail} src={work.thumbnail.url}
              alt={`${work.title}のサムネイル`}
              width={work.thumbnail.width} height={work.thumbnail.height}
              sizes="(max-width: 48rem) calc(100vw - 2.5rem), 46rem" />
          ) : null}
        </header>
        <div className={styles.content}><RichTextBody content={work.content} /></div>
      </article>
    </Container>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { RichTextBody } from "@/components/RichTextBody";
import { formatDate } from "@/lib/format-date";
import { getPostBySlug } from "@/lib/posts";
import styles from "./page.module.css";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "ブログが見つかりません" };
  return { title: post.title, description: post.description };
}

export default async function DetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  return (
    <Container className={styles.page}>
      <article className={styles.article}>
        <header className={styles.header}>
          <Link className={styles.backLink} href="/blog">ブログ一覧へ戻る</Link>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <h1>{post.title}</h1>
          <p className={styles.description}>{post.description}</p>
          {post.thumbnail ? (
            <Image className={styles.thumbnail} src={post.thumbnail.url}
              alt={`${post.title}のサムネイル`}
              width={post.thumbnail.width} height={post.thumbnail.height}
              sizes="(max-width: 48rem) calc(100vw - 2.5rem), 46rem" />
          ) : null}
        </header>
        <div className={styles.content}><RichTextBody content={post.content} /></div>
      </article>
    </Container>
  );
}

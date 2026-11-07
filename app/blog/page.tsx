import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PostCard } from "@/components/PostCard";
import { getPosts } from "@/lib/posts";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "ブログ",
  description: "授業で学んだ内容、制作記録、試したことを掲載します。",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <Container className={styles.page}>
      <header className={styles.header}>
        <h1>ブログ</h1>
        <p>
          授業で学んだ内容、制作中に起きた問題、試したことを記録します。
        </p>
      </header>

      <div className={styles.list}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </Container>
  );
}

import Link from "next/link";
import { Container } from "@/components/Container";
import { PostCard } from "@/components/PostCard";
import { WorkCard } from "@/components/WorkCard";
import { profile } from "@/data/profile";
import { getPosts } from "@/lib/posts";
import { getWorks } from "@/lib/works";
import styles from "./page.module.css";

export default async function HomePage() {
  const works = (await getWorks()).slice(0, 2);
  const posts = (await getPosts()).slice(0, 3);

  return (
    <>
      <section className={styles.introductionSection}>
        <Container>
          <h1>{profile.name}</h1>
          <p className={styles.role}>{profile.role}</p>
          <p className={styles.introduction}>{profile.introduction}</p>
          <nav className={styles.pageLinks} aria-label="主要ページ">
            <Link href="/profile">プロフィールを見る</Link>
            <Link href="/works">作品を見る</Link>
            <Link href="/blog">ブログを見る</Link>
          </nav>
        </Container>
      </section>

      <section className={styles.worksSection}>
        <Container>
          <header className={styles.sectionHeader}>
            <h2>作品</h2>
            <Link href="/works">すべての作品を見る</Link>
          </header>
          <div className={styles.contentList}>
            {works.map((work) => (
              <WorkCard key={work.id} work={work} headingLevel="h3" />
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.postsSection}>
        <Container>
          <header className={styles.sectionHeader}>
            <h2>最近の記事</h2>
            <Link href="/blog">すべての記事を見る</Link>
          </header>
          <div className={styles.contentList}>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} headingLevel="h3" />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

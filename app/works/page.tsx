import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { WorkCard } from "@/components/WorkCard";
import { getWorks } from "@/lib/works";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "作品",
  description: "授業や自主学習で制作した作品を掲載します。",
};

export default async function WorksPage() {
  const works = await getWorks();

  return (
    <Container className={styles.page}>
      <header className={styles.header}>
        <h1>作品</h1>
        <p>授業や自主学習で制作した作品と、制作中に工夫した点を紹介します。</p>
      </header>

      <div className={styles.list}>
        {works.map((work) => (
          <WorkCard key={work.id} work={work} />
        ))}
      </div>
    </Container>
  );
}

import Link from "next/link";
import { Container } from "@/components/Container";
import styles from "./not-found.module.css";

export default function NotFoundPage() {
  return (
    <Container className={styles.page}>
      <p className={styles.code}>404</p>
      <h1>ページが見つかりません</h1>
      <p>URLを確かめるか、ホームから目的のページへ移動してください。</p>
      <Link href="/">ホームへ戻る</Link>
    </Container>
  );
}

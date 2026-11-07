import { Container } from "@/components/Container";
import styles from "./loading.module.css";

export default function LoadingPage() {
  return (
    <Container className={styles.page}>
      <div className={styles.indicator} aria-hidden="true" />
      <p role="status">ページを読み込んでいます。</p>
    </Container>
  );
}

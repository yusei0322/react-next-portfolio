import { Container } from "@/components/Container";
import { profile } from "@/data/profile";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
      </Container>
    </footer>
  );
}

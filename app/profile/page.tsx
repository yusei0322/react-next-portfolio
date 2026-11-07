import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { profile } from "@/data/profile";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "プロフィール",
  description: "自己紹介、学習中の技術、今後の目標を掲載しています。",
};

export default function ProfilePage() {
  return (
    <Container className={styles.page}>
      <header className={styles.header}>
        <h1>プロフィール</h1>
        <p>{profile.introduction}</p>
      </header>

      <div className={styles.sections}>
        <section className={styles.section}>
          <h2>基本情報</h2>
          <dl className={styles.definitionList}>
            <div>
              <dt>名前</dt>
              <dd>{profile.name}</dd>
            </div>
            <div>
              <dt>目指していること</dt>
              <dd>{profile.role}</dd>
            </div>
            <div>
              <dt>活動地域</dt>
              <dd>{profile.location}</dd>
            </div>
          </dl>
        </section>

        <section className={styles.section}>
          <h2>学習中の技術</h2>
          <ul className={styles.simpleList}>
            {profile.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2>今後の目標</h2>
          <ul className={styles.simpleList}>
            {profile.learningGoals.map((goal) => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2>リンク</h2>
          <ul className={styles.linkList}>
            {profile.links.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Container>
  );
}

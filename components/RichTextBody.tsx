import { sanitizeRichText } from "@/lib/sanitize-rich-text";
import styles from "./RichTextBody.module.css";

type RichTextBodyProps = { content: string | string[] };

// 初期の段落配列もCMSのHTMLも、この部品だけで受け止めます。
export function RichTextBody({ content }: RichTextBodyProps) {
  if (Array.isArray(content)) {
    return <div className={styles.body}>{content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>;
  }
  return <div className={styles.body} dangerouslySetInnerHTML={{ __html: sanitizeRichText(content) }} />;
}

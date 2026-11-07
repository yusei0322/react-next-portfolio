import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { profile } from "@/data/profile";
import "./globals.css";

// 標準教材は要求時に表示します。SDK内部のcatchに静的生成の制御を渡しません。
export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: profile.name,
    template: `%s | ${profile.name}`,
  },
  description:
    "Web基礎の授業で制作するポートフォリオサイトです。プロフィール、作品、ブログを掲載しています。",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ja">
      <body>
        <a className="skipLink" href="#main-content">
          本文へ移動
        </a>
        <div className="siteFrame">
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

import type { Post } from "@/types/post";

export const samplePosts: Post[] = [
  {
    id: "first-post",
    slug: "first-post",
    title: "ポートフォリオ制作を始めました",
    description:
      "Next.jsの雛形を起動し、これから制作するサイトの目的を整理しました。",
    content: [
      "授業で学んだことや作ったものをほかの人に伝えるために、このサイトを作ります。",
      "今はサンプルデータを表示しています。第9回の授業で、microCMSから取得した記事へ置き換えます。",
      "授業ごとの変更をGitHubに記録し、サイトをどう改善してきたか分かるようにします。",
    ],
    publishedAt: "2026-11-07T00:00:00.000Z",
    thumbnail: {
      url: "/images/sample-blog-01.svg",
      width: 1200,
      height: 675,
    },
  },
  {
    id: "react-learning",
    slug: "react-learning",
    title: "Reactポケモン図鑑で学んだこと",
    description:
      "コンポーネント、Props、外部API、ルーティングを使った制作を振り返ります。",
    content: [
      "Reactポケモン図鑑では、画面を役割ごとのコンポーネントに分けました。",
      "PokeAPIから取得したデータを一覧画面と詳細画面に表示し、URLに応じて表示内容を切り替えました。",
      "Next.jsでの制作でも、Reactで学んだコンポーネントの考え方を引き続き使います。",
    ],
    publishedAt: "2026-10-31T00:00:00.000Z",
    thumbnail: {
      url: "/images/sample-blog-02.svg",
      width: 1200,
      height: 675,
    },
  },
  {
    id: "future-plan",
    slug: "future-plan",
    title: "これから追加したい内容",
    description:
      "プロフィール、作品紹介、ブログをどのように充実させるか計画します。",
    content: [
      "プロフィールには、学習している技術だけでなく、どのようなものを作りたいかを書きます。",
      "作品紹介では、完成画面だけでなく、目的、担当した内容、工夫した点も説明します。",
      "ブログには、授業で起きた問題と、どう解決したかを記録します。",
    ],
    publishedAt: "2026-10-24T00:00:00.000Z",
    thumbnail: {
      url: "/images/sample-blog-03.svg",
      width: 1200,
      height: 675,
    },
  },
];

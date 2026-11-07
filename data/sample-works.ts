import type { Work } from "@/types/work";

export const sampleWorks: Work[] = [
  {
    id: "react-pokemon-zukan",
    slug: "react-pokemon-zukan",
    title: "Reactポケモン図鑑",
    description:
      "React、TypeScript、外部API、ルーティングを使って制作したポケモン図鑑です。",
    content: [
      "PokeAPIから取得したデータを使い、ポケモンの一覧と詳細を表示するWebアプリを制作しました。",
      "画面を役割ごとのコンポーネントに分け、Propsを使って必要なデータを受け渡しています。",
      "制作中に起きた問題と解決方法を記録し、ほかの人が実装内容を確認できるようにすることを目指しました。",
    ],
    thumbnail: {
      url: "/images/sample-work-01.svg",
      width: 1200,
      height: 675,
    },
  },
  {
    id: "about-me-site",
    slug: "about-me-site",
    title: "自己紹介サイト",
    description:
      "HTML、CSS、JavaScriptで制作した、学んだことを紹介するWebサイトです。",
    content: [
      "自分のプロフィール、学習中の技術、制作物を複数のページに分けて掲載しました。",
      "スマートフォンでもPCでも読みやすいように、画面幅に応じてレイアウトを調整しています。",
      "GitHub Pagesで公開し、ほかの人がURLから見られるようにしました。",
    ],
    thumbnail: {
      url: "/images/sample-work-02.svg",
      width: 1200,
      height: 675,
    },
  },
];

"""Render exact teaching diagrams. Requires Pillow and a Japanese OpenType font."""

from pathlib import Path
import argparse
from PIL import Image, ImageDraw, ImageFont

parser = argparse.ArgumentParser()
parser.add_argument("--font", required=True)
args = parser.parse_args()
OUT = Path(__file__).parent
W, H, SCALE = 1440, 960, 2
INK, MUTED = "#173247", "#526475"
BLUE, TEAL, BORDER = "#2457a7", "#087f8c", "#d4e0eb"


def font(size):
    return ImageFont.truetype(args.font, size * SCALE)


def new(title, subtitle):
    im = Image.new("RGB", (W * SCALE, H * SCALE), "#ffffff")
    d = ImageDraw.Draw(im)
    label(d, (60, 42), title, 38)
    label(d, (60, 106), subtitle, 22, MUTED)
    d.line((60*SCALE, 158*SCALE, 1380*SCALE, 158*SCALE), fill=BORDER, width=2*SCALE)
    return im, d


def label(d, xy, value, size=25, color=INK):
    d.text((xy[0]*SCALE, xy[1]*SCALE), value, font=font(size), fill=color)


def lines(d, xy, values, size=25, color=INK, gap=42):
    for i, value in enumerate(values):
        label(d, (xy[0], xy[1]+i*gap), value, size, color)


def box(d, xy, fill="#f4f7fb", outline=BORDER, radius=16):
    d.rounded_rectangle(tuple(int(v*SCALE) for v in xy), radius=radius*SCALE,
                        fill=fill, outline=outline, width=2*SCALE)


def arrow(d, start, end, color=BLUE):
    x1,y1 = start; x2,y2 = end
    d.line((x1*SCALE,y1*SCALE,x2*SCALE,y2*SCALE),fill=color,width=4*SCALE)
    if x2 > x1:
        points=[(x2,y2),(x2-15,y2-9),(x2-15,y2+9)]
    else:
        points=[(x2,y2),(x2-9,y2-15),(x2+9,y2-15)]
    d.polygon([(x*SCALE,y*SCALE) for x,y in points],fill=color)


def footer(im, d, name, note):
    label(d, (60, 884), note, 20, MUTED)
    label(d, (60, 922), "現行教材のコードと手順に基づく説明図です。実画面のスクリーンショットではありません。", 17, MUTED)
    im.save(OUT / name, optimize=True)


im,d = new("T05　制作フォルダ・起動・GitHubの対応", "npmとGitは、package.jsonがある自分の制作フォルダで実行します。")
box(d,(60,190,700,600))
label(d,(90,213),"VS Codeで開くフォルダ",26,BLUE)
label(d,(90,263),"react-next-portfolio",31)
lines(d,(115,330),["package.json　起動・確認コマンドの定義", "app/　URLに対応するページ", "components/　共通の表示部品", "data/profile.ts　自分のプロフィール"],24,gap=54)
box(d,(760,190,1380,600))
label(d,(790,213),"ターミナル",26,BLUE)
lines(d,(790,270),["pwd", "ls package.json", "npm run dev"],28,gap=53)
label(d,(790,448),"表示されたローカルURLを開く",24)
label(d,(790,494),"例：http://localhost:3000",27,TEAL)
label(d,(790,550),"起動中はそのターミナルを開いておく",21,MUTED)
arrow(d,(710,375),(750,375))
box(d,(60,640,700,836),fill="#edf7f7")
label(d,(90,663),"course　配布元のmaster",27,TEAL)
label(d,(90,715),"初めて制作するときに雛形を取得",24)
label(d,(90,766),"作業を再開するときは自分のコードを開く",22,MUTED)
box(d,(760,640,1380,836),fill="#edf3fc")
label(d,(790,663),"origin　自分のmain",27,BLUE)
label(d,(790,715),"コミット → pushでGitHubへ保存",24)
label(d,(790,766),"別PCでは自分のリポジトリをcloneする",22,MUTED)
footer(im,d,"05-project-and-commands.png","確認：originが自分、courseが配布元、作業ブランチがmain。")

im,d = new("T06　TOPの表示件数を変える", "同じ記事データを使っていても、ページごとに表示する件数を選べます。")
box(d,(315,190,1125,325))
label(d,(345,209),"data/sample-posts.ts　記事3件",27,BLUE)
label(d,(345,258),"getPosts()が3件を返す",26)
arrow(d,(515,325),(515,375)); arrow(d,(950,325),(950,375))
box(d,(60,385,700,790),fill="#edf3fc")
label(d,(90,405),"TOP　app/page.tsx",28,BLUE)
label(d,(90,465),"(await getPosts()).slice(0, 1)",27)
label(d,(90,518),"先頭の1件だけを選ぶ",24)
box(d,(90,580,670,653),fill="white")
label(d,(113,594),"記事1　PostCardで表示",26)
label(d,(90,705),"TOPに並ぶ記事は1件",28,BLUE)
box(d,(760,385,1380,790),fill="#edf7f7")
label(d,(790,405),"ブログ一覧　app/blog/page.tsx",26,TEAL)
label(d,(790,465),"await getPosts()",27)
label(d,(790,518),"取得した3件をそのまま使う",24)
for i in range(3):
    box(d,(790,574+i*57,1350,623+i*57),fill="white",radius=8)
    label(d,(810,579+i*57),f"記事{i+1}　PostCardで表示",22)
label(d,(790,756),"ブログ一覧は3件のまま",22,TEAL)
footer(im,d,"06-data-and-display.png","各ページのposts.mapが、選んだ記事1件ずつをPostCardのpostへ渡します。")

im,d = new("T08　設定ファイルと実行するコマンド", ".env.localには設定を保存し、接続確認はターミナルで実行します。")
box(d,(60,190,1380,472))
label(d,(90,210),"エディタで保存するファイル　react-next-portfolio/.env.local",27,BLUE)
lines(d,(90,275),["MICROCMS_SERVICE_DOMAIN=自分のサービスID", "MICROCMS_API_KEY=自分のGET専用APIキー", "NEXT_PUBLIC_SITE_URL=http://localhost:3000"],27,gap=54)
label(d,(90,434),"package.jsonと同じ場所。日本語の部分は自分の値へ置き換えます。",21,MUTED)
arrow(d,(720,478),(720,518))
box(d,(60,530,1380,690),fill="#edf7f7")
label(d,(90,549),"制作フォルダのターミナルで実行",26,TEAL)
label(d,(90,603),"node --env-file=.env.local scripts/check-cms.mjs",29)
box(d,(60,720,1380,852),fill="#f4f7fb")
label(d,(90,733),"実行結果の例（記事2件・作品1件を公開した場合）",23,MUTED)
label(d,(90,778),"blogs: 接続成功、公開コンテンツ2件",25)
label(d,(770,778),"works: 接続成功、公開コンテンツ1件",25)
footer(im,d,"08-settings-and-terminal.png","設定の変更後はCtrl+Cで停止し、npm run devで開発サーバーを起動し直します。")

im,d = new("T08〜T10　どこまでCMSにつながったか", "接続確認、一覧の取得、詳細の取得を順番に実装します。")
cols=[60,505,950]
stages=[("T08　接続を確認", "設定とAPIを準備"),("T09　一覧を接続", "getPosts / getWorks"),("T10　詳細を接続", "getPostBySlug / getWorkBySlug")]
for x,(title,sub) in zip(cols,stages):
    box(d,(x,195,x+430,804))
    label(d,(x+24,215),title,28,BLUE)
    label(d,(x+24,272),sub,20,MUTED)
for idx,x in enumerate(cols):
    label(d,(x+24,350),"一覧ページ",25)
    box(d,(x+24,401,x+406,482),fill="#edf7f7" if idx else "#f4f7fb")
    label(d,(x+46,420),"CMSの記事・作品" if idx else "サンプルデータ",26,TEAL if idx else MUTED)
    label(d,(x+24,528),"詳細ページ",25)
    box(d,(x+24,579,x+406,660),fill="#edf7f7" if idx==2 else "#f4f7fb")
    label(d,(x+46,598),"CMSの本文・画像" if idx==2 else "サンプルデータ",26,TEAL if idx==2 else MUTED)
    descriptions=["接続成功でも画面はサンプル", "CMSの詳細は次のT10で実装", "一覧から本文・画像まで確認"]
    label(d,(x+24,720),descriptions[idx],21)
footer(im,d,"09-10-cms-stages.png","T09ではCMSの記事をクリックしてNot Foundになる場合があります。詳細の確認はT10で行います。")

im,d = new("T11　変更した場所と、反映に必要な操作", "公開後の確認では、変更内容に合う操作を選びます。")
rows=[
 ("コード・CSS・画像ファイル", "自分のmainへcommit・push", "Vercelの成功後、本番URLで確認"),
 ("Vercelの環境変数", "設定を保存 → Redeploy", "新しいデプロイで一覧・詳細を確認"),
 ("microCMSの記事・作品", "microCMSで公開", "一覧と詳細をそれぞれ再読み込み"),
 ("PC内の.env.local", "保存 → Ctrl+C → npm run dev", "接続確認とローカル画面を確認"),
]
label(d,(85,193),"変更したもの",25,BLUE)
label(d,(505,193),"反映する操作",25,BLUE)
label(d,(940,193),"確認する結果",25,BLUE)
for i,(a,b,c) in enumerate(rows):
    y=250+i*142
    box(d,(60,y,1380,y+118),fill="#edf7f7" if i==2 else "#f4f7fb")
    label(d,(85,y+36),a,24)
    label(d,(505,y+36),b,22)
    label(d,(940,y+36),c,21)
    arrow(d,(459,y+59),(491,y+59))
    arrow(d,(891,y+59),(923,y+59))
footer(im,d,"11-update-paths.png","この教材ではcache: \"no-store\"とdynamic = \"force-dynamic\"を使ってCMSの更新を確認します。")

print("Rendered 5 diagrams in", OUT)

# 第5回以降のコマンドと確認結果

制作はNotionの手順で進め、コマンドの実行場所や結果を確認するときにこのページを使います。初めてなら[初回の準備](#first-start)、続きからなら[作業の再開](#resume)を開きます。

| 今やりたいこと | 開く手順 |
| --- | --- |
| ポートフォリオを初めて作る | [初回の準備](#first-start) |
| 同じPCで続きをする | [作業の再開](#resume) |
| 別のPCで自分の制作物を開く | [自分のリポジトリを取得する](#another-pc) |
| コードの変更をGitHubへ保存する | [作業をGitHubへ保存する](#save) |
| microCMSへ接続する | [設定と接続確認](#cms) |
| サイトを公開する・変更を反映する | [第11回の公開と更新](#publish) |

## コマンドを入力する場所

Visual Studio Codeの「ファイル → フォルダーを開く」で自分の `react-next-portfolio` を選び、「ターミナル → 新しいターミナル」を開きます。最初のcloneだけは、一つ上の作業ディレクトリから実行します。

`bash` のコードはターミナルへ1行ずつ入力し、Enterで実行します。`YOUR_GITHUB_NAME`、`YOUR_STUDENT_ID`、日本語で示した氏名などは、自分の値に置き換えてから入力してください。コードブロックの囲みや `bash` の文字は入力しません。MacのターミナルとWindowsのGit Bashで実行できます。WindowsのPowerShellでは、フォルダ操作や環境変数の指定方法が異なります。

制作フォルダへ移動できているかは、次で確認します。

```bash
pwd
ls package.json
```

`pwd` に表示されるパスの末尾が `react-next-portfolio` で、二つ目に `package.json` が表示されれば、その場所でnpmとGitのコマンドを実行できます。学籍番号のフォルダや `app` の中が現在位置なら、Visual Studio Codeで制作フォルダを開き直します。

通常のコマンドは結果が出て、再び入力できる状態になるまで待ちます。エラーが出たら、そのコマンドの問題を確認してから次へ進みます。`npm run dev` はサーバーを動かしたまま使うコマンドです。入力欄へ戻らなくても正常です。

別のコマンドを実行するときは新しいターミナルを開き、`pwd` を確認します。または、起動中のターミナルでCtrl+Cを押してから実行します。画面確認へ戻るときは `npm run dev` で起動し直します。

<a id="first-start"></a>

## 初回の準備

### 1. GitHubへログインする

共有Macでは、毎回自分のGitHubアカウントでログインします。まずGitHub CLIが使えることと現在のログイン状態を確認します。

```bash
gh --version
gh auth status --hostname github.com
```

共有Macでは、次を実行して認証を始めます。

```bash
GH_BROWSER=echo gh auth login --hostname github.com --git-protocol https --web --scopes workflow
```

ターミナルの案内に従ってEnterを押し、表示された認証先URLをChromeのゲストウィンドウで開きます。ゲストウィンドウを使えない場合はシークレットウィンドウを使います。自分のアカウントでログインし、ターミナルに表示されたワンタイムコードを入力して承認します。Gitにもこの認証を使うか聞かれたらYesを選びます。

`GH_BROWSER=echo` は認証先URLを表示する指定です。`workflow` は雛形に含まれる `.github/workflows/` を自分のGitHubへ送るために使います。ログイン後は次を実行します。

```bash
gh auth setup-git --hostname github.com
gh auth status --hostname github.com
gh api user --jq .login
```

最後に自分のGitHubユーザー名が表示されることを確認します。自分のPCでは、すでに設定した認証を使って構いません。

### 2. 保存先を用意する

学校ではホームディレクトリ内の自分の学籍番号フォルダを使います。まだ用意していない場合は、`YOUR_STUDENT_ID` を自分の学籍番号に置き換えて実行します。

```bash
mkdir -p ~/YOUR_STUDENT_ID
cd ~/YOUR_STUDENT_ID
pwd
```

自分のPCでは、普段使っている開発用フォルダをVisual Studio Codeで開きます。どちらの場合も、ここは制作フォルダを置くための親フォルダです。`react-next-portfolio` 自体は次のcloneで作ります。

GitHubの作成画面で、自分のアカウントに `react-next-portfolio` というPublicリポジトリを作ります。README、`.gitignore`、Licenseは追加せず、空の状態で作成します。すでに自分の制作物を保存したリポジトリがある場合は、[別のPCで再開する](#another-pc)へ進みます。

### 3. 配布元から初めて取得する

この手順は、ポートフォリオを初めて作るときに1回だけ実行します。同名のフォルダがある場合は中身を確認してください。自分の制作途中のファイルがあれば、そのフォルダから[作業を再開](#resume)します。

```bash
git clone --single-branch --branch master https://github.com/wangchangdog/react-next-portfolio-2026.git react-next-portfolio
cd react-next-portfolio
git remote rename origin course
git switch -c main
```

`master` は配布元のブランチ、ここで作る `main` は自分の制作ブランチです。配布元を `course` という名前に変更して、自分の保存先と区別します。

`YOUR_GITHUB_NAME` を自分のGitHubユーザー名に置き換え、自分の保存先を追加します。

```bash
git remote add origin https://github.com/YOUR_GITHUB_NAME/react-next-portfolio.git
git remote -v
git branch --show-current
```

次の対応を確認できれば設定は完了です。

| 確認項目 | 表示される内容 |
| --- | --- |
| `origin` | 自分の `react-next-portfolio` のURL |
| `course` | `wangchangdog/react-next-portfolio-2026` のURL |
| 現在のブランチ | `main` |

途中から設定を再開するときは、すでにあるremoteやブランチを追加し直さず、`git remote -v` と `git branch --show-current` の結果から未完了の操作を確認します。

Visual Studio Codeで作成された `react-next-portfolio` を開き直し、ターミナルを開きます。以後のコマンドは、この制作フォルダで実行します。`curriculum/edition.json` を開き、教材版が `textbook-walkthrough-2026-09-06` であることも確認します。

### 4. コミットの作成者を設定する

次の引用符内を自分の情報に置き換えます。メールアドレスはGitHubで登録しているもの、またはGitHubのメール設定に表示される自分のnoreplyアドレスを使います。

```bash
git config --local user.name "自分の氏名"
git config --local user.email "自分のメールアドレス"
git config --local --get user.name
git config --local --get user.email
```

氏名とメールアドレスが自分のものなら完了です。図鑑のリポジトリで行った設定は、このリポジトリには引き継がれません。新しいPCへcloneしたときも設定します。

### 5. 依存関係を導入して起動する

```bash
pwd
ls package.json
node -v
npm -v
```

`node -v` が `v24.` で始まることを確認します。続いて次を実行します。

```bash
npm install
npm run dev
```

配布元には `package-lock.json` がないため、初回は `npm install` を使います。このコマンドで生成された `package-lock.json` は、T05の変更と一緒に自分のGitHubへ保存します。

起動したら、ターミナルに表示されたURLをブラウザで開きます。通常は <http://localhost:3000> ですが、別の番号なら表示されたURLを使います。T05とT06は環境変数なしで動きます。

### 初回準備の完了チェック

- [ ] `origin`は自分、`course`は配布元のURLで、現在のブランチが`main`になっている。
- [ ] `--local --get`で確認したコミットの氏名・メールアドレスが自分のものになっている。
- [ ] 開発サーバーのURLで、TOP・プロフィール・作品・ブログを開ける。

確認できたら[第5回のNotion](https://app.notion.com/p/33f24b6a67ce819281c0e4c6f83c04e9)のT05-2へ進みます。T05全体の[完了チェック](TEXTBOOK.md#t05の完了チェック)は、プロフィールの変更とGitHubへの保存まで終えてから使います。チェック状況は自分のメモに記録します。

<a id="resume"></a>

## 作業を再開する

### 同じPCで続きをする

共有Macでは上のGitHubログインを済ませ、自分の `react-next-portfolio` をVisual Studio Codeで開きます。

```bash
pwd
ls package.json
git remote -v
git branch --show-current
git status
node -v
```

自分の保存先、`main`、前回の変更内容、Node.js 24系を確認します。同じPCで依存関係が変わっていなければ、次だけで起動できます。

```bash
npm run dev
```

別のPCやGitHubのWeb画面で保存した変更を取り込む必要がある場合は、まず `git status` で手元の変更を確認します。未コミットの変更があれば、[保存手順](#save)のコミットまでを行い、PC内の履歴に残します。GitHubへのpushは、変更を取り込んで確認した後に行います。

```bash
git pull --ff-only origin main
```

このコマンドは自分のGitHubから続きを取得します。手元とGitHubの両方に別々のコミットがあり、`--ff-only` で停止した場合は、表示内容と履歴を確認して相談します。作業フォルダの削除や強制更新は行いません。取得後に依存関係が変わった場合は、次の表に従って導入します。

<a id="another-pc"></a>

### 別のPCで自分の制作物を取得する

自分のコードをすでにGitHubへ保存している場合は、自分のリポジトリを取得します。`YOUR_GITHUB_NAME` を置き換え、制作フォルダを置く親フォルダで実行します。

```bash
git clone --branch main https://github.com/YOUR_GITHUB_NAME/react-next-portfolio.git react-next-portfolio
cd react-next-portfolio
git remote -v
git branch --show-current
```

`origin` が自分、ブランチが `main` であることを確認します。これは保存済みの制作物なので、remoteの名前変更や `main` の新規作成は不要です。`course` はclone先へ引き継がれませんが、日々の作業には `origin` があれば進められます。

Visual Studio Codeで制作フォルダを開き、[コミットの作成者](#4-コミットの作成者を設定する)を設定します。保存済みの `package-lock.json` がある場合は、次を実行します。

```bash
npm ci
npm run dev
```

`npm ci` は保存された依存関係を導入するコマンドです。`package-lock.json` がなければ `npm install` を使い、生成されたファイルを自分のGitHubへ保存します。

T08以降は `.env.local` もこのPCで用意します。このファイルはGitHubに保存しないため、cloneでは取得されません。[microCMSの設定](#cms)に従って自分のサービスIDとキーを設定します。

### インストールが必要か判断する

| 状況 | 実行するコマンド |
| --- | --- |
| 配布元から初めて取得し、`package-lock.json` がない | `npm install` |
| 自分の保存済みコードを別のPCへ取得し、`package-lock.json` がある | `npm ci` |
| 保存済みの `package.json` と `package-lock.json` の更新を取り込んだ | `npm ci` |
| 同じPCでコード、文章、CSSだけを編集する | インストールは不要。`npm run dev` で再開 |
| 自分で依存パッケージを追加・変更する | 変更目的を確認して `npm install` を使い、両ファイルを保存 |

`npm ci` がpackage.jsonとlockfileの不一致で止まった場合は、両方が同じ変更として保存されているか確認します。解決のためにlockfileを削除したり、バージョン指定を一律に最新へ変えたりする必要はありません。[npmの公式説明](https://docs.npmjs.com/cli/v11/commands/npm-ci/)でも条件を確認できます。

<a id="save"></a>

## 作業をGitHubへ保存する

ファイルの保存、コミット、pushの順に行います。ファイルを保存するとPC内の内容が更新され、コミットするとその変更が履歴に残り、pushすると履歴がGitHubへ送られます。

### 1. 動作と差分を確認する

画面確認後、開発サーバーをCtrl+Cで止め、制作フォルダで次を実行します。

```bash
npm run check
git diff
git status
```

`npm run check` はLint、TypeScriptの型検査、本番ビルドを順に行います。通常はこの一つで確認できます。エラーを調べるときにだけ、`npm run lint`、`npm run typecheck`、`npm run build` を個別に使います。

T08以降は、次も確認します。

```bash
git ls-files .env.local
git check-ignore .env.local
```

最初に何も表示されず、二つ目に `.env.local` と表示されれば、設定ファイルはGitの保存対象から除外されています。`git ls-files` に表示された場合はpushせず、共通ルーティーンの環境変数の手順を確認します。

### 2. 保存するファイルを選ぶ

Visual Studio Codeの「ソース管理」を開き、変更した各ファイルの差分を読みます。保存するファイルの右にある「＋」を押すと、次のコミットへ含める変更として選択されます。新しく作った画像やコンポーネント、初回に生成された `package-lock.json` も忘れずに選びます。

ターミナルから選ぶ場合は `git add` に実際に編集したファイルを指定します。T05でプロフィールを編集し、lockfileが生成された場合の例です。

```bash
git add -- data/profile.ts package-lock.json
```

T09・T10でブログと作品の取得処理を編集した場合は、次のように選びます。

```bash
git add -- lib/posts.ts lib/works.ts
```

これらは作業別の例です。CSSやREADMEなど、ほかに変更したファイルがあれば、そのファイルも選びます。ファイルが存在しないというエラーが出た場合は、`git status` に表示された名前と現在位置を確認します。

### 3. コミットしてpushする

```bash
git diff --cached
git status
```

選んだ差分に意図した変更だけがあることを確認します。秘密情報が含まれていないことも確かめ、次を実行します。コミットメッセージは、実際に変更した内容に置き換えます。

```bash
git commit -m "プロフィールの紹介文を変更"
git push -u origin main
git log -1 --oneline
git status
```

push後、自分のGitHubで `main` を開き、最新コミットと変更したファイルを確認します。`git log -1 --oneline` に出たコミットの短いIDがGitHubの最新コミットと対応していれば、同じ履歴を確認できます。

`nothing to commit` は新しい変更がないという表示です。前回のコミットがGitHubにあるか確認すれば、新しいコミットは不要です。T08でmicroCMSの内容と `.env.local` だけを編集した場合も、Gitに追加する変更がないことがあります。CMSの内容はmicroCMSで公開し、接続確認の結果を進捗報告へ記入します。

作業途中のコードも、秘密情報を除いて保存できます。確認コマンドが失敗している場合は、未解決のエラーをメモに残し、単元の完了チェックは成功を確認してから付けます。公開前は、`npm run check` と画面確認を完了します。

<a id="cms"></a>

## microCMSの接続設定と確認

T08では、microCMSの管理画面に `blogs` と `works` のリスト形式APIを作り、記事2件と作品1件を公開してから接続を確認します。APIの項目と画面操作は、NotionのT08を使います。

### 設定ファイルを作る

Visual Studio Codeで `.env.example` を複製し、`package.json` と同じ場所に `.env.local` を作ります。ターミナルを使う場合は、`.env.local` がまだないことを確認してから、1回だけ次を実行します。

```bash
cp .env.example .env.local
```

すでに `.env.local` がある場合は、必要な値だけを編集します。次はファイルへ書く設定例です。ターミナルでは実行しません。

```dotenv
MICROCMS_SERVICE_DOMAIN=自分のサービスID
MICROCMS_API_KEY=自分のGET専用APIキー
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

日本語の部分を自分の値に置き換えて保存します。サービスIDは `https://` や `.microcms.io` を含めず、IDだけにします。APIキーはGET専用にし、変数名は `MICROCMS_API_KEY` のまま使います。`NEXT_PUBLIC_` を付けるとブラウザへ渡す設定になるため、キーには付けません。

SDKの `microcms-js-sdk` は導入済みです。T08のために追加インストールするコマンドはありません。

### 接続を確認してサーバーを再起動する

開発サーバーを動かしている場合はCtrl+Cで止め、制作フォルダで次を実行します。

```bash
node --env-file=.env.local scripts/check-cms.mjs
```

記事2件、作品1件を公開した場合の表示例です。これは実行結果なので入力しません。

```text
blogs: 接続成功、公開コンテンツ2件
works: 接続成功、公開コンテンツ1件
```

追加の記事や作品がある場合は、その件数が表示されます。両方の接続が成功したら、次でサイトを起動します。

```bash
npm run dev
```

環境変数の変更後は、このように停止してから起動し直します。T08時点の画面はサンプルのままです。T09で一覧、T10で詳細の取得関数を変更すると、登録した内容が表示されます。

<a id="cms-result"></a>

### 接続確認の結果と対処

| 表示・状態 | 確認する箇所 |
| --- | --- |
| `.env.local` が見つからない | 制作フォルダで実行しているか、ファイル名が `.env.local.txt` になっていないか |
| サービスIDとAPIキーを設定するよう表示される | ファイルを保存したか、値が空でないか、サービスIDにURL全体を入れていないか |
| HTTP 401・403 | 自分のサービスのキーか、`blogs` と `works` のGET権限があるか |
| HTTP 404 | サービスIDとエンドポイントの綴りが正しいか。`blogs`・`works` は複数形 |
| 接続成功、公開コンテンツ0件 | コンテンツを下書き保存だけで終えず、公開したか |
| 接続確認は成功するが、T09後の一覧がサンプルのまま | `lib/posts.ts` と `lib/works.ts` を編集・保存したか、別の制作フォルダを起動していないか |
| T09後、CMSの記事の詳細がNot Foundになる | T10で詳細の取得関数まで実装済みか。一覧だけの段階では詳細はまだサンプルを参照する |
| 通信がタイムアウトする | インターネット接続とサービスIDを確認し、再実行する |

キーの値を、ログ、README、チャット、スクリーンショットへ載せる必要はありません。接続確認スクリプトはキーを表示しません。

<a id="publish"></a>

## 第11回の公開と更新

Vercelの初回公開はブラウザで行います。事前にローカルの `npm run check` と一覧・詳細・画像・Not Foundの表示を確認し、[保存手順](#save)で自分のGitHubへpushします。

Vercelへ取り込むのは、自分の `react-next-portfolio` の `main` です。配布元のリポジトリと取り違えないようにします。具体的な画面操作はNotionのT11で確認します。

| 設定・確認項目 | この教材で使う内容 |
| --- | --- |
| Framework Preset | Next.js |
| Root Directory | `package.json` があるリポジトリ直下 |
| Node.js | 24系 |
| Production Branch | 自分の `main` |
| 環境変数 | `MICROCMS_SERVICE_DOMAIN`、`MICROCMS_API_KEY`、`NEXT_PUBLIC_SITE_URL` |
| 公開先 | 自分のプロジェクトの本番URL |

`.env.local` はGitHubへ送らないため、Vercelにも環境変数を設定します。本番URLの確定後、`NEXT_PUBLIC_SITE_URL` をそのURLへ更新して再デプロイします。公開サイトはシークレットウィンドウで開き、ログインなしで見られることを確認します。

変更内容により、反映させる操作が異なります。

| 変更したもの | 反映の操作 | 完了の確認 |
| --- | --- | --- |
| コード、CSS、画像ファイル、README | 自分の `main` へコミット・push | Vercelの対応するデプロイが成功した後、本番URLで変更箇所を確認 |
| Vercelの環境変数 | 保存後に対象プロジェクトを再デプロイ | 再デプロイの成功後、一覧・詳細と本番URLを確認 |
| microCMSの記事・作品・画像 | microCMSで公開 | 一覧と詳細を、それぞれブラウザ全体で再読み込み |
| PCの `.env.local` | 保存後に開発サーバーを再起動 | 接続確認コマンドとローカル画面で確認 |

CMS内容の更新は、現在の教材の `cache: "no-store"` と `dynamic = "force-dynamic"` を使う構成で確認します。CMSを更新するたびにコードのコミットやVercelの再デプロイを行う必要はありません。自分でキャッシュ方式を変更した場合は、その方式に合わせて確認します。

## つまずいた場所から確認する

| 表示・状態 | 最初に確かめること |
| --- | --- |
| `package.json` が見つからない | `pwd` と `ls package.json` で制作フォルダを確認 |
| `next: command not found` | Node.js 24系を使っているか、依存関係の導入が成功したか |
| `destination path ... already exists` | 既存フォルダの中身を確認し、制作途中ならそのフォルダで再開 |
| `remote origin already exists` | `git remote -v` で登録済みの保存先を確認 |
| `a branch named 'main' already exists` | `git branch --show-current` で現在のブランチを確認し、作成済みの `main` を使う |
| `Missing script: check` | ポートフォリオのフォルダを開いているか、`package.json` の `scripts` に `check` があるか |
| 起動した画面に変更が出ない | ファイルを保存したか、今開いているURLが起動中の制作物か、ターミナルにエラーがないか |
| pushが認証エラーになる | `gh api user --jq .login` と `git remote -v` で自分のアカウント・保存先を確認 |
| pushが `non-fast-forward` で止まる | GitHub側の変更と手元の履歴を確認。強制pushや作業フォルダの削除をせず相談する |

エラーを相談するときは、最初のエラーメッセージ、実行したコマンド、現在位置、開いたURL、直前に変更したファイルを伝えると、確認箇所を絞れます。

## 共有Macで作業を終える

GitHubへの保存と授業報告を済ませ、開発サーバーをCtrl+Cで止めます。`YOUR_GITHUB_NAME` を自分のユーザー名へ置き換え、ログアウトします。

```bash
gh auth logout --hostname github.com --user YOUR_GITHUB_NAME
gh auth status --hostname github.com
```

自分のアカウントが表示されないことを確認します。他のアカウントがなければ未ログインとなり、その場合は終了コードが0でなくても正常です。

GitHub、Google、Notion、microCMS、Vercelなど、使ったWebサービスからもログアウトし、ゲストまたはシークレットのウィンドウをすべて閉じます。共有Macでは次でクリップボードを空にし、Visual Studio Codeとターミナルを終了します。

```bash
printf '' | pbcopy
```

次回の開始位置は「T09のブログ一覧まで確認。次は作品一覧」のように残します。練習用microCMSキーの保存方法は、授業の共通ルーティーンに従います。

## 操作仕様の参照先

- [GitHub CLIのログイン](https://cli.github.com/manual/gh_auth_login)
- [GitHub CLIとGitの認証連携](https://cli.github.com/manual/gh_auth_setup-git)
- [Gitのpullとfast-forward](https://git-scm.com/docs/git-pull)
- [npm ciの前提条件](https://docs.npmjs.com/cli/v11/commands/npm-ci/)
- [Next.jsの環境変数](https://nextjs.org/docs/app/guides/environment-variables)

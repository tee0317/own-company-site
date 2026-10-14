---
updated: 2026-10-13
status: implementation
owner: Codex
---
# 紅茶HPの運用

## 確認中の版
ローカル branch `codex/tea-site`。GitHub Pagesは本人の完成画面確認まで停止。
`npm run verify` は送信制御・公開条件の検査、型検査、公開記事検査、ビルドを実行。
JSON-LDの構文・型・記事の著者参照・日時・パンくずも検査する。`npm run test:queue`は隔離したGitでの予約公開を検査し、本番へ送信しない。

## GAS
`gas/Code.gs`、`gas/Form.html`、`gas/appsscript.json`を本人アカウントの専用プロジェクトに保存。
スクリプトプロパティ `CONTACT_RECIPIENT` に指定された受信先を設定。宛先をコード・文書・GitHubへ書かない。
実行者は本人、利用者は全員。本人がメール送信のGoogle承認を行う。
公開URLをローカル環境とGitHubの変数 `PUBLIC_GAS_FORM_URL` に設定。
Chromeの未ログイン状態とSafariでフォームを開き、個人／団体の表示、必須項目、送信失敗、正常完了を確認する。
正常送信テストの管理者受信を確認する。受信メールは対応に必要な期間管理し、不要なメールを削除。
日別・種別別の件数は `counts:YYYY-MM-DD`。送信完了の閲覧を件数にしない。
署名キーは初回受付時に生成。受付状態のみ24時間後の次回処理で掃除。問い合わせ本文は保存しない。

## 計測・検索
Cloudflare Web Analyticsにドメインを追加し、発行されたトークンを `PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN` に設定。
Search ConsoleはURLプレフィックス `https://tsdsystem.tokyo/`。Googleが発行した確認HTMLを public/ に置く。
公開後に所有権を確認し、`https://tsdsystem.tokyo/sitemap.xml` を送信。

## 記事の予約
未公開原稿と承認記録は公開リポジトリ外の専用フォルダに置く。
`TEA_PRIVATE_QUEUE` をそのフォルダに指定。記事は `{slug}.md`。
本人の内容確認後、同じ全文のSHA256、approved:true、reviewedAtを `{slug}.approval.json` に記録。
記事のpublishedAt、updatedAtには日本時間のオフセット `+09:00` を付け、日時をダブルクォートで囲む。
`site-approval.json` のreviewedAt、remote、publicationEnabledはサイト本人確認と再公開後にだけ設定する。
remoteは `https://github.com/tee0317/own-company-site.git`。
`npm run publish:queue` は確認のみ。`npm run publish:queue -- --apply` が承認・時刻・汚れのないmainを検査してビルド後にcommit/push。
適用時は承認されたorigin/push先を照合し、最新mainをfetchしてから同期を確かめる。
同じ記事は再投稿しない。内容相違、失敗、未同期main、ロック残存時は停止してCodexが確認。
画像は記事反映前に権利・内容を確認し最適化する。テーマ・一覧・サイトマップはビルド時に生成。
毎時のCodex定期実行は再公開後に有効化。端末停止中は次の実行時に期限を過ぎた記事を処理。

## 2026-10-14 本人の公開指示（従来の公開待ち手順より優先）

- GitHub Pagesで全ページを先にオンライン化し、その後に配置・トンマナ、最後に全写真を無料素材へ差し替える。参照はKUSMI TEA。
- 今回の再公開は本人承認済み。閲覧計測は未設定でも先に公開し、プライバシー表示は実際の計測状態に合わせる。計測必須の検査は `npm run release:check -- --require-analytics`。
- フォーム・公開内容・構造化データの検査は維持。記事の自動公開は今回の依頼に含めず、停止状態を保つ。

## 再公開（従来の標準手順）
1. 本人がプレビューを確認。承認したコミットをmainへ反映する。
2. フォーム実送信、計測設定、Search Console確認ファイル、スマホ検査を完了する。
3. GitHub Pagesの独自ドメイン・CNAME・HTTPSを確認する。
4. disabled_manuallyのdeploy.ymlを有効化し、mainを指定して手動実行する。
5. 未ログインの別ブラウザでトップ・物語・記事（存在する場合）・フォームを開く。
6. 旧URLの404、サイトマップ、確認ファイル、計測を確認し、Search Consoleに送信する。
7. 自動投稿を有効化。重大な不具合時はPagesワークフローと自動投稿を停止。

## 写真
トップ：Deepal Tamang / Unsplash（実写）。写真はカフェインレスの実物商品を示すものではない。
https://unsplash.com/photos/pouring-tea-into-a-glass-cup-etEgw9fExWk
利用条件：https://unsplash.com/license
物語：本人のGoogleフォトから提供された紅茶の写真。位置情報を含む撮影メタデータは除去。
人物：既存サイトの本人写真。架空の体験談・お客様の声は掲載しない。

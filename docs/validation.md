---
updated: 2026-10-13
status: verified_preview
owner: Codex
---
# 確認用サイトの検証

- npm run verify：基本検査8件、型検査、ビルド、公開HTML・サイトマップ検査が通過。
- npm run test:articles：隔離した一時フォルダの3テーマ記事で、記事・テーマ入口・おすすめ・著者・関連記事・サイトマップを確認。
- npm audit：0件。Astroは互換範囲内で7.3.7へ更新。
- 公開用トップのスマホLighthouse：Performance / Accessibility / Best Practices / SEO = 100 / 100 / 100 / 100。
- Chrome：トップ・物語・作り手・知恵袋・問い合わせ・プライバシーに自動アクセシビリティ指摘なし。
- 390px幅と200% zoomで横はみ出しなし。画像の読み込み成功を確認。
- 旧products/company/events/step-drill-basicsはローカル公開用出力でHTTP404。
- 未ログインChromeから団体フォーム送信1件。正常完了と指定管理者INBOXへの到着を確認。
- 受信先・旧リンクがsrc/publicに残っていないことを確認。
- Search Console確認HTMLは取得・配置済み。HTML所有権確認とサイトマップ送信は再公開後。
- 毎時Codex予約確認は作成済みPAUSED。非公開キューのsite-approvalは未承認・公開無効。

## 公開前に残ること

- Cloudflare本人ログイン後のトークン設定と計測確認。
- Safari実機とGoogleリッチリザルトテスト。
- 本人による完成画面確認。
- npm run release:checkは計測未設定を検知して停止。公開可能と判定していない。
- mainへの反映、GitHub Pagesの再有効化・配置、未ログイン別ブラウザで実ドメイン確認。

## Gemini指摘への再確認（10/12〜13）

- GAS v3へ更新済み。未ログインで不正な種別を通常の種別へ戻す表示、同意なしの送信阻止、紅茶の正常送信と管理者INBOXへの到着を確認。
- 異常データ・罠・署名・期限・リンク・長さ・送信上限・重複は単体検査。実サービスで全失敗経路を検証したとは扱わない。
- Googleリッチリザルトテスト：隔離テスト記事の生成HTMLで記事1件とパンくず1件が有効。通常10ページとテスト3記事のJSON-LD自動検査を追加し通過。
- 文字サイズをremへ変更、メニュー折り返しを改善。Chromeスマホ設定でトップ・物語への表示を確認。OS文字設定・iPhone実機は未確認。
- Mac Safariはページ描画を確認できず未合格。初回のin-app画面写真は切れていたため採用せず、Chromeで撮り直し。
- 予約公開前にoriginとpush先の一致、最新fetchとmainの同期を検査。隔離したGitで古い状態の停止、ビルド、ローカルbareへのpush、二重投稿防止を確認。GitHub本番と定期実行からの通し検証は未実施。
- 通常verify、記事入り隔離検査、予約公開隔離検査を通過。Lighthouseの100点は10/8の測定であり、今回の修正後の測定ではない。
- Cloudflareの具体的Google認証は自動承認に拒否され、本人へ許可を質問中。計測未設定でrelease:checkが停止することを再確認。
- HPの再公開、mainへの反映、リモートpush、自動投稿の有効化は行っていない。

---
updated: 2026-10-08
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

- GASの種別・同意の厳密検査を含む最終修正版のデプロイ更新。
- Cloudflare本人ログイン後のトークン設定と計測確認。
- Safari実機とGoogleリッチリザルトテスト。
- 本人による完成画面確認。
- npm run release:checkは計測未設定を検知して停止。公開可能と判定していない。
- mainへの反映、GitHub Pagesの再有効化・配置、未ログイン別ブラウザで実ドメイン確認。

ブラウザ操作の自動承認確認が2回時間切れになり、最終デプロイ更新を未完了として保存。

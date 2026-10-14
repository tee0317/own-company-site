---
updated: 2026-10-15
status: passed
owner: codex
---
# シーン導線・読みもの回遊の改修QA

## 対象と証拠
- 本人指定：EN TEA https://brand.en-tea.com/ 、Uf-fu https://www.uffu.net/ 。文章と写真は複製せず、写真主導・短い紹介・読み進める順序を既存ブランドに応用。
- source visual truth: /Users/test/Documents/Codex/tea-refactor-20261015/en-tea-first.png（1839×1109）、uffu-cards.png（1849×1059）。Chrome実画面。
- implementation: 同フォルダのhome-first.jpg（1440×1000）、journal-desktop.jpg（1440×1050）、scenes-desktop.jpg（1440×1000）、home-mobile.jpg（390×844）。CSS幅1440/390、DPR1。
- full-view: home-desktop-full.jpg（1440×7243）、home-overview.jpg（左→中央→右に続く縮小）。写真9枠の読込後に撮影。
- combined comparison: reference-comparison.jpg。原画像を各パネル幅へ等比縮小し、参考・実装を同じ画像で比較。別サイトの構成を応用する依頼のため、文字・ロゴ・ページのピクセル一致は対象外。
- focused comparison: journal-desktop.jpgで写真比率、文章量、日付・リンクの基準線、home-mobile.jpgで正式名称・折返し・主ボタンを拡大確認。
- 初回の画像読込前・倍率67%の撮影は不採用。最終版は標準倍率で寸法を確認し、読込済みの全画面写真を正本にした。

## 改善と再比較
- [P1 修正] 読みもの0本で回遊が途切れていた。本人のコラム提示依頼に合わせ、公式資料を確認した3本を追加。実体験・商品試験として書かず、各記事に確認範囲と出典を明示。
- [P2 修正] 困りごとの分類だけだった入口を、夜・仕事の合間・家族との休日の写真カードに変更。リンク先には対応する案内文と記事リンクを配置。
- [P2 修正] 物語から読みものまで遠かった。トップの物語直後、および物語ページの本文直後に3枚のカードを配置。
- [P2 修正] 最初の390px表示で主ボタン下端960.6px。写真の高さと表示順を変更し、再撮影で770.2px、844px画面内へ修正。
- typography: 明朝の見出し・システム本文18px、行間1.8〜1.95。記事見出し上限42pxへ整理し、長い見出しを確認。
- spacing/layout: 58:42の導入、物語の非対称グリッド、3枚のコラムと縦長シーン写真。スマホは1列。全体7243pxで情報の間に余白を確保。
- colors/tokens: 生成り・セージ・深緑を継承。CTAは丸みのある輪郭、白地と深緑の2種。ホバー・キーボードフォーカスを維持。
- image quality: 利用条件を確認済みのUnsplash5点を継続。写真9枠の焦点・読み込みを確認。素材写真をカフェインレス商品の実物や作り手の肖像と説明しない。
- copy/content: 正式名称へ統一。h1の中に「カフェインレス紅茶」を通常表示。サイトの役割を明文化。母の確定物語6段落は改修前と一致。

## 動作・検索
- 12ページ×320/390/1440px＝36表示。横はみ出し0、h1各1、本文18px。
- 主ボタン→シーン、夜のカード→対応案内→実記事、物語・記事一覧・関連記事をブラウザで確認。公開用HTMLの263内部リンク・画像altと寸法・サイトマップ検査通過。
- 既存8検査、型検査、ビルド、公開内容、13ページのJSON-LD（記事3本）、記事入り隔離検査、release:check通過。
- title・description・canonical・OGP、著者と日時を持つBlogPostingを維持。choose/brewを検索対象へ、記事0本のenjoyとprivacyは引き続き検索対象外。
- GASと宛先設定は今回変更なし。メール実送信は今回行っていない。計測は未設定、自動投稿は停止を維持。
- Chromeの公開用画面でコンソールエラーなし。iPhone/Safari実機、OS文字サイズ、新しいLighthouse測定は未実施。

final result: passed

# typing-game

ブラウザだけで遊べるシンプルなタイピングゲーム。1文字ごとに判定し、正誤で色分け＆効果音を鳴らす。

## 仕様
- 文章：`dummyQuotes` からランダム選択（API版は `GetRandomWord` のコメントを外す）
- 判定：入力ごとに span を比較し、`correct`/`incorrect` クラス付与＋音声
- タイマー：`originalTime = 20` 秒。0 になったら自動で次の文章へ

## 使い方メモ
1. `index.html` をブラウザで開く（ローカルサーバーなら `python -m http.server 8000`）。
2. テキストエリアにフォーカスして打つだけ。タイプ音／ミス音／成功音が鳴る。

## 調整
- タイマー変更：`script.js` の `originalTime`
- 出典切替：`GetRandomWord` の API 部分を有効化する/ダミーを増やす

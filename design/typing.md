# タイピングゲーム（typing）設計書

## 概要

ローマ字入力によるタイピング速度を競うゲーム。
全員が同時にプレイし、終了後にルームに入室している全員のスコアを
ランキング表示する。**PC 専用**（キーボード入力前提）。

## ルーティング

ベースパス: `/typing`、Socket.IO namespace: `/tp`

| パス                  | 役割                  | View                          |
| --------------------- | --------------------- | ----------------------------- |
| `/group/group`        | グループ作成（ホスト）| `typing/group/group.ejs`      |
| `/group/groupComplete`| グループ作成完了      | `typing/group/groupComplete.ejs` |
| `/group/name`         | ニックネーム入力      | `typing/group/name.ejs`       |
| `/group/qr`           | 参加用 QR             | `typing/group/qr.ejs`         |
| `/group/rule`         | ルール説明            | `typing/group/rule.ejs`       |
| `/group/wait`         | 待機（全員揃うまで）  | `typing/group/wait.ejs`       |
| `/game/typing`        | タイピング本編        | `typing/game/typing.ejs`      |
| `/game/ranking`       | スコアランキング      | `typing/game/ranking.ejs`     |
| `/game/gameEnd`       | ゲーム終了            | `typing/game/gameEnd.ejs`     |

## 画面フロー

```
group → name → qr → rule → wait
                              ↓
                          (全員入室)
                              ↓
                           typing
                              ↓
                          (120秒終了)
                              ↓
                          ranking
                              ↓
                       (全員結果送信完了)
                              ↓
                           gameEnd
```

## ゲームルール

- 制限時間 120 秒（`time_limit = 120`）。開始前に 3 秒のレディタイマー。
- 38 個の和文を `wordlist`（ローマ字）と `wordlistJapanese`（仮名）でペアで保持。
  ランダムに 1 文を表示し、頭から 1 文字ずつ正しくキー入力すると赤色でハイライト。
- スコア計算式: `score = floor(correct * (correct / (correct + mistake)))`
  （正解数 × 正解率）。
- 文章を打ち終わると次の文章をランダムに表示。
- 制限時間到達 → `sessionStorage.score` に保存し `ranking` ページへ遷移。

## Socket.IO イベント

namespace: `/tp`、コントローラ: `src/controller/typing/tpController.js`

| 種別              | イベント名         | 概要                                                   |
| ----------------- | ------------------ | ------------------------------------------------------ |
| C → S             | `requestRanking`   | 自分のスコアを送信、現在のランキングを取得           |
| S → C (broadcast) | `displayRanking`   | DB から取得した全スコアを降順で全員に配信             |
| C → S             | `requestGameEnd`   | 自部屋の人数 = 入室人数になっていれば終了通知を要求    |
| S → C (broadcast) | `toGameEnd`        | 全員のスコア登録完了 → ゲーム終了画面へ                |
| C → S             | `deleteData`       | ルームから抜ける、またはデータ削除トリガ              |
| S → C (broadcast) | `deletedGameData`  | データ削除完了通知                                     |

加えて `roomController` / `userController` 共通イベント。

## サーバ処理

### `requestRanking`
1. `user.find(nickname)` でユーザ ID を解決。
2. `typing.isScore({userId, roomId})` で同ユーザの既登録チェック。
3. 未登録なら `typing.add({score, userId, roomId})` で INSERT。
4. `typing.all()` で全スコアを `ORDER BY score DESC` で取得。
5. `displayRanking` を全クライアントへブロードキャスト。

### `requestGameEnd`
- `typing.count()` 全件数 == `limitPerRoom` のとき `toGameEnd` をブロードキャスト。
  ※ `count()` はテーブル全体を見るため、複数ルーム同時実行を想定していない。

### `deleteData`
- `socket.leave(entryRoomName)` でルーム退出、`deletedGameData` を返す。

## クライアント処理

主要 JS: `public/js/typing/`

- `typing.js` –
  - `window.onload` で `ready()` → 3 秒カウントダウン後 `gameStart()`。
  - `document.onkeydown` で keyCode を文字列化し、現在文字 `word_char` と比較。
    一致なら正解音 + 進捗ハイライト、不一致ならミス音 + ミス数加算。
  - 終了時に `score` をセッション保存 → `./ranking` へ遷移。
- `ranking.js` –
  - ロード時に `requestRanking` 送信、`displayRanking` でリスト描画。
  - 続けて `requestGameEnd` を投げ、`toGameEnd` 受信で `gameEnd` 画面へ遷移。
- `clientWait.js`, `groupComp.js`, `generateUrl.js` – 共通グルーピング用ユーティリティ。

### セッションストレージ

| キー            | 用途                            |
| --------------- | ------------------------------- |
| `roomId`        | 入室中の部屋 ID                 |
| `nickName`      | 自分のニックネーム              |
| `limitPerRoom`  | 1部屋の人数上限                 |
| `score`         | タイピング結果スコア            |

## 利用テーブル

- `room`
- `user`
- `typing` – `id`, `score`, `user_id`, `room_id`

## キー入力の特殊ハンドリング

- `keyCode 189` → `-`、`keyCode 188` → `,` として扱う。
- それ以外は `String.fromCharCode(e.keyCode).toLowerCase()` で文字化。
- IME 変換は使用不可（`<rule>` で明示）。
- 効果音用 audio 要素 `correctaudio` / `missaudio` を画面に配置（DOM 直接参照）。

## 注意・既知の制限

- **`typing.count()` がグローバル件数**を見るため、`limitPerRoom` との比較ロジックは
  実質的に複数部屋同時運用には未対応。
- 順番制ゲームではないため `order_pattern` テーブルは使用しない。
- `typing.delete()` モデル関数は実装済みだが、現状コントローラからは呼ばれていない。

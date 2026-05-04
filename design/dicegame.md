# サイコロ自己紹介（dicegame）設計書

## 概要

ランダムに表示される質問に順番に答えていく自己紹介系アイスブレイクゲーム。
出身地・好きな食べ物・趣味などのお題がサイコロ的にランダムで割り振られ、
順番が回ってきたユーザだけが発表画面に遷移して回答を行う。

## ルーティング

ベースパス: `/dicegame`、Socket.IO namespace: `/dg`

| パス                       | 役割                          | View                                |
| -------------------------- | ----------------------------- | ----------------------------------- |
| `/group/group`             | グループ作成（ホスト）        | `dicegame/group/group.ejs`          |
| `/group/groupComplete`     | グループ作成完了              | `dicegame/group/groupComplete.ejs`  |
| `/group/name`              | ニックネーム入力              | `dicegame/group/name.ejs`           |
| `/group/qr`                | 参加用 QR コード表示          | `dicegame/group/qr.ejs`             |
| `/group/rule`              | ルール説明                    | `dicegame/group/rule.ejs`           |
| `/group/wait`              | 全員揃うまでの待機            | `dicegame/group/wait.ejs`           |
| `/game/announce`           | 自分の番（発表画面）          | `dicegame/game/announce.ejs`        |
| `/game/taskComplete`       | 他の人の発表中・順番待ち      | `dicegame/game/taskComplete.ejs`    |
| `/game/gameEnd`            | ゲーム終了                    | `dicegame/game/gameEnd.ejs`         |

## 画面フロー

```
group → name → qr → rule
                     ↓
                 (全員入室)
                     ↓
                   wait
                     ↓
            ┌────────┴────────┐
            ↓                 ↓
   taskComplete (順番待ち) ⇄ announce (自分の番)
            └────────┬────────┘
                (全員終了)
                     ↓
                 gameEnd
```

- 起動時は全員 `taskComplete`。
- サーバが「次の順番パターン」をブロードキャストし、自分のセッションに保存された
  `orderPattern` と一致するクライアントだけが `announce` に遷移する。
- 発表者が「次の人へ」を押すと、自分は `taskComplete` に戻り、サーバが順番を次に進める。
- 順番キューが空になると全員 `gameEnd` に遷移。

## Socket.IO イベント

namespace: `/dg`、コントローラ: `src/controller/dicegame/dgController.js`

| 種別             | イベント名             | 送信元   | 概要                                                       |
| ---------------- | ---------------------- | -------- | ---------------------------------------------------------- |
| C → S            | `requestOrderPattern`  | client   | 自分用の順番パターン（ランダム文字列）の発行をリクエスト  |
| S → C (to id)    | `sendOrderPattern`     | server   | 発行した順番パターンを当該クライアントへ返却              |
| C → S            | `order`                | client   | 自分の発表が終わったので次の順番に進めるよう要求          |
| S → C (broadcast)| `changeOrder`          | server   | 次の発表者の順番パターンを全員に通知                       |
| S → C (broadcast)| `gameEnd`              | server   | キューが空になったのでゲーム終了                           |

共通の `roomController` / `userController` のイベント（`create_room`, `join_game`, `roomInfo`,
`waiting`, `user_exists`）も使用する。

## サーバ処理

### `requestOrderPattern`
1. `randomPattern()` で 15 文字のランダム文字列を生成。
2. `user.find(nickname)` でユーザ ID を取得。
3. `order.add({roomId, userId, random})` で `order_pattern` テーブルへ `flg = 0` で INSERT。
4. リクエスト元のソケットにのみ `sendOrderPattern` を返す。

### `order`（次の順番へ）
1. `data.flg === "answered"` のときだけ処理（誤発火防止）。
2. `order.first(roomId)` で `flg = 0` のうち最古のレコードを取得。
3. レコードがあれば `order.flgUpdate(id)` で `flg = 1` にし、`changeOrder` で順番パターンを全員にブロードキャスト。
4. レコードが無ければ `gameEnd` をブロードキャスト。

## クライアント処理

主要 JS: `public/js/DiceGame/`

- `clientWait.js` – 待機画面の入室人数監視（共通 `wait()`）。
- `taskComplete.js` – 起動時に `change()` で順番パターンを要求 → セッション保存。
  `changeOrder` 受信時は自分の `orderPattern` と一致するなら `announce.ejs` に遷移。
  `gameEnd` 受信時は `gameEnd.ejs` に遷移。
- `game.js`（announce 用） – 6 種類の質問配列からランダム表示し、30 秒のカウントダウン。
  「紹介したよ！」モーダル → 「次の人へ」で `sendOrder()` が `order` を emit。
- `groupComp.js`, `generateQR.js` – 共通グルーピング用ユーティリティ。

### セッションストレージ

| キー            | 用途                                |
| --------------- | ----------------------------------- |
| `roomId`        | 入室中の部屋 ID                     |
| `nickName`      | 自分のニックネーム                  |
| `roomCount`     | 部屋数                              |
| `limitPerRoom`  | 1部屋の人数上限                     |
| `orderPattern`  | 自分に割り当てられた順番パターン   |
| `flg`           | `"answered"` で回答完了状態を管理   |

## 利用テーブル

- `room`         – 部屋情報（共通）
- `user`         – 参加ユーザ（共通）
- `order_pattern` – 順番管理（roomId, userId, order_pattern, flg）

## お題（質問配列）

`public/js/DiceGame/game.js` 内に以下を定義（クライアント側で `Math.floor(Math.random() * 5) + 1` で選択）。

1. 出身地はどこですか？
2. 好きな食べ物はなんですか？
3. 好きな動物はなんですか？
4. 趣味はなんですか？
5. 好きな音楽はなんですか？
6. 好きなスポーツはなんですか？

## 制限・注意事項

- 1 ユーザあたりの発表時間は 30 秒のカウントダウン UI（強制遷移はしない）。
- 順番パターンは単純なランダム文字列で、衝突は実用上無視している。
- `data.flg !== "answered"` の状態で `requestOrderPattern` が発火することを前提に重複登録を防いでいる。

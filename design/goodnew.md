# Good&New（goodnew）設計書

## 概要

Good&New は「最近あった良かったこと・新しいこと」を順番に発表していく
アイスブレイクゲーム。サイコロ自己紹介と同じ「順番制発表型」フローを採用しており、
お題提示の代わりに自由な発言を行う点が異なる。

少人数モードのワークフローについては `design/goodnew_few.md` も参照。

## ルーティング

ベースパス: `/goodnew`、Socket.IO namespace: `/gn`

| パス                          | 役割                          | View                                    |
| ----------------------------- | ----------------------------- | --------------------------------------- |
| `/group/setting`              | 部屋設定                      | `group/setting.ejs`（共通グループ）     |
| `/group/setting_complete`     | 部屋設定完了                  | `group/setting_complete.ejs`            |
| `/group/name_entry`           | ニックネーム入力              | `group/name_entry.ejs`                  |
| `/group/qr_code_display`      | 参加用 QR コード表示          | `group/qr_code_display.ejs`             |
| `/group/game_rule_description`| ルール説明                    | `group/game_rule_description.ejs`       |
| `/group/creating_group`       | グループ作成中                | `group/creating_group.ejs`              |
| `/game/announce`              | 自分の番（発表画面）          | `goodnew/game/announce.ejs`             |
| `/game/taskComplete`          | 順番待ち                      | `goodnew/game/taskComplete.ejs`         |
| `/game/gameEnd`               | ゲーム終了                    | `goodnew/game/gameEnd.ejs`              |

※ Good&New ではグループ画面に `views/group/` 配下の汎用 EJS を用い、
ルータ内で `accessTargetGameName = "goodnew"` を渡している。

## 画面フロー

```
setting → name_entry → qr_code_display → game_rule_description
                                                ↓
                                       creating_group / wait
                                                ↓
                                  ┌─────────────┴─────────────┐
                                  ↓                           ↓
                      taskComplete (順番待ち) ⇄ announce (自分の番)
                                  └─────────────┬─────────────┘
                                                ↓
                                            gameEnd
```

## Socket.IO イベント

namespace: `/gn`、コントローラ: `src/controller/goodNew/gnController.js`

dicegame と完全に同一のイベント体系。

| 種別              | イベント名             | 概要                                       |
| ----------------- | ---------------------- | ------------------------------------------ |
| C → S             | `requestOrderPattern`  | 順番パターンの発行リクエスト              |
| S → C (to id)     | `sendOrderPattern`     | 発行した順番パターンを返却                |
| C → S             | `order`                | 発表完了 → 次の順番へ                      |
| S → C (broadcast) | `changeOrder`          | 次の発表者通知                             |
| S → C (broadcast) | `gameEnd`              | キュー空 → ゲーム終了                      |

加えて `roomController` / `userController` の `create_room`, `join_game`,
`roomInfo`, `waiting`, `user_exists` を共通利用。

## サーバ処理

`gnController.js` は dicegame の `dgController.js` と同じ実装。

1. `requestOrderPattern`: `randomPattern()` で順番パターン生成、`order.add` で DB 登録、
   `sendOrderPattern` を発行元へ送る。
2. `order`: `flg = "answered"` のときのみ `order.first(roomId)` で次の順番を取得、
   `flgUpdate` で消化。残りがあれば `changeOrder`、無ければ `gameEnd` をブロードキャスト。

## クライアント処理

主要 JS: `public/js/goodNew/`

- `clientWait.js` – 待機画面の入室監視。
- `taskComplete.js` – 起動時に順番パターン要求、`changeOrder` で自分の順番なら `announce` へ遷移。
- `game.js`（announce 用） – 30 秒のカウントダウンと「次の人へ」ボタンで `sendOrder()` を呼ぶ。
  dicegame と異なりお題は表示しない（自由発言）。
- `groupComp.js`, `generateQR.js` – 共通グルーピング用ユーティリティ。

### セッションストレージ

dicegame と同様: `roomId`, `nickName`, `roomCount`, `limitPerRoom`, `orderPattern`, `flg`。

## 利用テーブル

- `room`
- `user`
- `order_pattern`

## ルール（画面で説明される内容）

- 各メンバーが「最近あった Good なこと」「New なこと」を一言ずつ発表。
- 発表後は他メンバーが拍手で締める（`taskComplete.ejs` に「拍手を贈りましょう！」表示あり）。

## 補足

- dicegame と完全に同型の実装で、namespace と View・お題提示の有無のみが違う。
- 設計上はコントローラを共通化できるが、現状は別ファイルとして分離されている。
- 少人数用の派生ワークフロー案は `goodnew_few.md` に記載されているが、未実装の項目を含む。

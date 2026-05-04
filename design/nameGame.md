# 名前当てゲーム（namegame）設計書

## 概要

「謎の宇宙人キャラクター」風の 14 種類の画像（`gazou1.png`〜`gazou14.png`）に
プレイヤーが順番に名前をつけ、その後ランダムに表示されるカードを見て
誰が一番早く正しい名前を回答できるかを競う 2 フェーズ構成のゲーム。

## ルーティング

ベースパス: `/namegame`、Socket.IO namespace: `/ng`

| パス                  | 役割                          | View                              |
| --------------------- | ----------------------------- | --------------------------------- |
| `/group/group`        | グループ作成                  | `namegame/group/group.ejs`        |
| `/group/groupComplete`| グループ作成完了              | `namegame/group/groupComplete.ejs`|
| `/group/name`         | ニックネーム入力              | `namegame/group/name.ejs`         |
| `/group/qr`           | 参加用 QR                     | `namegame/group/qr.ejs`           |
| `/group/rule`         | ルール説明                    | `namegame/group/rule.ejs`         |
| `/group/wait`         | 待機（全員揃うまで）          | `namegame/group/wait.ejs`         |
| `/game/banme`         | 自分の番（カードに名前をつける）| `namegame/game/banme.ejs`         |
| `/game/namegame`      | 待機（他の人が名前をつけ中） | `namegame/game/namegame.ejs`      |
| `/game/namaeoboeta`   | 名前確認（覚える時間）       | `namegame/game/namaeoboeta.ejs`   |
| `/game/nameAnswer`    | 回答（カード当て）           | `namegame/game/nameAnswer.ejs`    |
| `/game/correctAnswerer`| 正解者表示                  | `namegame/game/correctAnswerer.ejs`|
| `/game/winner`        | 勝者発表                     | `namegame/game/winner.ejs`        |
| `/game/gameEnd`       | ゲーム終了                   | `namegame/game/gameEnd.ejs`       |

画像アセット: `views/namegame/allstars/gazou1.png` 〜 `gazou14.png`。

## 全体フロー（2 フェーズ）

```
[フェーズ1: 命名フェーズ]
  全員 → namegame (待機)
              ↓ pageFlg = 1
   順番が回ってきた人 → banme (画像を見て名前をつける)
              ↓ 名前を確定
        namaeoboeta (全員で名前を覚える)
              ↓ 全員「大丈夫！」を押す
         次の順番へ … 14枚すべてに名前がつくまで繰り返し

[フェーズ2: 回答フェーズ]
   pageFlg = 2 になった以降
   全員 → nameAnswer (ランダムに 1 枚表示 → 早い者勝ちで名前を入力)
              ↓ 正解者が出る
        correctAnswerer (正解者表示)
              ↓ 全員「次へ」を押す
         次のカードへ … カードが尽きるまで

[終了]
   pageFlg = 0 → winner (獲得カード数で勝者決定) → gameEnd
```

## ページ遷移を司る `pageFlg`

サーバの `order` イベント内で算出され、クライアントの `namegame.js` で受信される。

| pageFlg | 意味                                  | 遷移先                  |
| ------- | ------------------------------------- | ----------------------- |
| 0       | 全 14 枚の回答が終わった              | `winner.ejs`            |
| 1       | 命名フェーズ継続中（順番回し）        | 自分の番なら `banme.ejs`|
| 2       | 回答フェーズ                          | 全員 `nameAnswer.ejs`   |

判定ロジック（`ngController.js > order`）:

```
namedCount   = SELECT COUNT(*) FROM namegame WHERE flg = 0 AND room_id = ?
answeredCount = SELECT COUNT(*) FROM namegame WHERE flg = 1 AND room_id = ?

if  namedCount > answeredCount                    → pageFlg = 2
elif answeredCount === 14                          → pageFlg = 0
elif namedCount != 0 && namedCount < answeredCount → pageFlg = 2
elif namedCount === 0 && namedCount < answeredCount→ pageFlg = 1
```

`flg` の意味:
- `0` = 名前付け済み・未回答カード
- `1` = 既回答カード

## Socket.IO イベント

namespace: `/ng`、コントローラ: `src/controller/namegame/ngController.js`

| 種別              | イベント名             | 概要                                                                 |
| ----------------- | ---------------------- | -------------------------------------------------------------------- |
| C → S             | `requestOrderPattern`  | 順番パターン要求（共通 `requestOrderPattern` コンポーネント経由）   |
| S → C (to id)     | `sendOrderPattern`     | 順番パターン返却                                                    |
| C → S             | `checkImgNumber`       | まだ命名されていない画像番号をリクエスト                             |
| S → C (broadcast) | `setImgNumber`         | 命名対象の画像番号を返却                                             |
| C → S             | `sendChara`            | 命名内容（画像番号 + 名前）を送信して DB 登録                       |
| S → C (broadcast) | `displayCardName`      | 命名されたカード（画像 + 名前）を全員に表示                          |
| C → S             | `nameConfirm`          | 名前確認画面に全員を遷移させるよう要求                              |
| S → C (broadcast) | `toNameConfirmResponse`| `namaeoboeta.ejs` への遷移を全員に指示                              |
| C → S             | `waitInit`             | 確認用待機ルームのカウンタを初期化                                   |
| C → S             | `waitConfirm`          | 自分が「大丈夫」を押した、待機人数 +1                               |
| S → C (broadcast) | `toNameGame`           | 全員が確認 → 次フェーズに遷移                                        |
| C → S             | `order`                | 順番進行・フェーズ遷移をリクエスト                                  |
| S → C (broadcast) | `changeOrder`          | `pageFlg` と次の順番パターンを通知                                  |
| S → C (broadcast) | `gameResult`           | カード残無し → `winner.ejs` へ                                      |
| C → S             | `sendImg`              | 回答用カードのランダム抽選をリクエスト                              |
| S → C (broadcast) | `DisplayImg`           | 抽選されたカード（画像番号 + 正解名）を表示                         |
| C → S             | `checkTheAnswer`       | プレイヤーが入力した名前を提出                                      |
| S → C (broadcast) | `correctAnswerer`      | 正解者の nickName を全員に通知                                      |
| S → C (to id)     | `incorrectAnswer`      | 不正解通知（提出者にのみ送る）                                      |
| C → S             | `isOrder`              | 次の順番が残っているか確認、無ければルーム退出                      |
| S → C (broadcast) | `toGameEnd`            | ゲーム終了画面遷移                                                  |
| C → S             | `ranking`              | 自分が獲得したカード枚数を送信                                      |
| S → C (broadcast) | `displayWinner`        | スコア最大ユーザの nickName を勝者として通知                        |

## サーバ処理（主要なもの）

### `checkImgNumber`
- `namegame.getNamedCharaId(roomId)` で命名済み画像番号一覧取得。
- 1〜14 のランダム整数を未使用になるまで再抽選 → `setImgNumber` で配信。

### `sendChara`
- `user.find` でユーザ ID 解決後、`namegame.add` で `flg = 0` で INSERT。
- `namegame.find(charaId, roomId)` で確認用に再取得し `displayCardName` をブロードキャスト。

### `sendImg`（回答用カード抽選）
- `namegame.random(roomId)` で `flg = 0` のレコードからランダムに 1 件取得。
- `namegame.flgUpdate(id)` で `flg = 1` に更新（重複出題防止）。
- `DisplayImg` で全員に画像番号と正解の `chara_name` を配信。
  - レコードなしの場合は `randomCardNumber: 0, charaName: "空"` でフォールバック。

### `checkTheAnswer`
- `namegame.find(charaId, roomId)` で正解名を取得し、提出された名前と照合。
- 一致 → `correctAnswerer` を全員に配信（早押し勝ち）。
- 不一致 → 提出者のみに `incorrectAnswer`。

### `ranking`
- 自分の獲得枚数（クライアントが `cardCount.js` で計算）を `score` テーブルに `game_id = 1` で登録。
- `score.getNamegame(roomId)` で `score DESC LIMIT 1` を取り、勝者を `displayWinner` で配信。

### `waitConfirm` の同期機構

`waitInit` 時にクロージャ式カウンタ `waitCount = waitCounter()` を生成し、
`waitConfirm` ごとに +1。`countInRoom` と一致したら `toNameGame` をブロードキャスト。
（ただし `waitCount` は `Controller.js` 内で接続ごとに共有される 1 変数のため、
複数ルーム同時運用には未対応の既知の制限がある）。

## クライアント処理

主要 JS: `public/js/nameGame/`

- `namegame.js` – 待機画面のメインロジック。`changeOrder` 受信で `pageFlg` を見て
  `banme` / `nameAnswer` のどちらに遷移するかを判定。`gameResult` で `winner` へ。
- `banme.js` – 自分の番。`checkImgNumber` で画像取得 → 入力確定後に
  `randomCardNumber` / `charaName` をセッション保存し `namaeoboeta` へ遷移、
  `nameConfirm` をサーバへ通知して全員を確認画面へ。
- `namaeoboeta.js` – 名前確認画面。回答者本人だけ `sendChara` を 2 秒遅延で送信し、
  `displayCardName` を受けてキャラ表示。「大丈夫！」で `waitConfirm` 送信、
  全員確認完了 (`toNameGame`) で `namegame.ejs` に戻り次の順番へ。
- `nameAnswer.js` – 回答フェーズ。`sendImg` で出題、入力 → `checkTheAnswer` 提出。
  `correctAnswerer` を受信したら正解者をセッションに保存して `correctAnswerer.ejs` へ。
- `correctAnswerer.js` – 正解者表示画面。「次へ」で `waitConfirm` 送信、
  全員確認後 `toWait()` で待機画面に戻る。
- `winner.js` – 自分のカード獲得数を `getCount()`（`cardCount.js`）で集計し、
  `ranking` を emit。`displayWinner` を受けて表示後 3 秒で `gameEnd` へ遷移。
- `cardCount.js` – クライアントローカルでの自分の獲得カード数の集計用。
- `clientWait.js`, `groupComp.js`, `generateQR.js` – 共通グルーピング用ユーティリティ。

### セッションストレージ

| キー                | 用途                                       | クリアタイミング        |
| ------------------- | ------------------------------------------ | ----------------------- |
| `roomId`            | 入室中の部屋 ID                            | -                       |
| `nickName`          | 自分のニックネーム                         | -                       |
| `roomCount`         | 部屋数                                     | -                       |
| `limitPerRoom`      | 1部屋の人数上限                            | -                       |
| `countInRoom`       | 部屋内の現在人数                           | -                       |
| `orderPattern`      | 自分の順番パターン                         | 順番が来たら都度 remove |
| `randomCardNumber`  | 命名対象の画像番号                         | 待機時に削除（設計）    |
| `charaName`         | 命名した名前                               | 待機時に削除（設計）    |
| `flg`               | `"answered"` 状態フラグ                    | -                       |
| `namedFlg`          | 自分が命名者である印（回答画像出題用）    | -                       |
| `correctAnswerer`   | 直近の正解者ニックネーム                   | -                       |
| `answername`        | 出題されたカードの正解名                   | -                       |
| `answercharaId`     | 出題されたカードの画像番号                 | -                       |
| `token`             | 回答送信時の二重送信防止トークン           | 不正解時に remove       |

## 利用テーブル

- `room`           – 部屋情報
- `user`           – 参加ユーザ
- `order_pattern`  – 順番管理
- `namegame`       – `id, chara_number, chara_name, user_id, room_id, flg`
- `score`          – ランキング保存（`game_id = 1` が namegame）

## ルール（画面に表示される内容）

- グループはランダム決定。
- カード（キャラ画像）を順番に引いて、新しい種類なら名前をつける。
- 全員で名前を覚える時間あり。
- 回答フェーズでは早押し方式で名前を当てる。
- 獲得枚数が一番多いプレイヤーが勝者。

## 既知の制限・注意

- 全部で 14 枚（画像が 14 種類）に固定されており、`pageFlg = 0` の判定も `=== 14` 即値。
- `waitCount` がコントローラ全体で 1 つしか保持されない（複数ルーム同時運用未対応）。
- `displayCardName` 等は `IOserver.emit` で **namespace 全体**にブロードキャストされており、
  複数ルームを跨いで状態共有されてしまう箇所がいくつかある（要 `socket.to(room)` 化検討）。

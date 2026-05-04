# 絵しりとり（illustgame）設計書

## 概要

参加者が順番にお題から繋がる絵を描き、リアルタイムに全員のキャンバスへ
描画内容をミラーリング表示する「絵しりとり」ゲーム。
**β 版**として実装されており、お題判定や勝敗判定はないシンプルな構成。

## ルーティング

ベースパス: `/illustgame`、Socket.IO namespace: `/ig`

| パス                       | 役割                              | View                                  |
| -------------------------- | --------------------------------- | ------------------------------------- |
| `/group/group`             | グループ作成                      | `illustgame/group/group.ejs`          |
| `/group/groupComplete`     | グループ作成完了                  | `illustgame/group/groupComplete.ejs`  |
| `/group/name`              | ニックネーム入力                  | `illustgame/group/name.ejs`           |
| `/group/qr`                | 参加用 QR                         | `illustgame/group/qr.ejs`             |
| `/group/rule`              | ルール説明                        | `illustgame/group/rule.ejs`           |
| `/group/wait`              | 待機                              | `illustgame/group/wait.ejs`           |
| `/game/announce`           | （遷移経由用）                    | `illustgame/game/announce.ejs`        |
| `/game/shiritori2`         | 自分の番（描画キャンバス）        | `illustgame/game/shiritori2.ejs`      |
| `/game/shiritori_receive`  | 他の人の絵をリアルタイム受信表示  | `illustgame/game/shiritori_receive.ejs` |
| `/game/taskComplete`       | 順番待ち（経過秒のみ表示）        | `illustgame/game/taskComplete.ejs`    |

## 画面フロー

```
group → name → qr → rule → wait
                              ↓
                      (全員入室)
                              ↓
                    ┌─────────┴──────────┐
                    ↓                    ↓
              shiritori2          shiritori_receive
              (描く側)              (見る側)
                    ↓ 「次の人へ」（残時間 > 0）
                    ↓
              次のプレイヤーが shiritori2 に遷移
              他のプレイヤーは shiritori_receive で観賞
                    ↓
                残時間 ≤ 0
                    ↓
                gameEnd / taskComplete
```

## ゲームルール

ルール画面（`group/rule.ejs`）に表示される内容:

- 話してはいけない
- プリントとペンを使用する（オフライン版の場合）
- 最初のお題から繋がる言葉の絵を描いていく
- 1 プレイ 1 分程度
- 順番はルーレットや乱数で決定

オンライン版では実時間 300 秒（5 分）の総時間を共有し、各プレイヤーの
描画にかかった秒数を全体から差し引いて残時間を管理する。

## Socket.IO イベント

namespace: `/ig`、コントローラ: `src/controller/illustgame/igController.js`

| 種別              | イベント名             | 概要                                                                 |
| ----------------- | ---------------------- | -------------------------------------------------------------------- |
| C → S             | `requestOrderPattern`  | 順番パターン要求（共通コンポーネント）                              |
| S → C (to id)     | `sendOrderPattern`     | 順番パターン返却                                                    |
| C → S             | `realtime-draw`        | 描画イベント（座標 / アクション種別）を送信                          |
| S → C (broadcast) | `draw`                 | 受信した描画イベントを全クライアントに配信                          |
| C → S             | `order`                | 描画完了 → 次のプレイヤーへ                                          |
| S → C (broadcast) | `changeOrder`          | 次の描画者の順番パターンを通知                                      |
| S → C (broadcast) | `gameEnd`              | 残時間切れ → ゲーム終了                                              |
| C → S             | `toReceiveReq`         | 他プレイヤーを受信画面へ遷移させるトリガを要求                      |
| S → C (broadcast) | `toReceive`            | 受信画面（`shiritori_receive`）への遷移指示                          |
| C → S             | `reqSec`               | ルームの残時間を初期化／取得                                        |
| S → C (broadcast) | `resSec`               | 現在の残時間を全員に配信                                            |
| C → S             | `reqCalcTime`          | 自分の経過時間を引いて残時間を更新                                  |
| S → C (broadcast) | `resCalcTime`          | 残時間更新完了通知（クライアント側で `taskComplete` に遷移）         |

## サーバ処理

### `realtime-draw` の中継
- 受信した `{x, y, act, src}` をそのまま `draw` イベントで全員に配信。
- `act` は描画アクション種別: `down` / `move` / `up` / `prev` / `next` / `eraser` / `drawPen` / `reset` / `towait`。
- `src` は undo/redo 用にスナップショット PNG（dataURL）を運ぶ。

### `order`
1. `order.first(roomId)` で次の順番を取得し `flgUpdate` で消化。
2. `illust.getSec(roomId)` で残時間を取得。
3. 残時間 ≤ 0 → `gameEnd` をブロードキャスト。
4. それ以外 → `changeOrder` で次の描画者の順番パターンをブロードキャスト。

### `reqSec`（残時間の初期化）
- `illust.exists(roomId)` で初回判定し、無ければ `illust.add(300, roomId)` で 5 分セット。
- 既存ならそのままの値を返却。`resSec` で全員に配信。

### `reqCalcTime`
- `illust.getSec(roomId) - data.sec`（自分の描画経過秒）を計算し `illust.update`。
- 完了後 `resCalcTime` で全員に通知（クライアント側は `taskComplete` に遷移）。

## クライアント処理

主要 JS: `public/js/illustGame/`

- `shiritori_game.js` – 描く側のメイン。
  - `window.onload` で `reqSec()` → `toReceiveReq` で他プレイヤーを `shiritori_receive` に飛ばす。
  - 1 秒間隔のタイマー `setInterval` で経過時間を画面上に表示。
  - canvas 上の `mousedown` / `mousemove` / `mouseup` および touch 系イベントで描画
    → 各操作を `realtime-draw` でサーバに送信。
  - 「次の人へ」ボタン → `stopShowing()` でタイマー停止 → `reqCalcTime` を送信
    → `resCalcTime` 受信で `./taskComplete` へ。
  - undo/redo は localStorage の `__log` 配列にキャンバスの `toDataURL()` を積んで管理し、
    操作時には対応する PNG を `realtime-draw` の `src` として送信。
- `illustReceive.js` – 受信側。`igClientIO.on('draw')` のアクション種別ごとに canvas を再現:
  - `down`/`move`/`up`: 線を描画
  - `prev`/`next`: PNG dataURL を読み込んで再描画
  - `eraser`/`drawPen`: 色切り替え
  - `reset`: クリア
  - `towait`: `taskComplete` へ遷移
- `taskComplete.js` – 待機画面。順番が来たら `shiritori2.ejs` 経由で次の番号へ遷移。
- `main.js` / `shiritori2.js` – 旧バージョンのキャンバス操作コード（現状未使用箇所あり、残存実装）。
- `clientWait.js`, `groupComp.js`, `generateQR.js`, `emitter/*` – 共通ユーティリティ。

### セッションストレージ

| キー            | 用途                                           |
| --------------- | ---------------------------------------------- |
| `roomId`        | 入室中の部屋 ID                                |
| `nickName`      | 自分のニックネーム                             |
| `orderPattern`  | 自分の順番パターン（順番が来たら remove）       |
| `time`          | サーバから受け取った残時間                     |
| `flg`           | `"answered"` 状態フラグ                        |

## 利用テーブル

- `room`           – 部屋情報
- `user`           – 参加ユーザ
- `order_pattern`  – 順番管理
- `illust`         – `id, sec, room_id`（残時間管理用、初期値 300 秒）

## キャンバス仕様

- canvas サイズ:
  - 描画側 (`shiritori_game.js`) … `300px × 350px`（旧）／`340px × 430px`（announce 経路）
  - 受信側 (`illustReceive.js`) … `340px × 430px`
- 線色 `#555`、線幅 `defSize * 2 = 6`、`lineCap = round`。
- 消しゴムは色を白 (`#FFFFFF`) に切り替えるだけの簡易実装。

## 既知の制限・注意

- 残時間の管理は **ルーム単位**で `illust` テーブルに保持され、初期 300 秒 / プレイヤー間の合計で消費される。
- `realtime-draw` は `IOserver.emit` で namespace 全体にブロードキャストされるため、
  同 namespace 内で複数ルームを並列運用すると描画が混線する。
- お題判定・勝敗判定は未実装（β 版）。
- `main.js` などに過去の実装が混在しており、動作には `shiritori_game.js` / `illustReceive.js` が使われている。

# NATS Streaming Server

- nats-depl.yaml作成
- image: nats-streaming:0.17.0

## install

```
// code-sharing時はcommon配下で
npm install node-nats-streaming
npm i --save-dev @types/node
```

## test用local起動、直接port-forward
- commonでも同じ。pod再起動(delete)してから
```
kubectl get pods
kubectl port-forward nats-depl-5fcf66985d-ghgt2 4222:4222

// 別のconsoleで
npm run publish

// 別のconsoleで
npm run listen

// 再起動したいとき: npm run publish / listenの状態で、rs => Enter

// 認証：postman:signin or signup
// 認証確認：postman:https://ticketing.dev/api/users/currentuser
// チケット作成:postman

```

### monitoring infoを見たいとき（別のconsoleで



```
// port forward先はnats-depl.yamlに記載
kubectl get pods
kubectl port-forward nats-depl-5fcf66985d-ghgt2 8222:8222

// ブラウザ上で
http://localhost:8222/streaming

// chanelの詳細
http://localhost:8222/streaming/channelsz?subs=1
```

### channelのコネクション
- http://localhost:8222/streaming/channelsz?subs=1 リフレッシュで確認できる

nats-depl.yamlのargs
- hbi: heart beat(healthcheck) -5s  5秒ごとにlistenerがダウンしていないかチェック
- hbt: listenerが何秒ごとに応答するか
- hbf: 2なら、2回まで応答失敗できる。それ以上は一時的なロストではなく完全にdownと判断


## code sharing
- commonのeventsフォルダを作って移す
- commonのindexのexportに追加する
- commonにもnode nats-streamingをinstall
- npm run pubの手順へ => auth, ticketでもupdate(npm update @endw0901tickets/common)
- kubectl delete pod nats-depl-5fcf66985d-ghgt2(pod名) でrestartしてテストeventを削除


### chrome install

- chrome extension json formatter
https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa/related?hl=ja-JP

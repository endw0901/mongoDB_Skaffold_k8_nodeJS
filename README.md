# CICD_Skaffold

## CI/CD
- Skaffold + Kubernetes
- GitHub Actions
- Jest

## サーバーサイド
- Node.js + Express + TypeScript
- MongoDB(Mongoose)

## フロント
- React + Next.js

## その他
- メッセージング：NATS Streaming Server
- 認証：JWT
- コードシェア：npm organization

```
// ほかのフォルダでcommonを使う
cd ..
cd auth
npm install @endw0901tickets/common
// => importの記述

cd commonでnpm run pub
cd auth, cd ticketsで下記
// version更新後は
npm update @endw0901tickets/common
```

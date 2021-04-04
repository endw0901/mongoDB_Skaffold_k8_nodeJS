# technology

- フロント：React / Next JS
- サーバーサイド：node.js / express / typescript
- test:jest

- DB:mongoDB / Mongoose
- kubernetes / skaffold

- 認証：JWT
- コードシェア : NPM Organization (git submoduleではなく)


- cross namespace communication ,
- メッセージング基盤：NATS Streaming Server on k8 / node-nats-streaming
- NATS Streaming with typescript(abstract / generic / interface / enum)
- jest - Fake initialized NATS Client
- stripe - dev credit card payments

## install / setup

```
mkdir nats-test
cd nats-test
npm init -y
npm install node-nats-streaming ts-node-dev typescript @types/node
// typescriptがglobally installedされている前提　（ npm install -g typescript
tsc --init
```
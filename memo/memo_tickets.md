# tickets

## install

```
cd tickets
npm install
docker build -t endw0901/tickets .
docker push endw0901/tickets

skaffold devでエラーがおこったらbuild, pushをもう一度やってみる
```

### mongoDB接続
- tickets-depl.yamlの環境変数MONGO_URIにdb接続URLを指定し、index内では変数で指定する

## test

```
npm run test
```
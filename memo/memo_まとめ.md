# memoまとめ

## 起動

```
// install済みの状態で, root(ticketing)直下で
skaffold dev

// test起動:各フォルダ直下で
npm run test
```

## install
- 別途、個別から拾ってまとめる

```
cd tickets
npm install mongoose-update-if-current
```

## クリーン再起動
https://www.udemy.com/course/microservices-with-node-js-and-react/learn/lecture/19565158#questions/11285652

```
kubectl delete all --all
kubectl delete all --all -n nginx-ingress

// mac:brew install helm. Other platforms see here: https://helm.sh/docs/intro/install/
choco install kubernetes-helm

// https://helm.sh/ja/docs/intro/quickstart/
helm repo add stable https://charts.helm.sh/stable
helm repo update
helm install stable/nginx-ingress --generate-name
skaffold dev
```

## mongodb

```
 k exec -it orders-mongo-depl-f6f5cb446-x4x5k mongo
 ```

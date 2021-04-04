# memo

## 初期作業

```
npm init -y
npm install typescript ts-node-dev express @types/express
npx tsc --init

```

## 開発の流れ

### サービス追加

```
(package.json, package-lock.json, Dockerfile, .dockerignore,tsconfig.jsonをcopy)
package.json作成(nameを変更)
Dockerfile作成

srcフォルダにapp,index,nats-wrapperをcopy
install dependencies
npm install
git config user.email
build image => docker build -t endw0901/orders(サービス名) .
push to docker hub
k8sファイル作成:
・deployment(yamlのtickets=>ordersなどにrename, ※nats-cluster-idはticketingのまま)
・mongo
skaffold.yaml更新(最後のimageセクションをcopyしてrename)
skaffold dev

ingress-srv更新(ticketsの下にコピぺ＆rename(all pathより上におくこと))

routesを実装
```

### mongoose update

package.json すべてこれに書き換える

```
run npm installのあと
npm install @types/mongoose
"mongoose": "5.10.19",
```

### install

```
cd auth
npm install --save express-validator


// express-async-erros
https://www.npmjs.com/package/express-async-errors

npm install express-async-errors --save
npm install mongoose
npm install cookie-session @types/cookie-session

// json web token (JWT)
https://www.npmjs.com/package/jsonwebtoken
npm install jsonwebtoken @types/jsonwebtoken

// jest
npm install --save-dev @types/jest @types/supertest jest ts-jest supertest mongodb-memory-server
※DockerfileをRUN npm install --only=prodとし、 ここで--save-devとすることで、特にmongodb-memory-serverの80MBインストールを繰り返さなくて済む

```

### JWT secret 作成

- secret 作成
  jwt-secret は名前
  JWT_KEY=が JWT sign in key

```
ticketing直下で
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf
kubectl get secrets
```

- secret をとれるよう yaml に設定(auth yaml の image の下に env)
- secret 名間違いなど、エラー履歴を見るとき

```
kubectl get pods
kubectl describe <pod name>
```

## chrome security warning

chrome 上で下記をうつと迂回できる

```
thisisunsafe
```

## 自動成型されないとき

alt + shift + f

## JWT decode test

https://www.base64decode.org/
cookei の value を base64 で decode し、jwt の値のみを
https://jwt.io/
に張り付け。
verify signature に sign in key (jwt.sign の sign in key)を入れると、signature verified となる


## jest testでエラーになるとき
updateが必要かも

一度止めて、npm run test再実行でupdateされて解消かも

## ingress
- ingressのpathsは上からマッチする

### communicate cross namespaces (external name service) / server side rendering
外部のrequest(ログイン後のページリフレッシュなど。) -> server side rendering
 => 外部 から client service => ingress nginx にheader（urlとcookie)つきで底経由でauth serviceでログイン認証(currentuser) => 結果返す
※ブラウザ上のページ遷移（ログインなど）はブラウザ上

```
kubectl get namespace
kubectl get services -n ingress-nginx


PS C:\Users\rayha\git\myapp\ticketing> kubectl get namespace
NAME              STATUS   AGE
default           Active   10d
ingress-nginx     Active   10d
kube-node-lease   Active   10d
kube-public       Active   10d
kube-system       Active   10d

PS C:\Users\rayha\git\myapp\ticketing> kubectl get services -n ingress-nginx
NAME                                 TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)                      AGE
ingress-nginx-controller             LoadBalancer   10.98.122.18   localhost     80:31113/TCP,443:31826/TCP   10d
ingress-nginx-controller-admission   ClusterIP      10.109.3.205   <none>        443/TCP                      10d
```

- http://ingress-nginx.ingress-nginx.svc.cluster.local/api/users/currentuser => external name service => http://ingress-nginx-srv

- getInitialProps
      // NAMESPACE => kubectl get namespace
      // SERVICENAME => kubectl get services -n ingress-nginx => load balancer
      // 'http://SERVICENAME.NAMESPACE.svc.cluster.local'
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser'


## command

ctrl + shift + p : reload vscode
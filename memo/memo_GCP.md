# memo_GCP

## GCP

- GCP との kubernetes connection 設定のため、
  google cloud SDK download
  https://cloud.google.com/sdk/docs/quickstarts

  ```
  gcloud init
  gcloud container clusters get-credentials <cluster-name>
  ```

これで kubectl get pods コマンドなどが、gcloud 上のクラスター内を参照することになる

- cloud build API => enabled
- Skaffold.yaml 設定を gloud に向ける

```
local pushをコメントアウト

  googleCloudBuild:
    projectId: ticketing-dev-307408
を追記し、

  artifacts:
    - image: us.gcr.io/ticketing-dev-307408/auth
のimageを上記設定で、こちらが指定できる。そうでないとランダム名称となる
各個別 yaml の image も同じに変更する
```

- ingress-nginx を google cloud cluster に設定
  https://kubernetes.github.io/ingress-nginx/deploy/#docker-for-mac
  gke 用のを流す
  local にもどすときは mac 用のを流す

```
https://kubernetes.github.io/ingress-nginx/deploy/#gce-gke

GCE/GKEのここ
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.44.0/deploy/static/provider/cloud/deploy.yaml
```

- google cloud => network services -> load balancing
  名前をクリック => hosts が指すべき ip を取得できる
- hosts file を編集し、ticketing-dev が remote cluster を指すようにする

- restart Skaffold

```
※gloud initをした状態で（してないとlocalに作成される)
skaffold dev

ブラウザでチェック(thisisunsafe)
https://ticketing.dev/api/users/currentuser

終わったらcluster削除しておく
再作成：111参照
作成は、nodeでN! g1 smallにするだけ。urlがhostsと変わってないことも
```

```
https://www.skyarch.net/blog/?p=16631
kubectl config current-context

ローカルに切り替え戻すときもここ
https://www.skyarch.net/blog/?p=16631

```

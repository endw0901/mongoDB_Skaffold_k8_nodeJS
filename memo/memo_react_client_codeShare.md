# memo react client

## package.json

- npm run devでnext起動
```
 "scripts": {
    "dev": "next"
  },
```

## install

```
// cd ticketing/client
npm init -y
npm install react react-dom next

※Dockerfile, .dockerignore設定後

docker build -t endw0901/client .
docker push endw0901/client


// _app.jsで使う
npm install bootstrap

npm install axios
```

## code sharing  / npm
- git submoduleの代案。npmjsにpublishしてシェアする
- add npmjs organization
https://www.npmjs.com/org/create
Unlimited public packages create
@endw0901tickets
https://www.npmjs.com/settings/endw0901tickets/packages

### install

```
mkdir common
cd common
npm init -y
npm install express express-validator cookie-session jsonwebtoken @types/cookie-session @types/express @types/jsonwebtoken

// build(tsc)
npm run build
npm run pub

// ほかのフォルダでcommonを使う
cd ..
cd auth
npm install @endw0901tickets/common
// => importの記述

cd commonでnpm run pub
cd auth, cd ticketsで下記
// version更新後は
npm update @endw0901tickets/common

// version更新されてるか確認方法
kubectl get pods
kubectl exec -it <pod name> sh
ls
cd node_modules
cd @endw0901tickets/common
ls
cd common
ls
cat pacakge.json
```

#### ※下記はpackage.json scriptsで npm run pubへ
- package.jsonのnameを"name": "@endw0901tickets/common",へ

```
git init
git add .
git commit -m "initial commit"

npm login
npm publish --access public

```

https://www.npmjs.com/package/@endw0901tickets/common

- typescriptで作成し、javascriptに変換してup

```
tsc --init
npm install typescript del-cli --save-dev

npm login

npm version patch
npm run build
npm publish

※npm run clean のdel ./build/*が無効なスイッチエラーとなるので、
buildのまえに手動でdelする（もしくはしなくても上書きするのでok?

※windowsはこれで？
This is from del-cli page: "Since $ del is already a builtin command on Windows, you need to use $ del-cli there."
If you are on windows use "del-cli ./build/*" command.
```

- code をbuildのjs変換からよめるようにmain, types(typescript通知), files(読み込み対象）設定
```
{
  "name": "@endw0901tickets/common",
  "version": "1.0.0",
  "description": "",
  "main": "./build/index.js",
  "types": "./build/index.d.ts",
  "files": [
    "build/**/*"
  ],
  ```
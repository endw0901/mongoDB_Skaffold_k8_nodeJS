# payments

## install
- stripe.comのsecret-key:
https://dashboard.stripe.com/test/apikeys

```
cd payments
npm install stripe --save
kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=sk_test_51IbHamIwHbxAgWJ1eN32TcYYQ85XrFgivVm8MrgXEJapKSghLDxXhpZBk8MFMHGGNREPn4TDQODSueZaL9ZoVJxR00VXkyj9eZ

kubectl get secrets
```

payments-depl.yamlのenvに追加し、keyをPGM上で使用できるようにする

## react-stripe-checkout
```
https://www.npmjs.com/package/react-stripe-checkout

cd client
npm install react-stripe-checkout

```
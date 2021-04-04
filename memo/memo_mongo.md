# mongodb

```
 k exec -it orders-mongo-depl-f6f5cb446-x4x5k mongo
 show dbs;

 // db change
 use orders;

 // table change
 db.tickets

 // 検索 ({ 検索条件})
 db.tickets.find({ price: 2000})
 ```

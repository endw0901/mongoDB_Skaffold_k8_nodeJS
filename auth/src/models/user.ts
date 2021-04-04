import mongoose from 'mongoose';
import { Password } from '../services/password';

// 概要
// Schema:Modelを持つ(buildでAttrを受けてdocを返す)
// Model(Attrs(staticプロパティ)をもつ)

// コードの書き方
// 1.interfaceを3つ作成
//   1-1.Attrsに何を持つかを定義する
//   1-2.Doc(実際のmongoDBレコード)に何を持つかを定義する(追加情報を持つ場合がある)
//   1-3.Attrsを受けてDocを返すbuildを持つModelを紐づける
// 2.Schema作成
//  2-1.Schema作成：Attrsを受けてJSONを返す
//  2-2.Schema.build作成：新規レコード作成用
// 3.New xxxx作成用紐づけconst変数作成(2-2のnew xxxxを受ける)
// 4.export

// 1-1.typeチェック：User作成用
interface UserAttrs {
  email: string;
  password: string;
}

// 1-2.typeチェック：User Document (single user)
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}
// 1-3.typeチェック：User Modelがstaticプロパティを持つ
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// 2-1
const userSchema = new mongoose.Schema(
  {
    // string => typescriptの型
    // String => mongooseのコンストラクタ
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // return情報からpasswordのぞく
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// save直前に実行される
// ※arrow functionにすると、mongodb documentのthisではなくこのソースコードのthisになってしまうので避ける
userSchema.pre('save', async function (done) {
  // mongooseのisModifiedは新規登録でもtrue
  if (this.isModified('password')) {
    // hash化してから保存
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

//2-2
// 直接new Userせずに、関数を挟むことでtypeチェックができるようにする
// Userのstaticプロパティにすることで使いやすくする
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// 3
// <any, UserModel>がなぜか必要(typescriptにbuildUserプロパティを教えるために)
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// Userのメソッドにすることで使いやすくする（上記)
// const buildUser = (attrs: UserAttrs) => {
//   return new User(attrs);
// };

// 例：userの作成方法
// const user = User.build({
//   email: 'test',
//   password: 'abc'
// });
// 例：userのプロパティへのアクセス方法
// user.email;

// 4.
export { User };

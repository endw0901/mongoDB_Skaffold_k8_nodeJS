import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@endw0901tickets/common';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

// app.use
const app = express();
app.set('trust proxy', true); // ingress-nginxのtraficを信用する
app.use(json());
app.use(
  cookieSession({
    // signed false = encryptionを無効にする(暗号化はJWTで行う。cookeiは各言語で暗号解釈が困難)
    signed: false,
    // httpsを要求(prod:true, test:false => jestではhttpsでなくてよい)
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

// all:get, post, put, deleteすべて
app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };

import express from 'express';
import { currentUser } from '@endw0901tickets/common';

const router = express.Router();

// test:postmanでsignin (cookieが保存される) => current user => payloadが返る
// test:postmanのcookieボタンからcookieを削除してcurrnt user => nullが返る

// curerntUser(middleware)内でjwtチェックとpayload取得を行う
router.get('/api/users/currentuser', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };

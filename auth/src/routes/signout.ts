import express from 'express';

const router = express.Router();

// destorying session:
// https://www.npmjs.com/package/cookie-session

router.post('/api/users/signout', (req, res) => {
  req.session = null;

  res.send({});
});

export { router as signoutRouter };

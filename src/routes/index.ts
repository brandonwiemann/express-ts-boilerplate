import express from 'express';
const router = express.Router();

router.use('/auth', require('./auth.routes.ts'));
router.use('/user', require('./user.routes.ts'));

module.exports = router;

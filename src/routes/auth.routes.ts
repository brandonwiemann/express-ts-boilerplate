import auth from '@/middleware/local-auth';
import container from '@/config/inversify.config';
import express from 'express';
import jwtAuth from '@/middleware/jwt-auth';
import AuthController from '@/controllers/AuthController';
import { TYPES } from '@/types/inversify.types';

const router = express.Router();
const controller = container.get<AuthController>(TYPES.IAuthController);

router.post('/signup', auth, controller.createAccount);
router.post('/login', auth, controller.login);
router.get('/logout', controller.logout);
router.get('/validate', jwtAuth, controller.validateJWTToken);

module.exports = router;
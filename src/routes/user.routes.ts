import container from '@/config/inversify.config';
import UserController from '@/controllers/UserController';
import RouterHelper from '@/helpers/router.helper';
import { TYPES } from '@/types/inversify.types';

const controller = container.get<UserController>(TYPES.IUserController);
const router = RouterHelper.createRestRouter(controller, '');

module.exports = router;
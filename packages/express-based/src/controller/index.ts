import {Router} from 'express';
import AccountController from './account';

const IndexController = Router();

IndexController.use('/account', AccountController);

export default IndexController

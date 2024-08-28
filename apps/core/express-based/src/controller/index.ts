import {Router} from 'express';
import AccountController from './account';
import DateTipController from "./datetip-controller";

const IndexController = Router();

IndexController.use('/account', AccountController);
IndexController.use('/datetip', DateTipController);

export default IndexController

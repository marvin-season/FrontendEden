import {Router} from 'express';
import DateTipController from "./datetip-controller";

const IndexController = Router();

IndexController.use('/datetip', DateTipController);

export default IndexController

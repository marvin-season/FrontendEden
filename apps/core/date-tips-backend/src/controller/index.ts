import {Router} from 'express';
import DateTipController from "./datetip-controller";
import ChatController from "./chat-controller";

const IndexController = Router();

IndexController.use('/datetip', DateTipController);
IndexController.use('/chat', ChatController);

export default IndexController

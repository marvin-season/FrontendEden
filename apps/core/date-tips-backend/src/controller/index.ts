import {Router} from 'express';
import DateTipController from "./datetip-controller";
import ChatController from "./chat-controller";
import ConversationController from "./conversation-controller";

const IndexController = Router();

IndexController.use('/datetip', DateTipController);
IndexController.use('/chat', ChatController);
IndexController.use('/conversation', ConversationController);

export default IndexController

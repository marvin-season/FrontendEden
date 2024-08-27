import {Router} from 'express';
import AccountController from './account';
import PostController from "./post-controller";

const IndexController = Router();

IndexController.use('/account', AccountController);
IndexController.use('/post', PostController);

export default IndexController

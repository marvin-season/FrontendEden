import {Router} from 'express';

const AccountController = Router();

AccountController.get('/', (req, res) => res.send("hi"))

export default AccountController

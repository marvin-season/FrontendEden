import {Router} from "express";

const ChatController = Router();

ChatController.get('/hello', (req, res) => res.send('Hello World!'))


export default ChatController
import {Router} from 'express';
import prisma from "../../utils/prisma";

const PostController = Router();

PostController.get('/', async (req, res) => {
  const data = await prisma.post.findMany()
  return res.json({data})
})

export default PostController

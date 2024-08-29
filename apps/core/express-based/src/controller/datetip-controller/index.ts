import {Router} from 'express';
import prisma from "../../utils/prisma";

const DateTipController = Router();

DateTipController.get('/list', async (req, res) => {
  const data = await prisma.dateTip.findMany()
  return res.json({data})
})

DateTipController.post('/:name', async (req, res) => {
  const data = req.body;
  let result = null;
  if (data.id) {
    result = await prisma.dateTip.update({
      where: {
        id: data.id
      }, data: {}
    })
  } else {
    result = await prisma.dateTip.create({data})
  }

  return res.json({data: result})
})

export default DateTipController

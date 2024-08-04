// 创建 Account
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// saveOrUpdateAccount
export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("🚀  data", data);
    let account: any = {};
    const find = await prisma.account.findFirst({ where: { id: data.id } });

    if (data.id && find) {
      const { id, ...updateData } = data;
      account = await prisma.account.update({
        where: { id: find.id },
        data: updateData,
      });
    } else {
      account = await prisma.account.create({ data });
    }

    return NextResponse.json(account);
  } catch (e) {
    console.log("🚀  ", e);
    return NextResponse.json({ error: e });
  }
}

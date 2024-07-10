// 创建 Account
import prisma from '@/app/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("🚀  data", data)
    const account = await prisma.account.create({data});

    return new Response(JSON.stringify(account), {
      headers: {'Content-Type': 'application/json'},
    })
  } catch (e) {
    console.log("🚀  ", e)
    return new Response(JSON.stringify({
      code: 500
    }), {
      headers: {'Content-Type': 'application/json'},
    })
  }
}

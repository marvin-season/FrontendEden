import prisma from '@/app/lib/prisma';

export async function GET(request: Request, {params}: { params: { id: string } }) {
  const data = await prisma.account.findFirst({
    where: {
      id: parseInt(params.id)
    }
  });
  return Response.json(data);
}

// 创建 Account
export async function POST(request: Request) {
  try {
    const data = await request.json();
    await prisma.account.create(data);

    return Response.json(true);
  } catch (e) {
  }
}

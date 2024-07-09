import prisma from '@/app/lib/prisma';

export async function GET(request: Request, {params}: { params: { id: number } }) {
  const data = await prisma.account.findFirst({
    where: {
      id: params.id
    }
  });
  return Response.json(data);
}

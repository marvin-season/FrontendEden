import prisma from '@/app/lib/prisma';

export async function GET(request: Request, {params}: { params: { id: string } }) {
  const data = await prisma.account.findFirst({
    where: {
      id: parseInt(params.id)
    }
  });
  return Response.json(data);
}

export async function DELETE(request: Request, {params}: { params: { id: string } }) {
  const data = await prisma.account.delete({
    where: {
      id: parseInt(params.id)
    }
  });
  return Response.json(data);
}

import prisma from '@/app/lib/prisma';


export async function GET() {
  const feed = await prisma.account.findMany();
  return Response.json(feed);
}

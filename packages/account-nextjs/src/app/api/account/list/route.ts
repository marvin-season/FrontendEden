import prisma from '@/app/lib/prisma';


export async function GET() {
  const feed = await prisma.account.findMany({
    where: {},
  });

  console.log("🚀 feed ", feed)

  return Response.json(feed);
}

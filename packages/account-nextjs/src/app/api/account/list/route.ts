export async function GET() {
  const data = {
    greet: "hello",
  };

  return Response.json([data]);
}

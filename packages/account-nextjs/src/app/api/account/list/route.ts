export async function GET() {
  const data = [
    { id: 1, name: 'Account 2024-7-1' },
    { id: 2, name: 'Account 2024-7-2' },
    { id: 3, name: 'Account 2024-7-3' },
    { id: 4, name: 'Account 2024-7-4' },
  ]

  return Response.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();

  const res = await fetch(process.env.WEBHOOK as string, body);
  res.json();
  console.log("Response,", res);

  return new Response();
}

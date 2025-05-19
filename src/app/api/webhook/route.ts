import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const res = await fetch(process.env.WEBHOOK as string, {
    method: "POST",
    body: JSON.stringify(body),
  });
  res.json();

  return new Response();
}

export async function GET(request: NextRequest) {
  const url = new URL(
    `https://webhook.site/token/${process.env.WEBHOOK_API_KEY as string}/requests`,
  );

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch webhook",
        info: url,
        code: res.ok,
      }),
    );
  }

  const data = await res.json();
  console.log("Data", res);

  return new Response(
    JSON.stringify({
      message: "working",
      data: data,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}

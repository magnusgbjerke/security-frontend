import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received POST request:", body);

    return new Response(JSON.stringify({ message: "Request logged" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error parsing request:", error);
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(req: NextRequest) {
  console.log("Received GET request:", req.nextUrl.searchParams);

  return new Response(JSON.stringify({ message: "GET request logged" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

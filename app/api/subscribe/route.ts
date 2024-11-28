import { NextResponse } from "next/server";

const LOOPS_API_KEY = process.env.LOOPS_API_KEY;

export async function POST(request: Request) {
  try {
    const { email, source, userGroup } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!LOOPS_API_KEY) {
      console.error("LOOPS_API_KEY environment variable is not set");
      return NextResponse.json(
        { error: "API configuration error" },
        { status: 500 },
      );
    }

    const response = await fetch(
      "https://app.loops.so/api/v1/contacts/create",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOOPS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, source, userGroup }),
      },
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Loops API error:", errorData);
      throw new Error(`Failed to create contact in Loops: ${errorData}`);
    }

    const data = await response.json();

    return NextResponse.json({ success: true, id: data.id }, { status: 201 });
  } catch (error) {
    console.error("Error in subscribe API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

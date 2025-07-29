import { NextRequest, NextResponse } from "next/server";
import { getComponentSource } from "@/lib/get-component-source";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get("path");

  if (!path) {
    return NextResponse.json(
      { error: "Path parameter is required" },
      { status: 400 }
    );
  }

  try {
    const source = await getComponentSource(path);
    return NextResponse.json({ source });
  } catch {
    return NextResponse.json(
      { error: "Failed to read component source" },
      { status: 500 }
    );
  }
}

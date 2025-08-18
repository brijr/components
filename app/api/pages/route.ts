import { NextRequest, NextResponse } from "next/server";
import { SimplePageSchema as PageSchema, SimplePage as Page } from "@/lib/schemas/page-simple.schema";

// Shared global storage (replace with database later)
const getPages = () => {
  if (!global.pages) {
    global.pages = new Map();
  }
  return global.pages as Map<string, Page>;
};

/**
 * GET /api/pages - List all pages
 */
export async function GET() {
  try {
    const pages = getPages();
    const allPages = Array.from(pages.values());
    return NextResponse.json({ pages: allPages });
  } catch (error) {
    console.error("Error fetching pages:", error);
    return NextResponse.json(
      { error: "Failed to fetch pages" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/pages - Create a new page
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the page schema
    const result = PageSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid page data", details: result.error.flatten() },
        { status: 400 }
      );
    }
    
    const page = result.data;
    const pages = getPages();
    
    // Check if page with same ID already exists
    if (pages.has(page.id)) {
      return NextResponse.json(
        { error: "Page with this ID already exists" },
        { status: 409 }
      );
    }
    
    // Store the page
    pages.set(page.id, page);
    
    return NextResponse.json(
      { message: "Page created successfully", page },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating page:", error);
    return NextResponse.json(
      { error: "Failed to create page" },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from "next/server";

// Shared global storage (replace with database later)
const getPages = () => {
  if (!global.pagesSimple) {
    global.pagesSimple = new Map();
  }
  return global.pagesSimple as Map<string, any>;
};

/**
 * GET /api/pages/simple - List all pages
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
 * POST /api/pages/simple - Create a new page (without Zod validation)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Basic manual validation
    if (!body.id || !body.title || !body.slug || !body.sections || !body.metadata) {
      return NextResponse.json(
        { error: "Missing required fields: id, title, slug, sections, metadata" },
        { status: 400 }
      );
    }
    
    const pages = getPages();
    
    // Check if page with same ID already exists
    if (pages.has(body.id)) {
      return NextResponse.json(
        { error: "Page with this ID already exists" },
        { status: 409 }
      );
    }
    
    // Store the page
    pages.set(body.id, body);
    
    return NextResponse.json(
      { message: "Page created successfully", page: body },
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
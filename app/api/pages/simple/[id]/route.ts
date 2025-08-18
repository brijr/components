import { NextRequest, NextResponse } from "next/server";

// Shared global storage
const getPages = () => {
  if (!global.pagesSimple) {
    global.pagesSimple = new Map();
  }
  return global.pagesSimple as Map<string, unknown>;
};

/**
 * GET /api/pages/simple/[id] - Get a specific page
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pages = getPages();
    const page = pages.get(id);
    
    if (!page) {
      return NextResponse.json(
        { error: "Page not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ page });
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json(
      { error: "Failed to fetch page" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/pages/simple/[id] - Delete a specific page
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pages = getPages();
    
    if (!pages.has(id)) {
      return NextResponse.json(
        { error: "Page not found" },
        { status: 404 }
      );
    }
    
    pages.delete(id);
    
    return NextResponse.json({
      message: "Page deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting page:", error);
    return NextResponse.json(
      { error: "Failed to delete page" },
      { status: 500 }
    );
  }
}
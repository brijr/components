import { NextRequest, NextResponse } from "next/server";
import { SimplePageSchema as PageSchema, SimplePage as Page } from "@/lib/schemas/page-simple.schema";

// Import the shared pages storage (will be replaced with database)
// For now, we'll use a global store
const getPages = () => {
  if (!global.pages) {
    global.pages = new Map();
  }
  return global.pages as Map<string, Page>;
};

/**
 * GET /api/pages/[id] - Get a specific page
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
 * PUT /api/pages/[id] - Update a specific page
 */
export async function PUT(
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
    
    const body = await request.json();
    
    // Validate the updated page schema
    const result = PageSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid page data", details: result.error.flatten() },
        { status: 400 }
      );
    }
    
    const updatedPage = {
      ...result.data,
      metadata: {
        ...result.data.metadata,
        updatedAt: new Date(),
        version: (pages.get(id).metadata?.version || 1) + 1,
      }
    };
    
    // Update the page
    pages.set(id, updatedPage);
    
    return NextResponse.json({
      message: "Page updated successfully",
      page: updatedPage
    });
  } catch (error) {
    console.error("Error updating page:", error);
    return NextResponse.json(
      { error: "Failed to update page" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/pages/[id] - Delete a specific page
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
    
    // Delete the page
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
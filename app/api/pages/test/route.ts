import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PageSchema } from "@/lib/schemas/page.schema";

// Simple test schema
const TestSchema = z.object({
  test: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Received body:", body);
    
    // Test basic Zod functionality
    const testResult = TestSchema.safeParse({ test: "hello" });
    console.log("Test parse result:", testResult);
    
    // Test PageSchema
    console.log("PageSchema:", PageSchema);
    console.log("PageSchema type:", typeof PageSchema);
    console.log("PageSchema.safeParse:", PageSchema.safeParse);
    
    // Now test with actual body using PageSchema
    const result = PageSchema.safeParse(body);
    
    return NextResponse.json({
      success: true,
      testPassed: testResult.success,
      pageSchemaValid: result.success,
      errors: result.success ? null : result.error.flatten(),
      body,
    });
  } catch (error) {
    console.error("Test route error:", error);
    return NextResponse.json(
      { error: String(error), stack: (error as Error).stack },
      { status: 500 }
    );
  }
}
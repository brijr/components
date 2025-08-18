import { SimplePage } from "@/lib/schemas/page-simple.schema";

declare global {
  var pages: Map<string, SimplePage> | undefined;
}

export {};
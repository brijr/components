"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the Page Generator as the main entry point
    router.replace("/page-generator");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Components</h1>
        <p className="text-muted-foreground">Redirecting to Page Generator...</p>
      </div>
    </div>
  );
}
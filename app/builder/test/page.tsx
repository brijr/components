"use client";

import { useState, useEffect } from "react";
import { PageRenderer } from "@/lib/page-renderer";
import { Page } from "@/lib/schemas/page.schema";
import { Button } from "@/components/ui/button";
import { defaultContent as heroMinimalContent } from "@/components/components/hero/hero-minimal/content";

export default function TestPageBuilder() {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pageId] = useState(`test-page-${Date.now()}`);

  // Test page data
  const testPage = {
    id: pageId,
    title: "Test Landing Page",
    description: "Testing the page builder system",
    slug: "test-landing",
    sections: [
      {
        id: "section-1",
        componentSlug: "hero-minimal",
        order: 0,
        props: { ...heroMinimalContent } as Record<string, unknown>,
        visible: true,
      },
    ],
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      generatedBy: "manual" as const,
      version: 1,
    },
    seo: {
      title: "Test Landing Page",
      description: "A test page for the AI page builder",
    },
  };

  // Check if page exists on load
  useEffect(() => {
    const checkExistingPage = async () => {
      try {
        const response = await fetch(`/api/pages/simple/${pageId}`);
        if (response.ok) {
          const data = await response.json();
          setPage(data.page);
        }
      } catch {
        // Page doesn't exist, that's fine
      }
    };
    checkExistingPage();
  }, [pageId]);

  // Create page via API
  const createPage = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/pages/simple", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testPage),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create page");
      }

      const data = await response.json();
      setPage(data.page);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Fetch page via API
  const fetchPage = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/pages/simple/${testPage.id}`);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to fetch page");
      }

      const data = await response.json();
      setPage(data.page);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Delete page via API
  const deletePage = async () => {
    if (!page) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/pages/simple/${page.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete page");
      }

      setPage(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen px-6">
      <div className="border-b">
        <div className="container py-4">
          <h1 className="mb-4 text-2xl font-bold">Page Builder Test</h1>

          <div className="mb-4 flex gap-4">
            <Button onClick={createPage} disabled={loading || !!page}>
              Create Test Page
            </Button>

            <Button
              onClick={fetchPage}
              variant="outline"
              disabled={loading || !page}
            >
              Fetch Page
            </Button>

            <Button
              onClick={deletePage}
              variant="destructive"
              disabled={loading || !page}
            >
              Delete Page
            </Button>
          </div>

          {error && (
            <div className="rounded border border-red-200 bg-red-50 px-4 py-2 text-red-600">
              {error}
            </div>
          )}

          {loading && <div className="text-muted-foreground">Loading...</div>}

          {page && (
            <div className="rounded border border-green-200 bg-green-50 px-4 py-2 text-green-600">
              Page created: {page.id}
            </div>
          )}
        </div>
      </div>

      {page && (
        <div className="mt-8">
          <div className="container mb-4">
            <h2 className="mb-2 text-lg font-semibold">Page Preview:</h2>
            <div className="text-muted-foreground text-sm">
              Title: {page.title} | Slug: {page.slug} | Sections:{" "}
              {page.sections.length}
            </div>
          </div>

          <PageRenderer schema={page} mode="preview" device="desktop" />
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useBuilderStore } from "@/lib/builder-store-enhanced";
import { registry } from "@/registry";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search,
  Layout,
  Zap,
  DollarSign,
  MessageSquare,
  MousePointer,
  Navigation,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

const componentCategories = [
  { type: "hero", label: "Heroes", icon: Layout },
  { type: "feature", label: "Features", icon: Zap },
  { type: "pricing", label: "Pricing", icon: DollarSign },
  { type: "testimonial", label: "Testimonials", icon: MessageSquare },
  { type: "cta", label: "CTAs", icon: MousePointer },
  { type: "footer", label: "Footers", icon: Navigation },
];

// Component thumbnails (simplified representations)
const componentThumbnails: Record<string, string> = {
  "hero-minimal": "bg-gradient-to-b from-primary/20 to-transparent",
  "hero-centered": "bg-gradient-to-r from-transparent via-primary/20 to-transparent",
  "hero-split": "bg-gradient-to-r from-primary/20 to-transparent",
  "hero-with-image": "bg-gradient-to-r from-primary/10 to-primary/20",
  "feature-three-cards": "bg-gradient-to-b from-transparent to-primary/10",
  "feature-icon-list": "bg-gradient-to-r from-primary/10 to-transparent",
  "pricing-toggle": "bg-gradient-to-b from-primary/10 to-primary/20",
  "testimonial-grid": "bg-gradient-to-b from-transparent to-primary/10",
  "cta-single": "bg-gradient-to-r from-transparent via-primary/20 to-transparent",
  "footer-minimal": "bg-gradient-to-t from-primary/20 to-transparent",
};

export const EnhancedSidebar = () => {
  const { addSection } = useBuilderStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredComponents = registry.filter(component => {
    const matchesSearch = searchQuery === "" || 
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.slug.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || component.type === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddComponent = (slug: string) => {
    addSection(slug);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <h3 className="font-semibold mb-3">Components</h3>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="border-b">
        <ScrollArea className="w-full">
          <div className="flex p-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
                selectedCategory === "all" 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-accent"
              )}
            >
              All
            </button>
            {componentCategories.map(({ type, label, icon: Icon }) => (
              <button
                key={type}
                onClick={() => setSelectedCategory(type)}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ml-1",
                  selectedCategory === type 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-accent"
                )}
              >
                <Icon className="h-3 w-3" />
                {label}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Components Grid */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {filteredComponents.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-sm text-muted-foreground">No components found</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {filteredComponents.map((component) => (
                <button
                  key={component.slug}
                  onClick={() => handleAddComponent(component.slug)}
                  className="group relative overflow-hidden rounded-lg border bg-card hover:bg-accent transition-all"
                >
                  {/* Thumbnail */}
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <div className={cn(
                      "absolute inset-0",
                      componentThumbnails[component.slug] || "bg-gradient-to-b from-muted to-transparent"
                    )} />
                    
                    {/* Simplified component preview */}
                    <div className="absolute inset-0 p-3 flex flex-col justify-center items-center">
                      {component.type === "hero" && (
                        <>
                          <div className="w-3/4 h-2 bg-foreground/20 rounded mb-2" />
                          <div className="w-1/2 h-1.5 bg-foreground/15 rounded mb-3" />
                          <div className="flex gap-1">
                            <div className="w-12 h-3 bg-primary/30 rounded" />
                            <div className="w-12 h-3 bg-foreground/10 rounded" />
                          </div>
                        </>
                      )}
                      {component.type === "feature" && (
                        <div className="grid grid-cols-3 gap-1 w-full">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="aspect-square bg-foreground/10 rounded" />
                          ))}
                        </div>
                      )}
                      {component.type === "pricing" && (
                        <div className="grid grid-cols-3 gap-1 w-full">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="h-16 bg-foreground/10 rounded" />
                          ))}
                        </div>
                      )}
                      {component.type === "testimonial" && (
                        <div className="grid grid-cols-2 gap-1 w-full">
                          {[1, 2].map(i => (
                            <div key={i} className="h-8 bg-foreground/10 rounded" />
                          ))}
                        </div>
                      )}
                      {component.type === "cta" && (
                        <>
                          <div className="w-3/4 h-2 bg-foreground/20 rounded mb-2" />
                          <div className="w-16 h-3 bg-primary/30 rounded" />
                        </>
                      )}
                      {component.type === "footer" && (
                        <div className="grid grid-cols-4 gap-1 w-full mt-auto">
                          {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-6 bg-foreground/10 rounded" />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Add icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/80">
                      <Plus className="h-8 w-8 text-primary" />
                    </div>
                  </div>

                  {/* Component info */}
                  <div className="p-3">
                    <div className="font-medium text-sm">{component.name}</div>
                    {component.description && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {component.description}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
import { create } from "zustand";
import { registry } from "@/registry";

interface Section {
  id: string;
  componentSlug: string;
  props: Record<string, unknown>;
  order: number;
}

interface BuilderStore {
  // Page data
  pageTitle: string;
  pageSlug: string;
  sections: Section[];
  
  // UI state
  selectedSectionId: string | null;
  previewMode: "desktop" | "tablet" | "mobile";
  isSaving: boolean;
  
  // Actions
  setPageTitle: (title: string) => void;
  setPageSlug: (slug: string) => void;
  addSection: (componentSlug: string) => void;
  removeSection: (id: string) => void;
  updateSectionProps: (id: string, props: Record<string, unknown>) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;
  selectSection: (id: string | null) => void;
  setPreviewMode: (mode: "desktop" | "tablet" | "mobile") => void;
  clearPage: () => void;
  loadPage: (data: { title?: string; slug?: string; sections?: Section[] }) => void;
}

export const useBuilderStore = create<BuilderStore>((set, get) => ({
  // Initial state
  pageTitle: "New Page",
  pageSlug: "new-page",
  sections: [],
  selectedSectionId: null,
  previewMode: "desktop",
  isSaving: false,
  
  // Actions
  setPageTitle: (title) => set({ pageTitle: title }),
  setPageSlug: (slug) => set({ pageSlug: slug }),
  
  addSection: (componentSlug) => {
    const component = registry.find(c => c.slug === componentSlug);
    if (!component) return;
    
    const newSection: Section = {
      id: `section-${Date.now()}`,
      componentSlug,
      props: component.props || {},
      order: get().sections.length,
    };
    
    set(state => ({
      sections: [...state.sections, newSection],
      selectedSectionId: newSection.id,
    }));
  },
  
  removeSection: (id) => set(state => ({
    sections: state.sections.filter(s => s.id !== id),
    selectedSectionId: state.selectedSectionId === id ? null : state.selectedSectionId,
  })),
  
  updateSectionProps: (id, props) => set(state => ({
    sections: state.sections.map(s => 
      s.id === id ? { ...s, props } : s
    ),
  })),
  
  reorderSections: (fromIndex, toIndex) => set(state => {
    const sections = [...state.sections];
    const [moved] = sections.splice(fromIndex, 1);
    sections.splice(toIndex, 0, moved);
    
    return {
      sections: sections.map((s, i) => ({ ...s, order: i })),
    };
  }),
  
  selectSection: (id) => set({ selectedSectionId: id }),
  setPreviewMode: (mode) => set({ previewMode: mode }),
  
  clearPage: () => set({
    pageTitle: "New Page",
    pageSlug: "new-page",
    sections: [],
    selectedSectionId: null,
  }),
  
  loadPage: (data) => set({
    pageTitle: data.title || "New Page",
    pageSlug: data.slug || "new-page",
    sections: data.sections || [],
    selectedSectionId: null,
  }),
}));
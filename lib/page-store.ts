import { create } from "zustand";
import { Page, ComponentInstance } from "./schemas/page.schema";

interface PageBuilderStore {
  // Current page
  currentPage: Page | null;
  selectedSectionId: string | null;
  
  // Editor state
  mode: "edit" | "preview";
  device: "mobile" | "tablet" | "desktop";
  isDirty: boolean;
  
  // Page actions
  setPage: (page: Page) => void;
  clearPage: () => void;
  
  // Section actions
  addSection: (component: ComponentInstance) => void;
  updateSection: (id: string, props: Partial<ComponentInstance>) => void;
  removeSection: (id: string) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;
  duplicateSection: (id: string) => void;
  
  // Selection
  selectSection: (id: string | null) => void;
  
  // Editor actions
  setMode: (mode: "edit" | "preview") => void;
  setDevice: (device: "mobile" | "tablet" | "desktop") => void;
  setDirty: (isDirty: boolean) => void;
  
  // Utility
  generateSectionId: () => string;
}

export const usePageStore = create<PageBuilderStore>((set, get) => ({
  // Initial state
  currentPage: null,
  selectedSectionId: null,
  mode: "edit",
  device: "desktop",
  isDirty: false,
  
  // Page actions
  setPage: (page) => set({ currentPage: page, isDirty: false }),
  
  clearPage: () => set({ 
    currentPage: null, 
    selectedSectionId: null, 
    isDirty: false 
  }),
  
  // Section actions
  addSection: (component) => set((state) => {
    if (!state.currentPage) return state;
    
    const newSection: ComponentInstance = {
      ...component,
      id: component.id || get().generateSectionId(),
      order: state.currentPage.sections.length,
    };
    
    return {
      currentPage: {
        ...state.currentPage,
        sections: [...state.currentPage.sections, newSection],
        metadata: {
          ...state.currentPage.metadata,
          updatedAt: new Date(),
        },
      },
      isDirty: true,
    };
  }),
  
  updateSection: (id, updates) => set((state) => {
    if (!state.currentPage) return state;
    
    return {
      currentPage: {
        ...state.currentPage,
        sections: state.currentPage.sections.map((section) =>
          section.id === id ? { ...section, ...updates } : section
        ),
        metadata: {
          ...state.currentPage.metadata,
          updatedAt: new Date(),
        },
      },
      isDirty: true,
    };
  }),
  
  removeSection: (id) => set((state) => {
    if (!state.currentPage) return state;
    
    const filteredSections = state.currentPage.sections
      .filter((section) => section.id !== id)
      .map((section, index) => ({ ...section, order: index }));
    
    return {
      currentPage: {
        ...state.currentPage,
        sections: filteredSections,
        metadata: {
          ...state.currentPage.metadata,
          updatedAt: new Date(),
        },
      },
      selectedSectionId: state.selectedSectionId === id ? null : state.selectedSectionId,
      isDirty: true,
    };
  }),
  
  reorderSections: (fromIndex, toIndex) => set((state) => {
    if (!state.currentPage) return state;
    
    const sections = [...state.currentPage.sections];
    const [movedSection] = sections.splice(fromIndex, 1);
    sections.splice(toIndex, 0, movedSection);
    
    // Update order property
    const reorderedSections = sections.map((section, index) => ({
      ...section,
      order: index,
    }));
    
    return {
      currentPage: {
        ...state.currentPage,
        sections: reorderedSections,
        metadata: {
          ...state.currentPage.metadata,
          updatedAt: new Date(),
        },
      },
      isDirty: true,
    };
  }),
  
  duplicateSection: (id) => set((state) => {
    if (!state.currentPage) return state;
    
    const sectionToDuplicate = state.currentPage.sections.find((s) => s.id === id);
    if (!sectionToDuplicate) return state;
    
    const newSection: ComponentInstance = {
      ...sectionToDuplicate,
      id: get().generateSectionId(),
      order: state.currentPage.sections.length,
    };
    
    return {
      currentPage: {
        ...state.currentPage,
        sections: [...state.currentPage.sections, newSection],
        metadata: {
          ...state.currentPage.metadata,
          updatedAt: new Date(),
        },
      },
      isDirty: true,
    };
  }),
  
  // Selection
  selectSection: (id) => set({ selectedSectionId: id }),
  
  // Editor actions
  setMode: (mode) => set({ mode }),
  setDevice: (device) => set({ device }),
  setDirty: (isDirty) => set({ isDirty }),
  
  // Utility
  generateSectionId: () => `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
}));

/**
 * Create a default page for testing
 */
export const createDefaultPage = (): Page => ({
  id: crypto.randomUUID(),
  title: "New Landing Page",
  description: "A beautiful landing page",
  slug: "landing",
  sections: [],
  metadata: {
    createdAt: new Date(),
    updatedAt: new Date(),
    generatedBy: "manual",
    version: 1,
  },
  seo: {
    title: "New Landing Page",
    description: "A beautiful landing page built with AI",
  },
});
import { create } from "zustand";
import { registry } from "@/registry";

interface Section {
  id: string;
  componentSlug: string;
  props: Record<string, unknown>;
  order: number;
}

interface HistoryState {
  sections: Section[];
  pageTitle: string;
  pageSlug: string;
}

interface BuilderStore {
  // Page data
  pageTitle: string;
  pageSlug: string;
  sections: Section[];
  
  // UI state
  selectedSectionId: string | null;
  previewMode: "desktop" | "tablet" | "mobile";
  viewMode: "edit" | "preview";
  isSaving: boolean;
  
  // AI state
  isAiPanelOpen: boolean;
  aiPrompt: string;
  isGenerating: boolean;
  generationHistory: string[];
  
  // History for undo/redo
  history: HistoryState[];
  historyIndex: number;
  
  // Actions - Page
  setPageTitle: (title: string) => void;
  setPageSlug: (slug: string) => void;
  addSection: (componentSlug: string, props?: Record<string, unknown>) => void;
  removeSection: (id: string) => void;
  duplicateSection: (id: string) => void;
  updateSectionProps: (id: string, props: Record<string, unknown>) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;
  
  // Actions - UI
  selectSection: (id: string | null) => void;
  setPreviewMode: (mode: "desktop" | "tablet" | "mobile") => void;
  setViewMode: (mode: "edit" | "preview") => void;
  clearPage: () => void;
  loadPage: (data: { title?: string; slug?: string; sections?: Section[] }) => void;
  
  // Actions - AI
  setAiPanelOpen: (open: boolean) => void;
  setAiPrompt: (prompt: string) => void;
  generateWithAi: (prompt: string, mode: "section" | "page" | "enhance") => Promise<void>;
  addToGenerationHistory: (prompt: string) => void;
  
  // Actions - History
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  saveToHistory: () => void;
}

export const useBuilderStore = create<BuilderStore>((set, get) => ({
  // Initial state
  pageTitle: "New Page",
  pageSlug: "new-page",
  sections: [],
  selectedSectionId: null,
  previewMode: "desktop",
  viewMode: "edit",
  isSaving: false,
  
  // AI state
  isAiPanelOpen: false,
  aiPrompt: "",
  isGenerating: false,
  generationHistory: [],
  
  // History
  history: [{
    sections: [],
    pageTitle: "New Page",
    pageSlug: "new-page"
  }],
  historyIndex: 0,
  
  // Actions - Page
  setPageTitle: (title) => {
    set({ pageTitle: title });
    get().saveToHistory();
  },
  
  setPageSlug: (slug) => {
    set({ pageSlug: slug });
    get().saveToHistory();
  },
  
  addSection: (componentSlug, props) => {
    const component = registry.find(c => c.slug === componentSlug);
    if (!component) return;
    
    const newSection: Section = {
      id: `section-${Date.now()}`,
      componentSlug,
      props: props || component.props || {},
      order: get().sections.length,
    };
    
    set(state => ({
      sections: [...state.sections, newSection],
      selectedSectionId: newSection.id,
    }));
    
    get().saveToHistory();
  },
  
  removeSection: (id) => {
    set(state => ({
      sections: state.sections.filter(s => s.id !== id),
      selectedSectionId: state.selectedSectionId === id ? null : state.selectedSectionId,
    }));
    get().saveToHistory();
  },
  
  duplicateSection: (id) => {
    const state = get();
    const section = state.sections.find(s => s.id === id);
    if (!section) return;
    
    const newSection: Section = {
      ...section,
      id: `section-${Date.now()}`,
      order: section.order + 0.5, // Place it right after the original
    };
    
    set(state => ({
      sections: [...state.sections, newSection].sort((a, b) => a.order - b.order)
        .map((s, i) => ({ ...s, order: i })), // Reorder
      selectedSectionId: newSection.id,
    }));
    
    get().saveToHistory();
  },
  
  updateSectionProps: (id, props) => {
    set(state => ({
      sections: state.sections.map(s => 
        s.id === id ? { ...s, props } : s
      ),
    }));
    get().saveToHistory();
  },
  
  reorderSections: (fromIndex, toIndex) => {
    set(state => {
      const sections = [...state.sections];
      const [moved] = sections.splice(fromIndex, 1);
      sections.splice(toIndex, 0, moved);
      
      return {
        sections: sections.map((s, i) => ({ ...s, order: i })),
      };
    });
    get().saveToHistory();
  },
  
  // Actions - UI
  selectSection: (id) => set({ selectedSectionId: id }),
  setPreviewMode: (mode) => set({ previewMode: mode }),
  setViewMode: (mode) => set({ viewMode: mode }),
  
  clearPage: () => {
    set({
      pageTitle: "New Page",
      pageSlug: "new-page",
      sections: [],
      selectedSectionId: null,
    });
    get().saveToHistory();
  },
  
  loadPage: (data) => {
    set({
      pageTitle: data.title || "New Page",
      pageSlug: data.slug || "new-page",
      sections: data.sections || [],
      selectedSectionId: null,
    });
    get().saveToHistory();
  },
  
  // Actions - AI
  setAiPanelOpen: (open) => set({ isAiPanelOpen: open }),
  setAiPrompt: (prompt) => set({ aiPrompt: prompt }),
  
  generateWithAi: async (prompt, mode) => {
    set({ isGenerating: true });
    
    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          mode: mode === "page" ? "page" : "component",
        }),
      });
      
      if (!response.ok) throw new Error("Generation failed");
      
      const data = await response.json();
      
      if (mode === "page") {
        // Replace entire page
        set({
          sections: data.page.sections.map((s: any, i: number) => ({
            ...s,
            order: i,
          })),
          pageTitle: data.page.title || get().pageTitle,
          selectedSectionId: null,
        });
      } else if (mode === "section" && data.page.sections[0]) {
        // Add new section
        const newSection = {
          ...data.page.sections[0],
          id: `section-${Date.now()}`,
          order: get().sections.length,
        };
        
        set(state => ({
          sections: [...state.sections, newSection],
          selectedSectionId: newSection.id,
        }));
      }
      
      get().addToGenerationHistory(prompt);
      get().saveToHistory();
    } catch (error) {
      console.error("AI generation failed:", error);
    } finally {
      set({ isGenerating: false });
    }
  },
  
  addToGenerationHistory: (prompt) => {
    set(state => ({
      generationHistory: [prompt, ...state.generationHistory.slice(0, 9)], // Keep last 10
    }));
  },
  
  // Actions - History
  saveToHistory: () => {
    const state = get();
    const currentState: HistoryState = {
      sections: state.sections,
      pageTitle: state.pageTitle,
      pageSlug: state.pageSlug,
    };
    
    // Remove any future history if we're not at the end
    const newHistory = state.history.slice(0, state.historyIndex + 1);
    
    // Add new state
    newHistory.push(currentState);
    
    // Keep only last 50 states
    if (newHistory.length > 50) {
      newHistory.shift();
    }
    
    set({
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },
  
  undo: () => {
    const state = get();
    if (state.historyIndex > 0) {
      const newIndex = state.historyIndex - 1;
      const historyState = state.history[newIndex];
      
      set({
        sections: historyState.sections,
        pageTitle: historyState.pageTitle,
        pageSlug: historyState.pageSlug,
        historyIndex: newIndex,
      });
    }
  },
  
  redo: () => {
    const state = get();
    if (state.historyIndex < state.history.length - 1) {
      const newIndex = state.historyIndex + 1;
      const historyState = state.history[newIndex];
      
      set({
        sections: historyState.sections,
        pageTitle: historyState.pageTitle,
        pageSlug: historyState.pageSlug,
        historyIndex: newIndex,
      });
    }
  },
  
  canUndo: () => get().historyIndex > 0,
  canRedo: () => get().historyIndex < get().history.length - 1,
}));
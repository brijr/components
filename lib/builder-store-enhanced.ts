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
      order: get().sections.length
    };
    
    set(state => ({
      sections: [...state.sections, newSection],
      selectedSectionId: newSection.id
    }));
    
    get().saveToHistory();
  },
  
  removeSection: (id) => {
    set(state => ({
      sections: state.sections.filter(s => s.id !== id),
      selectedSectionId: state.selectedSectionId === id ? null : state.selectedSectionId
    }));
    
    get().saveToHistory();
  },
  
  duplicateSection: (id) => {
    const section = get().sections.find(s => s.id === id);
    if (!section) return;
    
    const newSection: Section = {
      ...section,
      id: `section-${Date.now()}`,
      order: section.order + 0.5
    };
    
    set(state => ({
      sections: [...state.sections, newSection].sort((a, b) => a.order - b.order)
        .map((s, i) => ({ ...s, order: i })),
      selectedSectionId: newSection.id
    }));
    
    get().saveToHistory();
  },
  
  updateSectionProps: (id, props) => {
    set(state => ({
      sections: state.sections.map(s => 
        s.id === id ? { ...s, props } : s
      )
    }));
    
    get().saveToHistory();
  },
  
  reorderSections: (fromIndex, toIndex) => {
    set(state => {
      const newSections = [...state.sections];
      const [removed] = newSections.splice(fromIndex, 1);
      newSections.splice(toIndex, 0, removed);
      
      return {
        sections: newSections.map((s, i) => ({ ...s, order: i }))
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
      selectedSectionId: null
    });
    
    get().saveToHistory();
  },
  
  loadPage: (data) => {
    set({
      pageTitle: data.title || "New Page",
      pageSlug: data.slug || "new-page",
      sections: data.sections || [],
      selectedSectionId: null
    });
    
    get().saveToHistory();
  },
  
  // Actions - History
  saveToHistory: () => {
    const { sections, pageTitle, pageSlug, history, historyIndex } = get();
    const newState = { sections, pageTitle, pageSlug };
    
    // Remove any future history if we're not at the end
    const newHistory = history.slice(0, historyIndex + 1);
    
    // Add new state (limit history to 50 entries)
    newHistory.push(newState);
    if (newHistory.length > 50) {
      newHistory.shift();
    }
    
    set({
      history: newHistory,
      historyIndex: newHistory.length - 1
    });
  },
  
  undo: () => {
    const { history, historyIndex } = get();
    
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      set({
        ...prevState,
        historyIndex: historyIndex - 1
      });
    }
  },
  
  redo: () => {
    const { history, historyIndex } = get();
    
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      set({
        ...nextState,
        historyIndex: historyIndex + 1
      });
    }
  },
  
  canUndo: () => get().historyIndex > 0,
  canRedo: () => get().historyIndex < get().history.length - 1
}));
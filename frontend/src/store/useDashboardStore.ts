import { create } from 'zustand';
import { persist } from 'zustand/middleware';


export interface DashboardComponent {
    id: string;
    type: string;
    title: string;
    config?: any;
    w?: number; // width in grid columns (1 or 2)
    h?: number; // height unit (1, 2, etc.)
}

export interface DashboardPage {
    id: string;
    title: string;
    components: DashboardComponent[];
}

export interface Section {
    id: string;
    title: string;
    iconName: string; // Stored as string to allow persistence
    components: DashboardComponent[];
    pages: DashboardPage[];
}

interface DashboardState {
    sections: Section[];
    activeSectionId: string | null;
    activePageId: string | null; // For modal

    // Actions
    addSection: (section: Omit<Section, 'id' | 'components' | 'pages'>) => void;
    removeSection: (id: string) => void;
    updateSection: (id: string, updates: Partial<Section>) => void;

    addComponent: (sectionId: string, component: Omit<DashboardComponent, 'id'>) => void;
    removeComponent: (sectionId: string, componentId: string) => void;

    addPage: (sectionId: string, page: Omit<DashboardPage, 'id' | 'components'>) => void;
    removePage: (sectionId: string, pageId: string) => void;

    setActiveSection: (id: string | null) => void;
    setActivePage: (id: string | null) => void;

    resetToDefault: () => void;
    reorderComponents: (sectionId: string, oldIndex: number, newIndex: number) => void;
    updateComponentSize: (sectionId: string, componentId: string, w: number, h: number) => void;
}

const DEFAULT_SECTIONS: Section[] = [];

export const useDashboardStore = create<DashboardState>()(
    persist(
        (set) => ({
            sections: DEFAULT_SECTIONS,
            activeSectionId: null,
            activePageId: null,

            addSection: (section) => set((state) => ({
                sections: [...state.sections, {
                    ...section,
                    id: Math.random().toString(36).substr(2, 9),
                    components: [],
                    pages: []
                }]
            })),

            removeSection: (id) => set((state) => ({
                sections: state.sections.filter(s => s.id !== id)
            })),

            updateSection: (id, updates) => set((state) => ({
                sections: state.sections.map(s => s.id === id ? { ...s, ...updates } : s)
            })),

            addComponent: (sectionId, component) => set((state) => ({
                sections: state.sections.map(s => s.id === sectionId ? {
                    ...s,
                    components: [...s.components, { ...component, id: Math.random().toString(36).substr(2, 9) }]
                } : s)
            })),

            removeComponent: (sectionId, componentId) => set((state) => ({
                sections: state.sections.map(s => s.id === sectionId ? {
                    ...s,
                    components: s.components.filter(c => c.id !== componentId)
                } : s)
            })),

            addPage: (sectionId, page) => set((state) => ({
                sections: state.sections.map(s => s.id === sectionId ? {
                    ...s,
                    pages: [...s.pages, { ...page, id: Math.random().toString(36).substr(2, 9), components: [] }]
                } : s)
            })),

            removePage: (sectionId, pageId) => set((state) => ({
                sections: state.sections.map(s => s.id === sectionId ? {
                    ...s,
                    pages: s.pages.filter(p => p.id !== pageId)
                } : s)
            })),

            setActiveSection: (id) => set({ activeSectionId: id }),
            setActivePage: (id) => set({ activePageId: id }),

            reorderComponents: (sectionId, oldIndex, newIndex) => set((state) => {
                const sections = state.sections.map(s => {
                    if (s.id !== sectionId) return s;
                    const newComponents = [...s.components];
                    const [removed] = newComponents.splice(oldIndex, 1);
                    newComponents.splice(newIndex, 0, removed);
                    return { ...s, components: newComponents };
                });
                return { sections };
            }),

            updateComponentSize: (sectionId, componentId, w, h) => set((state) => ({
                sections: state.sections.map(s => s.id === sectionId ? {
                    ...s,
                    components: s.components.map(c => c.id === componentId ? { ...c, w, h } : c)
                } : s)
            })),

            resetToDefault: () => set({ sections: DEFAULT_SECTIONS })
        }),
        {
            name: 'dashboard-storage-v3',
        }
    )
);

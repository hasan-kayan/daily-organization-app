import { create } from 'zustand';
import { persist } from 'zustand/middleware';


export interface DashboardComponent {
    id: string;
    type: string;
    title: string;
    config?: any;
    gridSpan?: number; // 1 or 2
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
}

const DEFAULT_SECTIONS: Section[] = [
    {
        id: 'home',
        title: 'Dashboard',
        iconName: 'LayoutDashboard',
        components: [],
        pages: []
    }
];

export const useDashboardStore = create<DashboardState>()(
    persist(
        (set) => ({
            sections: DEFAULT_SECTIONS,
            activeSectionId: 'home',
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

            resetToDefault: () => set({ sections: DEFAULT_SECTIONS })
        }),
        {
            name: 'dashboard-storage',
        }
    )
);

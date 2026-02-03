import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ProjectTask {
    id: string;
    text: string;
    completed: boolean;
}

export interface PortfolioProject {
    id: string;
    title: string;
    category: 'SaaS' | 'E-commerce' | 'Open Source' | 'Content';
    status: 'BETA' | 'DEV' | 'LIVE';
    roi: string;
    progress: number;
    imageUrl: string;
    pendingTasks: ProjectTask[];
}

interface PortfolioState {
    ecosystemProgress: number;
    projects: PortfolioProject[];
    addProject: (project: PortfolioProject) => void;
    updateProjectProgress: (id: string, progress: number) => void;
    toggleTask: (projectId: string, taskId: string) => void;
}

export const usePortfolioStore = create<PortfolioState>()(
    persist(
        (set) => ({
            ecosystemProgress: 68,
            projects: initialProjects,
            addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
            updateProjectProgress: (id, progress) => set((state) => ({
                projects: state.projects.map(p => p.id === id ? { ...p, progress } : p)
            })),
            toggleTask: (projectId, taskId) => set((state) => ({
                projects: state.projects.map(p => {
                    if (p.id !== projectId) return p;
                    return {
                        ...p,
                        pendingTasks: p.pendingTasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
                    };
                })
            })),
        }),
        {
            name: 'portfolio-storage',
        }
    )
);

const initialProjects: PortfolioProject[] = [
    {
        id: '1',
        title: 'AI Automation SaaS',
        category: 'SaaS',
        status: 'BETA',
        roi: '25%',
        progress: 85,
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
        pendingTasks: [
            { id: 't1', text: 'Integrate LLM API Endpoints', completed: false },
            { id: 't2', text: 'Build dashboard UI components', completed: false },
        ],
    },
    {
        id: '2',
        title: 'Minimalist Apparel',
        category: 'E-commerce',
        status: 'DEV',
        roi: '12%',
        progress: 32,
        imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop',
        pendingTasks: [
            { id: 't3', text: 'Finalize supplier contracts', completed: false },
        ],
    },
];

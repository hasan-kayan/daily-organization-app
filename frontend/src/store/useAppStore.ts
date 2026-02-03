import { create } from 'zustand';

interface AppState {
    isSidebarOpen: boolean;
    theme: 'dark' | 'light';
    setSidebarOpen: (isOpen: boolean) => void;
    toggleSidebar: () => void;
    setTheme: (theme: 'dark' | 'light') => void;
}

export const useAppStore = create<AppState>((set) => ({
    isSidebarOpen: true,
    theme: 'dark',
    setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    setTheme: (theme) => set({ theme }),
}));

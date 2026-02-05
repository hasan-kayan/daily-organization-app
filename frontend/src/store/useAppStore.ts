import { create } from 'zustand';

interface AppState {
    isSidebarOpen: boolean;
    theme: 'dark' | 'light';
    setSidebarOpen: (isOpen: boolean) => void;
    toggleSidebar: () => void;
    setTheme: (theme: 'dark' | 'light') => void;

    // Confirmation Modal
    confirmation: {
        isOpen: boolean;
        title: string;
        message: string;
        onConfirm: () => void;
        isAlert?: boolean;
    } | null;
    confirmAction: (title: string, message: string, onConfirm: () => void, isAlert?: boolean) => void;
    closeConfirmation: () => void;
}

export const useAppStore = create<AppState>((set) => ({
    isSidebarOpen: true,
    theme: 'dark',
    confirmation: null,
    setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    setTheme: (theme) => set({ theme }),
    confirmAction: (title, message, onConfirm, isAlert) => set({
        confirmation: { isOpen: true, title, message, onConfirm, isAlert }
    }),
    closeConfirmation: () => set({ confirmation: null }),
}));

import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import * as Icons from 'lucide-react';
import {
    Plus,
    LogOut,
    Menu,
    X,
    LayoutDashboard
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';
import { useAppStore } from '@/store/useAppStore';
import { useDashboardStore } from '@/store/useDashboardStore';
import PageModal from '@/components/dashboard/PageModal';

const DashboardLayout: React.FC = () => {
    const { isSidebarOpen, toggleSidebar } = useAppStore();
    const { sections, addSection, setActiveSection } = useDashboardStore();
    const { user, logout } = useAuthStore();
    const location = useLocation();

    const getIcon = (name: string) => {
        const Icon = (Icons as any)[name];
        return Icon || Icons.Folder;
    };

    const handleAddSection = () => {
        const title = prompt('Enter section title:');
        if (title) {
            addSection({ title, iconName: 'Folder' });
        }
    };

    return (
        <div className="flex h-screen bg-[#020617] text-white overflow-hidden">
            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 bg-[#101922] border-r border-slate-800 transition-transform duration-300 transform",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full",
                    "lg:relative lg:translate-x-0"
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <LayoutDashboard className="text-white w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">LifeOS</span>
                    </div>

                    {/* Nav Links */}
                    <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
                        <div className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            <span>Sections</span>
                            <button onClick={handleAddSection} className="hover:text-blue-400 transition-colors">
                                <Plus className="w-3.5 h-3.5" />
                            </button>
                        </div>
                        {sections.map((section) => {
                            const path = `/section/${section.id}`;
                            const isActive = location.pathname === path;
                            const Icon = getIcon(section.iconName);

                            return (
                                <Link
                                    key={section.id}
                                    to={path}
                                    onClick={() => setActiveSection(section.id)}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                                        isActive
                                            ? "bg-blue-600/10 text-blue-400 font-medium"
                                            : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                                    )}
                                >
                                    <Icon className={cn("w-5 h-5", isActive ? "text-blue-400" : "text-slate-500")} />
                                    {section.title}
                                    {isActive && (
                                        <div className="ml-auto w-1.5 h-1.5 bg-blue-400 rounded-full" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Profile & Logout */}
                    <div className="p-4 border-t border-slate-800 space-y-2">
                        <div className="flex items-center gap-3 px-3 py-2">
                            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
                                <span className="text-sm font-bold text-blue-400">{user?.name?.charAt(0) || 'U'}</span>
                            </div>
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-sm font-medium text-slate-200 truncate">{user?.name || 'User'}</span>
                                <span className="text-xs text-slate-500 truncate">{user?.email || 'user@example.com'}</span>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-3 text-slate-500 hover:text-red-400 hover:bg-red-400/5 px-3"
                            onClick={logout}
                        >
                            <LogOut className="w-5 h-5" />
                            Logout
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Mobile Header */}
                <header className="lg:hidden flex items-center justify-between p-4 bg-[#101922] border-bottom border-slate-800">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <LayoutDashboard className="text-white w-5 h-5" />
                        </div>
                        <span className="text-lg font-bold">LifeOS</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                        {isSidebarOpen ? <X /> : <Menu />}
                    </Button>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#020617] to-[#101922] p-4 lg:p-8">
                    <Outlet />
                </main>
            </div>

            {/* Modals */}
            <PageModal />
        </div>
    );
};

export default DashboardLayout;

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Plus, Trash2, Settings2 } from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';

interface Project {
    id: string;
    title: string;
    status: 'To Do' | 'In Progress' | 'Done';
    priority: 'High' | 'Low';
    dueDate: string;
    parentProject: string;
    imageUrl?: string;
}

interface ProjectTrackProps {
    sectionId: string;
    componentId: string;
    title?: string;
    projects?: Project[];
}

import { useAppStore } from '@/store/useAppStore';

const ProjectTrack: React.FC<ProjectTrackProps> = ({
    sectionId,
    componentId,
    title,
    projects = []
}) => {
    const { updateComponentConfig } = useDashboardStore();
    const { confirmAction } = useAppStore();
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState<Project['status']>('In Progress');

    const updateConfig = (newProjects: Project[]) => {
        updateComponentConfig(sectionId, componentId, {
            projects: newProjects
        });
    };

    const filteredProjects = projects.filter(p => p.status === activeTab);
    const tabs: Project['status'][] = ['To Do', 'In Progress', 'Done'];

    const handleAddProject = () => {
        const projectTitle = prompt('Project Title:');
        if (!projectTitle) return;
        const parentProject = prompt('Parent Project/Category:', 'General') || 'General';
        const dueDate = prompt('Due Date:', 'Next Week') || 'Next Week';
        const priority = confirm('Is it High Priority?') ? 'High' : 'Low';

        const newProject: Project = {
            id: Math.random().toString(36).substr(2, 9),
            title: projectTitle,
            status: activeTab,
            priority,
            dueDate,
            parentProject,
        };
        updateConfig([...projects, newProject]);
    };

    const handleRemoveProject = (id: string) => {
        const project = projects.find(p => p.id === id);
        confirmAction(
            'Delete Project',
            `Are you sure you want to delete "${project?.title}"? All progress will be lost.`,
            () => updateConfig(projects.filter(p => p.id !== id))
        );
    };

    const handleUpdateStatus = (id: string, newStatus: Project['status']) => {
        updateConfig(projects.map(p => p.id === id ? { ...p, status: newStatus } : p));
    };

    return (
        <div className="space-y-6 flex flex-col h-full">
            <div className="flex items-center justify-between px-1">
                <h3 className="text-2xl font-black text-white">{title || 'Current Projects'}</h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                            isEditing ? "bg-blue-600 text-white" : "text-slate-500 hover:text-blue-400 hover:bg-blue-400/10"
                        )}
                    >
                        <Settings2 className="w-4 h-4" />
                    </button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-500 hover:text-white"
                        onClick={handleAddProject}
                    >
                        <Plus className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-800 gap-8 px-2">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "pb-4 pt-2 text-sm font-bold transition-all relative",
                            activeTab === tab ? "text-blue-500" : "text-slate-500 hover:text-slate-300"
                        )}
                    >
                        {tab}
                        {activeTab === tab && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600 rounded-t-full"
                            />
                        )}
                    </button>
                ))}
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto scrollbar-hide py-2">
                <AnimatePresence mode="popLayout" initial={false}>
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="flex items-stretch justify-between gap-4 rounded-3xl bg-slate-900/40 p-5 shadow-sm border border-slate-800/50 hover:border-slate-700 transition-all group"
                        >
                            <div className="flex flex-col justify-between items-start gap-4 flex-1">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className={cn(
                                            "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider",
                                            project.priority === 'High' ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                        )}>
                                            {project.priority} Priority
                                        </span>
                                    </div>
                                    <h4 className="text-white text-lg font-black leading-tight group-hover:text-blue-400 transition-colors">{project.title}</h4>
                                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                                        {project.parentProject} • Due {project.dueDate}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 w-full">
                                    {isEditing ? (
                                        <Button
                                            variant="ghost"
                                            className="bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-500 text-[10px] font-black uppercase tracking-widest px-6 h-10 rounded-xl transition-all"
                                            onClick={() => handleRemoveProject(project.id)}
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() => handleUpdateStatus(project.id, activeTab === 'To Do' ? 'In Progress' : 'Done')}
                                            className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-6 h-10 rounded-xl transition-all shadow-lg shadow-blue-600/10 flex-1"
                                        >
                                            {activeTab === 'To Do' ? 'Start Working' : activeTab === 'In Progress' ? 'Mark Done' : 'Reopen'}
                                        </Button>
                                    )}
                                </div>
                            </div>

                            {project.imageUrl && (
                                <div
                                    className="w-24 h-24 bg-cover bg-center rounded-2xl border border-slate-700/50 grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500"
                                    style={{ backgroundImage: `url(${project.imageUrl})` }}
                                />
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-3xl opacity-50">
                        <AlertCircle className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">No projects in this stage</p>
                        <Button
                            variant="link"
                            className="mt-4 text-blue-400 font-bold h-auto p-0"
                            onClick={handleAddProject}
                        >
                            Add Your First Project
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectTrack;

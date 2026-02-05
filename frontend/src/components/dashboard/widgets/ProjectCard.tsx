import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ListTodo, ArrowUpRight, CheckSquare, Square, Settings2, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDashboardStore } from '@/store/useDashboardStore';

interface Task {
    id: string;
    text: string;
    completed: boolean;
}

interface ProjectCardProps {
    sectionId: string;
    componentId: string;
    title?: string;
    category?: string;
    status?: 'LIVE' | 'BETA' | 'ALPHA';
    progress?: number;
    roi?: string;
    imageUrl?: string;
    pendingTasks?: Task[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    sectionId,
    componentId,
    title = 'New Project',
    category = 'General',
    status = 'ALPHA',
    progress = 0,
    roi = '0%',
    imageUrl = '',
    pendingTasks = []
}) => {
    const { updateComponentConfig } = useDashboardStore();
    const [isEditing, setIsEditing] = useState(false);

    const updateConfig = (updates: Partial<ProjectCardProps>) => {
        updateComponentConfig(sectionId, componentId, {
            title,
            category,
            status,
            progress,
            roi,
            imageUrl,
            pendingTasks,
            ...updates
        });
    };

    const handleAddTask = () => {
        const text = prompt('New Task:');
        if (!text) return;
        const newTask: Task = {
            id: Math.random().toString(36).substr(2, 9),
            text,
            completed: false
        };
        updateConfig({ pendingTasks: [...pendingTasks, newTask] });
    };

    const toggleTask = (taskId: string) => {
        updateConfig({
            pendingTasks: pendingTasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
        });
    };

    const removeTask = (taskId: string) => {
        updateConfig({
            pendingTasks: pendingTasks.filter(t => t.id !== taskId)
        });
    };

    const handleEditBasic = () => {
        const newTitle = prompt('Project Title:', title);
        if (newTitle === null) return;
        const newCategory = prompt('Category:', category);
        const newProgress = parseInt(prompt('Progress (%):', progress.toString()) || '0');
        const newRoi = prompt('ROI:', roi);

        updateConfig({
            title: newTitle,
            category: newCategory || category,
            progress: isNaN(newProgress) ? progress : newProgress,
            roi: newRoi || roi
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col rounded-3xl overflow-hidden bg-slate-900/40 border border-slate-800/50 hover:border-slate-700 transition-all group h-full"
        >
            <div
                className="aspect-[21/9] bg-cover bg-center relative"
                style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url(${imageUrl || 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&auto=format&fit=crop&q=60'})` }}
            >
                <div className="absolute top-4 left-4">
                    <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase",
                        status === 'LIVE' ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" :
                            status === 'BETA' ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" :
                                "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                    )}>
                        {status}
                    </span>
                </div>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-blue-600 transition-all"
                >
                    <Settings2 className="w-4 h-4" />
                </button>
            </div>

            <div className="p-6 space-y-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                    <div className="cursor-pointer" onClick={handleEditBasic}>
                        <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{category}</p>
                        <h3 className="text-white text-xl font-black tracking-tight group-hover:text-blue-400 transition-colors">{title}</h3>
                    </div>
                    <div className="text-right">
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Est. ROI</p>
                        <p className="text-emerald-400 font-black flex items-center gap-1">
                            <ArrowUpRight className="w-4 h-4" /> {roi}
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                        <span className="text-slate-500">Current Phase</span>
                        <span className="text-slate-200">{progress}% Complete</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="h-full rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                        />
                    </div>
                </div>

                <div className="bg-slate-800/20 rounded-2xl p-4 border border-slate-800/30 flex-1">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Pending Tasks ({pendingTasks.filter(t => !t.completed).length})</p>
                        <button onClick={handleAddTask} className="text-blue-400 hover:text-blue-300">
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="space-y-2">
                        <AnimatePresence mode="popLayout" initial={false}>
                            {pendingTasks.map((task) => (
                                <motion.div
                                    key={task.id}
                                    layout
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="flex items-center gap-3 w-full text-left group/task"
                                >
                                    <button
                                        onClick={() => toggleTask(task.id)}
                                        className="flex items-center gap-3 flex-1"
                                    >
                                        {task.completed ? (
                                            <CheckSquare className="w-4 h-4 text-emerald-500" />
                                        ) : (
                                            <Square className="w-4 h-4 text-slate-600 group-hover/task:text-blue-400" />
                                        )}
                                        <p className={cn(
                                            "text-xs font-medium transition-colors",
                                            task.completed ? "text-slate-600 line-through" : "text-slate-300 group-hover/task:text-white"
                                        )}>
                                            {task.text}
                                        </p>
                                    </button>
                                    {isEditing && (
                                        <button onClick={() => removeTask(task.id)} className="text-red-400 opacity-0 group-hover/task:opacity-100 transition-all">
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {pendingTasks.length === 0 && (
                            <p className="text-slate-600 text-[10px] italic text-center py-2">No tasks defined.</p>
                        )}
                    </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest py-6 rounded-2xl transition-all shadow-xl shadow-blue-600/20 mt-auto">
                    <ListTodo className="w-4 h-4 mr-2" /> Manage Project
                </Button>
            </div>
        </motion.div>
    );
};

export default ProjectCard;

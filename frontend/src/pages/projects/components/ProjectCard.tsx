import React from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import type { PortfolioProject } from '@/store/usePortfolioStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ListTodo, ArrowUpRight, CheckSquare, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectCardProps {
    project: PortfolioProject;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const { toggleTask } = usePortfolioStore();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col rounded-3xl overflow-hidden bg-slate-900/40 border border-slate-800/50 hover:border-slate-700 transition-all group"
        >
            <div
                className="aspect-[21/9] bg-cover bg-center relative"
                style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6)), url(${project.imageUrl})` }}
            >
                <div className="absolute top-4 left-4">
                    <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase",
                        project.status === 'LIVE' ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" :
                            project.status === 'BETA' ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" :
                                "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                    )}>
                        {project.status}
                    </span>
                </div>
            </div>

            <div className="p-6 space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{project.category}</p>
                        <h3 className="text-white text-xl font-black tracking-tight group-hover:text-blue-400 transition-colors">{project.title}</h3>
                    </div>
                    <div className="text-right">
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Est. ROI</p>
                        <p className="text-emerald-400 font-black flex items-center gap-1">
                            <ArrowUpRight className="w-4 h-4" /> {project.roi}
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                        <span className="text-slate-500">Current Phase</span>
                        <span className="text-slate-200">{project.progress}% Complete</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress}%` }}
                            className="h-full rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                        />
                    </div>
                </div>

                <div className="bg-slate-800/20 rounded-2xl p-4 border border-slate-800/30">
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4">Pending Tasks ({project.pendingTasks.filter(t => !t.completed).length})</p>
                    <div className="space-y-2">
                        {project.pendingTasks.map((task) => (
                            <button
                                key={task.id}
                                onClick={() => toggleTask(project.id, task.id)}
                                className="flex items-center gap-3 w-full text-left group/task"
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
                        ))}
                    </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest py-6 rounded-2xl transition-all shadow-xl shadow-blue-600/20">
                    <ListTodo className="w-4 h-4 mr-2" /> Manage Project
                </Button>
            </div>
        </motion.div>
    );
};

export default ProjectCard;

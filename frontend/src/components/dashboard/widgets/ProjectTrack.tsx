import React from 'react';
import { useJobStore } from '@/store/useJobStore';
import type { JobProject } from '@/store/useJobStore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const ProjectTrack: React.FC = () => {
    const { projects, updateProjectStatus } = useJobStore();
    const [activeTab, setActiveTab] = React.useState<JobProject['status']>('In Progress');

    const filteredProjects = projects.filter(p => p.status === activeTab);

    const tabs: JobProject['status'][] = ['To Do', 'In Progress', 'Done'];

    return (
        <div className="space-y-6">
            <h3 className="text-2xl font-black text-white px-1">Current Projects</h3>

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

            <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="flex items-stretch justify-between gap-4 rounded-3xl bg-slate-900/40 p-5 shadow-sm border border-slate-800/50 hover:border-slate-700 transition-all group"
                        >
                            <div className="flex flex-col justify-between items-start gap-4">
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
                                <Button
                                    onClick={() => updateProjectStatus(project.id, activeTab === 'To Do' ? 'In Progress' : 'Done')}
                                    className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest px-6 h-10 rounded-xl transition-all shadow-lg shadow-blue-600/10"
                                >
                                    {activeTab === 'To Do' ? 'Start Working' : activeTab === 'In Progress' ? 'Mark Done' : 'Reopen'}
                                </Button>
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
                    <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-3xl">
                        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">No projects in this stage</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectTrack;

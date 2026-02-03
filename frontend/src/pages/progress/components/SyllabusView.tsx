import React from 'react';
import { useProgressStore } from '@/store/useProgressStore';
import type { Module } from '@/store/useProgressStore';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, PlayCircle, Lock, FileText, Video, Terminal, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

const iconMap = {
    description: FileText,
    video: Video,
    terminal: Terminal,
};

const SyllabusView: React.FC = () => {
    const { topics, activeTopicId, toggleModuleStatus } = useProgressStore();
    const activeTopic = topics.find(t => t.id === activeTopicId);

    if (!activeTopic) return null;

    return (
        <div className="bg-slate-900/40 rounded-3xl border border-slate-800/50 overflow-hidden backdrop-blur-sm">
            <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <span className="text-blue-500 text-[10px] font-bold uppercase tracking-wider mb-1 block">Course Syllabus</span>
                        <h3 className="text-2xl font-black text-white">{activeTopic.title}</h3>
                    </div>
                    <Button variant="ghost" size="icon" className="text-slate-500 hover:text-white">
                        <MoreVertical className="w-5 h-5" />
                    </Button>
                </div>

                {/* Progress Details */}
                <div className="mb-8">
                    <div className="flex justify-between text-xs font-bold mb-3">
                        <span className="text-slate-500 uppercase tracking-widest">Overall Progress</span>
                        <span className="text-blue-400">
                            {activeTopic.syllabus.filter(m => m.status === 'completed').length} of {activeTopic.syllabus.length} lessons
                        </span>
                    </div>
                    <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${activeTopic.progress}%` }}
                            className="h-full bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                        />
                    </div>
                </div>

                {/* Modules List */}
                <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                        {activeTopic.syllabus.map((module) => {
                            const Icon = iconMap[module.type as keyof typeof iconMap] || FileText;
                            const isCompleted = module.status === 'completed';
                            const isCurrent = module.status === 'current';
                            const isLocked = module.status === 'locked';

                            return (
                                <motion.button
                                    key={module.id}
                                    layout
                                    onClick={() => !isLocked && toggleModuleStatus(activeTopic.id, module.id)}
                                    className={cn(
                                        "w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left group",
                                        isCompleted && "bg-slate-800/20 border-slate-800/50 grayscale-[0.5] opacity-80 hover:grayscale-0 hover:opacity-100",
                                        isCurrent && "bg-blue-600/10 border-blue-600/30 ring-2 ring-blue-600/5",
                                        isLocked && "bg-slate-900 border-slate-800/30 opacity-40 cursor-not-allowed"
                                    )}
                                >
                                    <div className={cn(
                                        "flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full transition-colors",
                                        isCompleted && "bg-emerald-500/20 text-emerald-500",
                                        isCurrent && "bg-blue-600 text-white shadow-lg shadow-blue-600/20",
                                        isLocked && "bg-slate-800 text-slate-500"
                                    )}>
                                        {isCompleted ? <CheckCircle2 className="w-6 h-6" /> :
                                            isCurrent ? <PlayCircle className="w-6 h-6" /> :
                                                <Lock className="w-5 h-5" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className={cn(
                                            "text-sm font-bold truncate",
                                            isCurrent ? "text-blue-400" : "text-slate-200"
                                        )}>
                                            {module.title}
                                        </h4>
                                        <p className="text-[11px] text-slate-500 truncate group-hover:text-slate-400">
                                            {module.description}
                                        </p>
                                    </div>
                                    <Icon className={cn(
                                        "w-4 h-4 transition-colors",
                                        isCurrent ? "text-blue-400" : "text-slate-600"
                                    )} />
                                </motion.button>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default SyllabusView;

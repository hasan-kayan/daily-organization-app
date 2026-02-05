import React, { useState } from 'react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle2,
    PlayCircle,
    Lock,
    FileText,
    Video,
    Terminal,
    Plus,
    Trash2,
    Settings2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

import { useAppStore } from '@/store/useAppStore';

interface Module {
    id: string;
    title: string;
    description: string;
    status: 'completed' | 'current' | 'locked';
    type: 'syntax' | 'video' | 'terminal' | 'description';
}

interface SyllabusTopic {
    id: string;
    title: string;
    progress: number;
    syllabus: Module[];
}

interface SyllabusViewProps {
    sectionId: string;
    componentId: string;
    title?: string;
    topics?: SyllabusTopic[];
    activeTopicId?: string | null;
}

const iconMap = {
    description: FileText,
    video: Video,
    terminal: Terminal,
    syntax: Terminal
};

const SyllabusView: React.FC<SyllabusViewProps> = ({
    sectionId,
    componentId,
    title,
    topics = [],
    activeTopicId: initialActiveTopicId
}) => {
    const { updateComponentConfig } = useDashboardStore();
    const { confirmAction } = useAppStore();
    const [isEditing, setIsEditing] = useState(false);
    const [localActiveTopicId, setLocalActiveTopicId] = useState<string | null>(initialActiveTopicId || (topics[0]?.id || null));

    const activeTopic = topics.find(t => t.id === localActiveTopicId);

    const updateConfig = (newTopics: SyllabusTopic[], newActiveId: string | null) => {
        updateComponentConfig(sectionId, componentId, {
            topics: newTopics,
            activeTopicId: newActiveId
        });
    };

    const handleAddTopic = () => {
        const title = prompt('Enter topic title:');
        if (!title) return;

        const newTopic: SyllabusTopic = {
            id: Math.random().toString(36).substr(2, 9),
            title,
            progress: 0,
            syllabus: []
        };
        const newTopics = [...topics, newTopic];
        updateConfig(newTopics, newTopic.id);
        setLocalActiveTopicId(newTopic.id);
    };

    const handleAddModule = (topicId: string) => {
        const title = prompt('Enter module title:');
        if (!title) return;

        const newModule: Module = {
            id: Math.random().toString(36).substr(2, 9),
            title,
            description: 'New module description',
            status: 'locked',
            type: 'description'
        };

        const newTopics = topics.map(t => {
            if (t.id !== topicId) return t;
            const newSyllabus = [...t.syllabus, newModule];
            return { ...t, syllabus: newSyllabus };
        });
        updateConfig(newTopics, localActiveTopicId);
    };

    const toggleModuleStatus = (topicId: string, moduleId: string) => {
        const newTopics = topics.map(topic => {
            if (topic.id !== topicId) return topic;
            const newSyllabus = topic.syllabus.map(mod => {
                if (mod.id !== moduleId) return mod;
                const statusMap: Record<string, 'completed' | 'current' | 'locked'> = {
                    'current': 'completed',
                    'completed': 'current',
                    'locked': 'current'
                };
                return { ...mod, status: statusMap[mod.status] || mod.status };
            });
            const completedCount = newSyllabus.filter(m => m.status === 'completed').length;
            const progress = Math.round((completedCount / newSyllabus.length) * 100);
            return { ...topic, syllabus: newSyllabus, progress };
        });
        updateConfig(newTopics, localActiveTopicId);
    };

    const handleRemoveTopic = (id: string) => {
        const newTopics = topics.filter(t => t.id !== id);
        const nextActive = newTopics[0]?.id || null;
        updateConfig(newTopics, nextActive);
        setLocalActiveTopicId(nextActive);
    };

    if (topics.length === 0) {
        return (
            <div className="bg-[#101922]/40 rounded-3xl border border-slate-800/50 p-12 text-center backdrop-blur-sm h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
                    <FileText className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-200 mb-2">No Syllabus Topics</h3>
                <p className="text-slate-500 text-sm max-w-[200px] mb-6">Create your first topic to start tracking your progress.</p>
                <Button
                    className="bg-blue-600 hover:bg-blue-700 h-10 px-6 rounded-xl"
                    onClick={handleAddTopic}
                >
                    Add Your First Topic
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-slate-900/40 rounded-3xl border border-slate-800/50 overflow-hidden backdrop-blur-sm h-full flex flex-col">
            <div className="p-6 flex-1 overflow-y-auto scrollbar-hide">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <span className="text-blue-500 text-[10px] font-bold uppercase tracking-wider mb-1 block">{title || 'Course Syllabus'}</span>
                        <div className="flex items-center gap-3">
                            <h3 className="text-2xl font-black text-white">{activeTopic?.title}</h3>
                            <button onClick={() => setIsEditing(!isEditing)} className="text-slate-600 hover:text-blue-400 transition-colors">
                                <Settings2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <select
                            value={localActiveTopicId || ''}
                            onChange={(e) => setLocalActiveTopicId(e.target.value)}
                            className="bg-slate-800 border-none text-xs font-bold text-slate-300 rounded-lg px-3 py-1 outline-none focus:ring-1 focus:ring-blue-500/50"
                        >
                            {topics.map(t => (
                                <option key={t.id} value={t.id}>{t.title}</option>
                            ))}
                        </select>
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-white" onClick={handleAddTopic}>
                            <Plus className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {activeTopic && (
                    <>
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
                                        <motion.div
                                            key={module.id}
                                            layout
                                            className={cn(
                                                "w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left group relative",
                                                isCompleted && "bg-slate-800/20 border-slate-800/50 grayscale-[0.5] opacity-80 hover:grayscale-0 hover:opacity-100",
                                                isCurrent && "bg-blue-600/10 border-blue-600/30 ring-2 ring-blue-600/5",
                                                isLocked && "bg-slate-900 border-slate-800/30 opacity-40"
                                            )}
                                        >
                                            <button
                                                onClick={() => toggleModuleStatus(activeTopic.id, module.id)}
                                                className={cn(
                                                    "flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full transition-colors",
                                                    isCompleted && "bg-emerald-500/20 text-emerald-500",
                                                    isCurrent && "bg-blue-600 text-white shadow-lg shadow-blue-600/20",
                                                    isLocked && "bg-slate-800 text-slate-500"
                                                )}
                                            >
                                                {isCompleted ? <CheckCircle2 className="w-6 h-6" /> :
                                                    isCurrent ? <PlayCircle className="w-6 h-6" /> :
                                                        <Lock className="w-5 h-5" />}
                                            </button>
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

                                            {isEditing && (
                                                <div className="absolute -top-2 -right-2 flex gap-1">
                                                    <button
                                                        onClick={() => {
                                                            const newTopics = topics.map(t => {
                                                                if (t.id !== activeTopic.id) return t;
                                                                return { ...t, syllabus: t.syllabus.filter(m => m.id !== module.id) };
                                                            });
                                                            updateConfig(newTopics, localActiveTopicId);
                                                        }}
                                                        className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow-lg"
                                                    >
                                                        <Trash2 className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>

                            {isEditing && (
                                <button
                                    onClick={() => handleAddModule(activeTopic.id)}
                                    className="w-full py-4 border-2 border-dashed border-slate-800 rounded-2xl text-slate-500 hover:text-blue-400 hover:border-blue-500/30 transition-all flex items-center justify-center gap-2 font-bold text-sm"
                                >
                                    <Plus className="w-4 h-4" /> Add Module
                                </button>
                            )}
                        </div>

                        {isEditing && (
                            <div className="mt-8 pt-8 border-t border-slate-800">
                                <Button
                                    variant="ghost"
                                    className="text-red-400 hover:text-red-500 hover:bg-red-500/10 w-full justify-start p-0 h-auto"
                                    onClick={() => {
                                        confirmAction(
                                            'Delete Topic',
                                            `Are you sure you want to delete "${activeTopic.title}"? This cannot be undone.`,
                                            () => handleRemoveTopic(activeTopic.id)
                                        );
                                    }}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" /> Delete Topic
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default SyllabusView;

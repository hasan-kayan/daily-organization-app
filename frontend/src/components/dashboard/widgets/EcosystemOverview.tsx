import React from 'react';
import { motion } from 'framer-motion';
import { Settings2, BarChart2 } from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';

interface EcosystemOverviewProps {
    sectionId: string;
    componentId: string;
    title?: string;
    progress?: number;
    projectCount?: number;
}

const EcosystemOverview: React.FC<EcosystemOverviewProps> = ({
    sectionId,
    componentId,
    title,
    progress = 0,
    projectCount = 0
}) => {
    const { updateComponentConfig } = useDashboardStore();

    const handleEdit = () => {
        const progStr = prompt('Enter Total Ecosystem Progress (%):', progress.toString());
        if (progStr === null) return;
        const newProgress = parseInt(progStr);
        if (isNaN(newProgress)) return;

        const countStr = prompt('Enter Active Project Count:', projectCount.toString());
        if (countStr === null) return;
        const newCount = parseInt(countStr);
        if (isNaN(newCount)) return;

        updateComponentConfig(sectionId, componentId, {
            progress: newProgress,
            projectCount: newCount
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-600/10 rounded-3xl p-6 border border-blue-600/20 group relative h-full flex flex-col justify-center"
        >
            <button
                onClick={handleEdit}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 opacity-0 group-hover:opacity-100 transition-all"
            >
                <Settings2 className="w-4 h-4" />
            </button>

            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <p className="text-slate-200 text-lg font-black tracking-tight">{title || 'Total Ecosystem Progress'}</p>
                    <p className="text-blue-500 text-lg font-black">{progress}%</p>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full rounded-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <BarChart2 className="w-3.5 h-3.5 text-slate-500" />
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                        {projectCount} active projects across ecosystem
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default EcosystemOverview;

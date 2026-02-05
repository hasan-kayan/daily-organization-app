import React from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { motion } from 'framer-motion';

const EcosystemOverview: React.FC = () => {
    const { ecosystemProgress, projects } = usePortfolioStore();

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-600/10 rounded-3xl p-6 border border-blue-600/20"
        >
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <p className="text-slate-200 text-lg font-black tracking-tight">Total Ecosystem Progress</p>
                    <p className="text-blue-500 text-lg font-black">{ecosystemProgress}%</p>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${ecosystemProgress}%` }}
                        className="h-full rounded-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                    />
                </div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                    {projects.length} active projects across ecosystem
                </p>
            </div>
        </motion.div>
    );
};

export default EcosystemOverview;

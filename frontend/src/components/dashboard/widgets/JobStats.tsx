import React from 'react';
import { useJobStore } from '@/store/useJobStore';
import { TrendingUp, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const JobStats: React.FC = () => {
    const { salary, salaryGrowth, productivity } = useJobStore();

    return (
        <div className="flex flex-wrap gap-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-w-[180px] flex-1 flex-col gap-3 rounded-3xl p-6 border border-slate-800 bg-slate-900/40 backdrop-blur-sm"
            >
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Salary Growth</p>
                <p className="text-white tracking-tight text-3xl font-black leading-tight">
                    ${salary.toLocaleString()}
                </p>
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                    <TrendingUp className="w-4 h-4" />
                    <span>+{salaryGrowth}%</span>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="flex min-w-[180px] flex-1 flex-col gap-3 rounded-3xl p-6 border border-slate-800 bg-slate-900/40 backdrop-blur-sm"
            >
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Productivity</p>
                <p className="text-white tracking-tight text-3xl font-black leading-tight">
                    {productivity}%
                </p>
                <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>On Track</span>
                </div>
            </motion.div>
        </div>
    );
};

export default JobStats;

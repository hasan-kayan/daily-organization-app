import React from 'react';
import { TrendingUp, CheckCircle2, Settings2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDashboardStore } from '@/store/useDashboardStore';

interface JobStatsProps {
    sectionId: string;
    componentId: string;
    salary?: number;
    salaryGrowth?: number;
    productivity?: number;
}

const JobStats: React.FC<JobStatsProps> = ({
    sectionId,
    componentId,
    salary = 0,
    salaryGrowth = 0,
    productivity = 0
}) => {
    const { updateComponentConfig } = useDashboardStore();

    const handleEdit = () => {
        const salStr = prompt('Enter Current Salary ($):', salary.toString());
        if (salStr === null) return;
        const newSalary = parseFloat(salStr);
        if (isNaN(newSalary)) return;

        const growthStr = prompt('Enter Salary Growth (%):', salaryGrowth.toString());
        if (growthStr === null) return;
        const newGrowth = parseFloat(growthStr);
        if (isNaN(newGrowth)) return;

        const prodStr = prompt('Enter Productivity (%):', productivity.toString());
        if (prodStr === null) return;
        const newProd = parseFloat(prodStr);
        if (isNaN(newProd)) return;

        updateComponentConfig(sectionId, componentId, {
            salary: newSalary,
            salaryGrowth: newGrowth,
            productivity: newProd
        });
    };

    return (
        <div className="flex flex-wrap gap-6 group relative h-full">
            <button
                onClick={handleEdit}
                className="absolute -top-1 right-0 w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 opacity-0 group-hover:opacity-100 transition-all z-10"
            >
                <Settings2 className="w-4 h-4" />
            </button>

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

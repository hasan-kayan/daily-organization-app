import React from 'react';
import { ArrowUpRight, Wallet, Settings2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDashboardStore } from '@/store/useDashboardStore';
import { cn } from '@/lib/utils';

interface NetWorthHeroProps {
    sectionId: string;
    componentId: string;
    title?: string;
    totalNetWorth?: number;
    performanceDiff?: number;
}

const NetWorthHero: React.FC<NetWorthHeroProps> = ({
    sectionId,
    componentId,
    title,
    totalNetWorth = 0,
    performanceDiff = 0
}) => {
    const { updateComponentConfig } = useDashboardStore();

    const updateConfig = (updates: Partial<NetWorthHeroProps>) => {
        updateComponentConfig(sectionId, componentId, {
            totalNetWorth,
            performanceDiff,
            ...updates
        });
    };

    const handleEdit = () => {
        const val = prompt('Enter Total Net Worth ($):', totalNetWorth.toString());
        if (val === null) return;
        const netWorth = parseFloat(val);
        if (isNaN(netWorth)) return;

        const diffVal = prompt('Enter performance difference (%):', performanceDiff.toString());
        if (diffVal === null) return;
        const diff = parseFloat(diffVal);
        if (isNaN(diff)) return;

        updateConfig({ totalNetWorth: netWorth, performanceDiff: diff });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-600/20 to-blue-600/5 rounded-3xl p-8 border border-blue-500/20 shadow-2xl relative overflow-hidden group h-full flex flex-col justify-center"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/20 transition-all duration-500" />

            <button
                onClick={handleEdit}
                className="absolute top-4 right-4 w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all border border-white/10 z-10"
            >
                <Settings2 className="text-white w-5 h-5" />
            </button>

            <div className="flex justify-between items-start mb-6">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">{title || 'Total Net Worth'}</p>
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <Wallet className="text-white w-5 h-5" />
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-white text-5xl font-black tracking-tight">
                    ${totalNetWorth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h2>

                <div className="flex items-center gap-3">
                    <div className={cn(
                        "flex items-center gap-1 px-3 py-1 rounded-full border",
                        performanceDiff >= 0
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                    )}>
                        <ArrowUpRight className={cn("w-4 h-4", performanceDiff < 0 && "rotate-90")} />
                        <span className="text-xs font-black">{performanceDiff >= 0 ? '+' : ''}{performanceDiff}%</span>
                    </div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">All time performance</p>
                </div>
            </div>
        </motion.div>
    );
};

export default NetWorthHero;

import React from 'react';
import { useFinanceStore } from '@/store/useFinanceStore';
import { ArrowUpRight, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';

const NetWorthHero: React.FC = () => {
    const { totalNetWorth } = useFinanceStore();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-600/20 to-blue-600/5 rounded-3xl p-8 border border-blue-500/20 shadow-2xl relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/20 transition-all duration-500" />

            <div className="flex justify-between items-start mb-6">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Total Net Worth</p>
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <Wallet className="text-white w-5 h-5" />
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-white text-5xl font-black tracking-tight">
                    ${totalNetWorth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h2>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
                        <ArrowUpRight className="w-4 h-4" />
                        <span className="text-xs font-black">+15.2%</span>
                    </div>
                    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">All time performance</p>
                </div>
            </div>
        </motion.div>
    );
};

export default NetWorthHero;

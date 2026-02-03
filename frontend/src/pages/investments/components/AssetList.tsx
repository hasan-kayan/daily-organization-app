import React from 'react';
import { useFinanceStore } from '@/store/useFinanceStore';
import type { Asset } from '@/store/useFinanceStore';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, TrendingUp, TrendingDown, ChevronRight, Briefcase } from 'lucide-react';

const AssetList: React.FC = () => {
    const { assets } = useFinanceStore();

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <h2 className="text-xl font-bold">Investment Portfolio</h2>
                <button className="text-blue-500 text-sm font-bold hover:text-blue-400 transition-colors">See all</button>
            </div>

            <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                    {assets.map((asset) => (
                        <motion.div
                            key={asset.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center justify-between p-4 bg-slate-900/40 rounded-2xl border border-slate-800/50 hover:border-slate-700 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-slate-800/80 flex items-center justify-center border border-slate-700 group-hover:bg-blue-600/10 group-hover:border-blue-600/30 transition-all duration-300">
                                    {asset.imageUrl ? (
                                        <img src={asset.imageUrl} alt={asset.name} className="w-6 h-6 rounded" />
                                    ) : (
                                        asset.type === 'crypto' ? <Coins className="text-yellow-500 w-6 h-6" /> : <Briefcase className="text-blue-400 w-6 h-6" />
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-200 group-hover:text-white transition-colors">{asset.name}</h4>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{asset.amount} {asset.symbol}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex flex-col items-end">
                                    <p className="text-sm font-black text-white">${asset.value.toLocaleString()}</p>
                                    <div className={cn(
                                        "flex items-center gap-1 text-[10px] font-bold uppercase",
                                        asset.change >= 0 ? "text-emerald-400" : "text-red-400"
                                    )}>
                                        {asset.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                        {Math.abs(asset.change)}%
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AssetList;

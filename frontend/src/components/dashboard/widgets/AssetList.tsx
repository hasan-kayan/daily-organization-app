import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, TrendingUp, TrendingDown, ChevronRight, Briefcase, Plus, Trash2, Settings2 } from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { Button } from '@/components/ui/button';

interface Asset {
    id: string;
    name: string;
    symbol: string;
    amount: string;
    value: number;
    change: number;
    type: 'crypto' | 'stock' | 'fiat';
    imageUrl?: string;
}

interface AssetListProps {
    sectionId: string;
    componentId: string;
    title?: string;
    assets?: Asset[];
}

const AssetList: React.FC<AssetListProps> = ({
    sectionId,
    componentId,
    title,
    assets = []
}) => {
    const { updateComponentConfig } = useDashboardStore();
    const [isEditing, setIsEditing] = useState(false);

    const updateConfig = (newAssets: Asset[]) => {
        updateComponentConfig(sectionId, componentId, {
            assets: newAssets
        });
    };

    const handleAddAsset = () => {
        const name = prompt('Asset Name (e.g. Bitcoin):');
        if (!name) return;
        const symbol = prompt('Symbol (e.g. BTC):') || '';
        const valueStr = prompt('Current Value ($):');
        if (!valueStr) return;
        const value = parseFloat(valueStr);
        if (isNaN(value)) return;

        const newAsset: Asset = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            symbol,
            amount: '0',
            value,
            change: 0,
            type: 'crypto'
        };
        updateConfig([...assets, newAsset]);
    };

    const handleRemoveAsset = (id: string) => {
        updateConfig(assets.filter(a => a.id !== id));
    };

    return (
        <div className="space-y-4 h-full flex flex-col">
            <div className="flex items-center justify-between px-1">
                <h2 className="text-xl font-bold text-white">{title || 'Investment Portfolio'}</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                            isEditing ? "bg-blue-600 text-white" : "text-slate-500 hover:text-blue-400 hover:bg-blue-400/10"
                        )}
                    >
                        <Settings2 className="w-4 h-4" />
                    </button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-500 hover:text-white"
                        onClick={handleAddAsset}
                    >
                        <Plus className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto scrollbar-hide">
                <AnimatePresence mode="popLayout" initial={false}>
                    {assets.map((asset) => (
                        <motion.div
                            key={asset.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex items-center justify-between p-4 bg-slate-900/40 rounded-2xl border border-slate-800/50 hover:border-slate-700 transition-all group relative"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-slate-800/80 flex items-center justify-center border border-slate-700 group-hover:bg-blue-600/10 group-hover:border-blue-600/30 transition-all duration-300">
                                    {asset.imageUrl ? (
                                        <img src={asset.imageUrl} alt={asset.name} className="w-6 h-6 rounded" />
                                    ) : (
                                        asset.type === 'crypto' ? <Coins className="text-yellow-500 w-6 h-6" /> : <Briefcase className="text-blue-400 w-6 h-6" />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <h4 className="font-bold text-slate-200 group-hover:text-white transition-colors truncate">{asset.name}</h4>
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
                                {isEditing ? (
                                    <button
                                        onClick={() => handleRemoveAsset(asset.id)}
                                        className="text-red-400 hover:text-red-500 p-2 bg-red-500/10 rounded-xl"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {assets.length === 0 && (
                    <div className="py-20 flex flex-col items-center justify-center text-center opacity-50">
                        <Briefcase className="w-12 h-12 text-slate-700 mb-4" />
                        <p className="text-sm text-slate-500">Your portfolio is empty.</p>
                        <Button
                            variant="link"
                            className="mt-4 text-blue-400 font-bold h-auto p-0"
                            onClick={handleAddAsset}
                        >
                            Add Your First Asset
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssetList;

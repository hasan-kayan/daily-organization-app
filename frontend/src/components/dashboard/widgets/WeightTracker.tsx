import React, { useState } from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowDown, TrendingDown, Plus, Trash2, Settings2 } from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WeightEntry {
    name: string;
    weight: number;
}

interface WeightTrackerProps {
    sectionId: string;
    componentId: string;
    title?: string;
    data?: WeightEntry[];
    targetWeight?: number;
}

import { useAppStore } from '@/store/useAppStore';

const WeightTracker: React.FC<WeightTrackerProps> = ({
    sectionId,
    componentId,
    title,
    data = [],
    targetWeight = 70
}) => {
    const { updateComponentConfig } = useDashboardStore();
    const { confirmAction } = useAppStore();
    const [isEditing, setIsEditing] = useState(false);

    const updateConfig = (newData: WeightEntry[]) => {
        updateComponentConfig(sectionId, componentId, {
            data: newData,
            targetWeight
        });
    };

    const handleAddEntry = () => {
        const weightStr = prompt('Enter weight (kg):');
        if (!weightStr) return;
        const weight = parseFloat(weightStr);
        if (isNaN(weight)) return;

        const day = prompt('Enter day (e.g. Mon, 05/02):') || new Date().toLocaleDateString();
        updateConfig([...data, { name: day, weight }]);
    };

    const handleClear = () => {
        confirmAction(
            'Clear History',
            'Are you sure you want to clear all weight history? This cannot be undone.',
            () => updateConfig([])
        );
    };

    const latestWeight = data.length > 0 ? data[data.length - 1].weight : 0;
    const prevWeight = data.length > 1 ? data[data.length - 2].weight : latestWeight;
    const diff = (latestWeight - prevWeight).toFixed(1);
    const isLoss = latestWeight < prevWeight;

    return (
        <div className="bg-slate-900/40 rounded-3xl p-6 border border-slate-800/50 backdrop-blur-sm h-full flex flex-col">
            <div className="flex items-end justify-between mb-8">
                <div>
                    <h2 className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-2">{title || 'Weight Tracker'}</h2>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black text-white">{latestWeight || '--.-'}</span>
                        <span className="text-slate-500 text-sm font-medium">kg</span>
                        {data.length > 1 && (
                            <div className={cn(
                                "flex items-center gap-1 px-2 py-0.5 rounded-full ml-2",
                                isLoss ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                            )}>
                                {isLoss ? <ArrowDown className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                <span className="text-[10px] font-bold">{Math.abs(parseFloat(diff))}kg {isLoss ? 'loss' : 'gain'}</span>
                            </div>
                        )}
                    </div>
                </div>
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
                        onClick={handleAddEntry}
                    >
                        <Plus className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <div className="h-40 w-full flex-1">
                {data.length > 1 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1" >
                                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#101922', border: '1px solid #1e293b', borderRadius: '12px' }}
                                itemStyle={{ color: '#fff', fontSize: '12px' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="weight"
                                stroke="#2563eb"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorWeight)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-2xl text-slate-600">
                        <TrendingDown className="w-8 h-8 mb-2 opacity-20" />
                        <p className="text-xs font-medium">Add at least 2 entries to see trend</p>
                    </div>
                )}
            </div>

            <div className="flex justify-between mt-4 px-2">
                {data.slice(-4).map((entry, i) => (
                    <span key={i} className="text-[10px] text-slate-500 font-bold uppercase">{entry.name}</span>
                ))}
            </div>

            {isEditing && data.length > 0 && (
                <div className="mt-6 pt-4 border-t border-slate-800">
                    <Button
                        variant="ghost"
                        className="text-red-400 hover:text-red-500 hover:bg-red-500/10 w-full justify-start p-0 h-8"
                        onClick={handleClear}
                    >
                        <Trash2 className="w-4 h-4 mr-2" /> Clear History
                    </Button>
                </div>
            )}
        </div>
    );
};

export default WeightTracker;

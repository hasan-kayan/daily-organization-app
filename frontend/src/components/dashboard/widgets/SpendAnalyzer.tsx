import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import { Settings2, Plus, Trash2 } from 'lucide-react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { cn } from '@/lib/utils';

interface SpendItem {
    name: string;
    value: number;
    color: string;
}

interface SpendAnalyzerProps {
    sectionId: string;
    componentId: string;
    title?: string;
    items?: SpendItem[];
}

import { useAppStore } from '@/store/useAppStore';

const COLORS = ['#2563eb', '#10b981', '#fb923c', '#8b5cf6', '#ec4899', '#f59e0b'];

const SpendAnalyzer: React.FC<SpendAnalyzerProps> = ({
    sectionId,
    componentId,
    title,
    items = []
}) => {
    const { updateComponentConfig } = useDashboardStore();
    const { confirmAction } = useAppStore();
    const [isEditing, setIsEditing] = useState(false);

    const updateConfig = (newItems: SpendItem[]) => {
        updateComponentConfig(sectionId, componentId, {
            items: newItems
        });
    };

    const handleAddItem = () => {
        const name = prompt('Enter category name:');
        if (!name) return;
        const valueStr = prompt('Enter value ($):');
        if (!valueStr) return;
        const value = parseFloat(valueStr);
        if (isNaN(value)) return;

        const newItem: SpendItem = {
            name,
            value,
            color: COLORS[items.length % COLORS.length]
        };
        updateConfig([...items, newItem]);
    };

    const handleRemoveItem = (name: string) => {
        confirmAction(
            'Delete Category',
            `Are you sure you want to delete the "${name}" category?`,
            () => updateConfig(items.filter(item => item.name !== name))
        );
    };

    const total = items.reduce((acc, item) => acc + item.value, 0);

    return (
        <div className="bg-slate-900/40 rounded-3xl p-6 border border-slate-800/50 backdrop-blur-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">{title || 'Spend Analyzer'}</h2>
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
                        onClick={handleAddItem}
                    >
                        <Plus className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 flex-1">
                <div className="w-32 h-32 relative shrink-0">
                    {items.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={items}
                                    innerRadius={35}
                                    outerRadius={50}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {items.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#101922', border: '1px solid #1e293b', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff', fontSize: '12px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="w-full h-full rounded-full border-4 border-dashed border-slate-800 flex items-center justify-center" />
                    )}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Total</span>
                        <span className="text-xs font-black text-white">${(total / 1000).toFixed(1)}k</span>
                    </div>
                </div>

                <div className="flex-1 w-full space-y-3 overflow-y-auto scrollbar-hide max-h-[160px]">
                    {items.map((item) => (
                        <div key={item.name} className="flex items-center justify-between group relative">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.1)]"
                                    style={{ backgroundColor: item.color }}
                                />
                                <p className="text-sm font-bold text-slate-400 group-hover:text-slate-200 transition-colors truncate max-w-[100px]">{item.name}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="text-sm font-black text-white">${item.value.toLocaleString()}</p>
                                {isEditing && (
                                    <button
                                        onClick={() => handleRemoveItem(item.name)}
                                        className="text-red-400 hover:text-red-500 p-1"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    {items.length === 0 && (
                        <div className="text-center py-4">
                            <p className="text-xs text-slate-500 italic">No data added yet.</p>
                            <Button
                                variant="link"
                                className="text-blue-400 text-xs h-auto p-0 mt-2"
                                onClick={handleAddItem}
                            >
                                Add category
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SpendAnalyzer;

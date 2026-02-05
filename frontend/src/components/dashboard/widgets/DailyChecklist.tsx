import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { useDashboardStore } from '@/store/useDashboardStore';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChecklistItem {
    id: string;
    text: string;
    completed: boolean;
}

interface DailyChecklistProps {
    sectionId: string;
    componentId: string;
    title?: string;
    items?: ChecklistItem[];
}

import { useAppStore } from '@/store/useAppStore';

const DailyChecklist: React.FC<DailyChecklistProps> = ({
    sectionId,
    componentId,
    title,
    items = []
}) => {
    const { updateComponentConfig } = useDashboardStore();
    const { confirmAction } = useAppStore();
    const [isEditing, setIsEditing] = useState(false);

    const updateConfig = (newItems: ChecklistItem[]) => {
        updateComponentConfig(sectionId, componentId, {
            items: newItems
        });
    };

    const handleAddItem = () => {
        const text = prompt('Enter item:');
        if (!text) return;
        const newItem: ChecklistItem = {
            id: Math.random().toString(36).substr(2, 9),
            text,
            completed: false
        };
        updateConfig([...items, newItem]);
    };

    const toggleItem = (id: string) => {
        const newItems = items.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        );
        updateConfig(newItems);
    };

    const handleRemoveItem = (id: string) => {
        const item = items.find(i => i.id === id);
        confirmAction(
            'Remove Item',
            `Are you sure you want to remove "${item?.text}"?`,
            () => updateConfig(items.filter(item => item.id !== id))
        );
    };

    const completedCount = items.filter(item => item.completed).length;
    const totalCount = items.length;

    return (
        <div className="bg-slate-900/40 rounded-3xl p-6 border border-slate-800/50 backdrop-blur-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-white">{title || 'Daily Checklist'}</h2>
                    {totalCount > 0 && (
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                            {completedCount} of {totalCount} Completed
                        </span>
                    )}
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
                        onClick={handleAddItem}
                    >
                        <Plus className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <div className="space-y-1 flex-1 overflow-y-auto scrollbar-hide">
                <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex items-center gap-4 py-4 border-b border-slate-800/50 last:border-0 group relative"
                        >
                            <Checkbox
                                id={item.id}
                                checked={item.completed}
                                onCheckedChange={() => toggleItem(item.id)}
                                className="w-6 h-6 rounded-lg border-2 border-slate-700 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 transition-all"
                            />
                            <label
                                htmlFor={item.id}
                                className={cn(
                                    "text-base font-medium transition-all cursor-pointer flex-1",
                                    item.completed ? "text-slate-500 line-through" : "text-slate-200"
                                )}
                            >
                                {item.text}
                            </label>

                            {isEditing && (
                                <button
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-500/10 rounded-lg"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {items.length === 0 && (
                    <div className="py-12 flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 bg-slate-800/50 rounded-xl flex items-center justify-center mb-4 border border-slate-700">
                            <Plus className="w-6 h-6 text-slate-500" />
                        </div>
                        <p className="text-sm text-slate-500 max-w-[150px]">No items yet. Add something to track.</p>
                        <Button
                            variant="link"
                            className="mt-4 text-blue-400 font-bold h-auto p-0"
                            onClick={handleAddItem}
                        >
                            Add First Item
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DailyChecklist;

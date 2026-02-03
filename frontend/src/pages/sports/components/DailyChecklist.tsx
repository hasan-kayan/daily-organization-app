import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { useSportsStore } from '@/store/useSportsStore';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const DailyChecklist: React.FC = () => {
    const { selectedDate, dailyData, toggleChecklistItem } = useSportsStore();
    const dayData = dailyData[selectedDate] || { checklist: [] };

    const completedCount = dayData.checklist.filter(item => item.completed).length;
    const totalCount = dayData.checklist.length;

    return (
        <div className="bg-slate-900/40 rounded-3xl p-6 border border-slate-800/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Daily Checklist</h2>
                <span className="bg-blue-500/10 text-blue-400 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                    {completedCount} of {totalCount} Done
                </span>
            </div>

            <div className="space-y-1">
                <AnimatePresence mode="popLayout">
                    {dayData.checklist.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            className="flex items-center gap-4 py-4 border-b border-slate-800/50 last:border-0"
                        >
                            <Checkbox
                                id={item.id}
                                checked={item.completed}
                                onCheckedChange={() => toggleChecklistItem(selectedDate, item.id)}
                                className="w-6 h-6 rounded-lg border-2 border-slate-700 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 transition-all"
                            />
                            <label
                                htmlFor={item.id}
                                className={cn(
                                    "text-base font-medium transition-all cursor-pointer",
                                    item.completed ? "text-slate-500 line-through" : "text-slate-200"
                                )}
                            >
                                {item.text}
                            </label>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default DailyChecklist;

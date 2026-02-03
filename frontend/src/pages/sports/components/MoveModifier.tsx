import React from 'react';
import { useSportsStore } from '@/store/useSportsStore';
import { Button } from '@/components/ui/button';
import { Plus, Dumbbell, Edit3, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MoveModifier: React.FC = () => {
    const { selectedDate, dailyData } = useSportsStore();
    const dayData = dailyData[selectedDate] || { exercises: [] };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Move Modifier</h2>
                <Button variant="ghost" className="text-blue-500 font-bold flex items-center gap-1 hover:text-blue-400 hover:bg-blue-500/5">
                    <Plus className="w-4 h-4" /> Add Exercise
                </Button>
            </div>

            <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                    {dayData.exercises.map((exercise) => (
                        <motion.div
                            key={exercise.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex items-center justify-between bg-slate-900/40 p-4 rounded-2xl border border-slate-800/50 hover:border-slate-700 transition-colors group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex w-12 h-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                    <Dumbbell className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-100 group-hover:text-white">{exercise.name}</h4>
                                    <p className="text-xs text-slate-500 group-hover:text-slate-400">
                                        {exercise.sets} Sets x {exercise.reps} Reps • {exercise.weight}kg
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-slate-800/40 text-slate-400 hover:text-blue-400 hover:bg-blue-400/5">
                                    <Edit3 className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-slate-800/40 text-slate-400 hover:text-red-400 hover:bg-red-400/5">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {dayData.exercises.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-slate-800 rounded-2xl">
                        <p className="text-slate-500 text-sm">No exercises added for today.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MoveModifier;

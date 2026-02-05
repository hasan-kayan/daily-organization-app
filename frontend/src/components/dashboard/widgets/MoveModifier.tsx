import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Dumbbell, Trash2, Settings2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboardStore } from '@/store/useDashboardStore';
import { cn } from '@/lib/utils';

interface Exercise {
    id: string;
    name: string;
    sets: number;
    reps: number;
    weight: number;
}

interface MoveModifierProps {
    sectionId: string;
    componentId: string;
    title?: string;
    exercises?: Exercise[];
}

const MoveModifier: React.FC<MoveModifierProps> = ({
    sectionId,
    componentId,
    title,
    exercises = []
}) => {
    const { updateComponentConfig } = useDashboardStore();
    const [isEditing, setIsEditing] = useState(false);

    const updateConfig = (newExercises: Exercise[]) => {
        updateComponentConfig(sectionId, componentId, {
            exercises: newExercises
        });
    };

    const handleAddExercise = () => {
        const name = prompt('Exercise Name:');
        if (!name) return;
        const sets = parseInt(prompt('Sets:', '3') || '3');
        const reps = parseInt(prompt('Reps:', '12') || '12');
        const weight = parseFloat(prompt('Weight (kg):', '0') || '0');

        const newExercise: Exercise = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            sets: isNaN(sets) ? 3 : sets,
            reps: isNaN(reps) ? 12 : reps,
            weight: isNaN(weight) ? 0 : weight
        };
        updateConfig([...exercises, newExercise]);
    };

    const handleRemoveExercise = (id: string) => {
        updateConfig(exercises.filter(e => e.id !== id));
    };

    return (
        <div className="space-y-4 h-full flex flex-col">
            <div className="flex items-center justify-between px-1">
                <h2 className="text-xl font-bold text-white">{title || 'Move Modifier'}</h2>
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
                        className="text-blue-500 font-bold flex items-center gap-1 hover:text-blue-400 hover:bg-blue-500/5 h-8 px-3"
                        onClick={handleAddExercise}
                    >
                        <Plus className="w-4 h-4" /> Add
                    </Button>
                </div>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto scrollbar-hide">
                <AnimatePresence mode="popLayout" initial={false}>
                    {exercises.map((exercise) => (
                        <motion.div
                            key={exercise.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex items-center justify-between bg-slate-900/40 p-4 rounded-2xl border border-slate-800/50 hover:border-slate-700 transition-colors group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex min-w-[3rem] h-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                    <Dumbbell className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-100 group-hover:text-white transition-colors">{exercise.name}</h4>
                                    <p className="text-xs text-slate-500 group-hover:text-slate-400">
                                        {exercise.sets} Sets x {exercise.reps} Reps • {exercise.weight}kg
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {isEditing && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 hover:text-red-500 hover:bg-red-500/20"
                                        onClick={() => handleRemoveExercise(exercise.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {exercises.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-2xl opacity-50">
                        <Dumbbell className="w-8 h-8 mx-auto mb-2 text-slate-700" />
                        <p className="text-slate-500 text-sm">No exercises added yet.</p>
                        <Button
                            variant="link"
                            className="mt-4 text-blue-400 font-bold h-auto p-0"
                            onClick={handleAddExercise}
                        >
                            Log Your First Workout
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MoveModifier;

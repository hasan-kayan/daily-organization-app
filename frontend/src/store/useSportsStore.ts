import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Exercise {
    id: string;
    name: string;
    sets: number;
    reps: number;
    weight: number;
    icon: string;
}

export interface DailyData {
    date: string; // ISO string
    checklist: { id: string; text: string; completed: boolean }[];
    exercises: Exercise[];
    weight: number | null;
    isCompleted: boolean;
}

interface SportsState {
    dailyData: Record<string, DailyData>;
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    toggleChecklistItem: (date: string, itemId: string) => void;
    updateWeight: (date: string, weight: number) => void;
    addExercise: (date: string, exercise: Omit<Exercise, 'id'>) => void;
    updateExercise: (date: string, exercise: Exercise) => void;
}

export const useSportsStore = create<SportsState>()(
    persist(
        (set) => ({
            dailyData: {},
            selectedDate: new Date().toISOString().split('T')[0],
            setSelectedDate: (date) => set({ selectedDate: date }),
            toggleChecklistItem: (date, itemId) => set((state) => {
                const day = state.dailyData[date] || getInitialDayData(date);
                const newChecklist = day.checklist.map(item =>
                    item.id === itemId ? { ...item, completed: !item.completed } : item
                );
                return {
                    dailyData: {
                        ...state.dailyData,
                        [date]: { ...day, checklist: newChecklist }
                    }
                };
            }),
            updateWeight: (date, weight) => set((state) => {
                const day = state.dailyData[date] || getInitialDayData(date);
                return {
                    dailyData: {
                        ...state.dailyData,
                        [date]: { ...day, weight }
                    }
                };
            }),
            addExercise: (date, exercise) => set((state) => {
                const day = state.dailyData[date] || getInitialDayData(date);
                const newExercise = { ...exercise, id: Math.random().toString(36).substr(2, 9) };
                return {
                    dailyData: {
                        ...state.dailyData,
                        [date]: { ...day, exercises: [...day.exercises, newExercise] }
                    }
                };
            }),
            updateExercise: (date, exercise) => set((state) => {
                const day = state.dailyData[date] || getInitialDayData(date);
                const newExercises = day.exercises.map(ex => ex.id === exercise.id ? exercise : ex);
                return {
                    dailyData: {
                        ...state.dailyData,
                        [date]: { ...day, exercises: newExercises }
                    }
                };
            }),
        }),
        {
            name: 'sports-storage',
        }
    )
);

function getInitialDayData(date: string): DailyData {
    return {
        date,
        checklist: [
            { id: '1', text: '15 min HIIT Warmup', completed: false },
            { id: '2', text: 'Hydration Goal: 3L', completed: false },
            { id: '3', text: 'Protein Intake: 150g', completed: false },
        ],
        exercises: [
            { id: 'ex1', name: 'Bench Press', sets: 3, reps: 12, weight: 60, icon: 'fitness_center' },
            { id: 'ex2', name: 'Squats', sets: 4, reps: 10, weight: 80, icon: 'directions_run' },
        ],
        weight: 74.5,
        isCompleted: false,
    };
}

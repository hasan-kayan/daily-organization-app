import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Module {
    id: string;
    title: string;
    description: string;
    status: 'completed' | 'current' | 'locked';
    type: 'syntax' | 'video' | 'terminal' | 'description';
}

export interface Topic {
    id: string;
    title: string;
    category: 'Tech' | 'Soft Skills' | 'Health' | 'Finance';
    progress: number;
    imageUrl: string;
    syllabus: Module[];
}

interface ProgressState {
    topics: Topic[];
    activeTopicId: string | null;
    setActiveTopic: (id: string) => void;
    toggleModuleStatus: (topicId: string, moduleId: string) => void;
    addTopic: (topic: Topic) => void;
}

export const useProgressStore = create<ProgressState>()(
    persist(
        (set) => ({
            topics: initialTopics,
            activeTopicId: '1',
            setActiveTopic: (id) => set({ activeTopicId: id }),
            toggleModuleStatus: (topicId, moduleId) => set((state) => {
                const newTopics = state.topics.map(topic => {
                    if (topic.id !== topicId) return topic;
                    const newSyllabus = topic.syllabus.map(mod => {
                        if (mod.id !== moduleId) return mod;
                        const statusMap: Record<string, 'completed' | 'current' | 'locked'> = {
                            'current': 'completed',
                            'completed': 'current',
                            'locked': 'current'
                        };
                        return { ...mod, status: statusMap[mod.status] || mod.status };
                    });
                    const completedCount = newSyllabus.filter(m => m.status === 'completed').length;
                    const progress = Math.round((completedCount / newSyllabus.length) * 100);
                    return { ...topic, syllabus: newSyllabus, progress };
                });
                return { topics: newTopics };
            }),
            addTopic: (topic) => set((state) => ({ topics: [...state.topics, topic] })),
        }),
        {
            name: 'progress-storage',
        }
    )
);

const initialTopics: Topic[] = [
    {
        id: '1',
        title: 'Mastering Python',
        category: 'Tech',
        progress: 65,
        imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop',
        syllabus: [
            { id: 'm1', title: 'Introduction to Syntax', description: 'Variables, Data Types, and Logic', status: 'completed', type: 'description' },
            { id: 'm2', title: 'Data Structures', description: 'Lists, Dictionaries, and Tuples', status: 'current', type: 'video' },
            { id: 'm3', title: 'Object Oriented Programming', description: 'Classes, Objects, and Methods', status: 'locked', type: 'terminal' },
        ],
    },
    {
        id: '2',
        title: 'Public Speaking',
        category: 'Soft Skills',
        progress: 30,
        imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=400&fit=crop',
        syllabus: [
            { id: 'm4', title: 'Overcoming Stage Fright', description: 'Breathing exercises and mindset', status: 'completed', type: 'video' },
            { id: 'm5', title: 'Structuring Your Talk', description: 'Opening, Body, and Closing', status: 'current', type: 'description' },
        ],
    },
];

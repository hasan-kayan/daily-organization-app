import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Meeting {
    id: string;
    time: string;
    period: 'AM' | 'PM';
    title: string;
    type: 'Zoom' | 'Physical';
    location: string;
}

export interface JobProject {
    id: string;
    title: string;
    parentProject: string;
    dueDate: string;
    priority: 'High' | 'Medium' | 'Low';
    status: 'To Do' | 'In Progress' | 'Done';
    imageUrl?: string;
}

export interface JournalEntry {
    id: string;
    date: string;
    reflection: string;
    mood: 'great' | 'good' | 'neutral';
}

interface JobState {
    salary: number;
    salaryGrowth: number;
    productivity: number;
    meetings: Meeting[];
    projects: JobProject[];
    journalEntries: JournalEntry[];
    setProductivity: (val: number) => void;
    addMeeting: (meeting: Meeting) => void;
    updateProjectStatus: (id: string, status: JobProject['status']) => void;
    addJournalEntry: (entry: JournalEntry) => void;
}

const initialMeetings: Meeting[] = [
    { id: '1', time: '10:30', period: 'AM', title: 'Q4 Strategy Review', type: 'Zoom', location: 'Zoom Meeting' },
    { id: '2', time: '02:00', period: 'PM', title: 'Project Alpha Sync', type: 'Physical', location: 'Room 304' },
];

const initialProjects: JobProject[] = [
    {
        id: 'p1',
        title: 'AI Module Integration',
        parentProject: 'Project Alpha',
        dueDate: 'Tomorrow',
        priority: 'High',
        status: 'In Progress',
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&h=200&fit=crop'
    },
    {
        id: 'p2',
        title: 'Frontend Refactor',
        parentProject: 'Internal Hub',
        dueDate: 'Friday',
        priority: 'Medium',
        status: 'To Do',
        imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=200&h=200&fit=crop'
    },
];

export const useJobStore = create<JobState>()(
    persist(
        (set) => ({
            salary: 124500,
            salaryGrowth: 5.2,
            productivity: 94,
            meetings: initialMeetings,
            projects: initialProjects,
            journalEntries: [],
            setProductivity: (val) => set({ productivity: val }),
            addMeeting: (meeting) => set((state) => ({ meetings: [...state.meetings, meeting] })),
            updateProjectStatus: (id, status) => set((state) => ({
                projects: state.projects.map(p => p.id === id ? { ...p, status } : p)
            })),
            addJournalEntry: (entry) => set((state) => ({ journalEntries: [entry, ...state.journalEntries] })),
        }),
        {
            name: 'job-storage',
        }
    )
);


import React, { useState } from 'react';
import { Calendar, RefreshCw, Settings2, Clock, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDashboardStore } from '@/store/useDashboardStore';
import { cn } from '@/lib/utils';

interface SyncScheduleProps {
    sectionId: string;
    componentId: string;
    title?: string;
    windowStart?: string;
    windowEnd?: string;
    activeDays?: number[]; // 0-6
}

const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const SyncSchedule: React.FC<SyncScheduleProps> = ({
    sectionId,
    componentId,
    title,
    windowStart = '08:00 PM',
    windowEnd = '09:30 PM',
    activeDays = []
}) => {
    const { updateComponentConfig } = useDashboardStore();
    const [isEditing, setIsEditing] = useState(false);

    const updateConfig = (updates: Partial<SyncScheduleProps>) => {
        updateComponentConfig(sectionId, componentId, {
            windowStart,
            windowEnd,
            activeDays,
            ...updates
        });
    };

    const toggleDay = (idx: number) => {
        const newDays = activeDays.includes(idx)
            ? activeDays.filter(d => d !== idx)
            : [...activeDays, idx];
        updateConfig({ activeDays: newDays });
    };

    const handleEditWindow = () => {
        const start = prompt('Enter start time (e.g. 09:00 AM):', windowStart);
        if (!start) return;
        const end = prompt('Enter end time (e.g. 10:30 AM):', windowEnd);
        if (!end) return;
        updateConfig({ windowStart: start, windowEnd: end });
    };

    return (
        <div className="bg-slate-900/40 rounded-3xl p-6 border border-slate-800/50 backdrop-blur-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Calendar className="text-blue-400 w-4 h-4" />
                    <h4 className="text-sm font-bold text-slate-200">{title || 'Sync Schedule'}</h4>
                </div>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                        isEditing ? "bg-blue-600 text-white" : "text-slate-500 hover:text-blue-400 hover:bg-blue-400/10"
                    )}
                >
                    <Settings2 className="w-4 h-4" />
                </button>
            </div>

            <div className="bg-slate-800/20 p-4 rounded-2xl mb-6 border border-slate-800/30 flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-between text-xs mb-4">
                    <span className="text-slate-500 font-bold uppercase tracking-widest">Daily Window</span>
                    {isEditing ? (
                        <button
                            onClick={handleEditWindow}
                            className="text-blue-400 font-black hover:underline flex items-center gap-1"
                        >
                            <Clock className="w-3 h-3" /> {windowStart} - {windowEnd}
                        </button>
                    ) : (
                        <span className="text-blue-400 font-black">{windowStart} - {windowEnd}</span>
                    )}
                </div>
                <div className="flex justify-between">
                    {dayLabels.map((day, idx) => {
                        const isActive = activeDays.includes(idx);
                        return (
                            <button
                                key={idx}
                                onClick={() => isEditing && toggleDay(idx)}
                                className={cn(
                                    "w-8 h-8 flex items-center justify-center rounded-full text-[10px] font-black transition-all relative",
                                    isActive
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                        : "bg-slate-800/40 text-slate-600",
                                    isEditing && "hover:ring-2 hover:ring-blue-500/50"
                                )}
                            >
                                {day}
                                {isEditing && isActive && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full flex items-center justify-center">
                                        <Check className="w-2 h-2 text-white" />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-6 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-blue-600/20">
                <div className="flex w-6 h-6 items-center justify-center bg-white/20 rounded-lg">
                    <RefreshCw className="w-3 h-3" />
                </div>
                Sync with Calendar
            </Button>
        </div>
    );
};

export default SyncSchedule;

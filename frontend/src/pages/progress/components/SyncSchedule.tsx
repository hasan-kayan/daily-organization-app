import React from 'react';
import { Calendar, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const activeDays = [0, 1, 2, 3]; // M, T, W, T

const SyncSchedule: React.FC = () => {
    return (
        <div className="bg-slate-900/40 rounded-3xl p-6 border border-slate-800/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
                <h4 className="text-sm font-bold text-slate-200">Sync Schedule</h4>
                <Calendar className="text-slate-500 w-4 h-4" />
            </div>

            <div className="bg-slate-800/20 p-4 rounded-2xl mb-6 border border-slate-800/30">
                <div className="flex items-center justify-between text-xs mb-4">
                    <span className="text-slate-500 font-bold uppercase tracking-widest">Daily Window</span>
                    <span className="text-blue-400 font-black">08:00 PM - 09:30 PM</span>
                </div>
                <div className="flex justify-between">
                    {days.map((day, idx) => {
                        const isActive = activeDays.includes(idx);
                        return (
                            <div
                                key={idx}
                                className={cn(
                                    "w-8 h-8 flex items-center justify-center rounded-full text-[10px] font-black transition-all",
                                    isActive
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                        : "bg-slate-800/40 text-slate-600"
                                )}
                            >
                                {day}
                            </div>
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

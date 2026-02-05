import React, { useState } from 'react';
import { format, addDays, subDays, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface HorizontalCalendarProps {
    initialDate?: string;
}

const HorizontalCalendar: React.FC<HorizontalCalendarProps> = ({
    initialDate
}) => {
    const [selectedDate, setSelectedDate] = useState(initialDate || format(new Date(), 'yyyy-MM-dd'));

    // Generate a range of dates around the selected date
    const dates = React.useMemo(() => {
        const center = new Date(selectedDate);
        return Array.from({ length: 9 }, (_, i) => addDays(subDays(center, 4), i));
    }, [selectedDate]);

    return (
        <section className="py-6 overflow-hidden bg-slate-900/40 rounded-3xl border border-slate-800/50 backdrop-blur-sm h-full">
            <div className="flex items-center justify-between px-6 mb-4">
                <h3 className="font-bold text-lg capitalize text-white">
                    {format(new Date(selectedDate), 'MMMM yyyy')}
                </h3>
                <button
                    onClick={() => setSelectedDate(format(new Date(), 'yyyy-MM-dd'))}
                    className="text-blue-500 text-sm font-semibold hover:text-blue-400"
                >
                    Today
                </button>
            </div>

            <div className="flex gap-4 px-6 overflow-x-auto custom-scrollbar items-center py-4 no-scrollbar">
                {dates.map((date) => {
                    const dateStr = format(date, 'yyyy-MM-dd');
                    const isSelected = isSameDay(date, new Date(selectedDate));
                    const isToday = isSameDay(date, new Date());

                    return (
                        <motion.button
                            key={dateStr}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedDate(dateStr)}
                            className={cn(
                                "flex flex-col items-center justify-center transition-all duration-300 rounded-2xl relative shrink-0",
                                isSelected
                                    ? "min-w-[72px] h-24 bg-blue-600 shadow-lg shadow-blue-600/30 scale-110 ring-4 ring-blue-600/20"
                                    : "min-w-[56px] h-20 bg-slate-800/30 hover:bg-slate-800/50"
                            )}
                        >
                            <span className={cn(
                                "text-[10px] font-bold uppercase tracking-wider mb-1",
                                isSelected ? "text-white/80" : "text-slate-500"
                            )}>
                                {format(date, 'EEE')}
                            </span>
                            <span className={cn(
                                "text-lg font-bold",
                                isSelected ? "text-white" : "text-slate-300"
                            )}>
                                {format(date, 'd')}
                            </span>
                            {isToday && !isSelected && (
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
                            )}
                            {isSelected && (
                                <motion.div
                                    layoutId="indicator"
                                    className="w-1.5 h-1.5 bg-white rounded-full mt-1"
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </section>
    );
};

export default HorizontalCalendar;

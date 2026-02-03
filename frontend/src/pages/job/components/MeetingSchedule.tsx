import React from 'react';
import { useJobStore } from '@/store/useJobStore';
import type { Meeting } from '@/store/useJobStore';
import { Video, MapPin, ExternalLink, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const MeetingSchedule: React.FC = () => {
    const { meetings } = useJobStore();

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Daily Schedule</h3>
                <span className="text-blue-500 text-xs font-black uppercase tracking-widest">Today</span>
            </div>

            <div className="space-y-3">
                {meetings.map((meeting) => (
                    <motion.div
                        key={meeting.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-4 rounded-3xl bg-slate-900/40 p-5 border border-slate-800/50 group hover:border-slate-700 transition-all"
                    >
                        <div className="flex flex-col items-center justify-center border-r border-slate-800 pr-5 min-w-[70px]">
                            <p className="text-white text-base font-black tracking-tight">{meeting.time}</p>
                            <p className="text-slate-500 text-[10px] font-bold uppercase">{meeting.period}</p>
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-bold truncate group-hover:text-blue-400 transition-colors">{meeting.title}</p>
                            <div className="flex items-center gap-2 mt-1.5">
                                {meeting.type === 'Zoom' ? <Video className="w-3 h-3 text-blue-500" /> : <MapPin className="w-3 h-3 text-slate-500" />}
                                <p className="text-slate-500 text-[10px] font-bold truncate uppercase tracking-wider">{meeting.location}</p>
                            </div>
                        </div>

                        {meeting.type === 'Zoom' ? (
                            <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 py-2 text-xs font-bold shadow-lg shadow-blue-600/20">
                                Join Call
                            </Button>
                        ) : (
                            <Button variant="ghost" className="bg-slate-800/40 text-slate-300 rounded-xl px-4 py-2 text-xs font-bold hover:bg-slate-800">
                                Details
                            </Button>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default MeetingSchedule;

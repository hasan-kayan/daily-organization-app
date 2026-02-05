import React, { useState } from 'react';
import { Video, MapPin, Plus, Trash2, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useDashboardStore } from '@/store/useDashboardStore';
import { cn } from '@/lib/utils';

interface Meeting {
    id: string;
    time: string;
    period: 'AM' | 'PM';
    title: string;
    type: 'Zoom' | 'In-person';
    location: string;
}

interface MeetingScheduleProps {
    sectionId: string;
    componentId: string;
    title?: string;
    meetings?: Meeting[];
}

import { useAppStore } from '@/store/useAppStore';

const MeetingSchedule: React.FC<MeetingScheduleProps> = ({
    sectionId,
    componentId,
    title,
    meetings = []
}) => {
    const { updateComponentConfig } = useDashboardStore();
    const { confirmAction } = useAppStore();
    const [isEditing, setIsEditing] = useState(false);

    const updateConfig = (newMeetings: Meeting[]) => {
        updateComponentConfig(sectionId, componentId, {
            meetings: newMeetings
        });
    };

    const handleAddMeeting = () => {
        const meetingTitle = prompt('Meeting Title:');
        if (!meetingTitle) return;
        const time = prompt('Time (e.g. 10:00):', '10:00');
        const period = prompt('Period (AM/PM):', 'AM') as 'AM' | 'PM';
        const type = confirm('Is it a Zoom call?') ? 'Zoom' : 'In-person';
        const location = prompt('Location/Link:', type === 'Zoom' ? 'zoom.us/j/...' : 'Office');

        const newMeeting: Meeting = {
            id: Math.random().toString(36).substr(2, 9),
            time: time || '10:00',
            period: (period === 'PM' ? 'PM' : 'AM'),
            title: meetingTitle,
            type,
            location: location || 'N/A'
        };
        updateConfig([...meetings, newMeeting]);
    };

    const handleRemoveMeeting = (id: string) => {
        const meeting = meetings.find(m => m.id === id);
        confirmAction(
            'Delete Meeting',
            `Are you sure you want to delete "${meeting?.title}"?`,
            () => updateConfig(meetings.filter(m => m.id !== id))
        );
    };

    return (
        <div className="space-y-4 h-full flex flex-col">
            <div className="flex items-center justify-between px-1">
                <h3 className="text-xl font-bold text-white">{title || 'Daily Schedule'}</h3>
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
                        size="icon"
                        className="h-8 w-8 text-slate-500 hover:text-white"
                        onClick={handleAddMeeting}
                    >
                        <Plus className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto scrollbar-hide">
                <AnimatePresence mode="popLayout" initial={false}>
                    {meetings.map((meeting) => (
                        <motion.div
                            key={meeting.id}
                            layout
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="flex items-center gap-4 rounded-3xl bg-slate-900/40 p-5 border border-slate-800/50 group hover:border-slate-700 transition-all relative"
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

                            <div className="flex items-center gap-2">
                                {isEditing ? (
                                    <button
                                        onClick={() => handleRemoveMeeting(meeting.id)}
                                        className="text-red-400 hover:text-red-500 p-2 bg-red-500/10 rounded-xl"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                ) : (
                                    meeting.type === 'Zoom' ? (
                                        <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 py-2 text-xs font-bold shadow-lg shadow-blue-600/20">
                                            Join Call
                                        </Button>
                                    ) : (
                                        <Button variant="ghost" className="bg-slate-800/40 text-slate-300 rounded-xl px-4 py-2 text-xs font-bold hover:bg-slate-800">
                                            Details
                                        </Button>
                                    )
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {meetings.length === 0 && (
                    <div className="py-20 flex flex-col items-center justify-center text-center opacity-50">
                        <Video className="w-12 h-12 text-slate-700 mb-4" />
                        <p className="text-sm text-slate-500">No meetings scheduled for today.</p>
                        <Button
                            variant="link"
                            className="mt-4 text-blue-400 font-bold h-auto p-0"
                            onClick={handleAddMeeting}
                        >
                            Schedule a Meeting
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MeetingSchedule;

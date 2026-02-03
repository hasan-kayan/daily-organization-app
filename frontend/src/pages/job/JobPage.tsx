import React from 'react';
import JobStats from './components/JobStats';
import MeetingSchedule from './components/MeetingSchedule';
import ProjectTrack from './components/ProjectTrack';
import { motion } from 'framer-motion';
import { Search, Bell, Edit3, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const JobPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20">
            <header className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-black tracking-tight text-white">Career Hub</h1>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-white">
                            <Search className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-white">
                            <Bell className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
                <p className="text-slate-500 text-sm">Professional excellence through disciplined tracking.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-10">
                    <JobStats />
                    <ProjectTrack />
                </div>

                <div className="space-y-10">
                    <MeetingSchedule />

                    {/* Work Journal */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-3xl bg-blue-600/5 border border-blue-500/20 p-6 space-y-6"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                                <Edit3 className="text-white w-5 h-5" />
                            </div>
                            <h3 className="text-white text-lg font-black">Work Journal</h3>
                        </div>
                        <p className="text-slate-400 text-xs font-bold leading-relaxed">
                            How was your productivity today? Log your end-of-day reflections.
                        </p>
                        <div className="space-y-4">
                            <textarea
                                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-sm text-white focus:ring-1 focus:ring-blue-600 focus:border-blue-600 placeholder-slate-600 min-h-[120px] resize-none"
                                placeholder="Write your reflection here..."
                            />
                            <div className="flex items-center justify-between">
                                <div className="flex gap-2">
                                    {['😊', '😐', '😔'].map(emoji => (
                                        <button key={emoji} className="w-10 h-10 rounded-full border border-slate-800 hover:bg-slate-800 transition-colors flex items-center justify-center">
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                                <Button className="bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest px-6 h-10 rounded-xl transition-all">
                                    Save Log <Send className="w-3 h-3 ml-2" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default JobPage;

import React from 'react';
import TopicCard from './components/TopicCard';
import SyllabusView from './components/SyllabusView';
import SyncSchedule from './components/SyncSchedule';
import { useProgressStore } from '@/store/useProgressStore';
import { motion } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const categories = ['All Topics', 'Tech', 'Soft Skills', 'Health', 'Finance'];

import { cn } from '@/lib/utils';

const ProgressPage: React.FC = () => {
    const { topics } = useProgressStore();
    const [activeCategory, setActiveCategory] = React.useState('All Topics');

    const filteredTopics = activeCategory === 'All Topics'
        ? topics
        : topics.filter(t => t.category === activeCategory);

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20">
            <header className="flex flex-col gap-1">
                <h1 className="text-3xl font-black tracking-tight text-white">Personal Progress</h1>
                <p className="text-slate-500 text-sm">Design your future through dedicated learning.</p>
            </header>

            {/* Search and Filters */}
            <section className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <Input
                            placeholder="Search topics..."
                            className="pl-10 bg-slate-900/40 border-slate-800 rounded-xl focus:ring-blue-600"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0 w-full md:w-auto">
                        {categories.map((cat) => (
                            <Button
                                key={cat}
                                variant={activeCategory === cat ? 'default' : 'secondary'}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "rounded-full px-6 py-2 h-auto text-sm font-bold whitespace-nowrap transition-all",
                                    activeCategory === cat
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                        : "bg-slate-800/40 text-slate-400 hover:text-slate-200"
                                )}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Topics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredTopics.map((topic) => (
                        <TopicCard key={topic.id} topic={topic} />
                    ))}
                    <motion.button
                        whileHover={{ y: -5 }}
                        className="flex flex-col items-center justify-center aspect-square rounded-2xl border-2 border-dashed border-slate-800 bg-slate-900/20 hover:bg-slate-800/20 transition-all group"
                    >
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mb-2 group-hover:bg-blue-600/20 transition-colors">
                            <Plus className="w-6 h-6 text-slate-500 group-hover:text-blue-500" />
                        </div>
                        <span className="text-slate-500 font-bold text-xs uppercase tracking-widest">New Goal</span>
                    </motion.button>
                </div>
            </section>

            {/* Main Content: Syllabus and Schedule */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <SyllabusView />
                </div>
                <div className="space-y-8">
                    <SyncSchedule />
                </div>
            </div>
        </div>
    );
};

export default ProgressPage;

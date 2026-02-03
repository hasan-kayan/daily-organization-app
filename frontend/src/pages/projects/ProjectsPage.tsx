import React from 'react';
import EcosystemOverview from './components/EcosystemOverview';
import ProjectCard from './components/ProjectCard';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { motion } from 'framer-motion';
import { Plus, LayoutGrid, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const categories = ['All', 'SaaS', 'E-commerce', 'Open Source', 'Content'];

const ProjectsPage: React.FC = () => {
    const { projects } = usePortfolioStore();
    const [activeCategory, setActiveCategory] = React.useState('All');

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20">
            <header className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-black tracking-tight text-white">Project Ecosystem</h1>
                    <Button variant="ghost" size="icon" className="text-slate-500 hover:text-white">
                        <LayoutGrid className="w-5 h-5" />
                    </Button>
                </div>
                <p className="text-slate-500 text-sm">Building independent value through innovative projects.</p>
            </header>

            <EcosystemOverview />

            <section className="space-y-8">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0 w-full md:w-auto">
                        {categories.map((cat) => (
                            <Button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "rounded-full px-6 py-2 h-auto text-xs font-black uppercase tracking-widest transition-all",
                                    activeCategory === cat
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                        : "bg-slate-900/40 text-slate-500 border border-slate-800/50 hover:text-slate-300"
                                )}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest px-6 h-11 rounded-2xl shadow-xl shadow-blue-600/20">
                        <Plus className="w-4 h-4 mr-2" /> New Project
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ProjectsPage;

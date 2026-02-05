import React from 'react';
import { useParams } from 'react-router-dom';
import { useDashboardStore } from '@/store/useDashboardStore';
import { DynamicComponent } from '@/components/dashboard/ComponentRegistry';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Settings2, FileText, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DynamicSectionPage: React.FC = () => {
    const { sectionId } = useParams<{ sectionId: string }>();
    const { sections, removeComponent, addPage, setActivePage } = useDashboardStore();



    const section = sections.find(s => s.id === sectionId);

    if (!section) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <h2 className="text-xl font-semibold">Section not found</h2>
                <p>The section you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20">
            <header className="flex items-end justify-between">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black tracking-tight text-white">{section.title}</h1>
                    <p className="text-slate-500 text-sm">Manage your {section.title.toLowerCase()} and tracks.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-slate-800/50 border-slate-700 text-slate-300"
                        onClick={() => addPage(section.id, { title: 'New Page' })}>
                        <Plus className="w-4 h-4 mr-2" /> New Page
                    </Button>
                    <Button variant="outline" size="sm" className="bg-slate-800/50 border-slate-700 text-slate-300">
                        <Settings2 className="w-4 h-4 mr-2" /> Add Component
                    </Button>
                </div>
            </header>

            {/* Sub-pages Row */}
            {section.pages.length > 0 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {section.pages.map(page => (
                        <button
                            key={page.id}
                            onClick={() => setActivePage(page.id)}
                            className="flex items-center gap-3 px-4 py-3 bg-[#101922] border border-slate-800 rounded-xl hover:border-blue-500/50 transition-all min-w-[200px] text-left group"
                        >
                            <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-blue-400" />
                            </div>
                            <span className="font-medium text-slate-200">{page.title}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* Components Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence mode="popLayout">
                    {section.components.map((comp, idx) => (
                        <motion.div
                            key={comp.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                            className={comp.gridSpan === 2 ? "md:col-span-2 relative group" : "relative group"}
                        >
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-slate-500 hover:text-red-400 hover:bg-red-400/10"
                                    onClick={() => removeComponent(section.id, comp.id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                            <DynamicComponent type={comp.type} title={comp.title} config={comp.config} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {section.components.length === 0 && (
                <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-3xl text-slate-500 gap-4">
                    <p>No components added to this section yet.</p>
                    <Button variant="outline" className="bg-slate-800/50 border-slate-700">
                        Pick a Component
                    </Button>
                </div>
            )}
        </div>
    );
};

export default DynamicSectionPage;

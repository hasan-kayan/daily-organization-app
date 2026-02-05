import React from 'react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PageModal: React.FC = () => {
    const { sections, activePageId, setActivePage, activeSectionId } = useDashboardStore();

    const section = sections.find(s => s.id === activeSectionId);
    const page = section?.pages.find(p => p.id === activePageId);

    if (!activePageId || !page) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={() => setActivePage(null)}
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-4xl max-h-[90vh] bg-[#020617] border border-slate-800 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
                >
                    {/* Header */}
                    <header className="px-8 py-6 border-b border-slate-800 flex items-center justify-between bg-[#101922]">
                        <div className="flex flex-col">
                            <h2 className="text-xl font-bold text-white">{page.title}</h2>
                            <p className="text-xs text-slate-500">Inside {section?.title}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="icon" onClick={() => setActivePage(null)} className="text-slate-400 hover:text-white">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                    </header>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-[#020617] to-[#101922]">
                        <div className="space-y-6">
                            <div className="p-12 border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center gap-4 text-slate-500 text-center">
                                <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-2">
                                    <X className="w-8 h-8 text-blue-400 rotate-45" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-slate-300">New Page Content</h3>
                                    <p className="max-w-xs mx-auto">This page is currently empty. You will be able to add components specifically for this page soon.</p>
                                </div>
                                <Button className="bg-blue-600 hover:bg-blue-700 px-6">
                                    Add Elements
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="px-8 py-4 border-t border-slate-800 flex justify-end gap-3 bg-[#101922]">
                        <Button variant="ghost" onClick={() => setActivePage(null)} className="text-slate-400">Cancel</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Save className="w-4 h-4 mr-2" /> Save Changes
                        </Button>
                    </footer>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default PageModal;

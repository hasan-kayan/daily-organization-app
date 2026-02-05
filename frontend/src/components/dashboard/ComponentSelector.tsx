import React from 'react';
import { componentRegistry } from './ComponentRegistry';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ComponentSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (type: string, title: string) => void;
}

const ComponentSelector: React.FC<ComponentSelectorProps> = ({ isOpen, onClose, onSelect }) => {
    const [search, setSearch] = React.useState('');

    const availableComponents = Object.keys(componentRegistry).map(key => ({
        type: key,
        title: key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        category: key.split('-')[0]
    }));

    const filtered = availableComponents.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase())
    );

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 lg:p-8">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    onClick={onClose}
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 40 }}
                    className="relative w-full max-w-2xl max-h-[80vh] bg-[#101922] border border-slate-800 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
                >
                    <header className="px-8 py-6 border-b border-slate-800 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-white">Add Component</h2>
                            <p className="text-xs text-slate-500">Choose a widget to add to your section</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={onClose} className="text-slate-400 hover:text-white">
                            <X className="w-5 h-5" />
                        </Button>
                    </header>

                    <div className="p-6 border-b border-slate-800 bg-[#020617]/50">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <Input
                                placeholder="Search components..."
                                className="pl-10 bg-slate-900/50 border-slate-800 text-white"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {filtered.map((comp) => (
                                <button
                                    key={comp.type}
                                    onClick={() => {
                                        onSelect(comp.type, comp.title);
                                        onClose();
                                    }}
                                    className="flex items-start gap-4 p-4 bg-[#020617] border border-slate-800 rounded-2xl hover:border-blue-500/50 hover:bg-blue-500/5 transition-all text-left group"
                                >
                                    <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/20 transition-colors">
                                        <Plus className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="font-bold text-slate-200 truncate">{comp.title}</span>
                                        <span className="text-[10px] text-slate-500 uppercase tracking-widest">{comp.category}</span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {filtered.length === 0 && (
                            <div className="py-20 text-center text-slate-500">
                                No components found matching "{search}"
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ComponentSelector;

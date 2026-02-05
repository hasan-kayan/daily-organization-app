import React, { useState, useEffect } from 'react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Trash2, Folder, PieChart, Activity, Book, Calendar, DollarSign, Briefcase, Package, Code, Cpu, Coffee, Star, Heart, Target, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { useAppStore } from '@/store/useAppStore';

const ICON_OPTIONS = [
    { name: 'Folder', icon: Folder },
    { name: 'PieChart', icon: PieChart },
    { name: 'Activity', icon: Activity },
    { name: 'Book', icon: Book },
    { name: 'Calendar', icon: Calendar },
    { name: 'DollarSign', icon: DollarSign },
    { name: 'Briefcase', icon: Briefcase },
    { name: 'Package', icon: Package },
    { name: 'Code', icon: Code },
    { name: 'Cpu', icon: Cpu },
    { name: 'Coffee', icon: Coffee },
    { name: 'Star', icon: Star },
    { name: 'Heart', icon: Heart },
    { name: 'Target', icon: Target },
    { name: 'Flame', icon: Flame },
];

const SectionModal: React.FC = () => {
    const {
        sections,
        isSectionModalOpen,
        closeSectionModal,
        editingSectionId,
        addSection,
        updateSection,
        removeSection
    } = useDashboardStore();
    const { confirmAction } = useAppStore();

    const editingSection = sections.find(s => s.id === editingSectionId);

    const [title, setTitle] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('Folder');

    useEffect(() => {
        if (editingSection) {
            setTitle(editingSection.title);
            setSelectedIcon(editingSection.iconName);
        } else {
            setTitle('');
            setSelectedIcon('Folder');
        }
    }, [editingSection, isSectionModalOpen]);

    if (!isSectionModalOpen) return null;

    const handleSave = () => {
        if (!title.trim()) return;

        if (editingSectionId) {
            updateSection(editingSectionId, { title, iconName: selectedIcon });
        } else {
            addSection({ title, iconName: selectedIcon });
        }
        closeSectionModal();
    };

    const handleDelete = () => {
        if (!editingSectionId) return;

        confirmAction(
            'Delete Section',
            `Are you sure you want to delete "${editingSection?.title}"? All components within it will be permanently removed.`,
            () => {
                removeSection(editingSectionId);
                closeSectionModal();
            }
        );
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={closeSectionModal}
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-md bg-[#101922] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
                >
                    <header className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-white">
                            {editingSectionId ? 'Edit Section' : 'Create New Section'}
                        </h2>
                        <Button variant="ghost" size="icon" onClick={closeSectionModal} className="text-slate-400 hover:text-white">
                            <X className="w-5 h-5" />
                        </Button>
                    </header>

                    <div className="p-6 space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Section Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Finance, Fitness, Projects..."
                                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-600 transition-all font-medium"
                                autoFocus
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Choose Icon</label>
                            <div className="grid grid-cols-5 gap-2">
                                {ICON_OPTIONS.map((opt) => (
                                    <button
                                        key={opt.name}
                                        onClick={() => setSelectedIcon(opt.name)}
                                        className={cn(
                                            "aspect-square rounded-xl flex items-center justify-center transition-all border",
                                            selectedIcon === opt.name
                                                ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20"
                                                : "bg-slate-900/50 border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300"
                                        )}
                                    >
                                        <opt.icon className="w-5 h-5" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <footer className="px-6 py-4 border-t border-slate-800 flex items-center justify-between bg-black/20">
                        {editingSectionId ? (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleDelete}
                                className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                            >
                                <Trash2 className="w-5 h-5" />
                            </Button>
                        ) : <div />}

                        <div className="flex gap-3">
                            <Button variant="ghost" onClick={closeSectionModal} className="text-slate-400">Cancel</Button>
                            <Button
                                onClick={handleSave}
                                disabled={!title.trim()}
                                className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {editingSectionId ? 'Save Changes' : 'Create Section'}
                            </Button>
                        </div>
                    </footer>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default SectionModal;

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDashboardStore } from '@/store/useDashboardStore';
import { DynamicComponent } from '@/components/dashboard/ComponentRegistry';
import ComponentSelector from '@/components/dashboard/ComponentSelector';
import SortableWidget from '@/components/dashboard/SortableWidget';
import { AnimatePresence } from 'framer-motion';
import { Plus, Settings2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
} from '@dnd-kit/sortable';

const DynamicSectionPage: React.FC = () => {
    const { sectionId } = useParams<{ sectionId: string }>();
    const {
        sections,
        addComponent,
        removeComponent,
        addPage,
        setActivePage,
        reorderComponents,
        updateComponentSize
    } = useDashboardStore();
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);

    const section = sections.find(s => s.id === sectionId);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // Avoid accidental drags when clicking
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    if (!section) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 text-center px-4">
                <div className="w-20 h-20 bg-slate-800/20 rounded-3xl flex items-center justify-center mb-6 border border-slate-800/50">
                    <Settings2 className="w-10 h-10 text-slate-600" />
                </div>
                <h2 className="text-2xl font-black text-white mb-2">Section Not Found</h2>
                <p className="max-w-xs text-slate-500">The section you are looking for might have been removed or doesn't exist.</p>
                <Button variant="outline" className="mt-8 bg-slate-800/50 border-slate-700" onClick={() => window.location.href = '/'}>
                    Go to Home
                </Button>
            </div>
        );
    }

    const handleAddWidget = (type: string, title: string) => {
        addComponent(section.id, {
            type,
            title,
            w: type.includes('calendar') || type.includes('hero') || type.includes('stats') ? 2 : 1,
            h: 1
        });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = section.components.findIndex((c) => c.id === active.id);
            const newIndex = section.components.findIndex((c) => c.id === over.id);

            reorderComponents(section.id, oldIndex, newIndex);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20">
            <header className="flex items-end justify-between">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black tracking-tight text-white">{section.title}</h1>
                    <p className="text-slate-500 text-sm">Design your custom {section.title.toLowerCase()} workspace.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-slate-800/50 border-slate-700 text-slate-300"
                        onClick={() => {
                            const title = prompt('Enter page name:');
                            if (title) addPage(section.id, { title });
                        }}>
                        <Plus className="w-4 h-4 mr-2" /> New Page
                    </Button>
                    <Button variant="outline" size="sm" className="bg-blue-600/10 border-blue-500/30 text-blue-400 hover:bg-blue-600/20"
                        onClick={() => setIsSelectorOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" /> Add Component
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
                            className="flex items-center gap-3 px-4 py-3 bg-[#101922] border border-slate-800 rounded-xl hover:border-blue-500/50 transition-all min-w-[200px] text-left group shrink-0"
                        >
                            <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-blue-400" />
                            </div>
                            <span className="font-medium text-slate-200">{page.title}</span>
                        </button>
                    ))}
                </div>
            )}

            {/* Components Grid with Dnd */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={section.components.map(c => c.id)}
                    strategy={rectSortingStrategy}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-min">
                        <AnimatePresence mode="popLayout">
                            {section.components.map((comp) => (
                                <SortableWidget
                                    key={comp.id}
                                    id={comp.id}
                                    w={comp.w || 1}
                                    h={comp.h || 1}
                                    onResize={(newW, newH) => updateComponentSize(section.id, comp.id, newW, newH)}
                                    onRemove={() => removeComponent(section.id, comp.id)}
                                >
                                    <DynamicComponent type={comp.type} title={comp.title} config={comp.config} />
                                </SortableWidget>
                            ))}
                        </AnimatePresence>
                    </div>
                </SortableContext>
            </DndContext>

            {section.components.length === 0 && (
                <div className="py-24 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-[3rem] text-slate-500 gap-6 bg-[#101922]/30">
                    <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center border border-blue-500/20">
                        <Plus className="w-10 h-10 text-blue-400" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-slate-200 mb-2">Empty Workspace</h3>
                        <p className="max-w-xs mx-auto">This section is ready for your customizations. Add your first component below.</p>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700 h-12 px-8 rounded-2xl shadow-xl shadow-blue-600/20"
                        onClick={() => setIsSelectorOpen(true)}>
                        Pick a Component
                    </Button>
                </div>
            )}

            {/* Selector Modal */}
            <ComponentSelector
                isOpen={isSelectorOpen}
                onClose={() => setIsSelectorOpen(false)}
                onSelect={handleAddWidget}
            />
        </div>
    );
};

export default DynamicSectionPage;

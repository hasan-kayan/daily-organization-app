import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Maximize2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface SortableWidgetProps {
    id: string;
    w: number;
    h: number;
    onResize: (w: number, h: number) => void;
    onRemove: () => void;
    children: React.ReactNode;
}

const SortableWidget: React.FC<SortableWidgetProps> = ({ id, w, h, onResize, onRemove, children }) => {
    const [showSizePicker, setShowSizePicker] = React.useState(false);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 0,
        opacity: isDragging ? 0.3 : 1,
    };

    const sizeOptions = [
        { w: 1, h: 1, label: '1x1' },
        { w: 2, h: 1, label: '2x1' },
        { w: 1, h: 2, label: '1x2' },
        { w: 2, h: 2, label: '2x2' },
    ];

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "relative group rounded-3xl transition-all duration-300",
                w === 2 ? "md:col-span-2" : "col-span-1",
                h === 2 ? "row-span-2" : "row-span-1",
                isDragging && "shadow-2xl shadow-blue-500/20"
            )}
        >
            {/* Drag Handle & Controls */}
            <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-30">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 cursor-grab active:cursor-grabbing"
                    {...attributes}
                    {...listeners}
                >
                    <GripVertical className="w-4 h-4" />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "h-8 w-8 transition-colors",
                        showSizePicker ? "text-blue-400 bg-blue-400/10" : "text-slate-400 hover:text-blue-400 hover:bg-blue-400/10"
                    )}
                    onClick={() => setShowSizePicker(!showSizePicker)}
                >
                    <Maximize2 className="w-4 h-4" />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-400/10"
                    onClick={onRemove}
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>

            {/* Size Picker Overlay */}
            <AnimatePresence>
                {showSizePicker && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 z-40 bg-slate-950/80 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-6 border-2 border-blue-500/30"
                    >
                        <h4 className="text-sm font-bold text-white mb-4">Select Frame Size</h4>
                        <div className="grid grid-cols-2 gap-3">
                            {sizeOptions.map((opt) => (
                                <button
                                    key={`${opt.w}-${opt.h}`}
                                    onClick={() => {
                                        onResize(opt.w, opt.h);
                                        setShowSizePicker(false);
                                    }}
                                    className={cn(
                                        "w-20 py-3 rounded-xl border flex flex-col items-center justify-center transition-all group/opt",
                                        w === opt.w && h === opt.h
                                            ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20"
                                            : "bg-slate-900 border-slate-800 text-slate-400 hover:border-blue-500/50 hover:text-slate-200"
                                    )}
                                >
                                    <div className="flex gap-0.5 mb-1">
                                        {[...Array(opt.h)].map((_, r) => (
                                            <div key={r} className="flex flex-col gap-0.5">
                                                {[...Array(opt.w)].map((_, c) => (
                                                    <div key={c} className={cn(
                                                        "w-1.5 h-1.5 rounded-sm transition-colors",
                                                        w === opt.w && h === opt.h ? "bg-white" : "bg-slate-700 group-hover/opt:bg-blue-400/50"
                                                    )} />
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest">{opt.label}</span>
                                </button>
                            ))}
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="mt-6 text-slate-500 hover:text-white"
                            onClick={() => setShowSizePicker(false)}
                        >
                            Cancel
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Widget Content */}
            <div className="h-full">
                {children}
            </div>

            {/* Drag Overlay Indicator */}
            {isDragging && (
                <div className="absolute inset-0 bg-blue-500/5 border-2 border-dashed border-blue-500/30 rounded-3xl pointer-events-none" />
            )}
        </div>
    );
};

export default SortableWidget;

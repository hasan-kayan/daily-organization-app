import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { AlertTriangle, X, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const ConfirmationModal: React.FC = () => {
    const { confirmation, closeConfirmation } = useAppStore();

    if (!confirmation || !confirmation.isOpen) return null;

    const handleConfirm = () => {
        confirmation.onConfirm();
        closeConfirmation();
    };

    const isAlert = confirmation.isAlert;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    onClick={closeConfirmation}
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-sm bg-[#101922] border border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden p-8"
                >
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className={cn(
                            "w-16 h-16 rounded-2xl flex items-center justify-center mb-2",
                            isAlert ? "bg-blue-600/10" : "bg-red-600/10"
                        )}>
                            {isAlert ? <Info className="w-8 h-8 text-blue-500" /> : <AlertTriangle className="w-8 h-8 text-red-500" />}
                        </div>

                        <div>
                            <h2 className="text-xl font-black text-white mb-2">{confirmation.title}</h2>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {confirmation.message}
                            </p>
                        </div>

                        <div className="flex flex-col w-full gap-2 mt-4">
                            <Button
                                onClick={handleConfirm}
                                className={cn(
                                    "font-bold h-12 rounded-xl shadow-lg transition-all",
                                    isAlert
                                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20"
                                        : "bg-red-600 hover:bg-red-700 text-white shadow-red-600/20"
                                )}
                            >
                                {isAlert ? 'Got it' : 'Confirm Action'}
                            </Button>
                            {!isAlert && (
                                <Button
                                    variant="ghost"
                                    onClick={closeConfirmation}
                                    className="text-slate-500 hover:text-white h-12 rounded-xl"
                                >
                                    Cancel
                                </Button>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={closeConfirmation}
                        className="absolute top-4 right-4 text-slate-600 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ConfirmationModal;

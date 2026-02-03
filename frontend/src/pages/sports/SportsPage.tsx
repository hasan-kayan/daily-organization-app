import React from 'react';
import HorizontalCalendar from './components/HorizontalCalendar';
import DailyChecklist from './components/DailyChecklist';
import MoveModifier from './components/MoveModifier';
import WeightTracker from './components/WeightTracker';
import { motion } from 'framer-motion';

const SportsPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <header className="flex flex-col gap-1">
                <h1 className="text-3xl font-black tracking-tight text-white">Sports & Fitness</h1>
                <p className="text-slate-500 text-sm">Elevate your performance day by day.</p>
            </header>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <HorizontalCalendar />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <DailyChecklist />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="space-y-8"
                >
                    <WeightTracker />
                    <MoveModifier />
                </motion.div>
            </div>
        </div>
    );
};

export default SportsPage;

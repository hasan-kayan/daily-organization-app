import React from 'react';
import { useProgressStore } from '@/store/useProgressStore';
import type { Topic } from '@/store/useProgressStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TopicCardProps {
    topic: Topic;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
    const { activeTopicId, setActiveTopic } = useProgressStore();
    const isActive = activeTopicId === topic.id;

    return (
        <motion.button
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTopic(topic.id)}
            className="flex flex-col gap-3 group text-left"
        >
            <div
                className={cn(
                    "relative bg-cover bg-center flex flex-col gap-3 rounded-2xl justify-end p-4 aspect-square shadow-xl overflow-hidden border-2 transition-all duration-300",
                    isActive ? "border-blue-600 ring-4 ring-blue-600/10" : "border-transparent"
                )}
                style={{ backgroundImage: `linear-gradient(0deg, rgba(2, 6, 23, 0.9) 0%, rgba(2, 6, 23, 0) 60%), url("${topic.imageUrl}")` }}
            >
                <div className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg">
                    {topic.progress}%
                </div>
                <p className="text-white text-base font-bold leading-tight line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {topic.title}
                </p>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${topic.progress}%` }}
                    className="h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                />
            </div>
        </motion.button>
    );
};

export default TopicCard;

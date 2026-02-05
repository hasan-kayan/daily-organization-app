import React, { lazy, Suspense } from 'react';

// Consolidated widgets
const HorizontalCalendar = lazy(() => import('@/components/dashboard/widgets/HorizontalCalendar'));
const DailyChecklist = lazy(() => import('@/components/dashboard/widgets/DailyChecklist'));
const WeightTracker = lazy(() => import('@/components/dashboard/widgets/WeightTracker'));
const MoveModifier = lazy(() => import('@/components/dashboard/widgets/MoveModifier'));
const SyllabusView = lazy(() => import('@/components/dashboard/widgets/SyllabusView'));
const SyncSchedule = lazy(() => import('@/components/dashboard/widgets/SyncSchedule'));
const NetWorthHero = lazy(() => import('@/components/dashboard/widgets/NetWorthHero'));
const SpendAnalyzer = lazy(() => import('@/components/dashboard/widgets/SpendAnalyzer'));
const AssetList = lazy(() => import('@/components/dashboard/widgets/AssetList'));
const AgentNode = lazy(() => import('@/components/dashboard/widgets/AgentNode'));
const JobStats = lazy(() => import('@/components/dashboard/widgets/JobStats'));
const MeetingSchedule = lazy(() => import('@/components/dashboard/widgets/MeetingSchedule'));
const ProjectTrack = lazy(() => import('@/components/dashboard/widgets/ProjectTrack'));
const EcosystemOverview = lazy(() => import('@/components/dashboard/widgets/EcosystemOverview'));
const ProjectCard = lazy(() => import('@/components/dashboard/widgets/ProjectCard'));

// Placeholder for missing components
const Placeholder = ({ title }: { title: string }) => (
    <div className="p-8 border-2 border-dashed border-slate-800 rounded-2xl flex items-center justify-center text-slate-500">
        Component: {title}
    </div>
);

export const componentRegistry: Record<string, React.ComponentType<any>> = {
    'sports-calendar': HorizontalCalendar,
    'sports-checklist': DailyChecklist,
    'sports-weight': WeightTracker,
    'sports-move': MoveModifier,
    'progress-syllabus': SyllabusView,
    'progress-sync': SyncSchedule,
    'investments-hero': NetWorthHero,
    'investments-spend': SpendAnalyzer,
    'investments-assets': AssetList,
    'ai-agents': AgentNode,
    'job-stats': JobStats,
    'job-meetings': MeetingSchedule,
    'job-track': ProjectTrack,
    'projects-ecosystem': EcosystemOverview,
    'projects-card': ProjectCard,
};

export const DynamicComponent: React.FC<{
    sectionId: string;
    componentId: string;
    type: string;
    title: string;
    config?: any
}> = ({ sectionId, componentId, type, title, config }) => {
    const Component = componentRegistry[type] || (() => <Placeholder title={title} />);

    return (
        <Suspense fallback={<div className="h-32 bg-slate-800/20 animate-pulse rounded-2xl" />}>
            <Component
                sectionId={sectionId}
                componentId={componentId}
                title={title}
                {...config}
            />
        </Suspense>
    );
};

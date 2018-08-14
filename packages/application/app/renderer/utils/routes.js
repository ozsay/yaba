import General from '../scenes/General';
import Modules from '../scenes/Modules';
import Module from '../scenes/Modules/containers/Module';
import Assets from '../scenes/Assets';
import Asset from '../scenes/Assets/containers/Asset';
import Chunks from '../scenes/Chunks/containers/Chunks';
import Chunk from '../scenes/Chunks/containers/Chunk';
import Packages from '../scenes/Packages/containers/Packages';
import Package from '../scenes/Packages/containers/Package';
import Warnings from '../scenes/Warnings';
import Errors from '../scenes/Errors';
import Analysis from '../scenes/Analysis';

export default [
    {
        name: 'General',
        component: General,
        path: '/general',
    },
    {
        name: 'Modules',
        statsKey: 'modules',
        component: Modules,
        path: '/modules',
        childComponent: Module,
    },
    {
        name: 'Assets',
        statsKey: 'assets',
        component: Assets,
        path: '/assets',
        childComponent: Asset,
    },
    {
        name: 'Chunks',
        statsKey: 'chunks',
        component: Chunks,
        path: '/chunks',
        childComponent: Chunk,
    },
    {
        name: 'Packages',
        statsKey: 'packages',
        component: Packages,
        path: '/packages',
        childComponent: Package,
    },
    {
        name: 'Warnings',
        statsKey: 'warnings',
        component: Warnings,
        path: '/warnings',
    },
    {
        name: 'Errors',
        statsKey: 'errors',
        component: Errors,
        path: '/errors',
    },
    {
        name: 'Analysis',
        component: Analysis,
        path: '/analysis',
    },
];

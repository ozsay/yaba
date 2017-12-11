import pathToRegexp from 'path-to-regexp';

import { ACTION_TYPE } from '../actions/gotoTab';

import General from '../scenes/General';
import Errors from '../scenes/Errors';
import Warnings from '../scenes/Warnings';
import Modules from '../scenes/Modules';
import Assets from '../scenes/Assets';

function getRoute(tab) {
    return tab.path || tab.link;
}

const TABS = [
    {
        name: 'General',
        link: '/general',
        path: '/general:moduleId?',
        children: General,
    },
    {
        name: 'Modules',
        link: '/modules',
        path: '/modules:moduleId?',
        statsKey: 'modules',
        children: Modules,
    },
    {
        name: 'Assets',
        link: '/assets',
        statsKey: 'assets',
        children: Assets,
    },
    // { name: 'Chunks', link: '/chunks' },
    {
        name: 'Warnings',
        link: '/warnings',
        statsKey: 'warnings',
        children: Warnings,
    },
    {
        name: 'Errors',
        link: '/errors',
        statsKey: 'errors',
        children: Errors,
    },
    // { name: 'Hints', link: '/hints' },
].map(tab => Object.assign(tab, { path: getRoute(tab), pathRegexp: pathToRegexp(getRoute(tab)) }));

export default function (state = { mainTabs: TABS, secondaryTabs: [] }, { type, payload }) {
    if (type === ACTION_TYPE) {
        return payload;
    }

    return state;
}

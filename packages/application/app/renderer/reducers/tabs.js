import { LOAD_STATS_FULFILLED } from '../actions/types';
import { ACTION_TYPE as GOTO_TAB } from '../actions/gotoTab';

import General from '../scenes/General';
import Errors from '../scenes/Errors';
import Warnings from '../scenes/Warnings';
import Modules from '../scenes/Modules';
import Assets from '../scenes/Assets';

import Module from '../scenes/Modules/containers/Module';

class Tab {
    constructor({
        index, name, elementId, link, path, component, statsKey, type, children,
    }) {
        this.type = type;
        this.index = index;
        this.name = name;
        this.elementId = elementId;
        this.link = link;
        this.path = path || link;
        this.component = component;
        this.children = children;
        this.statsKey = statsKey;
    }
}

const TABS = [
    {
        name: 'General',
        link: '/general',
        path: '/general',
        component: General,
    },
    {
        name: 'Modules',
        link: '/modules',
        path: '/modules',
        statsKey: 'modules',
        component: Modules,
    },
    {
        name: 'Assets',
        link: '/assets',
        statsKey: 'assets',
        component: Assets,
    },
    // { name: 'Chunks', link: '/chunks' },
    {
        name: 'Warnings',
        link: '/warnings',
        statsKey: 'warnings',
        component: Warnings,
    },
    {
        name: 'Errors',
        link: '/errors',
        statsKey: 'errors',
        component: Errors,
    },
    // { name: 'Hints', link: '/hints' },
];

function createChildrenTabs(arr, type) {
    if (!arr) return [];

    return arr.map((element, index) => new Tab({
        index,
        elementId: element.id,
        component: Module,
        name: element.name,
        link: `${type}?id=${index}`,
        path: `${type}:id`,
        type,
    }));
}

export default function (
    state = { mainTabs: TABS.map((tab, index) => new Tab({ type: 'main', index, ...tab })) },
    { type, payload },
) {
    if (type === LOAD_STATS_FULFILLED) {
        return {
            mainTabs: TABS.map((tab, index) => new Tab({
                type: 'main', index, ...tab, children: createChildrenTabs(payload[tab.statsKey], tab.statsKey),
            })),
        };
    }

    if (type === GOTO_TAB) {
        const { index, type: tabType } = payload;

        if (tabType !== 'main') {
            const mainTab = state.mainTabs.find(mt => mt.statsKey === tabType);
            const tab = mainTab.children.find(child => child.index === index);

            return Object.assign({}, state, {
                currentTab: tab,
            });
        }

        return Object.assign({}, state, { currentTab: state.mainTabs[index] });
    }

    return state;
}

import { UPDATE_STATS } from '../actions/types';
import { ACTION_TYPE as GOTO_TAB } from '../actions/gotoTab';

import General from '../scenes/General';
import Errors from '../scenes/Errors';
import Warnings from '../scenes/Warnings';
import Modules from '../scenes/Modules';
import Assets from '../scenes/Assets';
import Packages from '../scenes/Packages/containers/Packages';
import Chunks from '../scenes/Chunks/containers/Chunks';

import Module from '../scenes/Modules/containers/Module';
import Asset from '../scenes/Assets/containers/Asset';
import Package from '../scenes/Packages/containers/Package';
import Chunk from '../scenes/Chunks/containers/Chunk';

class Tab {
    constructor({
        index, name, elementId, component, statsKey, type, children,
    }) {
        this.type = type;
        this.index = index;
        this.name = name;
        this.elementId = elementId;
        this.component = component;
        this.children = children;
        this.statsKey = statsKey;
    }
}

const TABS = [
    {
        name: 'General',
        component: General,
    },
    {
        name: 'Modules',
        statsKey: 'modules',
        component: Modules,
        childComponent: Module,
    },
    {
        name: 'Assets',
        statsKey: 'assets',
        component: Assets,
        childComponent: Asset,
    },
    {
        name: 'Chunks',
        statsKey: 'chunks',
        component: Chunks,
        childComponent: Chunk,
    },
    {
        name: 'Packages',
        statsKey: 'packages',
        component: Packages,
        childComponent: Package,
    },
    {
        name: 'Warnings',
        statsKey: 'warnings',
        component: Warnings,
    },
    {
        name: 'Errors',
        statsKey: 'errors',
        component: Errors,
    },
    // { name: 'Hints' },
];

function createChildrenTabs(arr, { type, childComponent }) {
    if (!arr) return [];

    return arr.map((element, index) => new Tab({
        index,
        elementId: element.id,
        component: childComponent,
        name: element.name,
        type,
    }));
}

export default function (
    state = { mainTabs: TABS.map((tab, index) => new Tab({ type: 'main', index, ...tab })), sideTabs: [] },
    { type, payload },
) {
    if (type === UPDATE_STATS) {
        return {
            mainTabs: TABS.map((tab, index) => new Tab({
                type: 'main', index, ...tab, children: createChildrenTabs(payload[tab.statsKey], tab),
            })),
            sideTabs: [],
        };
    }

    if (type === GOTO_TAB) {
        const { index, type: tabType, additional } = payload;

        if (tabType !== 'main') {
            const mainTab = state.mainTabs.find(mt => mt.statsKey === tabType);
            const tab = mainTab.children.find(child => child.index === index);

            const { sideTabs } = state;

            return Object.assign({}, state, {
                currentTab: tab,
                additional,
                sideTabs: sideTabs.find(t => t === tab) ? sideTabs : sideTabs.concat([tab]),
            });
        }

        return Object.assign({}, state, { currentTab: state.mainTabs[index] });
    }

    return state;
}

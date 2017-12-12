import { ACTION_TYPE as GOTO_TAB } from '../actions/gotoTab';
import { ACTION_TYPE as ADD_SECONDARY_TAB } from '../actions/addSecondaryTab';

import General from '../scenes/General';
import Errors from '../scenes/Errors';
import Warnings from '../scenes/Warnings';
import Modules from '../scenes/Modules';
import Assets from '../scenes/Assets';

import Module from '../scenes/Modules/containers/Module';

class Tab {
    constructor({
        isSecondary, index, name, element, link, path, children, statsKey,
    }) {
        this.isSecondary = isSecondary;
        this.index = index;
        this.name = name;
        this.element = element;
        this.link = link;
        this.path = path || link;
        this._children = children;
        this.statsKey = statsKey;
    }

    get children() {
        if (this._children) {
            return this._children;
        }

        return Module;
    }
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
        path: '/modules',
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
].map((tab, index) => new Tab({ isSecondary: false, index, ...tab }));

function createSecondaryTab(element, index) {
    return new Tab({
        isSecondary: true,
        index,
        name: element.name,
        path: '/module:id?',
        link: `module?id=${element.id}`,
        element,
    });
}

export default function (state = { mainTabs: TABS, secondaryTabs: [] }, { type, payload }) {
    if (type === GOTO_TAB) {
        const { index, isSecondary } = payload;

        return Object.assign({}, state, { currentTab: (isSecondary ? state.secondaryTabs : state.mainTabs)[index] });
    }

    if (type === ADD_SECONDARY_TAB) {
        return Object.assign(
            {}, state,
            { secondaryTabs: state.secondaryTabs.concat([createSecondaryTab(payload, state.secondaryTabs.length)]) },
        );
    }

    return state;
}

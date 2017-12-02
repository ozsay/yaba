import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';
import qs from 'qs';

import MainComponent from '../components/Main';

import Modules from '../../Modules';
import General from '../../General';
import Errors from '../../Errors';
import Warnings from '../../Warnings';
import Assets from '../../Assets';

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
        children: Modules,
    },
    {
        name: 'Assets',
        link: '/assets',
        children: Assets,
    },
    // { name: 'Chunks', link: '/chunks' },
    {
        name: 'Warnings',
        link: '/warnings',
        children: Warnings,
    },
    {
        name: 'Errors',
        link: '/errors',
        children: Errors,
    },
    // { name: 'Hints', link: '/hints' },
];

function getRoute(tab) {
    return tab.path || tab.link;
}

function mapStateToProps(state, { location }) {
    const tabs = TABS.map(tab => Object.assign(tab, { path: getRoute(tab), pathRegexp: pathToRegexp(getRoute(tab)) }));

    const currentTab = tabs.findIndex(tab => tab.pathRegexp.test(location.pathname));
    let currentModule;
    let reasonParams;

    if (location.search) {
        const params = qs.parse(location.search.substring(1));

        if (params.moduleId) {
            const moduleId = Number.parseInt(params.moduleId, 10);

            currentModule = state.stats.modules.find(module => module.id === moduleId);

            if (params.markerPos && params.reasonType) {
                const [line, column] = params.markerPos.split(':');
                const [start, end] = column.substring(1, column.length - 1).split('-');

                reasonParams = {
                    line, start, end, type: params.reasonType,
                };
            }
        }
    }

    return {
        hasStats: state.stats !== null,
        tabs,
        modules: state.stats && state.stats.modules,
        currentTab,
        currentModule,
        reasonParams,
    };
}

export default withRouter(connect(mapStateToProps)(MainComponent));

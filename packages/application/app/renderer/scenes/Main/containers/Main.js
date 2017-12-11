import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';
import qs from 'qs';

import statsListener from '../../../actions/statsListener';

import MainComponent from '../components/Main';

import Modules from '../../Modules';
import General from '../../General';
import Errors from '../../Errors';
import Warnings from '../../Warnings';
import Assets from '../../Assets';

function getRoute(tab) {
    return tab.path || tab.link;
}

function getLabel(stats, key, label) {
    const size = stats && stats[key] && stats[key].length;

    return `${label}${size !== null ? ` [${size}]` : ''}`;
}

function mapStateToProps({ stats }, { location }) {
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
            label: getLabel(stats, 'modules', 'Modules'),
            path: '/modules:moduleId?',
            children: Modules,
        },
        {
            name: 'Assets',
            link: '/assets',
            label: getLabel(stats, 'assets', 'Assets'),
            children: Assets,
        },
        // { name: 'Chunks', link: '/chunks' },
        {
            name: 'Warnings',
            link: '/warnings',
            label: getLabel(stats, 'warnings', 'Warnings'),
            children: Warnings,
        },
        {
            name: 'Errors',
            link: '/errors',
            label: getLabel(stats, 'errors', 'Errors'),
            children: Errors,
        },
        // { name: 'Hints', link: '/hints' },
    ];

    const tabs = TABS.map(tab => Object.assign(tab, { path: getRoute(tab), pathRegexp: pathToRegexp(getRoute(tab)) }));

    const currentTab = tabs.findIndex(tab => tab.pathRegexp.test(location.pathname));
    let currentModule;
    let reasonParams;

    if (stats && location.search) {
        const params = qs.parse(location.search.substring(1));

        if (params.moduleId) {
            const moduleId = Number.parseInt(params.moduleId, 10);

            currentModule = stats.modules.find(module => module.id === moduleId);

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
        hasStats: stats !== null,
        tabs,
        currentTab,
        currentModule,
        reasonParams,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        startListening: (listener) => {
            dispatch(statsListener(listener));
        },
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

import statsListener from '../../../actions/statsListener';

import MainComponent from '../components/Main';

function mapStateToProps({ stats, tabs: { mainTabs, secondaryTabs } }, { location }) {
    const currentTab = mainTabs.findIndex(tab => tab.pathRegexp.test(location.pathname));
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
        stats,
        mainTabs,
        secondaryTabs,
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

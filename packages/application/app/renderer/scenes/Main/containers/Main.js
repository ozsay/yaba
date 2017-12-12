import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import statsListener from '../../../actions/statsListener';
import gotoTab from '../../../actions/gotoTab';

import MainComponent from '../components/Main';

function mapStateToProps({ stats, tabs: { mainTabs, secondaryTabs, currentTab } }, { location }) {
    // if (stats && location.search) {
    //     const params = qs.parse(location.search.substring(1));
    //
    //     if (params.moduleId) {
    //         const moduleId = Number.parseInt(params.moduleId, 10);
    //
    //         currentModule = stats.modules.find(module => module.id === moduleId);
    //
    //         if (params.markerPos && params.reasonType) {
    //             const [line, column] = params.markerPos.split(':');
    //             const [start, end] = column.substring(1, column.length - 1).split('-');
    //
    //             reasonParams = {
    //                 line, start, end, type: params.reasonType,
    //             };
    //         }
    //     }
    // }

    return {
        stats,
        mainTabs,
        secondaryTabs,
        currentTab,
    };
}

const mapDispatchToProps = {
    gotoTab,
    startListening: statsListener,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));

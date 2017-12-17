import { connect } from 'react-redux';

import statsListener from '../../../actions/statsListener';
import gotoTab from '../../../actions/gotoTab';

import MainComponent from '../components/Main';

function mapStateToProps({ stats, tabs: { mainTabs, sideTabs, currentTab } }) {
    return {
        stats,
        mainTabs,
        sideTabs,
        currentTab,
    };
}

const mapDispatchToProps = {
    gotoTab,
    startListening: statsListener,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);

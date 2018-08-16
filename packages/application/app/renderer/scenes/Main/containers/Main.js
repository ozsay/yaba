import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import statsListener from '../../../actions/statsListener';
import gotoTab from '../../../actions/gotoTab';

import MainComponent from '../components/Main';

function mapStateToProps({ stats }) {
    if (stats) {
        gotoTab('/general', true);
    }

    return {
        stats,
        gotoTab,
    };
}

const mapDispatchToProps = {
    startListening: statsListener,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));

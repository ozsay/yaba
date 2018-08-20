import React from 'react';
import { withRouter } from 'react-router';

import gotoTab from '../../../actions/gotoTab';

import StatsContext from '../../../contexts/stats';

import MainComponent from '../components/Main';

function Main(props) {
    return (
        <StatsContext.Consumer>
            {({ stats, statsListener }) => (
                <MainComponent {...props} gotoTab={gotoTab} statsListener={statsListener} stats={stats} />
            )}
        </StatsContext.Consumer>
    );
}

export default withRouter(Main);

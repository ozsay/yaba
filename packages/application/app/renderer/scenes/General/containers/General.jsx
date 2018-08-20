import React from 'react';

import StatsContext from '../../../contexts/stats';

import GeneralComponent from '../components/General';

function General() {
    return (
        <StatsContext.Consumer>
            {({ stats }) => (
                <GeneralComponent stats={stats} />
            )}
        </StatsContext.Consumer>
    );
}

export default General;

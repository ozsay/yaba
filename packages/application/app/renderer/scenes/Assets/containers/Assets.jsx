import React from 'react';

import StatsContext from '../../../contexts/stats';

import AssetsListComponent from '../components/Assets';

function Assets() {
    return (
        <StatsContext.Consumer>
            {({ stats }) => (
                <AssetsListComponent assets={stats.assets} />
            )}
        </StatsContext.Consumer>
    );
}

export default Assets;

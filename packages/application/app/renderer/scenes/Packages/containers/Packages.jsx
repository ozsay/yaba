import React from 'react';

import StatsContext from '../../../contexts/stats';

import PackagesComponent from '../components/Packages';

function Packages() {
    return (
        <StatsContext.Consumer>
            {({ stats }) => (
                <PackagesComponent packages={stats.packages} />
            )}
        </StatsContext.Consumer>
    );
}

export default Packages;

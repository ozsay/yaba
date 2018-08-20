import React from 'react';

import StatsContext from '../../../contexts/stats';

import ChunksComponent from '../components/Chunks';

function Chunks() {
    return (
        <StatsContext.Consumer>
            {({ stats }) => (
                <ChunksComponent chunks={stats.chunks} />
            )}
        </StatsContext.Consumer>
    );
}

export default Chunks;

import React from 'react';
import { withRouter } from 'react-router';

import StatsContext from '../../../contexts/stats';

import ChunkComponent from '../components/Chunk';

function Chunk({ match: { params: { id: index } } }) {
    return (
        <StatsContext.Consumer>
            {({ stats }) => {
                const chunk = stats.chunks[index];

                return (
                    <ChunkComponent chunk={chunk} />
                );
            }}
        </StatsContext.Consumer>
    );
}

export default withRouter(Chunk);

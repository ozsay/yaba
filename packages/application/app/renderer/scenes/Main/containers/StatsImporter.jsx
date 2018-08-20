import React from 'react';

import StatsContext from '../../../contexts/stats';

import StatsImporterComponent from '../components/StatsImporter';

function StatsImporter() {
    return (
        <StatsContext.Consumer>
            {({ importStats }) => (
                <StatsImporterComponent importStats={importStats} />
            )}
        </StatsContext.Consumer>
    );
}

export default StatsImporter;

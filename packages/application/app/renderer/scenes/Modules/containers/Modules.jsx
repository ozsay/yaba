import React from 'react';

import StatsContext from '../../../contexts/stats';

import ModulesComponent from '../components/Modules';

function Modules() {
    return (
        <StatsContext.Consumer>
            {({ stats }) => (
                <ModulesComponent modules={stats.modules} />
            )}
        </StatsContext.Consumer>
    );
}

export default Modules;

import React from 'react';
import { withRouter } from 'react-router';

import StatsContext from '../../../contexts/stats';

import ModuleComponent from '../components/Module';

function Module({ location: { state: reason }, match: { params: { id } } }) {
    return (
        <StatsContext.Consumer>
            {({ stats }) => {
                const module = stats.modules.find(mod => mod.id === id);

                return (
                    <ModuleComponent module={module} reason={reason} />
                );
            }}
        </StatsContext.Consumer>
    );
}

export default withRouter(Module);

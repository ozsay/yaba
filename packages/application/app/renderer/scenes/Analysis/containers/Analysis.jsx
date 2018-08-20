import React from 'react';
import analyze from '@yaba/analyzer';

import StatsContext from '../../../contexts/stats';

import AnalysisComponent from '../components/Analysis';

function Analysis() {
    return (
        <StatsContext.Consumer>
            {({ stats }) => (
                <AnalysisComponent stats={stats} analyze={analyze} />
            )}
        </StatsContext.Consumer>
    );
}

export default Analysis;

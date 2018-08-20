import React from 'react';

import StatsContext from '../../../contexts/stats';

import MessagesList from '../../../components/MessagesList';

function Warnings() {
    return (
        <StatsContext.Consumer>
            {({ stats }) => (
                <MessagesList messages={stats.warnings} />
            )}
        </StatsContext.Consumer>
    );
}

export default Warnings;

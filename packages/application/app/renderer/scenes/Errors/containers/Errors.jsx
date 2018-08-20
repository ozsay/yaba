import React from 'react';

import StatsContext from '../../../contexts/stats';

import MessagesList from '../../../components/MessagesList';

function Errors() {
    return (
        <StatsContext.Consumer>
            {({ stats }) => (
                <MessagesList messages={stats.errors} />
            )}
        </StatsContext.Consumer>
    );
}

export default Errors;

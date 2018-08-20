import React, { Component } from 'react';

import importStats from '../actions/importStats';
import loadStats from '../actions/loadStats';
import saveStats from '../actions/saveStats';
import parseStats from '../actions/parseStats';
import statsListener from '../actions/statsListener';

const StatsContext = React.createContext();

class Provider extends Component {
    constructor(props) {
        super(props);

        this.listener = this.listener.bind(this);

        this.state = {};
    }

    componentDidMount() {
        loadStats()
            .then((stats) => {
                this.setState({ stats });
            });
    }

    listener(l) {
        statsListener(({ stats, context, outputPath }) => l()
            .then(() => saveStats({ stats, context, outputPath }))
            .then(() => parseStats(stats))
            .then((parsedStats) => {
                this.setState({ stats: parsedStats });
            })
            .catch(() => {}));
    }

    render() {
        const { children } = this.props;
        const { stats } = this.state;

        return (
            <StatsContext.Provider value={{ stats, importStats, statsListener: this.listener }}>
                {children}
            </StatsContext.Provider>
        );
    }
}

export default {
    Provider,
    Consumer: StatsContext.Consumer,
};

import React from 'react';
import PropTypes from 'prop-types';

import { Route, Switch, Redirect } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Toolbar from 'material-ui/Toolbar';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';

import TabContainer from './TabContainer';
import StatsImporter from '../containers/StatsImporter';

function getLabel(stats, { name, statsKey }) {
    const size = stats && stats[statsKey] && stats[statsKey].length;

    return `${name}${size !== undefined && size !== null ? ` [${size}]` : ''}`;
}

function DefaultComponent() {
    return (
        <TabContainer><div>Please upload a stats file</div></TabContainer>
    );
}

function calcIndex(index) {
    return index !== -1 ? index : false;
}

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.handleMainChange = this.handleMainChange.bind(this);
        this.handleSecondaryChange = this.handleSecondaryChange.bind(this);
        this.handleStatsUpdateConfirm = this.handleStatsUpdateConfirm.bind(this);
        this.handleStatsUpdateReject = this.handleStatsUpdateReject.bind(this);

        this.state = {};

        props.startListening(() => new Promise((resolve, reject) => {
            this.setState(Object.assign({}, this.state, { confirm: resolve, reject }));
        }));
    }

    changeTab(index, isSecondary = true) {
        const { gotoTab } = this.props;

        gotoTab(index, isSecondary);
    }

    handleMainChange(event, value) {
        this.changeTab(value, false);
    }

    handleSecondaryChange(event, value) {
        this.changeTab(value, true);
    }

    handleStatsUpdateConfirm() {
        this.state.confirm();
        this.setState(Object.assign({}, this.state, { confirm: null }));
    }

    handleStatsUpdateReject() {
        this.state.reject();
        this.setState(Object.assign({}, this.state, { confirm: null }));
    }

    render() {
        const {
            stats,
            mainTabs,
            secondaryTabs,
            currentTab: { isSecondary, index } = { isSecondary: false, index: -1 },
        } = this.props;
        const { confirm } = this.state;

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <StatsImporter />
                        <Tabs
                            value={!isSecondary && calcIndex(index)}
                            onChange={this.handleMainChange}
                            style={{ marginLeft: 30 }}
                        >
                            {mainTabs.map(tab => (
                                <Tab
                                    key={tab.name}
                                    label={getLabel(stats, tab)}
                                    disabled={stats === null}
                                />
                            ))}
                        </Tabs>
                    </Toolbar>
                </AppBar>
                {confirm &&
                <Dialog open>
                    <DialogTitle>Confirm stats update</DialogTitle>
                    <DialogContent>Stats have been updated through the yaba plugin.
                                   Do you wish to apply changes?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleStatsUpdateReject} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleStatsUpdateConfirm} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>}
                { secondaryTabs.length > 0 &&
                    <Tabs
                        value={isSecondary && calcIndex(index)}
                        onChange={this.handleSecondaryChange}
                        indicatorColor="primary"
                        textColor="primary"
                        scrollable
                        scrollButtons="auto"
                    >
                        {
                            secondaryTabs.map(tab => (
                                <Tab
                                    key={tab.link}
                                    label={
                                        <div>
                                            <div>MODULE</div>
                                            <div style={{ textTransform: 'none' }}>{tab.name}</div>
                                        </div>}
                                />
                            ))
                        }
                    </Tabs>
                }
                <Switch>
                    <Route path="/" exact component={DefaultComponent} />
                    {stats && mainTabs.concat(secondaryTabs).map(tab => (
                        <Route
                            key={tab.name}
                            path={tab.path}
                            render={() => <TabContainer comp={tab.children}>{Comp => <Comp />}</TabContainer>}
                        />))}
                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}

Main.propTypes = {
    location: PropTypes.object.isRequired, // eslint-disable-line
    stats: PropTypes.object, // eslint-disable-line
    mainTabs: PropTypes.array.isRequired, // eslint-disable-line
    secondaryTabs: PropTypes.array, // eslint-disable-line
    currentTab: PropTypes.object, // eslint-disable-line
    startListening: PropTypes.func.isRequired,
    gotoTab: PropTypes.func.isRequired,
};

Main.defaultProps = {
    stats: null,
    secondaryTabs: [],
};

export default Main;

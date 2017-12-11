import React from 'react';
import PropTypes from 'prop-types';

import { Route, Switch, Link, Redirect } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Toolbar from 'material-ui/Toolbar';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';

import TabContainer from './TabContainer';
import StatsImporter from '../containers/StatsImporter';
import Module from '../../../components/Module';

function getLabel(stats, { name, statsKey }) {
    const size = stats && stats[statsKey] && stats[statsKey].length;

    return `${name}${size !== undefined && size !== null ? ` [${size}]` : ''}`;
}

function DefaultComponent() {
    return (
        <TabContainer><div>Please upload a stats file</div></TabContainer>
    );
}

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleStatsUpdateConfirm = this.handleStatsUpdateConfirm.bind(this);
        this.handleStatsUpdateReject = this.handleStatsUpdateReject.bind(this);

        this.state = { value: this.getCurrentTab() };

        props.startListening(() => new Promise((resolve, reject) => {
            this.setState(Object.assign({}, this.state, { confirm: resolve, reject }));
        }));
    }

    componentWillReceiveProps(props) {
        const currentTab = this.getCurrentTab(props);

        this.setState({ value: currentTab });
    }

    getCurrentTab({ currentTab } = this.props) {
        return currentTab !== -1 ? currentTab : false;
    }

    handleChange(event, value) {
        this.setState(Object.assign({}, this.state, { value }));
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
            stats, mainTabs, currentModule, reasonParams, secondaryTabs,
        } = this.props;
        const { value, confirm } = this.state;

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <StatsImporter />
                        <Tabs value={value} onChange={this.handleChange} style={{ marginLeft: 30 }}>
                            {mainTabs.map(tab => (
                                <Tab
                                    key={tab.name}
                                    label={getLabel(stats, tab)}
                                    component={Link}
                                    to={tab.link}
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
                {currentModule && <Module module={currentModule} reasonParams={reasonParams} />}
                { secondaryTabs.length > 0 &&
                    <Tabs
                        value={false}
                        indicatorColor="primary"
                        textColor="primary"
                        scrollable
                        scrollButtons="auto"
                    >
                        {
                            secondaryTabs.map(element => (
                                <Tab key={element.id} label={element.name} />
                            ))
                        }
                    </Tabs>
                }
                <Switch>
                    <Route path="/" exact component={DefaultComponent} />
                    {stats && mainTabs.map(tab => (
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
    currentModule: PropTypes.object, // eslint-disable-line
    reasonParams: PropTypes.object, // eslint-disable-line
    startListening: PropTypes.func.isRequired,
};

Main.defaultProps = {
    stats: null,
    secondaryTabs: [],
};

export default Main;

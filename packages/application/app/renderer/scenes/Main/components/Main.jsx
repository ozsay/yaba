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
            hasStats, tabs, currentModule, reasonParams,
        } = this.props;
        const { value, confirm } = this.state;

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <StatsImporter />
                        <Tabs value={value} onChange={this.handleChange} style={{ marginLeft: 30 }}>
                            {tabs.map(tab => (
                                <Tab
                                    key={tab.name}
                                    label={tab.label || tab.name}
                                    component={Link}
                                    to={tab.link}
                                    disabled={!hasStats}
                                />
                            ))}
                        </Tabs>
                    </Toolbar>
                </AppBar>
                {confirm &&
                <Dialog open>
                    <DialogTitle>Confirm stats update?</DialogTitle>
                    <DialogContent>Approve</DialogContent>
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
                <Switch>
                    <Route path="/" exact component={DefaultComponent} />
                    {hasStats && tabs.map(tab => (
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
    hasStats: PropTypes.bool,
    tabs: PropTypes.array, // eslint-disable-line
    currentModule: PropTypes.object, // eslint-disable-line
    reasonParams: PropTypes.object, // eslint-disable-line
    startListening: PropTypes.func.isRequired,
};

Main.defaultProps = {
    hasStats: false,
    tabs: [],
};

export default Main;

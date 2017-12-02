import React from 'react';
import PropTypes from 'prop-types';

import { Route, Switch, Link, Redirect } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Toolbar from 'material-ui/Toolbar';

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

        this.state = { value: this.getCurrentTab() };
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

    render() {
        const {
            hasStats, tabs, currentModule, reasonParams,
        } = this.props;
        const { value } = this.state;

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <StatsImporter />
                        <Tabs value={value} onChange={this.handleChange} style={{ marginLeft: 30 }}>
                            {tabs.map(tab => (
                                <Tab key={tab.name} label={tab.name} component={Link} to={tab.link} disabled={!hasStats} />
                            ))}
                        </Tabs>
                    </Toolbar>
                </AppBar>
                <Switch>
                    {currentModule && <Module module={currentModule} reasonParams={reasonParams} />}
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
};

Main.defaultProps = {
    hasStats: false,
    tabs: [],
};

export default Main;

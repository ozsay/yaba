import React from 'react';
import PropTypes from 'prop-types';

import { Route, Switch, Redirect } from 'react-router-dom';

import { Layout, Menu, Modal, Badge } from 'antd';

import TabContainer from './TabContainer';
import StatsImporter from '../containers/StatsImporter';

const { confirm } = Modal;
const { Header, Content, Sider } = Layout;

const headerHeight = '42px';

const addStatsButtonStyle = {
    float: 'left',
    marginTop: '5px',
    marginRight: '24px',
};

function getSize(stats, { statsKey }) {
    const size = stats && stats[statsKey] && stats[statsKey].length;

    return size || 0;
}

function DefaultComponent() {
    return (
        <TabContainer><div>Please upload a stats file</div></TabContainer>
    );
}

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.handleMainChange = this.handleMainChange.bind(this);
        this.handleSecondaryChange = this.handleSecondaryChange.bind(this);

        this.state = {};

        props.startListening(() => new Promise((resolve, reject) => {
            this.setState(Object.assign({}, this.state, { confirm: resolve, reject }));
        }));
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.confirm && !prevState.confirm) {
            this.showStatsUpdateConfirm();
        }
    }

    changeTab(index, isSecondary = true) {
        const { gotoTab } = this.props;

        gotoTab(index, isSecondary);
    }

    handleMainChange({ key }) {
        const { mainTabs } = this.props;

        this.changeTab(mainTabs.findIndex(tab => tab.name === key), false);
    }

    handleSecondaryChange(event, value) {
        this.changeTab(value, true);
    }

    showStatsUpdateConfirm() {
        const self = this;
        confirm({
            title: 'Confirm stats update',
            content: 'Stats have been updated through the yaba plugin. Do you wish to apply changes?',
            onOk() {
                self.state.confirm();
                self.setState(Object.assign({}, self.state, { confirm: null }));
            },
            onCancel() {
                self.state.reject();
                self.setState(Object.assign({}, self.state, { confirm: null }));
            },
        });
    }

    render() {
        const {
            stats,
            mainTabs,
            secondaryTabs,
            currentTab: { index } = { isSecondary: false, index: -1 },
        } = this.props;

        return (
            <Layout style={{ height: '100vh' }}>
                <Header style={{ height: headerHeight }}>
                    <StatsImporter style={addStatsButtonStyle} />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={[index !== -1 ? mainTabs[index].name : null]}
                        style={{ lineHeight: headerHeight }}
                        onSelect={this.handleMainChange}
                    >
                        {mainTabs.map(tab => (
                            <Menu.Item key={tab.name} disabled={stats === null}>
                                {tab.name}
                                { getSize(stats, tab) > 0 &&
                                    <Badge count={getSize(stats, tab)} style={{ backgroundColor: '#52c41a' }} offset={[0, 5]} />
                                }
                            </Menu.Item>
                        ))}
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#f1f1f1', borderRight: '1px #cacaca solid' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            style={{ height: '100%', borderRight: 0, background: 'transparent' }}
                        >
                            <Menu.Item key="1">option1</Menu.Item>
                            <Menu.Item key="2">option2</Menu.Item>
                            <Menu.Item key="3">option3</Menu.Item>
                            <Menu.Item key="4">option4</Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Content style={{
                            background: '#fff', padding: 24, margin: 0, minHeight: 280,
                        }}
                        >
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
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
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

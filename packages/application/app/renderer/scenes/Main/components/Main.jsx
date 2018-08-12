import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';

import {
    Layout, Menu, Modal, Badge, Input,
} from 'antd';

import routes from '../../../utils/routes';

import MenuActions from '../../../components/MenuActions';
import StatsImporter from '../containers/StatsImporter';

const { confirm: openConfirm } = Modal;
const { Header, Content, Sider } = Layout;
const { Search } = Input;

const headerHeight = '42px';

const addStatsButtonStyle = {
    float: 'left',
    marginTop: '5px',
    marginRight: '24px',
};

const actionsButtonStyle = {
    float: 'right',
    marginTop: '5px',
};

const searchStyle = {
    margin: 12,
    width: 175,
};

function getSize(stats, { statsKey }) {
    const size = stats && stats[statsKey] && stats[statsKey].length;

    return size || 0;
}

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.handleMainChange = this.handleMainChange.bind(this);

        this.state = {};

        props.startListening(() => new Promise((resolve, reject) => {
            this.setState({ confirm: resolve, reject });
        }));
    }

    componentDidUpdate(prevProps, prevState) {
        const { confirm } = this.state;

        if (confirm && !prevState.confirm) {
            this.showStatsUpdateConfirm();
        }
    }

    handleMainChange({ key: url }) {
        const { gotoTab } = this.props;

        gotoTab(url);
    }

    showStatsUpdateConfirm() {
        const self = this;
        openConfirm({
            title: 'Confirm stats update',
            content: 'Stats have been updated through the yaba plugin. Do you wish to apply changes?',
            onOk() {
                self.state.confirm();
                self.setState({ confirm: null });
            },
            onCancel() {
                self.state.reject();
                self.setState({ confirm: null });
            },
        });
    }

    render() {
        const {
            stats,
            location,
        } = this.props;

        const currentMainRoute = routes.find(r => location.pathname.startsWith(r.path));

        return (
            <Layout style={{ height: '100vh' }}>
                <Header style={{ height: headerHeight }}>
                    <StatsImporter style={addStatsButtonStyle} />
                    <MenuActions style={actionsButtonStyle} />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={[currentMainRoute && currentMainRoute.path]}
                        style={{ lineHeight: headerHeight }}
                        onSelect={this.handleMainChange}
                    >
                        {routes.map(route => (
                            <Menu.Item key={route.path} disabled={stats === null}>
                                {route.name}
                                { getSize(stats, route) > 0
                                    && (
                                        <Badge
                                            overflowCount={9999}
                                            count={getSize(stats, route)}
                                            style={{ backgroundColor: '#52c41a' }}
                                            offset={[5, 0]}
                                        />
                                    )
                                }
                            </Menu.Item>
                        ))}
                    </Menu>
                </Header>
                <Layout>
                    {
                        <Sider width={200} style={{ background: '#f1f1f1', borderRight: '1px #cacaca solid' }}>
                            <Search
                                style={searchStyle}
                                placeholder="search"
                                onChange={value => console.log(value)}
                            />
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                style={{ borderRight: 0, background: 'transparent' }}
                            />
                        </Sider>
                    }
                    <Layout style={{ background: '#fff' }}>
                        <Content style={{
                            background: '#fff', padding: 24, margin: 0, minHeight: 280,
                        }}
                        >
                            <Switch>
                                {
                                    routes.map(route => (
                                        <Route
                                            key={route.name}
                                            exact
                                            path={route.path}
                                            component={route.component}
                                        />
                                    ))
                                }
                                {
                                    routes.filter(route => !!route.childComponent).map(route => (
                                        <Route
                                            key={`${route.name}_child`}
                                            exact
                                            path={`${route.path}/:id+`}
                                            component={route.childComponent}
                                        />
                                    ))
                                }
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

Main.propTypes = {
    stats: PropTypes.object, // eslint-disable-line
    startListening: PropTypes.func.isRequired,
    gotoTab: PropTypes.func.isRequired,
};

Main.defaultProps = {
    stats: null,
};

export default Main;

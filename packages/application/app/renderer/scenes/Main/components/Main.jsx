import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';

import {
    Layout, Menu, Modal, Badge, Input, Button,
} from 'antd';

import routes from '../../../utils/routes';
import MenuActions from '../../../components/MenuActions';

const { confirm: openConfirm } = Modal;
const { Header, Content, Sider } = Layout;
const { Search } = Input;

const headerHeight = '42px';

const headerStyle = {
    height: headerHeight,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    position: 'fixed',
    zIndex: 999,
};

const navigationStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    width: 150,
    paddingRight: 50,
};

const searchStyle = {
    margin: 12,
    width: 175,
};

function getSize(stats, { statsKey }) {
    const size = stats && stats[statsKey] && stats[statsKey].length;

    return size || 0;
}

function NoStats() {
    return 'Please use the plugin to load stats';
}

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.handleMainChange = this.handleMainChange.bind(this);
        this.next = this.next.bind(this);
        this.back = this.back.bind(this);

        this.state = {};

        props.statsListener(() => new Promise((resolve, reject) => {
            this.setState({ confirm: resolve, reject });
        }));
    }

    componentDidMount() {
        const { gotoTab, stats } = this.props;

        if (stats) {
            gotoTab('/general', true);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { confirm } = this.state;

        if (confirm && !prevState.confirm) {
            this.showStatsUpdateConfirm();
        }

        const { gotoTab, stats } = this.props;

        if (!prevProps.stats && stats) {
            gotoTab('/general', true);
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

    next() {
        const { history } = this.props;

        history.goForward();
    }

    back() {
        const { history } = this.props;

        history.goBack();
    }

    render() {
        const {
            stats,
            location,
            history,
        } = this.props;

        const currentMainRoute = routes.find(r => location.pathname.startsWith(r.path));

        return (
            <Layout style={{ height: '100vh' }}>
                <Header style={headerStyle}>
                    <div style={navigationStyle}>
                        <Button
                            shape="circle"
                            icon="arrow-left"
                            disabled={history.index === 0}
                            onClick={this.back}
                        />
                        <Button
                            shape="circle"
                            icon="arrow-right"
                            disabled={history.index === (history.length - 1)}
                            onClick={this.next}
                        />
                    </div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={[currentMainRoute && currentMainRoute.path]}
                        style={{ lineHeight: headerHeight, flex: 1 }}
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
                    <MenuActions />
                </Header>
                <Layout style={{ marginTop: headerHeight, zIndex: 500 }}>
                    {/* { */}
                    {/* <Sider width={200} style={{ background: '#f1f1f1', borderRight: '1px #cacaca solid' }}> */}
                    {/* <Search */}
                    {/* style={searchStyle} */}
                    {/* placeholder="search" */}
                    {/* onChange={value => console.log(value)} */}
                    {/* /> */}
                    {/* <Menu */}
                    {/* mode="inline" */}
                    {/* defaultSelectedKeys={['1']} */}
                    {/* style={{ borderRight: 0, background: 'transparent' }} */}
                    {/* /> */}
                    {/* </Sider> */}
                    {/* } */}
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
                                {
                                    <Route component={NoStats} />
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
    statsListener: PropTypes.func.isRequired,
    gotoTab: PropTypes.func.isRequired,
};

Main.defaultProps = {
    stats: null,
};

export default Main;

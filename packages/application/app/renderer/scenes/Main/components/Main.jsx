import React from 'react';
import PropTypes from 'prop-types';

import { Layout, Menu, Modal, Badge, Input } from 'antd';

import TabContainer from './TabContainer';
import MenuActions from '../../../components/MenuActions';
import StatsImporter from '../containers/StatsImporter';

const { confirm } = Modal;
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
    padding: '5px 0',
    width: '175px',
    marginLeft: '12px',
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

    changeTab(index, type = 'main') {
        const { gotoTab } = this.props;

        gotoTab(index, type);
    }

    handleMainChange({ key }) {
        const { mainTabs } = this.props;

        this.changeTab(mainTabs.findIndex(tab => tab.name === key));
    }

    handleSecondaryChange(event, value) {
        this.changeTab(value, 'modules');
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
            sideTabs = [],
            currentTab: { index, type, component } = { type: 'main', index: -1 },
        } = this.props;

        const mainIndex = type === 'main' && index !== -1 ? mainTabs[index].name : null;

        return (
            <Layout style={{ height: '100vh' }}>
                <Header style={{ height: headerHeight }}>
                    <StatsImporter style={addStatsButtonStyle} />
                    <MenuActions style={actionsButtonStyle} />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={[mainIndex]}
                        style={{ lineHeight: headerHeight }}
                        onSelect={this.handleMainChange}
                    >
                        {mainTabs.map(tab => (
                            <Menu.Item key={tab.name} disabled={stats === null}>
                                {tab.name}
                                { getSize(stats, tab) > 0 &&
                                    <Badge
                                        overflowCount={9999}
                                        count={getSize(stats, tab)}
                                        style={{ backgroundColor: '#52c41a' }}
                                        offset={[0, 5]}
                                    />
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
                            >
                                {/* { sideTabs.map(sideTab => ( */}
                                {/* <Menu.Item key={sideTab.name}>{sideTab.name}</Menu.Item> */}
                                {/* ))} */}
                            </Menu>
                        </Sider>
                    }
                    <Layout style={{ background: '#fff' }}>
                        <Content style={{
                            background: '#fff', padding: 24, margin: 0, minHeight: 280,
                        }}
                        >
                            {
                                index === -1 ?
                                    <DefaultComponent /> :
                                    <TabContainer comp={component}>{Comp => <Comp />}</TabContainer>
                            }
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

Main.propTypes = {
    stats: PropTypes.object, // eslint-disable-line
    mainTabs: PropTypes.array.isRequired, // eslint-disable-line
    sideTabs: PropTypes.array.isRequired, // eslint-disable-line
    currentTab: PropTypes.object, // eslint-disable-line
    startListening: PropTypes.func.isRequired,
    gotoTab: PropTypes.func.isRequired,
};

Main.defaultProps = {
    stats: null,
};

export default Main;

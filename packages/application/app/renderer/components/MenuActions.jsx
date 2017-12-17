import React from 'react';

import { Menu, Dropdown, Button, Icon } from 'antd';

export default function MenuActions({ style }) {
    const menu = (
        <Menu onClick={a => console.log('heyyy', a)}>
            <Menu.Item key="settings">
                <Icon type="setting" />
                <span> Settings</span>
            </Menu.Item>
            <Menu.Item key="load">
                <Icon type="save" />
                <span> Load stats</span>
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <Button style={style} shape="circle" icon="ellipsis" />
        </Dropdown>
    );
}

import React from 'react';

import {
    Menu, Dropdown, Button, Icon,
} from 'antd';

import SettingsContext from '../contexts/settings';

export default function MenuActions({ style }) {

    return null;

    return (
        <SettingsContext.Consumer>
            {({ openSettings }) => {
                const menu = (
                    <Menu onClick={({ key }) => {
                        switch (key) {
                            case 'settings': {
                                openSettings();
                                break;
                            }
                            default:
                        }
                    }}
                    >
                        <Menu.Item key="settings">
                            <Icon type="setting" />
                            <span> Settings</span>
                        </Menu.Item>
                    </Menu>
                );

                return (
                    <Dropdown overlay={menu} trigger={['click']}>
                        <Button style={style} shape="circle" icon="ellipsis" />
                    </Dropdown>
                );
            }}
        </SettingsContext.Consumer>
    );
}

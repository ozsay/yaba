import React from 'react';

import { Modal, Tabs, Button } from 'antd';

const { TabPane } = Tabs;

const titleStyle = {
    margin: 0,
    fontSize: 16,
    lineHeight: '22px',
    fontWeight: 500,
    color: 'rgba(0, 0, 0, 0.85)',
};

export default class AppSettings extends React.Component {
    constructor(props) {
        super(props);

        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);

        this.state = {};
    }

    handleOk() {
        const { onSave, onClose } = this.props;

        onSave();
        onClose();
    }

    handleCancel() {
        const { onClose } = this.props;

        onClose();
    }

    render() {
        const { open } = this.props;

        return (
            <Modal
                visible={open}
                width="60%"
                closable={false}
                footer={null}
                bodyStyle={{ padding: 18 }}
            >
                <div style={titleStyle}>App Settings</div>
                <Tabs style={{ padding: '10px 0' }} defaultActiveKey="1" type="card">
                    <TabPane tab="General" key="1">Content of tab 1</TabPane>
                    <TabPane tab="Tabs" key="2">
                        <Tabs defaultActiveKey="1" type="card">
                            <TabPane tab="Modules" key="1">Content of tab 1</TabPane>
                            <TabPane tab="Assets" key="2">Content of tab 2</TabPane>
                            <TabPane tab="Chunks" key="3">Content of tab 3</TabPane>
                            <TabPane tab="Packages" key="4">Content of tab 4</TabPane>
                        </Tabs>
                    </TabPane>
                    <TabPane tab="Support" key="3">Content of tab 3</TabPane>
                </Tabs>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={this.handleCancel}>Cancel</Button>
                    <Button onClick={this.handleOk} style={{ marginLeft: 10 }} type="primary">Save</Button>
                </div>
            </Modal>
        );
    }
}

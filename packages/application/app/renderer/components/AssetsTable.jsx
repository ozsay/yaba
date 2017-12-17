import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'antd';

import Actions from './Actions';

export default function AssetsTable({ assets }) {
    function renderTable(actions) {
        const { gotoTab } = actions;

        const dataSource = assets.map(asset => ({
            id: asset.id,
            key: asset.name,
            name: asset.name,
            mime: asset.mimeType,
            size: asset.size,
        }));

        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, obj) => <a onClick={() => gotoTab(obj.id, 'assets')}>{text}</a>,
        }, {
            title: 'Mime type',
            dataIndex: 'mime',
        }, {
            title: 'Size',
            dataIndex: 'size',
        }];

        return (
            <Table
                dataSource={dataSource}
                columns={columns}
                size="small"
                pagination={false}
            />
        );
    }
    return (
        <Actions>{ renderTable }</Actions>
    );
}

AssetsTable.propTypes = {
    assets: PropTypes.arrayOf(PropTypes.object),
};

AssetsTable.defaultProps = { assets: [] };

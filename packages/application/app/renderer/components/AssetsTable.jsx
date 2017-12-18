import React from 'react';
import PropTypes from 'prop-types';

import Table from './Table';

import Actions from './Actions';

export default function AssetsTable({ assets }) {
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
        render: (text, obj) => <Actions>{ ({ gotoTab }) => <a onClick={() => gotoTab(obj.id, 'assets')}>{text}</a> }</Actions>,
    }, {
        title: 'Mime type',
        dataIndex: 'mime',
    }, {
        title: 'Size',
        dataIndex: 'size',
    }];

    return (
        <Table
            data={dataSource}
            columns={columns}
        />
    );
}

AssetsTable.propTypes = {
    assets: PropTypes.arrayOf(PropTypes.object),
};

AssetsTable.defaultProps = { assets: [] };

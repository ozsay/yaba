import React from 'react';
import PropTypes from 'prop-types';

import Table from './Table';

import Actions from './Actions';

export default function ChunksTable({ chunks }) {
    const dataSource = chunks.map(chunk => ({
        id: chunk.id,
        key: chunk.id,
        name: chunk.name,
        size: chunk.size,
        hash: chunk.hash,
    }));

    const columns = [{
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: 'Name',
        dataIndex: 'name',
        render: (text, obj) => <Actions>{ ({ gotoTab }) => <a onClick={() => gotoTab(obj.id, 'chunks')}>{text}</a> }</Actions>,
    }, {
        title: 'Hash',
        dataIndex: 'hash',
    }, {
        title: 'size',
        dataIndex: 'size',
    }];

    return (
        <Table
            data={dataSource}
            columns={columns}
        />
    );
}

ChunksTable.propTypes = {
    chunks: PropTypes.arrayOf(PropTypes.object),
};

ChunksTable.defaultProps = { chunks: [] };

import React from 'react';
import PropTypes from 'prop-types';

import Table from './Table';

import Actions from './Actions';

export default function ChunksTable({ chunks }) {
    function renderTable(actions) {
        const { gotoTab } = actions;

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
            render: (text, obj) => <a onClick={() => gotoTab(obj.id, 'chunks')}>{text}</a>,
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
    return (
        <Actions>{ renderTable }</Actions>
    );
}

ChunksTable.propTypes = {
    chunks: PropTypes.arrayOf(PropTypes.object),
};

ChunksTable.defaultProps = { chunks: [] };

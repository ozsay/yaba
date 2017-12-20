import React from 'react';
import PropTypes from 'prop-types';

import { Column } from 'react-virtualized';

import Table from './Table';

import Actions from './Actions';

export default function ChunksTable(props) {
    const { chunks } = props;

    return (
        <Table data={chunks} {...props}>
            <Column
                label="Id"
                dataKey="id"
                dataLength={val => val.length}
                width={10}
            />
            <Column
                label="Name"
                dataKey="name"
                dataLength={val => val.length}
                width={10}
                cellRenderer={({ rowData, cellData }) =>
                    <Actions>{ ({ gotoTab }) => <a onClick={() => gotoTab(rowData.id, 'chunks')}>{cellData}</a> }</Actions>}
            />
            <Column
                label="Hash"
                dataKey="hash"
                dataLength={val => val.length}
                width={10}
            />
            <Column
                label="Size"
                dataKey="size"
                dataLength={val => val.toString().length}
                width={10}
            />
        </Table>
    );
}

ChunksTable.propTypes = {
    chunks: PropTypes.arrayOf(PropTypes.object),
};

ChunksTable.defaultProps = { chunks: [] };

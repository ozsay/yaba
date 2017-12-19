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
                width={300}
            />
            <Column
                label="Name"
                dataKey="name"
                width={300}
                cellRenderer={({ rowData, cellData }) =>
                    <Actions>{ ({ gotoTab }) => <a onClick={() => gotoTab(rowData.id, 'chunks')}>{cellData}</a> }</Actions>}
            />
            <Column
                label="Hash"
                dataKey="hash"
                width={300}
            />
            <Column
                label="Size"
                dataKey="size"
                width={300}
            />
        </Table>
    );
}

ChunksTable.propTypes = {
    chunks: PropTypes.arrayOf(PropTypes.object),
};

ChunksTable.defaultProps = { chunks: [] };

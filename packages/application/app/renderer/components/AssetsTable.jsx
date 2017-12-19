import React from 'react';
import PropTypes from 'prop-types';

import { Column } from 'react-virtualized';

import Table from './Table';

import Actions from './Actions';

export default function AssetsTable(props) {
    const { assets } = props;

    return (
        <Table data={assets} {...props}>
            <Column
                label="Name"
                dataKey="name"
                width={400}
                cellRenderer={({ rowData, cellData }) =>
                    <Actions>{ ({ gotoTab }) => <a onClick={() => gotoTab(rowData.id, 'assets')}>{cellData}</a> }</Actions>}
            />
            <Column
                label="Mime type"
                dataKey="mimeType"
                width={400}
            />
            <Column
                label="Size"
                dataKey="size"
                width={400}
            />
        </Table>
    );
}

AssetsTable.propTypes = {
    assets: PropTypes.arrayOf(PropTypes.object),
};

AssetsTable.defaultProps = { assets: [] };

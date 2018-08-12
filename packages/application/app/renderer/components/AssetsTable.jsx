import React from 'react';
import PropTypes from 'prop-types';

import { Column } from 'react-virtualized';
import { Link } from 'react-router-dom';

import Table from './Table';

export default function AssetsTable(props) {
    const { assets } = props;

    return (
        <Table data={assets} {...props}>
            <Column
                label="Name"
                dataKey="name"
                width={10}
                dataLength={val => val.length}
                cellRenderer={({ rowData, cellData }) => (
                    <Link to={`/assets/${rowData.id}`}>
                        {cellData}
                    </Link>
                )}
            />
            <Column
                label="Mime type"
                dataKey="mimeType"
                width={10}
                dataLength={val => val.length}
            />
            <Column
                label="Size"
                dataKey="size"
                width={10}
                dataLength={val => val.toString().length}
            />
        </Table>
    );
}

AssetsTable.propTypes = {
    assets: PropTypes.arrayOf(PropTypes.object),
};

AssetsTable.defaultProps = { assets: [] };

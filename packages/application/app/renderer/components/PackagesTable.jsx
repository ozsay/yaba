import React from 'react';
import PropTypes from 'prop-types';

import { Column } from 'react-virtualized';

import Actions from './Actions';
import Table from './Table';

const { shell } = window.require('electron');

export default function PackagesTable(props) {
    const { packages } = props;

    return (
        <Table data={packages} {...props}>
            <Column
                label="Id"
                dataKey="id"
                dataLength={val => val.toString().length}
                width={10}
            />
            <Column
                label="Name"
                dataKey="name"
                dataLength={val => val ? val.length : 0}
                width={10}
                cellRenderer={({ rowData, cellData }) =>
                    <Actions>{ ({ gotoTab }) => <a onClick={() => gotoTab(rowData.id, 'packages')}>{cellData}</a> }</Actions>}
            />
            <Column
                label="Version"
                dataKey="version"
                dataLength={val => val ? val.length : 0}
                width={10}
            />
            <Column
                label="License"
                dataKey="license"
                dataLength={val => val ? val.length : 0}
                width={10}
            />
            <Column
                label="Homepage"
                dataKey="homepage"
                dataLength={val => val ? val.length : 0}
                width={10}
                cellRenderer={({ cellData }) => <a onClick={() => shell.openExternal(cellData)}>{cellData}</a>}
            />
        </Table>
    );
}

PackagesTable.propTypes = {
    packages: PropTypes.arrayOf(PropTypes.object),
};

PackagesTable.defaultProps = { packages: [] };

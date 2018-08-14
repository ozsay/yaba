import React from 'react';
import PropTypes from 'prop-types';

import { Column } from 'react-virtualized';

import { Link } from 'react-router-dom';
import Table from './Table';

export default function ModulesTable(props) {
    const { modules } = props;

    return (
        <Table data={modules} {...props}>
            <Column
                label="Id"
                dataKey="id"
                dataLength={val => val.length}
                width={15}
                cellRenderer={({ rowData, cellData }) => (
                    <Link to={`/modules/${rowData.id}`}>
                        {cellData}
                    </Link>
                )}
            />
            <Column
                label="Path"
                dataKey="display"
                dataLength={val => val.length}
                width={5}
            />
            <Column
                label="Issuer"
                dataKey="issuer"
                dataLength={val => (val ? val.display.length : 0)}
                width={10}
                cellRenderer={({ cellData: issuer = {} }) => (
                    <Link to={`/modules/${issuer.id}`}>
                        {issuer.display}
                    </Link>
                )}
            />
            <Column
                label="Size"
                dataKey="size"
                dataLength={val => val.toString().length}
                width={3}
            />
            <Column
                label="Children"
                dataKey="children"
                dataLength={val => val.length.toString().length}
                width={3}
                cellRenderer={({ cellData: children }) => (
                    <div>
                        {children.length}
                    </div>
                )}
            />
        </Table>
    );
}

ModulesTable.propTypes = {
    modules: PropTypes.arrayOf(PropTypes.object),
};

ModulesTable.defaultProps = { modules: [] };

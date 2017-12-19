import React from 'react';
import PropTypes from 'prop-types';

import { Column } from 'react-virtualized';

import Table from './Table';

import Actions from './Actions';

export default function ModulesTable(props) {
    const { modules } = props;

    return (
        <Table data={modules} {...props}>
            <Column
                label="Id"
                dataKey="id"
                width={240}
                cellRenderer={({ rowData, cellData }) =>
                    <Actions>{ ({ gotoTab }) => <a onClick={() => gotoTab(rowData.id, 'modules')}>{cellData}</a> }</Actions>}
            />
            <Column
                label="Path"
                dataKey="name"
                width={240}
            />
            <Column
                label="Issuer"
                dataKey="issuer"
                width={240}
                cellRenderer={({ cellData: issuer = {} }) =>
                    <Actions>{ ({ gotoTab }) => <a onClick={() => gotoTab(issuer.id, 'modules')}>{issuer.name}</a> }</Actions>}
            />
            <Column
                label="Size"
                dataKey="size"
                width={240}
            />
            <Column
                label="Children"
                dataKey="children"
                width={240}
                cellRenderer={({ cellData: children }) => <div>{children.length}</div>}
            />
        </Table>
    );
}

ModulesTable.propTypes = {
    modules: PropTypes.arrayOf(PropTypes.object),
};

ModulesTable.defaultProps = { modules: [] };

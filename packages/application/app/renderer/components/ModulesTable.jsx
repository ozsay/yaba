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
                dataLength={val => val.length}
                width={10}
                cellRenderer={({ rowData, cellData }) =>
                    <Actions>{ ({ gotoTab }) => <a onClick={() => gotoTab(rowData.id, 'modules')}>{cellData}</a> }</Actions>}
            />
            <Column
                label="Path"
                dataKey="display"
                dataLength={val => val.length}
                width={10}
            />
            <Column
                label="Issuer"
                dataKey="issuer"
                dataLength={val => val ? val.display.length : 0}
                width={10}
                cellRenderer={({ cellData: issuer = {} }) =>
                    <Actions>{ ({ gotoTab }) => <a onClick={() => gotoTab(issuer.id, 'modules')}>{issuer.display}</a> }</Actions>}
            />
            <Column
                label="Size"
                dataKey="size"
                dataLength={val => val.toString().length}
                width={10}
            />
            <Column
                label="Children"
                dataKey="children"
                dataLength={val => val.length.toString().length}
                width={10}
                cellRenderer={({ cellData: children }) => <div>{children.length}</div>}
            />
        </Table>
    );
}

ModulesTable.propTypes = {
    modules: PropTypes.arrayOf(PropTypes.object),
};

ModulesTable.defaultProps = { modules: [] };

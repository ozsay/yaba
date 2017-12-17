import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'antd';

import Actions from './Actions';

export default function ModulesTable({ modules }) {
    function renderTable(actions) {
        const { gotoTab } = actions;

        function goToModule(id) {
            gotoTab(parseInt(id, 10), 'modules');
        }

        const dataSource = modules.map(module => ({
            key: module.id,
            id: module.id,
            name: module.name,
            issuer: module.issuer && module.issuer.name,
            issuerId: module.issuer && module.issuer.id,
            size: module.size,
            _children: module.children.length,
        }));

        const columns = [{
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: (text, obj) => <a onClick={() => goToModule(obj.id)}>{text}</a>,
        }, {
            title: 'Path',
            dataIndex: 'name',
        }, {
            title: 'Issuer',
            dataIndex: 'issuer',
            render: (text, obj) => <a onClick={() => goToModule(obj.issuerId)}>{text}</a>,
        }, {
            title: 'Size',
            dataIndex: 'size',
        }, {
            title: 'Children',
            dataIndex: '_children',
        }];

        return (
            <Table
                dataSource={dataSource}
                columns={columns}
                size="small"
                pagination={false}
            />
        );
    }
    return (
        <Actions>{ renderTable }</Actions>
    );
}

ModulesTable.propTypes = {
    modules: PropTypes.arrayOf(PropTypes.object),
};

ModulesTable.defaultProps = { modules: [] };

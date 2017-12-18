import React from 'react';
import PropTypes from 'prop-types';

import Table from './Table';

import Actions from './Actions';

export default function ModulesTable({ modules }) {
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
        render: (text, obj) => <Actions>{ ({ gotoTab }) => <a onClick={() => gotoTab(obj.id, 'modules')}>{text}</a> }</Actions>,
    }, {
        title: 'Path',
        dataIndex: 'name',
    }, {
        title: 'Issuer',
        dataIndex: 'issuer',
        render: (text, obj) => <Actions>{ ({ gotoTab }) => <a onClick={() => gotoTab(obj.issuerId, 'modules')}>{text}</a> }</Actions>,
    }, {
        title: 'Size',
        dataIndex: 'size',
    }, {
        title: 'Children',
        dataIndex: '_children',
    }];

    return (
        <Table
            data={dataSource}
            columns={columns}
        />
    );
}

ModulesTable.propTypes = {
    modules: PropTypes.arrayOf(PropTypes.object),
};

ModulesTable.defaultProps = { modules: [] };

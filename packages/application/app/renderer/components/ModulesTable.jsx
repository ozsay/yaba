import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Table } from 'antd';

import gotoTabAction from '../actions/gotoTab';

function ModulesTable({ modules, gotoTab }) {
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
        />);
}

const mapDispaptchToProps = {
    gotoTab: gotoTabAction,
};

export default connect(() => ({}), mapDispaptchToProps)(ModulesTable);

ModulesTable.propTypes = {
    modules: PropTypes.arrayOf(PropTypes.object),
    gotoTab: PropTypes.func.isRequired,
};

ModulesTable.defaultProps = { modules: [] };

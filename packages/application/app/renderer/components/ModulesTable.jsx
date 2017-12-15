import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Table } from 'antd';

import addSecondaryTabAction from '../actions/addSecondaryTab';

function ModulesTable({ modules, addSecondaryTab }) {
    const dataSource = modules.map(module => ({
        key: module.id,
        id: module.id,
        name: module.name,
        issuer: module.issuer && module.issuer.name,
        size: module.size,
        _children: module.children.length,
    }));

    const columns = [{
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        render: (text, obj) => <a onClick={() => addSecondaryTab(obj)}>{text}</a>,
    }, {
        title: 'Path',
        dataIndex: 'name',
    }, {
        title: 'Issuer',
        dataIndex: 'issuer',
        render: (text, obj) => <a onClick={() => addSecondaryTab(obj.issuer)}>{text}</a>,
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
    addSecondaryTab: addSecondaryTabAction,
};

export default connect(() => ({}), mapDispaptchToProps)(ModulesTable);

ModulesTable.propTypes = {
    modules: PropTypes.arrayOf(PropTypes.object),
    addSecondaryTab: PropTypes.func.isRequired,
};

ModulesTable.defaultProps = { modules: [] };

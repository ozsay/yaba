import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'antd';

const { shell } = window.require('electron');

export default class Packages extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { packages, gotoTab } = this.props;

        const dataSource = packages.map(_package => ({
            id: _package.id,
            key: _package.name,
            name: _package.name,
            version: _package.version,
            license: _package.license,
            homepage: _package.homepage,
        }));

        const columns = [{
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: 'Name',
            dataIndex: 'name',
            render: (text, obj) => <a onClick={() => gotoTab(obj.id, 'packages')}>{text}</a>,
        }, {
            title: 'Version',
            dataIndex: 'version',
        }, {
            title: 'License',
            dataIndex: 'license',
        }, {
            title: 'Homepage',
            dataIndex: 'homepage',
            render: text => <a onClick={() => shell.openExternal(text)}>{text}</a>,
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
}

Packages.propTypes = {
    packages: PropTypes.arrayOf(PropTypes.object).isRequired,
    gotoTab: PropTypes.func.isRequired,
};

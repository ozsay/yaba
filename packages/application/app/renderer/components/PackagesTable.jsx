import React from 'react';
import PropTypes from 'prop-types';

import Actions from './Actions';
import Table from './Table';

const { shell } = window.require('electron');

export default function PackagesTable({ packages }) {
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
        render: (text, obj) => <Actions>{ ({ gotoTab }) => <a onClick={() => gotoTab(obj.id, 'packages')}>{text}</a> }</Actions>,
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
            data={dataSource}
            columns={columns}
        />
    );
}

PackagesTable.propTypes = {
    packages: PropTypes.arrayOf(PropTypes.object),
};

PackagesTable.defaultProps = { packages: [] };

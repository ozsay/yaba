import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Input } from 'antd';

import { Column } from 'react-virtualized';

import Table from './Table';

const { Search } = Input;
const { shell } = window.require('electron');

export default class PackagesTable extends Component {
    constructor(props) {
        super(props);

        this.updateSearchPackage = this.updateSearchPackage.bind(this);
        this.filterPackages = this.filterPackages.bind(this);

        this.state = {};
    }

    updateSearchPackage(e) {
        this.setState({ textSearch: e.target.value });
    }

    filterPackages(_package) {
        const { textSearch = '' } = this.state;

        if (!_package.name) {
            return !textSearch;
        }

        return _package.name.includes(textSearch);
    }

    renderOverlay() {
        const { textSearch } = this.state;

        return (
            <React.Fragment>
                <Search
                    placeholder="search package"
                    onChange={this.updateSearchPackage}
                    style={{ width: 200 }}
                    value={textSearch}
                />
            </React.Fragment>
        );
    }

    render() {
        const { packages } = this.props;

        const currentPackages = packages.filter(this.filterPackages);

        return (
            <Table data={currentPackages} overlay={this.renderOverlay()} {...this.props}>
                <Column
                    label="Id"
                    dataKey="id"
                    dataLength={val => val.toString().length}
                    width={10}
                    cellRenderer={({ rowData, cellData }) => (
                        rowData.name ? cellData
                            : (
                                <Link to={`/packages/${rowData.id}`}>
                                    {cellData}
                                </Link>
                            )
                    )}
                />
                <Column
                    label="Name"
                    dataKey="name"
                    dataLength={val => (val ? val.length : 0)}
                    width={10}
                    cellRenderer={({ rowData, cellData }) => (
                        <Link to={`/packages/${rowData.id}`}>
                            {cellData}
                        </Link>
                    )}
                />
                <Column
                    label="Version"
                    dataKey="version"
                    dataLength={val => (val ? val.length : 0)}
                    width={10}
                />
                <Column
                    label="License"
                    dataKey="license"
                    dataLength={val => (val ? val.length : 0)}
                    width={10}
                />
                <Column
                    label="Homepage"
                    dataKey="homepage"
                    dataLength={val => (val ? val.length : 0)}
                    width={10}
                    cellRenderer={({ cellData }) => (
                        <a onClick={() => shell.openExternal(cellData)}>
                            {cellData}
                        </a>
                    )}
                />
            </Table>
        );
    }
}

PackagesTable.propTypes = {
    packages: PropTypes.arrayOf(PropTypes.object),
};

PackagesTable.defaultProps = { packages: [] };

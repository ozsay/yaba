import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Checkbox, Input } from 'antd';

import { Column } from 'react-virtualized';

import { Link } from 'react-router-dom';
import Table from './Table';

const { Search } = Input;

export default class ModulesTable extends Component {
    constructor(props) {
        super(props);

        this.toggleNodeModules = this.toggleNodeModules.bind(this);
        this.updateSearchModule = this.updateSearchModule.bind(this);
        this.filterModules = this.filterModules.bind(this);

        this.state = {};
    }

    toggleNodeModules() {
        const { excludeNodeModules } = this.state;

        this.setState({ excludeNodeModules: !excludeNodeModules });
    }

    updateSearchModule(e) {
        this.setState({ textSearch: e.target.value });
    }

    filterModules(module) {
        const { excludeNodeModules, textSearch = '' } = this.state;

        if (!module.fullPath) {
            return false;
        }

        if (excludeNodeModules && module.fullPath.includes('node_modules')) {
            return false;
        }

        return module.fullPath.includes(textSearch);
    }

    renderOverlay() {
        const { excludeNodeModules, textSearch } = this.state;

        return (
            <React.Fragment>
                <Checkbox defaultChecked={excludeNodeModules} value={excludeNodeModules} onChange={this.toggleNodeModules}>
                    Exclude node modules
                </Checkbox>
                <Search
                    placeholder="search module"
                    onChange={this.updateSearchModule}
                    style={{ width: 200 }}
                    value={textSearch}
                />
            </React.Fragment>
        );
    }

    render() {
        const { modules } = this.props;

        const currentModules = modules.filter(this.filterModules);

        return (
            <Table data={currentModules} overlay={this.renderOverlay()} {...this.props}>
                <Column
                    label="Path"
                    dataKey="fullPath"
                    dataLength={val => (val ? val.length : 0)}
                    width={5}
                    cellRenderer={({ rowData, cellData }) => (
                        <Link to={`/modules/${rowData.id}`}>
                            {cellData}
                        </Link>
                    )}
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
}

ModulesTable.propTypes = {
    modules: PropTypes.arrayOf(PropTypes.object),
};

ModulesTable.defaultProps = { modules: [] };

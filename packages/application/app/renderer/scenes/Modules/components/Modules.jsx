import React from 'react';
import PropTypes from 'prop-types';

import Input from 'material-ui/Input';

import ModulesTable from '../../../components/ModulesTable';

export default class Modules extends React.Component {
    constructor(props) {
        super(props);

        this.state = { filter: '' };

        this.filter = this.filter.bind(this);
        this.isFiltered = this.isFiltered.bind(this);
    }

    isFiltered(module) {
        return module.name.includes(this.state.filter);
    }

    filter({ target: { value } }) {
        this.setState({ filter: value });
    }

    render() {
        const { modules } = this.props;

        const filteredModules = modules.filter(this.isFiltered);

        return (
            <div>
                <Input
                    placeholder="Filter modules"
                    onChange={this.filter}
                />
                <ModulesTable modules={filteredModules} />
            </div>
        );
    }
}

Modules.propTypes = {
    match: PropTypes.object.isRequired, // eslint-disable-line
    modules: PropTypes.arrayOf(PropTypes.object).isRequired,
};

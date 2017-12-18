import React from 'react';
import PropTypes from 'prop-types';

import PackagesTable from '../../../components/PackagesTable';

export default class Packages extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { packages } = this.props;

        return (
            <PackagesTable packages={packages} />
        );
    }
}

Packages.propTypes = {
    packages: PropTypes.arrayOf(PropTypes.object).isRequired,
};

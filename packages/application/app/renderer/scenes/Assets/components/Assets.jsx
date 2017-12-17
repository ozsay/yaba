import React from 'react';
import PropTypes from 'prop-types';

import AssetsTable from '../../../components/AssetsTable';

export default class Assets extends React.Component {
    render() {
        const { assets } = this.props;
        return (
            <AssetsTable assets={assets} />
        );
    }
}

Assets.propTypes = {
    assets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';

import ChunksTable from '../../../components/ChunksTable';

export default class Chunks extends React.Component {
    render() {
        const { chunks } = this.props;

        return (
            <ChunksTable chunks={chunks} />
        );
    }
}

Chunks.propTypes = {
    chunks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

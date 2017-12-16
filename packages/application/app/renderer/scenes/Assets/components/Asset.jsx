import React from 'react';
import PropTypes from 'prop-types';

function Asset({ asset }) {
    return (
        <div>
            <h2>{asset.name}</h2>
            <br />
        </div>
    );
}

export default Asset;

Asset.propTypes = {
    asset: PropTypes.object, // eslint-disable-line
};

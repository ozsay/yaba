import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import gotoTab from '../actions/gotoTab';

function Actions({ children, ...actions }) {
    return (
        <div>{children(actions)}</div>
    );
}

Actions.propTypes = {
    children: PropTypes.func.isRequired,
};

export default connect(() => ({
    gotoTab,
}))(Actions);

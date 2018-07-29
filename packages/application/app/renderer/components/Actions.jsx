import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import gotoTabAction from '../actions/gotoTab';

function Actions({ children, ...actions }) {
    return (
        <div>{children(actions)}</div>
    );
}
const mapDispatchToProps = {
    gotoTab: gotoTabAction,
};

Actions.propTypes = {
    children: PropTypes.func.isRequired,
};

export default connect(() => ({}), mapDispatchToProps)(Actions);

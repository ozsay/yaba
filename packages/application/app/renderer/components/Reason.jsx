import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Card, Button } from 'antd';
import gotoTabAction from '../actions/gotoTab';

const reasonStyle = {
    width: '33%',
    height: '75px',
    textAlign: 'left',
    padding: '15px',
};

const reasonModuleStyle = {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
};

const reasonButtonStyle = {
    float: 'right',
    marginTop: '6px',
};

function Reason({ reason, gotoTab }) {
    return (
        <Card.Grid style={reasonStyle}>
            <Button
                style={reasonButtonStyle}
                shape="circle"
                icon="arrow-right"
                onClick={() => gotoTab(reason.module.id, 'modules', reason)}
            />
            <h4 style={reasonModuleStyle}>{reason.module.name}</h4>
            <h5 style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
                {`${reason.type} at ${reason.reasonText()} as '${reason.userRequest}'`}
            </h5>
        </Card.Grid>
    );
}

const mapDispaptchToProps = {
    gotoTab: gotoTabAction,
};

export default connect(() => ({}), mapDispaptchToProps)(Reason);

Reason.propTypes = {
    reason: PropTypes.object.isRequired,
    gotoTab: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';

import { Card, Button } from 'antd';

import Actions from './Actions';

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

export default function Reason({ reason }) {
    return (
        <Actions>
            { ({ gotoTab }) => (
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
            )}
        </Actions>
    );
}

Reason.propTypes = {
    reason: PropTypes.object.isRequired, // eslint-disable-line
};

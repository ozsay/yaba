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

function Reason({ reason }) {
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

export default function ReasonsGrid({ reasons }) {
    return (
        <Card bordered={false} bodyStyle={{ padding: 0 }}>
            { reasons.map(reason => (
                <Reason
                    key={`${reason.module.id}_${reason.reasonText()}`}
                    reason={reason}
                />
            ))}
        </Card>
    );
}

ReasonsGrid.propTypes = {
    reasons: PropTypes.array.isRequired, // eslint-disable-line
};

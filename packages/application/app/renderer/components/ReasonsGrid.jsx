import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card, Button } from 'antd';

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
        <Card.Grid style={reasonStyle}>
            { reason.module && (
                <React.Fragment>
                    <Link to={{
                        pathname: `/modules/${reason.module.id}`,
                        state: reason,
                    }}
                    >
                        <Button
                            style={reasonButtonStyle}
                            shape="circle"
                            icon="arrow-right"
                        />
                    </Link>
                    <h4 style={reasonModuleStyle}>
                        {reason.module.display}
                    </h4>
                </React.Fragment>
            )}
            <h5 style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
                {reason.text}
            </h5>
        </Card.Grid>
    );
}

export default function ReasonsGrid({ reasons }) {
    return (
        <Card bordered={false} bodyStyle={{ padding: 0 }}>
            { reasons.map((reason, i) => (
                <Reason
                    key={`${reason.module ? reason.module.id : i}_${reason.text}`}
                    reason={reason}
                />
            ))}
        </Card>
    );
}

ReasonsGrid.propTypes = {
    reasons: PropTypes.array.isRequired, // eslint-disable-line
};

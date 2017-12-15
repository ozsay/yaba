import React from 'react';
import PropTypes from 'prop-types';

import { Divider } from 'antd';

export default function MessagesList(props) {
    return (
        <div>
            {
                props.messages
                    .map((message, i) => (
                        <div key={i}>
                            <p style={{ whiteSpace: 'pre' }}>{message}</p>
                            <Divider />
                        </div>
                    ))
            }
        </div>
    );
}

MessagesList.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.string),
};

MessagesList.defaultProps = { messages: [] };

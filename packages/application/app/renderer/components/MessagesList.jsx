import React from 'react';
import PropTypes from 'prop-types';

import { Divider } from 'antd';

export default function MessagesList({ messages }) {
    return (
        <div>
            {
                messages
                    .map((message, i) => (
                        <div key={i}>
                            <p style={{ whiteSpace: 'pre' }}>{message}</p>
                            {
                                i < messages.length - 1 && <Divider />
                            }
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

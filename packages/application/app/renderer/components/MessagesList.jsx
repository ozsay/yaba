import React from 'react';
import PropTypes from 'prop-types';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

export default function MessagesList(props) {
    return (
        <List>
            {
                props.messages
                    .map((message, i) => (
                        <div key={i}>
                            <ListItem>
                                <ListItemText primary={message} style={{ whiteSpace: 'pre' }} />
                            </ListItem>
                            <Divider light />
                        </div>
                    ))
            }
        </List>
    );
}

MessagesList.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.string),
};

MessagesList.defaultProps = { messages: [] };

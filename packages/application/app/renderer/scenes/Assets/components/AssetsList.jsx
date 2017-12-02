import React from 'react';
import PropTypes from 'prop-types';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

export default class Assets extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <List>
                    {
                        this.props.assets
                            .map(asset => (
                                <div key={asset.name}>
                                    <ListItem button>
                                        <ListItemText primary={asset.name} />
                                    </ListItem>
                                    <Divider light />
                                </div>
                            ))
                    }
                </List>
            </div>
        );
    }
}

Assets.propTypes = {
    assets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

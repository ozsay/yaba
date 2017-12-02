import React from 'react';
import PropTypes from 'prop-types';

import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

export default function TitleAndDescription({ title, description, action }) {
    return (
        <Card>
            <CardContent>
                <Typography type="body1">
                    {title}
                </Typography>
                <Typography type="headline" component="h2">
                    {description}
                </Typography>
            </CardContent>
            { action &&
            <CardActions>
                {action}
            </CardActions>
            }
        </Card>
    );
}

TitleAndDescription.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    action: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
};

TitleAndDescription.defaultProps = {
    action: false, // eslint-disable-line
};

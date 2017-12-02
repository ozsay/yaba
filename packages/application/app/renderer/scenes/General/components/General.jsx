import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

import TitleAndDescription from '../../../components/TitleAndDescription';

export default function General(props) {
    const {
        version, hash, errors = [], warnings = [], modules = [], assets = [], chunks = [], mainModule, time,
    } = props.stats;

    return (
        <Grid container justify="center" spacing={16}>
            <Grid item>
                <TitleAndDescription title="Webpack version" description={version} />
            </Grid>
            <Grid item>
                <TitleAndDescription title="Build time" description={`${time}ms`} />
            </Grid>
            <Grid item>
                <TitleAndDescription title="Hash" description={hash} />
            </Grid>
            <Grid item>
                <TitleAndDescription
                    title="Errors count"
                    description={errors.length}
                    action={errors.length > 0 && <Button component={Link} to="/errors">Learn More</Button>}
                />
            </Grid>
            <Grid item>
                <TitleAndDescription
                    title="Warnings count"
                    description={warnings.length}
                    action={warnings.length > 0 && <Button component={Link} to="/warnings">Learn More</Button>}
                />
            </Grid>
            <Grid item>
                <TitleAndDescription
                    title="Modules count"
                    description={modules.length}
                    action={modules.length > 0 && <Button component={Link} to="/modules">Learn More</Button>}
                />
            </Grid>
            <Grid item>
                <TitleAndDescription
                    title="Main module"
                    description={mainModule.name}
                    action={<Button component={Link} to={`?moduleId=${mainModule.id}`}>Learn More</Button>}
                />
            </Grid>
            <Grid item>
                <TitleAndDescription
                    title="Assets count"
                    description={assets.length}
                    action={assets.length > 0 && <Button component={Link} to="/assets">Learn More</Button>}
                />
            </Grid>
            <Grid item>
                <TitleAndDescription
                    title="Chunks count"
                    description={chunks.length}
                />
            </Grid>
        </Grid>
    );
}

General.propTypes = {
    stats: PropTypes.object, // eslint-disable-line
};

General.defaultProps = {
    stats: null,
};

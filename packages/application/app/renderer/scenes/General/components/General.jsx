import React from 'react';
import PropTypes from 'prop-types';

import { Card, Button } from 'antd';

const gridStyle = {
    width: '20%',
    height: '150px',
    textAlign: 'center',
};

function Content({ title, description, action }) {
    return (
        <Card.Grid style={gridStyle}>
            <div>
                <h3>{title}</h3>
                <h4>{description}</h4>
                { action }
            </div>
        </Card.Grid>
    );
}

Content.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    action: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
};

Content.defaultProps = {
    action: false, // eslint-disable-line
};


export default function General(props) {
    const {
        version, hash, errors = [], warnings = [], modules = [], assets = [], chunks = [], mainModule, time,
    } = props.stats;

    const { addSecondaryTab, gotoTab } = props;

    return (
        <Card title="General properties of the bundle">
            <Content title="Webpack version" description={version} />
            <Content title="Build time" description={!time ? '' : `${time}ms`} />
            <Content title="Hash" description={hash} />
            <Content
                title="Errors count"
                description={errors.length}
                action={errors.length > 0 && <Button onClick={() => gotoTab(4, false)}>Learn More</Button>}
            />

            <Content
                title="Warnings count"
                description={warnings.length}
                action={warnings.length > 0 && <Button onClick={() => gotoTab(3, false)}>Learn More</Button>}
            />

            <Content
                title="Modules count"
                description={modules.length}
                action={modules.length > 0 && <Button onClick={() => gotoTab(1, false)}>Learn More</Button>}
            />

            <Content
                title="Main module"
                description={mainModule.name}
                action={<Button onClick={() => addSecondaryTab(mainModule)}>Learn More</Button>}
            />

            <Content
                title="Assets count"
                description={assets.length}
                action={assets.length > 0 && <Button onClick={() => gotoTab(2, false)}>Learn More</Button>}
            />

            <Content
                title="Chunks count"
                description={chunks.length}
            />

        </Card>
    );
}

General.propTypes = {
    stats: PropTypes.object, // eslint-disable-line
    addSecondaryTab: PropTypes.func.isRequired,
    gotoTab: PropTypes.func.isRequired,
};

General.defaultProps = {
    stats: null,
};

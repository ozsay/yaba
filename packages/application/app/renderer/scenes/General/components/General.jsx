import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card, Button } from 'antd';

const { shell } = window.require('electron');

const gridStyle = {
    width: '20%',
    height: '150px',
    textAlign: 'center',
};

function Content({ title, description, action }) {
    return (
        <Card.Grid style={gridStyle}>
            <div>
                <h3>
                    {title}
                </h3>
                <h4>
                    {description}
                </h4>
                { action }
            </div>
        </Card.Grid>
    );
}

Content.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    action: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

Content.defaultProps = {
    action: false, // eslint-disable-line
};

export default function General(props) {
    const {
        stats: {
            options, version, hash, errors = [], warnings = [], modules = [], assets = [],
            chunks = [], packages = [], mainModule, time, rootPackage,
        },
    } = props;

    return (
        <Card title="General properties of the bundle" style={{ marginBottom: 24 }}>
            <Content title="Webpack version" description={version} />
            { time
              && <Content title="Build time" description={`${time}ms`} />
            }
            <Content title="Hash" description={hash} />
            <Content title="Mode" description={options.mode} />
            <Content
                title="Devtool"
                description={options.devtool}
                action={(
                    <Button onClick={() => shell.openExternal('https://webpack.js.org/configuration/devtool/')}>
                            Learn More
                    </Button>
                )}
            />
            <Content
                title="Errors count"
                description={errors.length}
                action={errors.length > 0 && (
                    <Link to="/errors">
                        <Button>
                            Learn More
                        </Button>
                    </Link>
                )}
            />

            <Content
                title="Warnings count"
                description={warnings.length}
                action={warnings.length > 0 && (
                    <Link to="/warnings">
                        <Button>
                            Learn More
                        </Button>
                    </Link>
                )}
            />

            <Content
                title="Modules count"
                description={modules.length}
                action={modules.length > 0 && (
                    <Link to="/modules">
                        <Button>
                            Learn More
                        </Button>
                    </Link>
                )}
            />

            <Content
                title="Main module"
                description={mainModule.name}
                action={(
                    <Link to={`/modules/${mainModule.id}`}>
                        <Button>
                                Learn More
                        </Button>
                    </Link>

                )}
            />

            <Content
                title="Assets count"
                description={assets.length}
                action={assets.length > 0 && (
                    <Link to="/assets">
                        <Button>
                            Learn More
                        </Button>
                    </Link>
                )}
            />

            <Content
                title="Chunks count"
                description={chunks.length}
                action={chunks.length > 0 && (
                    <Link to="/chunks">
                        <Button>
                            Learn More
                        </Button>
                    </Link>
                )}
            />

            <Content
                title="Packages count"
                description={packages.length}
                action={packages.length > 0 && (
                    <Link to="/packages">
                        <Button>
                            Learn More
                        </Button>
                    </Link>
                )}
            />

            <Content
                title="Root package"
                description={rootPackage.name}
                action={(
                    <Link to={`/packages/${rootPackage.id}`}>
                        <Button>
                    Learn More
                        </Button>
                    </Link>
                )}
            />

        </Card>
    );
}

General.propTypes = {
    stats: PropTypes.object, // eslint-disable-line
};

General.defaultProps = {
    stats: null,
};

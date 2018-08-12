import React from 'react';
import PropTypes from 'prop-types';

import { Card } from 'antd';

import { Link } from 'react-router-dom';
import ModulesTable from '../../../components/ModulesTable';
import Section from '../../../components/Section';
import SizeCardGrid from '../../../components/SizeCardGrid';
import ReasonsGrid from '../../../components/ReasonsGrid';
import ChunksTable from '../../../components/ChunksTable';
import AssetsTable from '../../../components/AssetsTable';
import PackagesTable from '../../../components/PackagesTable';
import CodeViewer from '../../../components/CodeViewer';

export default class Module extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { module, reason } = this.props;

        return (
            <div>
                <h2>
                    {module.display}
                </h2>
                <br />
                { module.issuer
                    && (
                        <Section title="Issuer" collapse={false}>
                            <h4>
                                <Link to={`/modules/${module.issuer.id}`}>
                                    {module.issuer.display}
                                </Link>
                            </h4>
                        </Section>
                    )
                }
                { module.fullPath
                    && (
                        <Section title="Full path" collapse={false}>
                            <h4>
                                {module.fullPath}
                            </h4>
                        </Section>
                    )
                }
                <Section title="Part of package" collapse={false}>
                    <h4>
                        <Link to={`/packages/${module.package.id}`}>
                            {module.package.name}
                        </Link>
                    </h4>
                </Section>
                <Section title="Sizes" collapse={false}>
                    <Card bordered={false} bodyStyle={{ padding: 0 }}>
                        <SizeCardGrid title="Exclusive size" data={module} calcFunc={() => module.size} />
                        <SizeCardGrid title="Inclusive size" data={module} calcFunc={() => module.totalSize} />
                        { module.chunks.map(chunk => (
                            <SizeCardGrid
                                key={`size_${chunk.id}`}
                                title={`Exclusive % of ${chunk.name}`}
                                data={chunk.modules}
                                calcFunc={() => `${((module.size / chunk.modulesSize) * 100).toPrecision(4)}%`}
                            />
                        ))}
                    </Card>
                </Section>
                { module.children.length > 0
                && (
                    <Section title="Children" badge={module.children.length}>
                        <ModulesTable modules={module.children} maxHeight={250} />
                    </Section>
                )
                }
                { module.reasons.length > 0
                && (
                    <Section title="Reasons" badge={module.reasons.length}>
                        <div style={{ maxHeight: 250, overflow: 'auto', paddingBottom: 10 }}>
                            <ReasonsGrid reasons={module.reasons} />
                        </div>
                    </Section>
                )
                }
                { module.chunks.length > 0
                && (
                    <Section title="Associated Chunks" badge={module.chunks.length}>
                        <ChunksTable chunks={module.chunks} maxHeight={250} />
                    </Section>
                )
                }
                { module.assets.length > 0
                && (
                    <Section title="Associated Assets" badge={module.assets.length}>
                        <AssetsTable assets={module.assets} maxHeight={250} />
                    </Section>
                )
                }
                { module.loaders.length > 0
                && (
                    <Section title="Loaders" badge={module.loaders.length}>
                        <PackagesTable packages={module.loaders} maxHeight={250} />
                    </Section>
                )
                }
                { module.source
                && (
                    <Section title="Source code" collapse={false} newLine={false}>
                        <CodeViewer source={module.source} reason={reason} mode="javascript" />
                    </Section>
                )
                }
            </div>
        );
    }
}

Module.propTypes = {
    module: PropTypes.object, // eslint-disable-line
    reason: PropTypes.object, // eslint-disable-line
};

Module.defaultProps = { module: null, reason: null };

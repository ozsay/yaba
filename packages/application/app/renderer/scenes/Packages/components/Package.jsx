import React from 'react';
import PropTypes from 'prop-types';

import { Card, Spin } from 'antd';

import JSONTree from 'react-json-tree';

import Section from '../../../components/Section';
import ModulesTable from '../../../components/ModulesTable';
import Reason from '../../../components/Reason';
import SizeCardGrid from '../../../components/SizeCardGrid';

const { shell } = window.require('electron');

const theme = {
    scheme: 'monokai',
    author: 'wimer hazenberg (http://www.monokai.nl)',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#cc6633',
};

const downloadCardStyle = {
    width: '33%',
    height: '75px',
    textAlign: 'center',
    padding: '15px',
};

function DownloadIndicator({ title, number, busy }) {
    return (
        <Card.Grid style={downloadCardStyle}>
            <h4>{title}</h4>
            { busy && <Spin size="small" /> }
            { !busy && <h5>{number}</h5> }
        </Card.Grid>
    );
}

DownloadIndicator.propTypes = {
    title: PropTypes.string.isRequired,
    number: PropTypes.number,
    busy: PropTypes.bool,
};

DownloadIndicator.defaultProps = {
    number: null,
    busy: true,
};

export default class Package extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            downloads: {},
        };
    }

    componentDidMount() {
        const { package: _package, getPackagePopularity } = this.props;

        getPackagePopularity(_package.name)
            .then(({ value: res }) => {
                this.setState({
                    downloads: {
                        day: res[0].downloads,
                        week: res[1].downloads,
                        month: res[2].downloads,
                    },
                });
            });
    }

    render() {
        const { package: _package } = this.props;
        const { downloads } = this.state;

        const reasons = _package.modules.reduce((acc, mod) =>
            acc.concat(mod.reasons), []).filter(reason => reason.module.package !== _package);

        return (
            <div>
                <h2>{_package.name}</h2>
                <br />
                <Section title="version" collapse={false} body={_package.version} />
                { _package.description && <Section title="description" collapse={false} body={_package.description} /> }
                <Section title="license" collapse={false} body={_package.license} />
                { _package.homepage &&
                <Section title="homepage" collapse={false}>
                    <h4><a onClick={() => shell.openExternal(_package.homepage)}>{_package.homepage}</a></h4>
                </Section>
                }
                <Section title="Path" collapse={false}>
                    <h4><a onClick={() => shell.openItem(_package.dir)}>{_package.dir}</a></h4>
                </Section>
                <Section title="Sizes" collapse={false}>
                    <Card bordered={false} bodyStyle={{ padding: 0 }}>
                        <SizeCardGrid title="Exclusive size" data={_package} calcFunc={() => _package.size} />
                        {/* <SizeCardGrid title="Inclusive size" data={module} calcFunc={() => module.totalSize} /> */}
                        <SizeCardGrid title="% of chunk" data={module} calcFunc={() => '5%'} />
                    </Card>
                </Section>
                <Section title="Associated modules" badge={_package.modules.length}>
                    <div style={{ maxHeight: 250, overflow: 'auto' }} >
                        <ModulesTable modules={_package.modules} />
                    </div>
                </Section>
                <Section title="Usages" badge={reasons.length}>
                    <div style={{ maxHeight: 500, overflow: 'auto', paddingBottom: 10 }} >
                        <Card bordered={false} bodyStyle={{ padding: 0 }}>
                            { reasons.map(reason => (
                                <Reason
                                    key={`${reason.module.id}_${reason.reasonText()}`}
                                    reason={reason}
                                />
                            ))}
                        </Card>
                    </div>
                </Section>
                { _package.private &&
                    <Section
                        title="Popularity"
                        collapse={false}
                        body="downloads indicator is disabled for private packages"
                    />
                }
                { !_package.private &&
                    <Section title="Popularity" collapse={false}>
                        <Card bordered={false} bodyStyle={{ padding: 0 }}>
                            <DownloadIndicator title="Last day" number={downloads.day} busy={!downloads.day} />
                            <DownloadIndicator title="Last week" number={downloads.week} busy={!downloads.week} />
                            <DownloadIndicator title="Last month" number={downloads.month} busy={!downloads.month} />
                        </Card>
                    </Section>
                }
                <Section title="package.json">
                    <JSONTree data={_package.pkgJson} hideRoot theme={theme} />
                </Section>
            </div>
        );
    }
}

Package.propTypes = {
    package: PropTypes.object.isRequired,
    getPackagePopularity: PropTypes.func.isRequired,
};

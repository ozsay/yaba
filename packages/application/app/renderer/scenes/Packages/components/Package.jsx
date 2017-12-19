import React from 'react';
import PropTypes from 'prop-types';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import semver from 'semver';

import { Card, Spin } from 'antd';

import JSONTree from 'react-json-tree';

import Section from '../../../components/Section';
import ModulesTable from '../../../components/ModulesTable';
import ReasonsGrid from '../../../components/ReasonsGrid';
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
            { !busy && <h5>{number.toLocaleString()}</h5> }
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

function VersionIndicator({ title, version, time }) {
    return (
        <Card.Grid style={downloadCardStyle}>
            <h4>{title}</h4>
            <h5>{`${version}${` published ${distanceInWordsToNow(time, { addSuffix: true })}`}`}</h5>
        </Card.Grid>
    );
}

VersionIndicator.propTypes = {
    title: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
};

export default class Package extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            downloads: {},
        };
    }

    componentDidMount() {
        const { package: _package, getPackageData } = this.props;

        if (!_package.version || _package.private) {
            return;
        }

        getPackageData(_package.name)
            .then(({ value: res }) => {
                const versions = Object.keys(res[3].versions);

                const patch = semver.maxSatisfying(
                    versions,
                    `${semver.major(_package.version)}.${semver.minor(_package.version)}.X`,
                );
                const minor = semver.maxSatisfying(versions, `${semver.major(_package.version)}.X.X`);
                const major = semver.maxSatisfying(versions, `X.X.X`);

                this.setState({
                    downloads: {
                        day: res[0].downloads,
                        week: res[1].downloads,
                        month: res[2].downloads,
                    },
                    versionTime: res[3].time[_package.version],
                    maxVersions: {
                        patch: { ver: patch, time: res[3].time[patch] },
                        minor: { ver: minor, time: res[3].time[minor] },
                        major: { ver: major, time: res[3].time[major] },
                    },
                });
            });
    }

    render() {
        const { package: _package } = this.props;
        const { downloads, versionTime, maxVersions } = this.state;

        const reasons = _package.modules.reduce((acc, mod) =>
            acc.concat(mod.reasons), []).filter(reason => reason.module.package !== _package);

        return (
            <div>
                <h2>{_package.name}</h2>
                <br />
                { _package.version &&
                    <Section
                        title="version"
                        collapse={false}
                        body={`${_package.version}${versionTime ? ` published ${distanceInWordsToNow(versionTime, {
                            addSuffix: true,
                        })}` : ''}`}
                    />
                }
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
                    </Card>
                </Section>
                <Section title="Associated modules" badge={_package.modules.length}>
                    <ModulesTable modules={_package.modules} maxHeight={250} />
                </Section>
                <Section title="Usages" badge={reasons.length}>
                    <div style={{ maxHeight: 250, overflow: 'auto', paddingBottom: 10 }} >
                        <ReasonsGrid reasons={reasons} />
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
                { maxVersions &&
                <Section title="Latest versions based on current version" collapse={false}>
                    <Card bordered={false} bodyStyle={{ padding: 0 }}>
                        <VersionIndicator title="Major" version={maxVersions.major.ver} time={maxVersions.major.time} />
                        <VersionIndicator title="Minor" version={maxVersions.minor.ver} time={maxVersions.minor.time} />
                        <VersionIndicator title="Patch" version={maxVersions.patch.ver} time={maxVersions.patch.time} />
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
    getPackageData: PropTypes.func.isRequired,
};

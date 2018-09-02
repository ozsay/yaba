/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const siteConfig = require(`${process.cwd()}/siteConfig.js`);

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;

function imgUrl(img) {
    return `${siteConfig.baseUrl}img/${img}`;
}

const titleStyle = {
    fontSize: 24,
    fontWeight: 700,
    padding: 20,
};

class Download extends React.Component {
    render() {
        return (
            <Container padding={['all']} background="light">
                <div style={{ textAlign: 'center', paddingBottom: 100 }}>
                    <div style={titleStyle}>
                        Download Yaba Application
                    </div>
                    <div>
                        Latest version:
                        {' '}
                        {siteConfig.currentVersion}
                    </div>
                    <img style={{ padding: 20, height: 100 }} src={imgUrl('mac.png')} alt="Download for MacOS" />
                    <br />
                    <a className="download-button" href={siteConfig.downloadLink}>Download MacOS Installer</a>
                </div>
                <MarkdownBlock>
                    > Currently there is an official build for MacOS only
                </MarkdownBlock>
            </Container>
        );
    }
}

module.exports = Download;

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const siteConfig = require(`${process.cwd()}/siteConfig.js`);

const titleStyle = {
    fontSize: 24,
    fontWeight: 700,
    padding: 20,
};

function imgUrl(img) {
    return `${siteConfig.baseUrl}img/${img}`;
}

class Support extends React.Component {
    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 100 }}>
                <div style={{ textAlign: 'center', padding: '0 100px' }}>
                    <a href="https://t.me/yabaio" rel="noopener noreferrer" target="_blank">
                        <img
                            className="support-img"
                            src={imgUrl('telegram.png')}
                            alt="Open Telegram Channel"
                        />
                    </a>
                    <div style={titleStyle}>
                        Telegram
                    </div>
                    <div>Join our Telegram channel for news and updates</div>
                </div>
                <div style={{ textAlign: 'center', padding: '0 100px' }}>
                    <a href="https://github.com/ozsay/yaba" rel="noopener noreferrer" target="_blank">
                        <img
                            className="support-img"
                            src={imgUrl('github.jpg')}
                            alt="Open Telegram Channel"
                        />
                    </a>
                    <div style={titleStyle}>
                        Github
                    </div>
                    <div>Check our Github repo or create a new issue</div>
                </div>
            </div>
        );
    }
}

module.exports = Support;

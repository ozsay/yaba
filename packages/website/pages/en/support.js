/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(`${process.cwd()}/siteConfig.js`);

function imgUrl(img) {
    return `${siteConfig.baseUrl}img/${img}`;
}

const Block = props => (
    <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}
    >
        <GridBlock align="center" contents={props.children} layout={props.layout} />
    </Container>
);

const Features = () => (
    <Block layout="fourColumn">
        {[
            {
                title: 'Telegram',
                content: 'Join our Telegram channel for news and updates',
                image: imgUrl('telegram.png'),
                imageAlign: 'top',
                imageLink: 'https://t.me/yabaio',
            },
            {
                content: 'Check our github repo or create a new issue',
                image: imgUrl('github.png'),
                imageAlign: 'top',
            },
        ]}
    </Block>
);

class Index extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <Features />
                </div>
            </div>
        );
    }
}

module.exports = Index;

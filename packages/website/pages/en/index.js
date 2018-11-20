/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */

const siteConfig = require(`${process.cwd()}/siteConfig.js`);

function docUrl(doc, language) {
    return `${siteConfig.baseUrl}docs/${language ? `${language}/` : ''}${doc}`;
}

class Button extends React.Component {
    render() {
        return (
            <div className="pluginWrapper buttonWrapper">
                <a className="button" href={this.props.href} target={this.props.target}>
                    {this.props.children}
                </a>
            </div>
        );
    }
}

Button.defaultProps = {
    target: '_self',
};

const SplashContainer = props => (
    <div className="homeContainer">
        <div className="homeSplashFade">
            <div className="wrapper homeWrapper">{props.children}</div>
        </div>
    </div>
);

const ProjectTitle = () => (
    <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
    </h2>
);

const PromoSection = props => (
    <div className="section promoSection">
        <div className="promoRow">
            <div className="pluginRowBlock">{props.children}</div>
        </div>
    </div>
);

class HomeSplash extends React.Component {
    render() {
        return (
            <SplashContainer>
                <div className="inner">
                    <ProjectTitle />
                    <PromoSection>
                        <Button href={docUrl('getting-started')}>Try It Out</Button>
                    </PromoSection>
                </div>
                <div style={{ marginTop: 40 }}>
                    <MarkdownBlock>
                            Read the [blog post](/blog/2018/11/18/Announcing-yaba)
                    </MarkdownBlock>
                </div>
            </SplashContainer>
        );
    }
}

class Index extends React.Component {
    render() {
        const language = this.props.language || '';

        return (
            <div>
                <HomeSplash language={language} />
            </div>
        );
    }
}

module.exports = Index;

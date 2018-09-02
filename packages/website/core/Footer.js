/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
    docUrl(doc, language) {
        const baseUrl = this.props.config.baseUrl;
        return `${baseUrl}docs/${language ? `${language}/` : ''}${doc}`;
    }

    pageUrl(doc, language) {
        const baseUrl = this.props.config.baseUrl;
        return baseUrl + (language ? `${language}/` : '') + doc;
    }

    render() {
        return (
            <footer className="nav-footer" id="footer">
                <section className="sitemap">
                    <a href={this.props.config.baseUrl} className="nav-home">
                        {this.props.config.footerIcon && (
                            <img
                                src={this.props.config.baseUrl + this.props.config.footerIcon}
                                alt={this.props.config.title}
                                width="66"
                                height="58"
                            />
                        )}
                    </a>
                    <div>
                        <h5>Links</h5>
                        <a href={this.docUrl('getting-started', this.props.language)}>
                            Getting Started
                        </a>
                        <a href={this.pageUrl('download', this.props.language)}>
                            Download
                        </a>
                        {/*<a href={this.docUrl('doc2.html', this.props.language)}>*/}
                            {/*Docs*/}
                        {/*</a>*/}
                    </div>
                    <div>
                        <h5>Community</h5>
                    </div>
                    <div>
                        <h5>More</h5>
                        <a href={`${this.props.config.baseUrl}blog`}>Blog</a>
                        <a
                            href="https://twitter.com/yaba_io?ref_src=twsrc%5Etfw"
                            className="twitter-follow-button"
                            data-show-count="false"
                        >
                            Follow @yaba_io
                        </a>
                        <br />
                        <a
                            className="github-button"
                            href={`https://github.com/${this.props.config.organizationName}/${this.props.config.projectName}`}
                            data-icon="octicon-star"
                            data-count-href="/ozsay/yaba/stargazers"
                            data-show-count="true"
                            data-count-aria-label="# stargazers on GitHub"
                            aria-label="Star this project on GitHub"
                        >
                            Star
                        </a>
                    </div>
                </section>
                <section className="copyright">{this.props.config.copyright}</section>
            </footer>
        );
    }
}

module.exports = Footer;

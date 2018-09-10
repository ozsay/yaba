/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const version = '1.0.0';

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function viewerjsRenderer(md) {
    md.renderer.rules.image = ([{ src, alt }]) => {
        const randomId = getRndInteger(0, Number.MAX_SAFE_INTEGER);

        return `<div>
                  <img style="cursor:pointer;" id="${randomId}" src="${src}" alt="${alt}" />
                  <script>
                    new Viewer(document.getElementById(${randomId}), {
                      toolbar: false,
                      navbar: false,
                      title: false,
                      movable: false,
                      zoomable: false,
                      rotatable: false,
                      zIndex: 9999999999,
                    });
                  </script>
                </div>`;
    };
}

const siteConfig = {
    title: 'yaba',
    tagline: 'Yet Another Bundle Analyzer for Webpack',
    url: 'https://yaba.io',
    customDocsPath: 'website/docs',
    baseUrl: '/',
    cname: 'yaba.io',

    currentVersion: version,
    downloadLink: `https://github.com/ozsay/yaba/releases/download/v${version}/yaba-${version}.dmg`,

    algolia: {
        apiKey: '479a1f7c112934f04b93a96f7be26366',
        indexName: 'yaba',
    },

    projectName: 'yaba',
    organizationName: 'ozsay',

    headerLinks: [
        { doc: 'getting-started', label: 'Getting Started' },
        { page: 'download', label: 'Download' },
        // { doc: 'doc1', label: 'Docs' },
        { page: 'support', label: 'Support' },
        { href: 'https://github.com/ozsay/yaba', label: 'GitHub' },
        { blog: true, label: 'Blog' },
    ],

    headerIcon: 'img/icon.svg',
    footerIcon: 'img/icon.svg',
    favicon: 'img/favicon.png',

    colors: {
        primaryColor: '#1c78c0',
        secondaryColor: '#8ed6fb',
    },

    copyright: `Copyright © ${new Date().getFullYear()} Oz Sayag`,

    highlight: {
        theme: 'default',
    },

    scripts: [
        'https://buttons.github.io/buttons.js',
        'https://platform.twitter.com/widgets.js',
        'https://cdnjs.cloudflare.com/ajax/libs/viewerjs/1.2.0/viewer.min.js',
    ],
    stylesheets: [
        'https://cdnjs.cloudflare.com/ajax/libs/viewerjs/1.2.0/viewer.min.css',
    ],
    markdownPlugins: [
        viewerjsRenderer,
    ],

    onPageNav: 'separate',
    cleanUrl: true,
    // gaTrackingId: 'UA-58342187-3',

    twitter: 'true',
    twitterUsername: 'yaba_io',
    twitterImage: 'img/yaba.png',
};

module.exports = siteConfig;

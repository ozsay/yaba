import React from 'react';
import PropTypes from 'prop-types';

import { Card } from 'antd';

import { AVAILABLE_SIZES } from '../../../actions/calcSize';

import Section from '../../../components/Section';
import SizeCardGrid from '../../../components/SizeCardGrid';
import CodeViewer from '../../../components/CodeViewer';
import ChunksTable from '../../../components/ChunksTable';
import ModulesTable from '../../../components/ModulesTable';

const MIME_TYPES_PREVIEWERS = {
    'application/javascript': 'editor',
    'text/html': 'editor',
    'text/css': 'editor',
    'image/png': 'image',
};

function largeuint8ArrToString(uint8arr) {
    return new Promise((resolve) => {
        const bb = new Blob([uint8arr]);
        const f = new FileReader();
        f.onload = (e) => {
            resolve(e.target.result);
        };

        f.readAsText(bb);
    });
}

function largeuint8ArrToBase64(uint8arr) {
    return new Promise((resolve) => {
        const bb = new Blob([uint8arr]);
        const f = new FileReader();
        f.onload = (e) => {
            resolve(e.target.result);
        };

        f.readAsDataURL(bb);
    });
}

export default class Asset extends React.Component {
    constructor(props) {
        super(props);

        this.calcSize = this.calcSize.bind(this);

        this.state = {};
    }

    componentDidMount() {
        const { asset, getAssetData } = this.props;

        getAssetData(asset.name)
            .then((payload) => {
                this.rawAsset = payload;

                if (asset.mimeType === 'image/png') {
                    return largeuint8ArrToBase64(payload)
                        .then(res => `data:image/png;base64,${res.substr(13)}`);
                }

                return largeuint8ArrToString(payload);
            }).then((data) => {
                this.setState({ assetData: data });
            });
    }

    calcSize(assetData, sizer) {
        const { calcSize } = this.props;

        return calcSize(this.rawAsset, sizer);
    }

    render() {
        const { asset } = this.props;

        const { assetData } = this.state;

        return (
            <div>
                <h2>
                    {asset.name}
                </h2>
                <br />
                <Section title="Mime type" collapse={false} body={asset.mimeType} />
                <Section title="Sizes" collapse={false}>
                    { assetData
                        && (
                            <Card bordered={false} bodyStyle={{ padding: 0 }}>
                                <SizeCardGrid data={assetData} title="Raw size" />
                                <SizeCardGrid
                                    data={assetData}
                                    title="Gzip size"
                                    calcFunc={() => this.calcSize(assetData)}
                                />
                                <SizeCardGrid
                                    data={assetData}
                                    title="Deflate size"
                                    calcFunc={() => this.calcSize(assetData, AVAILABLE_SIZES.DEFLATE)}
                                />
                                <SizeCardGrid
                                    data={assetData}
                                    title="Brotli size"
                                    calcFunc={() => this.calcSize(assetData, AVAILABLE_SIZES.BROTLI)}
                                />
                            </Card>
                        )
                    }
                </Section>
                { asset.chunks.length > 0
                    && (
                        <Section title="Associated chunks" badge={asset.chunks.length}>
                            <ChunksTable chunks={asset.chunks} maxHeight={250} />
                        </Section>
                    )
                }
                { asset.modules.length > 0
                && (
                    <Section title="Associated modules" badge={asset.modules.length}>
                        <ModulesTable modules={asset.modules} maxHeight={250} />
                    </Section>
                )
                }
                { assetData && MIME_TYPES_PREVIEWERS[asset.mimeType] === 'editor'
                    && (
                        <Section title="Preview" collapse={false}>
                            <CodeViewer source={assetData} mime={asset.mimeType} />
                        </Section>
                    )
                }
                { assetData && MIME_TYPES_PREVIEWERS[asset.mimeType] === 'image'
                    && (
                        <Section title="Preview" collapse={false}>
                            <img style={{ maxHeight: 400 }} src={assetData} alt="Asset data" />
                        </Section>
                    )
                }
                { assetData && !MIME_TYPES_PREVIEWERS[asset.mimeType]
                && <Section title="Preview" collapse={false} body="Preview of this asset type is not implemented yet" />
                }
            </div>
        );
    }
}

Asset.propTypes = {
    asset: PropTypes.object, // eslint-disable-line
    getAssetData: PropTypes.func.isRequired,
    calcSize: PropTypes.func.isRequired,
};

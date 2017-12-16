import React from 'react';
import PropTypes from 'prop-types';

import CodeMirror from 'react-codemirror';

import { Card } from 'antd';

import { AVAILABLE_SIZES } from '../../../actions/calcSize';

import Section from '../../../components/Section';
import SizeCardGrid from '../../../components/SizeCardGrid';

const MIME_TYPES_PREVIEWERS = {
    js: 'editor',
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

export default class Asset extends React.Component {
    constructor(props) {
        super(props);

        this.calcSize = this.calcSize.bind(this);

        this.state = {};
    }

    componentDidMount() {
        const { asset, getAssetData } = this.props;

        getAssetData(asset.name)
            .then(({ payload }) => {
                if (asset.mimeType === `application/javascript`) {
                    return largeuint8ArrToString(payload);
                }

                return payload;
            }).then((data) => {
                this.setState(Object.assign({}, this.state, { assetData: data }));
            });
    }

    calcSize(assetData, sizer) {
        const { calcSize } = this.props;

        return calcSize(assetData, sizer)
            .then(({ value }) => value);
    }

    render() {
        const { asset } = this.props;

        const { assetData } = this.state;

        return (
            <div>
                <h2>{asset.name}</h2>
                <br />
                <Section title="Sizes" collapse={false}>
                    { assetData &&
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
                            {/*<SizeCardGrid*/}
                                {/*data={assetData}*/}
                                {/*title="Brotli size"*/}
                                {/*calcFunc={() => this.calcSize(assetData, AVAILABLE_SIZES.BROTLI)}*/}
                            {/*/>*/}
                        </Card>
                    }
                </Section>
                <Section title="Preview" collapse={false}>
                    { assetData &&
                        <CodeMirror
                            value={assetData}
                            options={{
                                readOnly: true,
                                lineNumbers: true,
                                theme: 'monokai',
                                mode: 'javascript',
                            }}
                        />
                    }
                </Section>
            </div>
        );
    }
}

Asset.propTypes = {
    asset: PropTypes.object, // eslint-disable-line
    getAssetData: PropTypes.func.isRequired,
    calcSize: PropTypes.func.isRequired,
};

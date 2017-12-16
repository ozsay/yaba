import React from 'react';
import PropTypes from 'prop-types';

import { Table } from 'antd';

export default class Assets extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { assets, gotoTab } = this.props;

        const dataSource = assets.map(asset => ({
            id: asset.id,
            key: asset.name,
            name: asset.name,
            mime: asset.mimeType,
            size: asset.size,
        }));

        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, obj) => <a onClick={() => gotoTab(obj.id, 'assets')}>{text}</a>,
        }, {
            title: 'Mime',
            dataIndex: 'mime',
        }, {
            title: 'Size',
            dataIndex: 'size',
        }];

        return (<Table
            dataSource={dataSource}
            columns={columns}
            size="small"
            pagination={false}
        />);
    }
}

Assets.propTypes = {
    assets: PropTypes.arrayOf(PropTypes.object).isRequired,
    gotoTab: PropTypes.func.isRequired,
};

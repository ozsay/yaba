import React from 'react';
import PropTypes from 'prop-types';
import mime from 'mime-types';

import { Table } from 'antd';

export default class Assets extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { assets } = this.props;

        const dataSource = assets.map(asset => ({
            key: asset.name,
            name: asset.name,
            mime: mime.lookup(asset.name),
            size: asset.size,
        }));

        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
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
};

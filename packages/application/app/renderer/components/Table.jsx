import React from 'react';
import PropTypes from 'prop-types';

import { Table as AntdTable } from 'antd';

export default function Table({ data, columns }) {
    return (
        <AntdTable
            dataSource={data}
            columns={columns}
            size="small"
            pagination={false}
        />
    );
}

Table.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

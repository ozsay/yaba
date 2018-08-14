import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Column } from 'react-virtualized';

import Table from '../../../components/Table';

const titleStyle = {
    color: 'rgba(0, 0, 0, 0.65)',
    margin: '10px 0',
    fontSize: 14,
    lineHeight: '22px',
};

export default function DuplicatedPackages({ packages }) {
    return (
        <div style={{ width: '95%', margin: 'auto' }}>
            {
                packages.map((_p, i) => (
                    <div key={_p[0].name}>
                        <div style={titleStyle}>
                            {_p[0].name}
                        </div>
                        <Table data={_p} maxHeight={400}>
                            <Column
                                label="Path"
                                dataKey="dir"
                                dataLength={val => val.toString().length}
                                width={10}
                                cellRenderer={({ rowData, cellData }) => (
                                    <Link to={`/packages/${rowData.id}`}>
                                        {cellData}
                                    </Link>
                                )}
                            />
                            <Column
                                label="Version"
                                dataKey="version"
                                dataLength={val => (val ? val.length : 0)}
                                width={10}
                            />
                            <Column
                                label="Size"
                                dataKey="size"
                                dataLength={val => (val ? val.length : 0)}
                                width={10}
                            />
                        </Table>
                    </div>
                ))
            }
        </div>
    );
}

DuplicatedPackages.propTypes = {
    packages: PropTypes.array.isRequired,
};

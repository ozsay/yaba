import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { Table as VTable, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';

const tableStyle = {
    border: '1px solid #e8e8e8',
    borderRadius: 4,
    width: 1200,
    paddingRight: 8,
    paddingLeft: 8,
};

const rowStyle = {
    borderBottom: '1px solid #e8e8e8',
    outline: 'none',
};

const lastRowStyle = Object.assign({}, rowStyle, { borderBottom: 'none' });

const headerStyle = {
    textTransform: 'none',
    fontWeight: 600,
};

const headerHeight = 38;

function calcHeight(requestedHeight, data, rh, hh, minElements = 4) {
    const length = Math.min(data.length, minElements);

    const minHeight = (length * rh) + hh;
    const maxHeight = Math.min(requestedHeight, (data.length * rh) + hh);

    return Math.max(minHeight, maxHeight);
}

export default function Table({
    data, children, rowHeight, maxHeight,
}) {
    function createTable(width, height) {
        return (
            <VTable
                style={tableStyle}
                headerStyle={headerStyle}
                width={(width) - 16}
                height={height}
                headerHeight={headerHeight}
                rowHeight={rowHeight}
                rowCount={data.length}
                rowGetter={({ index }) => data[index]}
                rowStyle={({ index }) => (index === (data.length - 1) ? lastRowStyle : rowStyle)}
                onRowMouseOver={({ event: { target } }) => {
                    if (target.getAttribute('role') === 'row') {
                        target.style.backgroundColor = '#e6f7ff';
                    } else if (target.parentNode.getAttribute('role') === 'row') {
                        target.parentNode.style.backgroundColor = '#e6f7ff';
                    }
                }}
                onRowMouseOut={({ event: { target } }) => {
                    if (target.getAttribute('role') === 'row') {
                        target.style.backgroundColor = '';
                    } else if (target.parentNode.getAttribute('role') === 'row') {
                        target.parentNode.style.backgroundColor = '';
                    }
                }}
            >
                { children }
            </VTable>
        );
    }

    const calcedWidth = _.sumBy(children, 'props.width');

    if (maxHeight) {
        return createTable(calcedWidth, calcHeight(maxHeight, data, rowHeight, headerHeight));
    }

    return (
        <AutoSizer>
            {({ height }) => createTable(calcedWidth, calcHeight(height, data, rowHeight, headerHeight))}
        </AutoSizer>
    );
}

Table.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    rowHeight: PropTypes.number,
    maxHeight: PropTypes.number,
};

Table.defaultProps = {
    rowHeight: 38,
    maxHeight: null,
};

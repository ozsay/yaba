import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { Table as VTable, AutoSizer, Column } from 'react-virtualized';
import 'react-virtualized/styles.css';

const tableStyle = width => ({
    border: '1px solid #e8e8e8',
    borderRadius: 4,
    width,
    paddingRight: 8,
    paddingLeft: 8,
});

const rowStyle = {
    borderBottom: '1px solid #e8e8e8',
    outline: 'none',
};

const lastRowStyle = Object.assign({}, rowStyle, { borderBottom: 'none' });

const headerStyle = {
    textTransform: 'none',
    fontWeight: 600,
};

function getFlexedColumns(data, columns) {
    const propsArr = _.map(columns, 'props');

    const maxLengths = _(propsArr)
        .map(col => _.map(data, val => col.dataLength(val[col.dataKey])))
        .map(_.max)
        .map((l, i) => _.max([l, propsArr[i].label.length]))
        .value();

    return _(maxLengths)
        .map((l, i) => <Column {...propsArr[i]} flexGrow={l} key={`${propsArr.label}`} width={50} />)
        .value();
}

const headerHeight = 38;

function calcHeight(requestedHeight, data, rh, hh, minElements = 4) {
    const length = Math.min(data.length, minElements);

    const minHeight = (length * rh) + hh;
    const maxHeight = Math.min(requestedHeight, (data.length * rh) + hh);

    return Math.max(minHeight, maxHeight);
}

function hover(target, color = '') {
    if (target.getAttribute('role') === 'row') {
        target.style.backgroundColor = color;
    } else {
        hover(target.parentNode, color);
    }
}

export default function Table({
    data, children, rowHeight, maxHeight,
}) {
    function createTable(width, height, columns = children) {
        return (
            <VTable
                style={tableStyle(width)}
                headerStyle={headerStyle}
                width={width - 16}
                height={height}
                headerHeight={headerHeight}
                rowHeight={rowHeight}
                rowCount={data.length}
                rowGetter={({ index }) => data[index]}
                rowStyle={({ index }) => (index === (data.length - 1) ? lastRowStyle : rowStyle)}
                onRowMouseOver={({ event: { target } }) => {
                    hover(target, '#e6f7ff');
                }}
                onRowMouseOut={({ event: { target } }) => {
                    hover(target);
                }}
            >
                { columns }
            </VTable>
        );
    }

    return (
        <AutoSizer disableHeight={!!maxHeight}>
            {({ height, width }) => {
                const calcedHeight = calcHeight(maxHeight || height, data, rowHeight, headerHeight);

                return createTable(width, calcedHeight, getFlexedColumns(data, children));
            }}
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

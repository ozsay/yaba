import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { Card, Button, Icon } from 'antd';

import {
    Table as VTable, AutoSizer, Column,
} from 'react-virtualized';
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

const lastRowStyle = { ...rowStyle, borderBottom: 'none' };

const headerStyle = {
    textTransform: 'none',
    fontWeight: 600,
};

const overlayStyle = {
    zIndex: 999,
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

export default class Table extends React.Component {
    constructor(props) {
        super(props);

        this.toggleOverlay = this.toggleOverlay.bind(this);
        this.fullOpacity = this.fullOpacity.bind(this);
        this.someOpacity = this.someOpacity.bind(this);

        this.state = {};
    }

    createTable(width, height, columns = this.props.children) {
        const { data, rowHeight, overlay } = this.props;

        return (
            <React.Fragment>
                {
                    overlay && this.renderOverlay()
                }
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
            </React.Fragment>
        );
    }

    toggleOverlay() {
        const { showOverlay } = this.state;

        this.setState({ showOverlay: !showOverlay, fullOpacity: false });
    }

    fullOpacity() {
        this.setState({ fullOpacity: true });
    }

    someOpacity() {
        this.setState({ fullOpacity: false });
    }

    renderOverlay() {
        const { overlay } = this.props;
        const { showOverlay, fullOpacity } = this.state;

        return (
            <div style={{ position: 'absolute' }}>
                <Button
                    size="small"
                    style={{
                        padding: 0, height: 14, borderRadius: 2, display: 'flex',
                    }}
                    onClick={this.toggleOverlay}
                >
                    <Icon type={showOverlay ? 'minus' : 'plus'} style={{ fontSize: 12 }} />
                </Button>
                {
                    showOverlay
                        && (
                            <Card
                                style={{ ...overlayStyle, opacity: fullOpacity ? 1 : 0.7 }}
                                onMouseEnter={this.fullOpacity}
                                onMouseLeave={this.someOpacity}
                            >
                                {overlay}
                            </Card>
                        )
                }

            </div>
        );
    }

    render() {
        const {
            data, children, rowHeight, maxHeight,
        } = this.props;

        return (
            <AutoSizer disableHeight={!!maxHeight}>
                {({ height, width }) => {
                    const calcedHeight = calcHeight(maxHeight || height, data, rowHeight, headerHeight);

                    return this.createTable(width, calcedHeight, getFlexedColumns(data, children));
                }}
            </AutoSizer>
        );
    }
}

Table.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    rowHeight: PropTypes.number,
    maxHeight: PropTypes.number,
    overlay: PropTypes.node,
};

Table.defaultProps = {
    rowHeight: 38,
    maxHeight: null,
    overlay: null,
};

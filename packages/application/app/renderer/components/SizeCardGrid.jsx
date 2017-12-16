import React from 'react';
import PropTypes from 'prop-types';

import { Card, Spin } from 'antd';

const style = {
    width: '25%',
    height: '75px',
    textAlign: 'center',
    padding: '15px',
};

export default class SizeCardGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    componentWillMount() {
        this.calcSize();
    }

    componentWillReceiveProps(next) {
        this.calcSize(next);
    }

    calcSize(props = this.props) {
        const { calcFunc, data } = props;

        const sizePromise = calcFunc(data);

        if (sizePromise.then) {
            this.setState({ busy: true });

            sizePromise.then((size) => {
                this.setState({ size, busy: false });
            });
        } else {
            this.setState({ size: sizePromise });
        }
    }

    render() {
        const { title } = this.props;

        const { size, busy } = this.state;

        return (
            <Card.Grid style={style}>
                <h4>{title}</h4>
                { busy && <Spin size="small" /> }
                { !busy && <h5>{size}</h5> }
            </Card.Grid>
        );
    }
}
SizeCardGrid.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.any.isRequired, // eslint-disable-line
    calcFunc: PropTypes.func, // eslint-disable-line
};

SizeCardGrid.defaultProps = {
    calcFunc: data => data.length,
};

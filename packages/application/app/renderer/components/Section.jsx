import React from 'react';
import PropTypes from 'prop-types';

import { Switch, Badge } from 'antd';

export default class Section extends React.Component {
    constructor(props) {
        super(props);

        this.state = { showBody: true };
    }

    handleShowHide(value) {
        this.setState(Object.assign({}, this.state, { showBody: value }));
    }

    render() {
        const {
            title, badge, collapse, body, children, newLine,
        } = this.props;

        const { showBody } = this.state;

        return (
            <div>
                { collapse &&
                    <div>
                        <Switch
                            checked={showBody}
                            onChange={value => this.handleShowHide(value)}
                        />
                        <h3 style={{ display: 'inline-block', marginLeft: '5px' }}>
                            {title}
                            { badge !== null && <Badge count={badge} style={{ backgroundColor: '#52c41a' }} offset={[0, 5]} /> }
                        </h3>
                    </div>
                }
                { !collapse &&
                    <h3>
                        {title}
                        { badge !== null && <Badge count={badge} style={{ backgroundColor: '#52c41a' }} offset={[0, 5]} /> }
                    </h3> }
                { showBody && body && <h4>{body}</h4> }
                { showBody && children }
                { newLine && <br /> }
            </div>
        );
    }
}

Section.propTypes = {
    title: PropTypes.string.isRequired,
    badge: PropTypes.number,
    collapse: PropTypes.bool,
    body: PropTypes.string,
    children: PropTypes.object, // eslint-disable-line
    newLine: PropTypes.bool,
};

Section.defaultProps = {
    badge: null,
    collapse: true,
    body: null,
    children: null,
    newLine: true,
};

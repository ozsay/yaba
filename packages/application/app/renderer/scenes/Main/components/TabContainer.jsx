import React from 'react';
import PropTypes from 'prop-types';

export default function TabContainer({ children, comp }) {
    if (!comp) {
        return <div style={{ padding: 8 * 3 }}>{children}</div>;
    }

    return <div style={{ padding: 8 * 3 }}>{children(comp)}</div>;
}

TabContainer.propTypes = {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    comp: PropTypes.func,
};

TabContainer.defaultProps = { comp: null };

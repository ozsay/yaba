import React from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';

const inputFileStyle = {
    display: 'none',
};

export default class StatsImporter extends React.Component {
    constructor(props) {
        super(props);
        this.getFile = this.getFile.bind(this);
    }

    getFile() {
        const { importStats } = this.props;

        this.fileInput.addEventListener('change', ({ target: { files } }) => {
            if (files[0]) {
                importStats(files[0]);
            }
        }, { once: true });

        this.fileInput.addEventListener('click', (ev) => {
            ev.stopPropagation();
        }, { once: true });

        this.fileInput.click();
    }

    render() {
        return (
            <Button raised onClick={this.getFile}>
                    Upload
                <input type="file" ref={(input) => { this.fileInput = input; }} style={inputFileStyle} />
            </Button>
        );
    }
}

StatsImporter.propTypes = {
    importStats: PropTypes.func.isRequired,
};

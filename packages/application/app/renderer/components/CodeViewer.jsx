import React from 'react';
import PropTypes from 'prop-types';

import CodeMirror from 'react-codemirror';

import 'codemirror/lib/codemirror.css';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';

import 'codemirror/theme/monokai.css';

export default class CodeViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { source, mime } = this.props;

        let mode = 'javascript';

        if (mime === `application/javascript`) {
            mode = 'javascript';
        } else if (mime === 'text/html') {
            mode = 'htmlmixed';
        } else if (mime === 'text/css') {
            mode = 'css';
        }

        return (
            <CodeMirror
                value={source}
                options={{
                    readOnly: true,
                    lineNumbers: true,
                    theme: 'monokai',
                    mode,
                }}
            />
        );
    }
}

CodeViewer.propTypes = {
    source: PropTypes.string.isRequired,
    mime: PropTypes.string.isRequired,
};

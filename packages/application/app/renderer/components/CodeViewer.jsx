import React from 'react';
import PropTypes from 'prop-types';

import { UnControlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';

import 'codemirror/theme/monokai.css';

const cjsMarkerStyle = 'background-color: red';
const es6MarkerStyle = 'background-color: blue';

export default class CodeViewer extends React.Component {
    static modeFromMime(mime) {
        if (mime === `application/javascript`) {
            return 'javascript';
        }
        if (mime === 'text/html') {
            return 'htmlmixed';
        }
        if (mime === 'text/css') {
            return 'css';
        }

        return null;
    }

    constructor(props) {
        super(props);

        this.editor = React.createRef();

        this.state = {};
    }

    componentDidMount() {
        this.renderEditor();
    }

    componentDidUpdate(p) {
        const { source } = this.props;

        if (source !== p.sound) {
            this.renderEditor();
        }
    }

    renderEditor() {
        const { editor: codeMirror } = this.editor.current;

        const { source, reason } = this.props;

        const { doc } = codeMirror;

        doc.setValue(source);

        if (reason) {
            const {
                line, start, end, type,
            } = reason;

            doc.markText(
                { line: line - 1, ch: start },
                { line: line - 1, ch: end },
                { css: type === 'es6' ? es6MarkerStyle : cjsMarkerStyle },
            );
            const t = codeMirror.charCoords({ line, ch: 0 }, 'local').top;
            const middleHeight = codeMirror.getScrollerElement().offsetHeight / 2;
            codeMirror.scrollTo(null, t - middleHeight - 5);
            codeMirror.display.wrapper.scrollIntoView();
        }
    }

    render() {
        const {
            mime, mode = CodeViewer.modeFromMime(mime),
        } = this.props;

        return (
            <CodeMirror
                ref={this.editor}
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
    mime: PropTypes.string,
    mode: PropTypes.string,
    reason: PropTypes.object, // eslint-disable-line
};

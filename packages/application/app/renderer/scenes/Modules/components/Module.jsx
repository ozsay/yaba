import 'codemirror/lib/codemirror.css';
import React from 'react';
import PropTypes from 'prop-types';

import CodeMirror from 'react-codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/monokai.css';

import { Card, Button } from 'antd';

import ModulesTable from '../../../components/ModulesTable';
import Section from '../../../components/Section';

const cjsMarkerStyle = 'background-color: red';
const es6MarkerStyle = 'background-color: blue';

const reasonStyle = {
    width: '33%',
    height: '75px',
    textAlign: 'left',
    padding: '15px',
};

const reasonButtonStyle = {
    float: 'right',
    marginTop: '6px',
};

export default class Module extends React.Component {
    constructor(props) {
        super(props);

        this.onLoadEditor = this.onLoadEditor.bind(this);
    }

    componentDidMount() {
        this.renderEditor();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.module !== this.props.module) {
            this.renderEditor();
        }
    }

    onLoadEditor(editor) {
        this.editor = editor;
    }

    renderEditor() {
        const { codeMirror } = this.editor;
        const { doc } = codeMirror;

        doc.setValue(this.props.module.source);

        if (this.props.reasonParams) {
            const {
                line, start, end, type,
            } = this.props.reasonParams;

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
        const { module, gotoTab } = this.props;

        return (
            <div>
                <h2>{module.name}</h2>
                <br />
                { module.issuer &&
                    <Section title="Iuuser" collapse={false}>
                        <h4><a onClick={() => gotoTab(module.issuer.id, 'modules')}>{module.issuer.name}</a></h4>
                    </Section>
                }
                { module.children.length > 0 &&
                <Section title="Children" badge={module.children.length}>
                    <div style={{ maxHeight: 250, overflow: 'auto' }} >
                        <ModulesTable modules={module.children} />
                    </div>
                </Section>
                }
                { module.reasons.length > 0 &&
                <Section title="Reasons" badge={module.reasons.length}>
                    <Card bordered={false} bodyStyle={{ padding: 0 }}>
                        { module.reasons.map(reason => (
                            <Card.Grid style={reasonStyle} key={`${reason.module.id}_${reason.reasonText()}`}>
                                <Button style={reasonButtonStyle} shape="circle" icon="arrow-right" />
                                <h4>{reason.module.name}</h4>
                                <h5 style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
                                    {`${reason.type} at ${reason.reasonText()} as '${reason.userRequest}'`}
                                </h5>
                            </Card.Grid>
                        ))
                        }
                    </Card>
                </Section>
                }
                <Section title="Source code" collapse={false} newLine={false}>
                    <CodeMirror
                        ref={this.onLoadEditor}
                        options={{
                            readOnly: true,
                            lineNumbers: true,
                            theme: 'monokai',
                            mode: 'javascript',
                        }}
                    />
                </Section>
            </div>
        );
    }
}

Module.propTypes = {
    module: PropTypes.object, // eslint-disable-line
    gotoTab: PropTypes.func.isRequired,
    reasonParams: PropTypes.object, // eslint-disable-line
};

Module.defaultProps = { module: null, reasonParams: null };

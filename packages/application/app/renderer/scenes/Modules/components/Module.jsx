import 'codemirror/lib/codemirror.css';
import React from 'react';
import PropTypes from 'prop-types';

import CodeMirror from 'react-codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/monokai.css';

import { Switch, Badge, Card, Button } from 'antd';

import ModulesTable from '../../../components/ModulesTable';

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

        this.state = { showChildren: true, showReasons: true };
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

    handleShowHide(control, value) {
        this.setState(Object.assign({}, this.state, { [control]: value }));
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
        const { showChildren, showReasons } = this.state;

        return (
            <div>
                <h2>{module.name}</h2>
                <br />
                { module.issuer &&
                    <div>
                        <h3>Issuer</h3>
                        <h4><a onClick={() => gotoTab(module.issuer.id, 'modules')}>{module.issuer.name}</a></h4>
                        <br />
                    </div>
                }
                { module.children.length > 0 &&
                    <div>
                        <div>
                            <Switch
                                checked={showChildren}
                                onChange={value => this.handleShowHide('showChildren', value)}
                            />
                            <h3 style={{ display: 'inline-block', marginLeft: '5px' }}>
                                Children
                                <Badge count={module.children.length} style={{ backgroundColor: '#52c41a' }} offset={[0, 5]} />
                            </h3>
                        </div>
                        { showChildren &&
                            <div style={{ maxHeight: 250, overflow: 'auto' }} >
                                <ModulesTable modules={module.children} />
                            </div>
                        }
                        <br />
                    </div>
                }
                { module.reasons.length > 0 &&
                    <div>
                        <div>
                            <Switch
                                checked={showReasons}
                                onChange={value => this.handleShowHide('showReasons', value)}
                            />
                            <h3 style={{ display: 'inline-block', marginLeft: '5px' }}>
                                Reasons
                                <Badge count={module.reasons.length} style={{ backgroundColor: '#52c41a' }} offset={[0, 5]} />
                            </h3>
                        </div>
                        { showReasons &&
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
                        }
                        <br />
                    </div>
                }
                <h3>Source code</h3>
                <CodeMirror
                    ref={this.onLoadEditor}
                    options={{
                        readOnly: true,
                        lineNumbers: true,
                        theme: 'monokai',
                        mode: 'javascript',
                    }}
                />
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

import 'codemirror/lib/codemirror.css';
import React from 'react';
import PropTypes from 'prop-types';

import CodeMirror from 'react-codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/monokai.css';

import { Card } from 'antd';

import ModulesTable from '../../../components/ModulesTable';
import Section from '../../../components/Section';
import SizeCardGrid from '../../../components/SizeCardGrid';
import Reason from '../../../components/Reason';
import ChunksTable from '../../../components/ChunksTable';
import AssetsTable from '../../../components/AssetsTable';

const cjsMarkerStyle = 'background-color: red';
const es6MarkerStyle = 'background-color: blue';

export default class Module extends React.Component {
    constructor(props) {
        super(props);

        this.onLoadEditor = this.onLoadEditor.bind(this);
    }

    componentDidMount() {
        if (this.props.module.source) {
            this.renderEditor();
        }
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.module !== this.props.module) && this.props.module.source) {
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

        if (this.props.reason) {
            const {
                line, start, end, type,
            } = this.props.reason;

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
                <Section title="Part of package" collapse={false}>
                    <h4><a onClick={() => gotoTab(module.package.id, 'packages')}>{module.package.name}</a></h4>
                </Section>
                <Section title="Sizes" collapse={false}>
                    <Card bordered={false} bodyStyle={{ padding: 0 }}>
                        <SizeCardGrid title="Exclusive size" data={module} calcFunc={() => module.size} />
                        <SizeCardGrid title="Inclusive size" data={module} calcFunc={() => module.totalSize} />
                        { module.chunks.map(chunk => (
                            <SizeCardGrid
                                key={`size_${chunk.id}`}
                                title={`Exclusive % of ${chunk.name}`}
                                data={chunk.modules}
                                calcFunc={() => `${((module.size / chunk.modulesSize) * 100).toPrecision(4)}%`}
                            />
                        ))}
                    </Card>
                </Section>
                { module.children.length > 0 &&
                <Section title="Children" badge={module.children.length}>
                    <div style={{ maxHeight: 250, overflow: 'auto' }} >
                        <ModulesTable modules={module.children} />
                    </div>
                </Section>
                }
                { module.reasons.length > 0 &&
                <Section title="Reasons" badge={module.reasons.length}>
                    <div style={{ maxHeight: 500, overflow: 'auto', paddingBottom: 10 }} >
                        <Card bordered={false} bodyStyle={{ padding: 0 }}>
                            { module.reasons.map(reason => (
                                <Reason
                                    key={`${reason.module.id}_${reason.reasonText()}`}
                                    reason={reason}
                                />
                            ))}
                        </Card>
                    </div>
                </Section>
                }
                { module.chunks.length > 0 &&
                <Section title="Associated Chunks" badge={module.chunks.length}>
                    <div style={{ maxHeight: 250, overflow: 'auto' }} >
                        <ChunksTable chunks={module.chunks} />
                    </div>
                </Section>
                }
                { module.assets.length > 0 &&
                <Section title="Associated Assets" badge={module.assets.length}>
                    <div style={{ maxHeight: 250, overflow: 'auto' }} >
                        <AssetsTable assets={module.assets} />
                    </div>
                </Section>
                }
                { module.source &&
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
                }
            </div>
        );
    }
}

Module.propTypes = {
    module: PropTypes.object, // eslint-disable-line
    gotoTab: PropTypes.func.isRequired,
    reason: PropTypes.object, // eslint-disable-line
};

Module.defaultProps = { module: null, reason: null };

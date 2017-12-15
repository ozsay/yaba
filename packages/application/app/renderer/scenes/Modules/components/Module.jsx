import 'codemirror/lib/codemirror.css';
import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import CodeMirror from 'react-codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/monokai.css';

import IconButton from 'material-ui/IconButton';
import { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import { GridList, GridListTile } from 'material-ui/GridList';
import NavigateNext from 'material-ui-icons/NavigateNext';
import Switch from 'material-ui/Switch';
import { FormControlLabel } from 'material-ui/Form';

import ModulesTable from '../../../components/ModulesTable';

const cjsMarkerStyle = 'background-color: red';
const es6MarkerStyle = 'background-color: blue';

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
        const { module } = this.props;
        const { showChildren, showReasons } = this.state;

        return (
            <div>
                { module.issuer &&
                    <div>
                        <Typography type="body2">Issuer</Typography>
                        <Typography type="body1">
                            {/*<Link to={`/modules?moduleId=${module.issuer.id}`}>{module.issuer.name}</Link>*/}
                        </Typography>
                        <br />
                    </div>
                }
                { module.children.length > 0 &&
                    <div>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={showChildren}
                                    onChange={event => this.handleShowHide('showChildren', event.target.checked)}
                                />
                            }
                            label={`Children [${module.children.length}]`}
                        />
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
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={showReasons}
                                    onChange={event => this.handleShowHide('showReasons', event.target.checked)}
                                />
                            }
                            label={`Reasons [${module.reasons.length}]`}
                        />
                        { showReasons &&
                            <GridList cellHeight={68} cols={3} style={{ maxHeight: 250 }}>
                                {module.reasons.map(reason => (
                                    <GridListTile key={`${reason.module.id}_${reason.reasonText()}`}>
                                        <ListItem component="div">
                                            <ListItemText
                                                primary={reason.module.name}
                                                secondary={`${reason.type} at ${
                                                    reason.reasonText()} as '${reason.userRequest}'`}
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton
                                                    component={Link}
                                                    to={`?moduleId=${reason.module.id}&markerPos=${
                                                        reason.reasonText()}&reasonType=${reason.type}`}
                                                >
                                                    <NavigateNext />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </GridListTile>
                                ))}
                            </GridList>
                        }
                        <br />
                    </div>
                }
                <Typography type="body2">Source code</Typography>
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
    reasonParams: PropTypes.object, // eslint-disable-line
};

Module.defaultProps = { module: null, reasonParams: null };

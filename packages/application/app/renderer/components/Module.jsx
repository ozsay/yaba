import 'codemirror/lib/codemirror.css';
import React from 'react';
import PropTypes from 'prop-types';

import { withRouter, Link } from 'react-router-dom';
import CodeMirror from 'react-codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/monokai.css';

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import { GridList, GridListTile } from 'material-ui/GridList';
import NavigateNext from 'material-ui-icons/NavigateNext';

import ModulesTable from './ModulesTable';

const cjsMarkerStyle = 'background-color: red';
const es6MarkerStyle = 'background-color: blue';

function Module({ module, history, reasonParams }) {
    function onLoadEditor(editor) {
        if (editor) {
            const { codeMirror } = editor;
            const { doc } = codeMirror;

            doc.setValue(module.source);

            if (reasonParams) {
                const {
                    line, start, end, type,
                } = reasonParams;

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
    }

    function close() {
        if (window.history.state) {
            history.goBack();
        } else {
            history.push('/');
        }
    }

    return (
        <Dialog open fullScreen>
            <DialogTitle>{module.name}</DialogTitle>
            <DialogContent>
                { module.issuer &&
                    <div>
                        <Typography type="body2">Issuer</Typography>
                        <Typography type="body1">
                            <Link to={`/modules?moduleId=${module.issuer.id}`}>{module.issuer.name}</Link>
                        </Typography>
                        <br />
                    </div>
                }
                { module.children.length > 0 &&
                    <div>
                        <Typography type="body2">Children [{module.children.length}]</Typography>
                        <div style={{ maxHeight: 250, overflow: 'auto' }} >
                            <ModulesTable modules={module.children} />
                        </div>
                        <br />
                    </div>
                }
                { module.reasons.length > 0 &&
                    <div>
                        <Typography type="body2">Reasons [{module.reasons.length}]</Typography>
                        <GridList cellHeight={68} cols={3} style={{ maxHeight: 250 }}>
                            {module.reasons.map(reason => (
                                <GridListTile key={`${reason.module.id}_${reason.reasonText()}`}>
                                    <ListItem component="div">
                                        <ListItemText
                                            primary={reason.module.name}
                                            secondary={`${reason.type} at ${reason.reasonText()} as '${reason.userRequest}'`}
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
                        <br />
                    </div>
                }
                <Typography type="body2">Source code</Typography>
                <CodeMirror
                    ref={onLoadEditor}
                    options={{
                        readOnly: true,
                        lineNumbers: true,
                        theme: 'monokai',
                        mode: 'javascript',
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={close}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default withRouter(Module);

Module.propTypes = {
    module: PropTypes.object, // eslint-disable-line
    reasonParams: PropTypes.object, // eslint-disable-line
    history: PropTypes.object.isRequired, // eslint-disable-line
};

Module.defaultProps = { module: null, reasonParams: null };

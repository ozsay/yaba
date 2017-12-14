import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

import addSecondaryTabAction from '../actions/addSecondaryTab';

function ModulesTable({ modules, addSecondaryTab }) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Issuer</TableCell>
                    <TableCell numeric>Size</TableCell>
                    <TableCell numeric>Children</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {modules.map(module => (
                    <TableRow key={module.id} hover>
                        <TableCell><a href="#" onClick={() => addSecondaryTab(module)}>{module.id}</a></TableCell>
                        <TableCell>{module.name}</TableCell>
                        <TableCell>{module.issuer &&
                            <a href="#" onClick={() => addSecondaryTab(module.issuer)}>{module.issuer.name}</a>}
                        </TableCell>
                        <TableCell numeric>{module.size}</TableCell>
                        <TableCell numeric>{module.children.length}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

const mapDispaptchToProps = {
    addSecondaryTab: addSecondaryTabAction,
};

export default connect(() => ({}), mapDispaptchToProps)(ModulesTable);

ModulesTable.propTypes = {
    modules: PropTypes.arrayOf(PropTypes.object),
    addSecondaryTab: PropTypes.func.isRequired,
};

ModulesTable.defaultProps = { modules: [] };

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

export default function ModulesTable({ modules }) {
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
                        <TableCell><Link to={`/modules?moduleId=${module.id}`}>{module.id}</Link></TableCell>
                        <TableCell>{module.name}</TableCell>
                        <TableCell>{module.issuer &&
                            <Link to={`/modules?moduleId=${module.issuer.id}`}>{module.issuer.name}</Link>}
                        </TableCell>
                        <TableCell numeric>{module.size}</TableCell>
                        <TableCell numeric>{module.children.length}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

ModulesTable.propTypes = {
    modules: PropTypes.arrayOf(PropTypes.object),
};

ModulesTable.defaultProps = { modules: [] };

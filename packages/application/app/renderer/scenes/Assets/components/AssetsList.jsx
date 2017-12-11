import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import mime from 'mime-types';

import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

export default class Assets extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { assets } = this.props;

        return (
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>File Name</TableCell>
                            <TableCell>MIME Type</TableCell>
                            <TableCell numeric>Size</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {assets.map(asset => (
                            <TableRow key={asset.name} hover>
                                <TableCell><Link to={`/assets?name=${asset.name}`}>{asset.name}</Link></TableCell>
                                <TableCell>{mime.lookup(asset.name)}</TableCell>
                                <TableCell numeric>{asset.size}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

Assets.propTypes = {
    assets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

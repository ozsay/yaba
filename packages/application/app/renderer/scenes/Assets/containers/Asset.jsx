import React from 'react';
import { withRouter } from 'react-router';

import getAssetData from '../../../actions/getAssetData';
import calcSize from '../../../actions/calcSize';

import StatsContext from '../../../contexts/stats';

import AssetComponent from '../components/Asset';

function Asset({ match: { params: { id } } }) {
    return (
        <StatsContext.Consumer>
            {({ stats }) => {
                const asset = stats.assets.find(_asset => _asset.id === Number.parseInt(id, 10));

                return (
                    <AssetComponent asset={asset} calcSize={calcSize} getAssetData={getAssetData} />
                );
            }}
        </StatsContext.Consumer>
    );
}

export default withRouter(Asset);

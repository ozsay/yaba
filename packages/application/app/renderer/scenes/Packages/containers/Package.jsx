import React from 'react';
import { withRouter } from 'react-router';

import getPackageData from '../../../actions/getPackageData';

import StatsContext from '../../../contexts/stats';

import PackageComponent from '../components/Package';

function Asset({ match: { params: { id } } }) {
    return (
        <StatsContext.Consumer>
            {({ stats }) => {
                const _package = stats.packages.find(packageToFind => packageToFind.id === id.toString());

                return (
                    <PackageComponent package={_package} getPackageData={getPackageData} />
                );
            }}
        </StatsContext.Consumer>
    );
}

export default withRouter(Asset);

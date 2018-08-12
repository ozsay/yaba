import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import PackageComponent from '../components/Package';
import getPackageData from '../../../actions/getPackageData';

function mapStateToProps({ stats }, { match: { params: { id } } }) {
    const _package = stats.packages.find(packageToFind => packageToFind.id === id.toString());

    return { package: _package };
}

const mapDispatchToProps = {
    getPackageData,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PackageComponent));

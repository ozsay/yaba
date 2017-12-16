import { connect } from 'react-redux';

import PackageComponent from '../components/Package';
import getPackageData from '../../../actions/getPackageData';

function mapStateToProps({ stats, tabs: { currentTab: { elementId } } }) {
    const _package = stats.packages.find(__package => __package.id === elementId);

    return { package: _package };
}

const mapDispatchToProps = {
    getPackageData,
};

export default connect(mapStateToProps, mapDispatchToProps)(PackageComponent);

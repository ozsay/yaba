import { connect } from 'react-redux';

import PackagesComponent from '../components/Packages';

import gotoTab from '../../../actions/gotoTab';

function mapStateToProps(state) {
    return { packages: state.stats.packages };
}

const mapDispatchToProps = {
    gotoTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(PackagesComponent);

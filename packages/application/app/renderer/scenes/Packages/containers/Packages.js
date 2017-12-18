import { connect } from 'react-redux';

import PackagesComponent from '../components/Packages';

function mapStateToProps(state) {
    return { packages: state.stats.packages };
}

export default connect(mapStateToProps)(PackagesComponent);

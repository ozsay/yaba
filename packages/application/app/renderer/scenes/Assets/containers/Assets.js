import { connect } from 'react-redux';

import AssetsListComponent from '../components/Assets';

function mapStateToProps(state) {
    return { assets: state.stats.assets };
}

export default connect(mapStateToProps)(AssetsListComponent);

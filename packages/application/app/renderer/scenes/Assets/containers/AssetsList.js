import { connect } from 'react-redux';

import AssetsListComponent from '../components/AssetsList';

function mapStateToProps(state) {
    return { assets: state.stats.assets };
}

export default connect(mapStateToProps)(AssetsListComponent);

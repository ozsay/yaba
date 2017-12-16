import { connect } from 'react-redux';

import AssetsListComponent from '../components/AssetsList';

import gotoTab from '../../../actions/gotoTab';

function mapStateToProps(state) {
    return { assets: state.stats.assets };
}

const mapDispatchToProps = {
    gotoTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssetsListComponent);

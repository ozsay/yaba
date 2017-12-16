import { connect } from 'react-redux';

import AssetComponent from '../components/Asset';

import getAssetData from '../../../actions/getAssetData';
import calcSize from '../../../actions/calcSize';

function mapStateToProps({ stats, tabs: { currentTab: { elementId } } }) {
    const asset = stats.assets.find(_asset => _asset.id === elementId);

    return { asset };
}

const mapDispatchToProps = {
    getAssetData,
    calcSize,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssetComponent);

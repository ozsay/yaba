import { connect } from 'react-redux';

import AssetComponent from '../components/Asset';

function mapStateToProps({ stats, tabs: { currentTab: { elementId } } }) {
    const asset = stats.assets.find(_asset => _asset.id === elementId);

    return { asset };
}

export default connect(mapStateToProps)(AssetComponent);

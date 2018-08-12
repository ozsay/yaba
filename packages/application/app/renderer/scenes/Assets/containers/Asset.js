import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import AssetComponent from '../components/Asset';

import getAssetData from '../../../actions/getAssetData';
import calcSize from '../../../actions/calcSize';

function mapStateToProps({ stats }, { match: { params: { id } } }) {
    const asset = stats.assets.find(_asset => _asset.id === Number.parseInt(id, 10));

    return { asset };
}

const mapDispatchToProps = {
    getAssetData,
    calcSize,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AssetComponent));

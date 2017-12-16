import { connect } from 'react-redux';

import ChunksComponent from '../components/Chunks';

import gotoTab from '../../../actions/gotoTab';

function mapStateToProps(state) {
    return { chunks: state.stats.chunks };
}

const mapDispatchToProps = {
    gotoTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChunksComponent);

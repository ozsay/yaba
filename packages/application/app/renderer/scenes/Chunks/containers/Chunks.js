import { connect } from 'react-redux';

import ChunksComponent from '../components/Chunks';

function mapStateToProps(state) {
    return { chunks: state.stats.chunks };
}

export default connect(mapStateToProps)(ChunksComponent);

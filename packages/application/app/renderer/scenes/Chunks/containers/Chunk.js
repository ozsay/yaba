import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import ChunkComponent from '../components/Chunk';

function mapStateToProps({ stats }, { match: { params: { id: index } } }) {
    const chunk = stats.chunks[index];

    return { chunk };
}

export default withRouter(connect(mapStateToProps)(ChunkComponent));

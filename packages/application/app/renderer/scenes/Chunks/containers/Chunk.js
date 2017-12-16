import { connect } from 'react-redux';

import ChunkComponent from '../components/Chunk';

function mapStateToProps({ stats, tabs: { currentTab: { elementId } } }) {
    const chunk = stats.chunks.find(_chunk => _chunk.id === elementId);

    return { chunk };
}

export default connect(mapStateToProps)(ChunkComponent);

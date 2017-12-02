import { connect } from 'react-redux';

import MessagesList from '../../../components/MessagesList';

function mapStateToProps(state) {
    return { messages: state.stats.errors };
}

export default connect(mapStateToProps)(MessagesList);

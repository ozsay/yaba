import { connect } from 'react-redux';

import GeneralComponent from '../components/General';

function mapStateToProps(state) {
    return { stats: state.stats };
}

export default connect(mapStateToProps)(GeneralComponent);

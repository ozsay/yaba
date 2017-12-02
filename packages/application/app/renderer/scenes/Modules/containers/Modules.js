import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ModulesComponent from '../components/Modules';

function mapStateToProps(state) {
    return { modules: state.stats.modules };
}

export default withRouter(connect(mapStateToProps)(ModulesComponent));

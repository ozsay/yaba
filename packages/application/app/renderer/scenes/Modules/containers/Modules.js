import { connect } from 'react-redux';

import ModulesComponent from '../components/Modules';

function mapStateToProps(state) {
    return { modules: state.stats.modules };
}

export default connect(mapStateToProps)(ModulesComponent);

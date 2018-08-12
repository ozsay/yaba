import { connect } from 'react-redux';

import ModuleComponent from '../components/Module';

function mapStateToProps({ stats }, { location: { state: reason }, match: { params: { id } } }) {
    const module = stats.modules.find(mod => mod.id === id);

    return { module, reason };
}

export default connect(mapStateToProps)(ModuleComponent);

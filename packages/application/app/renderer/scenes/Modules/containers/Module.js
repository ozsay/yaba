import { connect } from 'react-redux';

import ModuleComponent from '../components/Module';

function mapStateToProps({ tabs: { currentTab: { element: module } } }) {
    return { module };
}

export default connect(mapStateToProps)(ModuleComponent);

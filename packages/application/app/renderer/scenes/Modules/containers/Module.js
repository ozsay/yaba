import { connect } from 'react-redux';

import ModuleComponent from '../components/Module';

import gotoTab from '../../../actions/gotoTab';

function mapStateToProps({ stats, tabs: { currentTab: { elementId }, additional } }) {
    const module = stats.modules.find(mod => mod.id === elementId);

    return { module, reason: additional };
}

const mapDispatchToProps = {
    gotoTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModuleComponent);

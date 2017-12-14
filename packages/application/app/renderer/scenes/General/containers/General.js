import { connect } from 'react-redux';

import addSecondaryTab from '../../../actions/addSecondaryTab';
import gotoTab from '../../../actions/gotoTab';

import GeneralComponent from '../components/General';

function mapStateToProps(state) {
    return { stats: state.stats };
}

const mapDispatchToProps = {
    addSecondaryTab,
    gotoTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralComponent);

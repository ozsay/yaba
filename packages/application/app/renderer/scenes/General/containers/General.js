import { connect } from 'react-redux';

import gotoTab from '../../../actions/gotoTab';

import GeneralComponent from '../components/General';

function mapStateToProps(state) {
    return { stats: state.stats };
}

const mapDispatchToProps = {
    gotoTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralComponent);

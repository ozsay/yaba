import { connect } from 'react-redux';

import addSecondaryTab from '../../../actions/addSecondaryTab';

import GeneralComponent from '../components/General';

function mapStateToProps(state) {
    return { stats: state.stats };
}

const mapDispatchToProps = {
    addSecondaryTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralComponent);

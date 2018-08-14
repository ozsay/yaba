import { connect } from 'react-redux';

import analyze from '@yaba/analyzer';

import AnalysisComponent from '../components/Analysis';

function mapStateToProps(state) {
    return { stats: state.stats, analyze };
}

export default connect(mapStateToProps)(AnalysisComponent);

import { connect } from 'react-redux';

import importStats from '../../../actions/importStats';

import StatsImporterComponent from '../components/StatsImporter';

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        importStats: fileHandler => dispatch(importStats(fileHandler)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StatsImporterComponent);

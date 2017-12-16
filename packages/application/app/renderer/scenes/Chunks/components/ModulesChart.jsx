import React from 'react';
import PropTypes from 'prop-types';

import { Chart } from 'react-google-charts';

export default class ModulesChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { modules, title } = this.props;

        const data = [
            ['Location', 'Parent', 'Market trade volume (size)', 'Market increase/decrease (color)'],
            [title, null, 0, 0],
        ];

        modules.forEach((module) => {
            data.push([module.name, title, module.size, -module.size]);
        });

        return (
            <div>
                <Chart
                    chartType="TreeMap"
                    data={data}
                    options={{}}
                    width="100%"
                    height="400px"
                    legend_toggle
                    chartPackages={['treemap']}
                />
            </div>
        );
    }
}

ModulesChart.propTypes = {
    modules: PropTypes.array.isRequired, // eslint-disable-line
    title: PropTypes.string.isRequired, // eslint-disable-line
};

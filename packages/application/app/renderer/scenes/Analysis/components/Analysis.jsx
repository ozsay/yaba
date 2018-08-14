import React from 'react';
import PropTypes from 'prop-types';

import {
    Checkbox, Row, Button, Divider,
} from 'antd';

import DuplicatedPackages from './DuplicatedPackages';

const CheckboxGroup = Checkbox.Group;

export default class Analysis extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.runAnalysis = this.runAnalysis.bind(this);

        this.options = [
            {
                label: 'Check duplicated packages',
                value: 'duplicatedPackages',
                description:
                    'Check if your bundle contains a few copies of the same package (they may be in different versions).',
            },
        ];

        this.state = {
            selected: this.options.map(option => option.value),
        };
    }

    onChange(newSelected) {
        this.setState({ selected: newSelected });
    }

    runAnalysis() {
        const { stats, analyze } = this.props;
        const { selected } = this.state;

        this.setState({ running: true });

        analyze(stats, selected)
            .then((result) => {
                this.setState({ result, done: true, running: false });
            });
    }

    renderResult() {
        const { result } = this.state;

        return (
            <div style={{ paddingBottom: 24 }}>
                <Divider orientation="left">
                    Duplicated Packages
                </Divider>
                <DuplicatedPackages packages={result[0]} />
            </div>
        );
    }

    render() {
        const { selected, running, done } = this.state;

        if (done) {
            return this.renderResult();
        }

        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <CheckboxGroup style={{ width: '100%' }} value={selected} onChange={this.onChange} disabled={running}>
                    {
                        this.options.map(option => (
                            <React.Fragment key={option.label}>
                                <Row>
                                    <Checkbox value={option.value}>
                                        {option.label}
                                    </Checkbox>
                                </Row>
                                <Row style={{ marginLeft: 10 }}>
                                    {option.description}
                                </Row>
                            </React.Fragment>
                        ))
                    }
                </CheckboxGroup>
                <Button
                    style={{ margin: '30px auto' }}
                    type="primary"
                    size="large"
                    disabled={selected.length === 0 || running}
                    icon={running ? 'loading' : null}
                    onClick={this.runAnalysis}
                >
                    {running ? 'Running Analysis...' : 'Analyze Bundle'}
                </Button>
            </div>
        );
    }
}

Analysis.propTypes = {
    stats: PropTypes.object, // eslint-disable-line
    analyze: PropTypes.func.isRequired,
};

Analysis.defaultProps = {
    stats: null,
};

import React from 'react';
import PropTypes from 'prop-types';

import { Card } from 'antd';

import ModulesChart from './ModulesChart';
import ModulesTable from '../../../components/ModulesTable';
import Section from '../../../components/Section';
import SizeCardGrid from '../../../components/SizeCardGrid';

export default class Chunk extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { chunk } = this.props;

        return (
            <div>
                <h2>{chunk.name}</h2>
                <br />
                <Section title="Modules treemap">
                    <ModulesChart modules={chunk.modules} title={chunk.name} />
                </Section>
                <Section title="Sizes" collapse={false}>
                    <Card bordered={false} bodyStyle={{ padding: 0 }}>
                        <SizeCardGrid title="Exclusive size" data={chunk} calcFunc={() => chunk.size} />
                        <SizeCardGrid title="% of chunk" data={chunk} calcFunc={() => '5%'} />
                    </Card>
                </Section>
                <Section title="Associated modules" badge={chunk.modules.length}>
                    <div style={{ maxHeight: 250, overflow: 'auto' }} >
                        <ModulesTable modules={chunk.modules} />
                    </div>
                </Section>
            </div>
        );
    }
}

Chunk.propTypes = {
    chunk: PropTypes.object, // eslint-disable-line
};

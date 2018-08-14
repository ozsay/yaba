/* global CarrotSearchFoamTree */

import React from 'react';
import PropTypes from 'prop-types';

import gotoTab from '../../../actions/gotoTab';
import '../../../../../vendor/carrotsearch.foamtree';

function fixTree(tree) {
    if (tree.groups.length === 0) {
        delete tree.groups;
    } else if (tree.groups.length === 1) {
        tree.label = `${tree.label}/${tree.groups[0].label}`;
        tree.module = tree.groups[0].module;
        tree.groups = tree.groups[0].groups;
        fixTree(tree);
    } else {
        tree.groups.forEach(fixTree);
    }
}

function buildTree(modules, title) {
    const obj = {
        groups: [{ label: title, weight: 0, groups: [] }],
    };

    modules.forEach((module) => {
        if (module.fullPath) {
            const splittedPath = module.fullPath.substr(1).split('/');

            let currGroup = obj.groups[0];

            splittedPath.forEach((p, i) => {
                let group = currGroup.groups.find(g => g.label === p);

                if (!group) {
                    group = { label: p, weight: 0, groups: [] };
                    currGroup.groups.push(group);
                }

                group.weight += module.size;

                if (i === splittedPath.length - 1) {
                    group.module = module;
                }

                currGroup = group;
            });
        }
    });

    fixTree(obj.groups[0]);

    return obj;
}

export default class ModulesChart extends React.Component {
    constructor(props) {
        super(props);

        this.chartRef = React.createRef();

        this.state = {};
    }

    componentDidMount() {
        const { modules, title } = this.props;

        const tree = buildTree(modules, title);

        this.treeMap = new CarrotSearchFoamTree({
            element: this.chartRef.current,
            layout: 'squarified',
            stacking: 'flattened',
            pixelRatio: window.devicePixelRatio || 1,
            maxGroupLevelsDrawn: Number.MAX_VALUE,
            maxGroupLabelLevelsDrawn: Number.MAX_VALUE,
            groupLabelVerticalPadding: 0.2,
            rolloutDuration: 0,
            pullbackDuration: 0,
            fadeDuration: 0,
            zoomMouseWheelDuration: 300,
            openCloseDuration: 200,
            titleBarDecorator(opts, props, vars) {
                vars.titleBarShown = false;
            },
            dataObject: tree,
            onGroupDoubleClick: (e) => {
                if (e.group.module) {
                    gotoTab(`/modules/${e.group.module.id}`);
                    e.preventDefault();
                }
            },
        });
    }

    render() {
        const { modules, title } = this.props;

        const data = [
            ['Location', 'Parent', 'Market trade volume (size)', 'Market increase/decrease (color)'],
            [title, null, 0, 0],
        ];

        modules.sort(v => v.size).slice(-15).forEach((module) => {
            data.push([module.name, title, module.size, -module.size]);
        });

        return (
            <div>
                <div style={{ width: '100%', height: 500 }} ref={this.chartRef} />
            </div>
        );
    }
}

ModulesChart.propTypes = {
    modules: PropTypes.array.isRequired, // eslint-disable-line
    title: PropTypes.string.isRequired, // eslint-disable-line
};

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

    obj.groups[0].groups.forEach((g) => {
        obj.groups[0].weight += g.weight;
    });

    return obj;
}

const overlayStyle = {
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px 2px',
    position: 'absolute',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 3,
};

export default class ModulesChart extends React.Component {
    constructor(props) {
        super(props);

        this.chartRef = React.createRef();

        this.state = {};
    }

    componentDidMount() {
        const { modules, title } = this.props;

        const tree = buildTree(modules, title);
        const self = this;

        const options = {
            element: this.chartRef.current,
            layout: 'squarified',
            stacking: 'flattened',
            pixelRatio: window.devicePixelRatio || 1,
            maxGroupLevelsDrawn: Number.MAX_SAFE_INTEGER,
            maxGroupLabelLevelsDrawn: Number.MAX_SAFE_INTEGER,
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
            onGroupHover(event) {
                const geometry = self.treeMap.get('geometry', event.group);

                if (!geometry) {
                    self.setState({ showOverlay: false });
                    return;
                }

                self.setState({
                    showOverlay: true,
                    coords: { x: geometry.boxLeft, y: geometry.boxTop },
                    group: event.group,
                });
            },
        };

        this.treeMap = new CarrotSearchFoamTree(options);
    }

    render() {
        const { showOverlay, coords: { x, y } = {}, group } = this.state;

        return (
            <div style={{ position: 'relative' }}>
                <div style={{ width: '100%', height: 500 }} ref={this.chartRef} />
                {
                    showOverlay && (
                        <div style={{ ...overlayStyle, top: y, left: x }}>
                            <div>
                                <strong>
                                    {group.label}
                                </strong>
                            </div>
                            <div>
                                {'Size: '}
                                {group.weight}
                            </div>

                        </div>
                    )
                }
            </div>
        );
    }
}

ModulesChart.propTypes = {
    modules: PropTypes.array.isRequired, // eslint-disable-line
    title: PropTypes.string.isRequired, // eslint-disable-line
};

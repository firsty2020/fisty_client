import React from 'react';

import {
    DefaultPortModel,
    PathFindingLinkFactory
} from '@projectstorm/react-diagrams'
import {PortModelAlignment} from '@projectstorm/react-diagrams-core';
import {AdvancedLinkModel} from './Link';

export class AdvancedPortModel extends DefaultPortModel {

    engine;
    pathFinding;

    constructor(isIn, name, label, options, engine) {

        if (!!name) {
            options = {
                in: !!options,
                name: name,
                label: label
            };
        }
        options = options;
        super({
            label: options.label || options.name,
            alignment: options.in ? PortModelAlignment.LEFT : PortModelAlignment.RIGHT,
            type: 'advanced',
            ...options,
        });
        this.engine = engine;
        this.pathFinding = this.engine.getLinkFactories().getFactory(PathFindingLinkFactory.NAME)
    }

    link(port, factory) {
        return super.link(port, factory);
    }

    createLinkModel(factory) {
        return new AdvancedLinkModel();
    }

    canLinkToPort(port) {
        return true
    }

}

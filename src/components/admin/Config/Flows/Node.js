import React from 'react';
import { DefaultNodeWidget, NodeModel, DefaultPortModel } from '@projectstorm/react-diagrams'
import {
    AbstractReactFactory,
    DeserializeEvent
} from '@projectstorm/react-canvas-core';
import {PortModelAlignment} from '@projectstorm/react-diagrams-core';


export class AdvancedNodeFactory extends AbstractReactFactory {
    constructor() {
        super('advanced');
    }

    generateReactWidget(event) {
        return <DefaultNodeWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event) {
        return new AdvancedNodeModel();
    }
}

export class AdvancedNodeModel extends NodeModel {
    portsIn;
    portsOut;

    constructor(options = {}, color) {
        if (typeof options === 'string') {
            options = {
                name: options,
                color: color
            };
        }
        super({
            type: 'advanced',
            name: 'Untitled',
            color: 'rgb(0,192,255)',
            ...options
        });
        this.portsOut = [];
        this.portsIn = [];
    }

    doClone(lookupTable, clone) {
        clone.portsIn = [];
        clone.portsOut = [];
        super.doClone(lookupTable, clone);
    }

    removePort(port) {
        super.removePort(port);
        if (port.getOptions().in) {
            this.portsIn.splice(this.portsIn.indexOf(port), 1);
        } else {
            this.portsOut.splice(this.portsOut.indexOf(port), 1);
        }
    }

    addPort(port) {
        super.addPort(port);
        if (port.getOptions().in) {
            if (this.portsIn.indexOf(port) === -1) {
                this.portsIn.push(port);
            }
        } else {
            if (this.portsOut.indexOf(port) === -1) {
                this.portsOut.push(port);
            }
        }
        return port;
    }

    addInPort(label, after = true) {
        const p = new DefaultPortModel({
            in: true,
            name: label,
            label: label,
            alignment: PortModelAlignment.LEFT
        });
        if (!after) {
            this.portsIn.splice(0, 0, p);
        }
        return this.addPort(p);
    }

    addOutPort(label, string, after = true) {
        const p = new DefaultPortModel({
            in: false,
            name: label,
            label: label,
            alignment: PortModelAlignment.RIGHT
        });
        if (!after) {
            this.portsOut.splice(0, 0, p);
        }
        return this.addPort(p);
    }

    deserialize(event) {
        super.deserialize(event);
        this.options.name = event.data.name;
        this.options.color = event.data.color;
        this.portsIn = event.data.portsInOrder.map((id) => {
            return this.getPortFromID(id);
        });
        this.portsOut = event.data.portsOutOrder.map((id) => {
            return this.getPortFromID(id);
        });
    }

    serialize() {
        return {
            ...super.serialize(),
            name: this.options.name,
            color: this.options.color,
            portsInOrder: this.portsIn.map((port) => {
                return port.getID();
            }),
            portsOutOrder: this.portsOut.map((port) => {
                return port.getID();
            })
        };
    }

    getInPorts() {
        return this.portsIn;
    }

    getOutPorts() {
        return this.portsOut;
    }

}


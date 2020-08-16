import React from 'react';
import { DefaultLinkModel, PathFindingLinkFactory } from '@projectstorm/react-diagrams'
import { Action, InputType } from '@projectstorm/react-canvas-core';
import {connect} from 'react-redux';
import {updateFlowStatus} from '../configsActions';
import {AdvancedNodeModel} from './Node';
export class AdvancedLinkModel extends DefaultLinkModel {
    constructor() {
        super({
            type: PathFindingLinkFactory.NAME,
            width: 2,
        });
    }

}

export class AdvancedLinkFactory extends PathFindingLinkFactory {
    constructor() {
        super(PathFindingLinkFactory.NAME);
    }

    generateModel() {
        return new AdvancedLinkModel();
    }
    
    generateDynamicPath(pathCoords) {
        return super.generateDynamicPath(pathCoords);
    }


}

export class CustomActions extends Action {
    constructor(options = {}) {
        super({
            type: InputType.MOUSE_UP,
            fire: (event) => {
                const element = this.engine.getMouseElement(event.event);

                if (element instanceof AdvancedLinkModel) {
                    const targetPort = element.getTargetPort();
                    if (!targetPort) element.remove();
                    return ;
                }
                if (element instanceof AdvancedNodeModel && element.isSelected()) {
                    element.fireEvent('_', 'positionChanged')
                }
            }
        });
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {
    updateFlowStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomActions);

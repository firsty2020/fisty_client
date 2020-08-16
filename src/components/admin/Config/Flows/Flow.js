import createEngine, {
    DiagramModel,
    DefaultNodeModel,
    PathFindingLinkFactory,
    DefaultPortModel,
} from '@projectstorm/react-diagrams';
import * as React from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import './Flows.css';
import { Dropdown, Row, Col, DropdownButton } from 'react-bootstrap';

import {
    flowStatusCreatedSelector,
    flowStatusesSelector, flowStatusUpdatedSelector,
    statusesState
} from '../configsReducer';
import {
    getFlowStatuses,
    getStatuses,
    addFlowStatus,
    resetFlowState, updateFlowStatus
} from '../configsActions';

import {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {extractIdFromUrl, generateRandomColor} from '../../../../helpers/utils';
import {AdvancedPortModel} from './Port';
import { AdvancedLinkFactory , CustomActions} from './Link';
import { baseURL } from '../../../../axios';
import {AdvancedNodeFactory, AdvancedNodeModel} from './Node';

const engine = createEngine({registerDefaultDeleteItemsAction: false});
// engine.getPortFactories().registerFactory(new AdvancedPortFactory())
engine.getLinkFactories().registerFactory(new AdvancedLinkFactory());
engine.getNodeFactories().registerFactory(new AdvancedNodeFactory());


const Flow =  ({
                   match,
                   flowStatusCreated,
                   flowStatuses,
                   mainStatuses,
                   getFlowStatuses,
                   getMainStatuses,
                   addFlowStatus,
                   resetFlowState,
                   updateFlowStatus,
                   flowStatusUpdated,
               }) => {

    const [isCreatingMainStatus, setIsCreatingMainStatus ] = useState(false);

    const params = { flow: match.params.flowId, show_all: true };
    const flow = `${baseURL}flow/${match.params.flowId}/`;

    useEffect(() => {
        console.log( 'ggggg')
        getFlowStatuses(params);
        getMainStatuses({show_all: true});
    }, [ getFlowStatuses, getMainStatuses]);

    useEffect(() => {
        console.log(flowStatusUpdated, 'flowStatusUpdated')
        if (flowStatusCreated || flowStatusUpdated) {
            resetFlowState();
            getFlowStatuses(params);
            // engine.repaintCanvas();
        }
    }, [flowStatusCreated, flowStatusUpdated, getFlowStatuses, resetFlowState])


    const handleAddStatus = (status) => {
        const newStatus = {
            is_default: false,
            x: 0,
            y: 0,
            flow,
            main_status: status.url,
        };
        addFlowStatus(newStatus);
    }
    
    const handleUpdateFlowStatus = (e) => {
        const {x, y} = e.entity.position;
        const flowStatus = flowStatuses.results
            .find(({main_status_details}) => main_status_details.name === e.entity.options.name);
        console.log(x, y, 'x, y')
        updateFlowStatus(extractIdFromUrl(flowStatus.url), {x, y});
    }

    if (!flowStatuses || !flowStatuses.results) return null;
    const model = new DiagramModel();

    const nodes = [];
    const ports = [];
    const links = [];

    console.log( 'рреррере')
    flowStatuses.results.map((status) => {
        const node = new AdvancedNodeModel(status.main_status_details.name, generateRandomColor());
        const portOut = new AdvancedPortModel(false, 'out', 'out', {}, engine)
        const portIn = new AdvancedPortModel(true, 'in', 'in',{}, engine)
        node.addPort(portOut);
        node.addPort(portIn);
        node.setPosition(status.x, status.y);
        nodes.push(node);
        ports.push({ portIn, portOut })
    })

    flowStatuses.results.map((status) => {
       if (!status.available_statuses || !status.available_statuses.length) {
           return null;
       }

       const portOut = ports.find((port) =>
           port.portOut.parent.options.name === status.main_status_details.name).portOut;


       status.available_statuses.map((statusUrl) => {
           const status = flowStatuses.results.find(({url}) => url === statusUrl);
           const portIn = ports
               .find(({portIn}) => portIn.parent.options.name === status.main_status_details.name).portIn;
           const link = portIn.link(portOut);
           links.push(link)
       })

    })
    //3-A) create a default node

    nodes.forEach((node) => {
        node.registerListener( {
            eventDidFire: (e) => {
                if(e[0] === '_') handleUpdateFlowStatus(e)
            }
        })
    })
    

    model.addAll(...nodes, ...links);
    

    engine.setModel(model);
    engine.getActionEventBus().registerAction(new CustomActions());


    return (
        <div>
            <Row className="flow-dropdown mb-3">
                <Col>
                    <DropdownButton  title="Выбрать статус">
                        { ((mainStatuses || {}).results || []).map((status) => {
                            return (
                                <Dropdown.Item
                                    key={status.url}
                                    onClick={() => handleAddStatus(status)}
                                >{status.name}</Dropdown.Item>
                            )
                        })}
                        <Dropdown.Divider />
                        <Dropdown.Item
                            onClick={() => setIsCreatingMainStatus(true)}>Добавить новый статус</Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
            <CanvasWidget className="diagram-container" engine={engine} />
        </div>
    );
};


const mapStateToProps = (state) => ({
    mainStatuses: statusesState()(state),
    flowStatuses: flowStatusesSelector(state),
    flowStatusCreated: flowStatusCreatedSelector(state),
    flowStatusUpdated: flowStatusUpdatedSelector(state),
});

const mapDispatchToProps = {
    getMainStatuses: getStatuses,
    getFlowStatuses,
    addFlowStatus,
    resetFlowState,
    updateFlowStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Flow);

import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import './Flows.css';
import { SteppedLineTo } from 'react-lineto';
import {
    Button,
    Col,
    Modal,
    Row,
    Dropdown,
    DropdownButton,
    Form
} from 'react-bootstrap';
import { ArrowRight, Link, XCircle, PlusCircle, Edit } from 'react-feather';
import {
    autoToggleAlert,
    copyObject, extractIdFromUrl,
    generateRandomColor,
} from '../../../../helpers/utils';
import {connect} from 'react-redux';
import {
    getFlowStatuses,
    getStatuses,
    addFlowStatus,
    deleteFlowStatus,
    updateFlowStatus,
    linkFlowStatuses,
    resetFlowState,
    createStatus,
    resetStatusState,
    getFlow,
    activateFlow,
    updateFlow,
    resetFlowsState,
} from '../configsActions';
import {
    flowStatusCreatedSelector,
    flowStatusesSelector,
    flowStatusUpdatedSelector,
    statusCreatedSelector,
    statusesState,
    flowStatusesLinkedSelector,
    flowStatusDeletedSelector,
    flowSelector,
    flowUpdatedSelector,
    apiErrorSelector,
} from '../configsReducer';
import { AlertNotice, ConfirmationModal } from '../../../ui';
import { When } from 'react-if';
import CreateStatus from '../Statuses/CreateStatus';
import AddSubStatus from './AddSubStatus';
import { isLoadingSelector } from '../../../common/commonReducer';


const generateLines = (draggables) => {
    const linesToDraw = [];
    draggables.map(({ available_statuses, main_status_details }) => {
        if (available_statuses) {
            available_statuses.map(statusUrl => {
                const to = draggables.find(({ url }) => url === statusUrl).main_status_details.name;
                let color = sessionStorage.getItem(`line ${main_status_details.name}-${to}`);
                if (!color) {
                    color = generateRandomColor();
                    sessionStorage.setItem(`line ${main_status_details.name}-${to}`, color);
                }
                linesToDraw.push({
                    from: main_status_details.name,
                    to,
                    color,
                    className: `line ${main_status_details.name}-${to}`
                });
            })
        }
    });

    generateArrows(linesToDraw);
    return linesToDraw;
};

const generateArrows = (linesToDraw) => {
    const arrows = Array.from(document.querySelectorAll('i.arrow'));
    arrows.map((arrow) => arrow.style.color = 'transparent')

    linesToDraw.map((line) => {
        const icon = arrows.find((arrow) => arrow.classList.toString().includes(line.to));
        if (icon) {
            icon.style.color = line.color;
        }
    });
};

const generateLinePlaceholders = () => {
    const lineNodes = Array.from(document.querySelectorAll('.line'));
    if (!lineNodes || !lineNodes.length) return;
    const icon = document.createElement('i');
    icon.classList.add('fa', 'fa-times-circle', 'fa-delete');
    for (let i = 2; i < lineNodes.length; i += 3) {
        if (!lineNodes[i].hasChildNodes()) {
            lineNodes[i].appendChild(icon);
        }
    }
    return null;
};


const Flow = ({
                  match,
                  mainStatuses,
                  flowStatuses,
                  linked,
                  mainStatusCreated,
                  flowStatusCreated,
                  flowStatusUpdated,
                  flowStatusDeleted,
                  getMainStatuses,
                  getFlowStatuses,
                  addFlowStatus,
                  deleteFlowStatus,
                  updateFlowStatus,
                  linkFlowStatuses,
                  resetFlowState,
                  createMainStatus,
                  resetMainStatusState,
                  getFlow,
                  flow,
                  pending,
                  activateFlow,
                  updateFlow,
                  flowUpdated,
                  resetFlowsState,
                  apiError,
              }) => {

    const [_, updateState] = useState(0);
    const [connectionToRemove, setConnectionToRemove] = useState(null);
    const [unAvailableStatuses, setUnAvailableStatuses ] = useState([]);
    const [connectionToCreate, setConnectionToCreate ] = useState(false);
    const [flowStatusIdToRemove, setFlowStatusIdToRemove ] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [isCreatingMainStatus, setIsCreatingMainStatus] = useState(false);
    const [draggables, setDraggables ] = useState([]);
    const [subStatus, setSubStatus ] = useState(null);
    const [showMainStatusesModal, setShowMainStatusesModal ] = useState(false);
    const [isFlowActive, setIsFlowActive] = useState(false);
    const containerRef = useRef(null);

    const params = { flow: match.params.flowId, show_all: true };

    useEffect(() => {
        getMainStatuses({ show_all: true });
        getFlowStatuses(params);
        getFlow(match.params.flowId);
    }, [ getFlowStatuses, getMainStatuses]);

    useEffect(() => {
        if (flowStatusCreated || linked || flowStatusUpdated || flowStatusDeleted) {
            if (flowStatusDeleted) {
                autoToggleAlert('Статус удален', setSuccessMessage);
            }
            resetFlowState();
            getFlowStatuses(params);
        }
    }, [ flowStatusCreated, getFlowStatuses, linked, flowStatusUpdated, flowStatusDeleted ]);

    useEffect(() => {
        const draggables = (flowStatuses || {}).results || []
        const draggable = document.getElementById(((draggables[0] || {}).main_status_details || {}).name);
        const draggableNodes = document.querySelectorAll('.drag-item');
        diamondShapeItems(draggableNodes);
        if (draggable) {
            attachMouseEvents();
            // just trigger state update
            setTimeout(() => {
                generateLinePlaceholders();
                updateState(1);
            });

        }
    });

    useEffect(() => {
        if ((flowStatuses || {}).results) {
            setDraggables(flowStatuses.results);
            setTimeout(() => {
                generateLinePlaceholders();
                updateState(1);
            });
        }
    });

    useEffect(() => {
        if (mainStatusCreated) {
            autoToggleAlert('Статус создан', setSuccessMessage);
            resetMainStatusState();
            getMainStatuses({ show_all: true });
        }
    }, [ mainStatusCreated, resetMainStatusState ]);

    useEffect(() => {
        if (flowStatusCreated && subStatus) {
            linkFlowStatuses({
                from_status: subStatus.from,
                to_status: flowStatusCreated.url,
                link: true,
            });
            resetFlowState();
            setSubStatus(null);
        }
    }, [flowStatusCreated, linkFlowStatuses, resetFlowState]);

    useEffect(() => {
        if (flow) {
            setIsFlowActive(flow.is_active);
        }
    }, [ flow ]);

    useEffect(() => {
        if (flowUpdated) {
            resetFlowsState();
            getFlow(match.params.flowId);
        }
    }, [flowUpdated, match.params.flowId]);

    useEffect(() => {
        if (apiError) {
            setIsFlowActive(false);
        }
    }, [apiError]);

    const diamondShapeItems = (nodes) => {
        if (!nodes || !nodes.length) return;
        nodes.forEach((node) => {
            // if (!node.style.transform.includes('rotate'))
            // node.style.transform = `${node.style.transform} rotate(45deg)`
        })
    };

    const onStop = (a, b) => {
        let dragged = flowStatuses.results
            .find(({ main_status_details }) => main_status_details.name === b.node.id);
        const { x, y } = b;
        if (dragged.x === x && dragged.y === y) return;
        dragged.x = x ;
        dragged.y = y;
        updateFlowStatus(extractIdFromUrl(dragged.url), { x, y });
    };

    const handleMouseOver = (e) => {
        const classes = e.target.classList.toString();
        document.querySelectorAll('.line')
            .forEach((line) => {
                const currentClasses = line.classList.toString();
                if (classes === currentClasses) {
                    line.style.borderTopWidth = '4px';
                }
            });
    };

    const handleMouseOut = () => {
        document.querySelectorAll('.line')
            .forEach((line) => line.style.borderTopWidth = '2px');
    };

    const handleLineClick = (e) => {
        const classList = Array.from(findParentDiv(e.target).classList)
        const a = classList.slice(classList.indexOf('line') + 1).join(' ').split('-') .join(' - ')
        setConnectionToRemove(a);
    };

    const attachMouseEvents = () => {
        setTimeout(() => {
            document.querySelectorAll('.line')
                .forEach(line => {
                    line.addEventListener('mouseover', (e) => handleMouseOver(e));
                    line.addEventListener('mouseout', (e) =>handleMouseOut(e));
                    line.addEventListener('click', handleLineClick);
                });
        });
    };

    const removeConnection = () => {
        const [ from, to ] = connectionToRemove.split('-');
        const fromDraggable = copyObject(draggables
            .find(({ main_status_details }) => main_status_details.name === from.trim()));
        const toDraggable = draggables.find(({ main_status_details }) => main_status_details.name === to.trim());
        linkFlowStatuses({
            from_status: fromDraggable.url,
            to_status: toDraggable.url,
            link: false,
        });
        updateFlow(match.params.flowId, { is_active: false });
        setConnectionToRemove(null);
    };

    const handleAddStatus = (status) => {
        const newStatus = {
            x: 0,
            y: 0,
            flow: flow.url,
            main_status: status.url,
        };
        addFlowStatus(newStatus);
        updateFlow(match.params.flowId, { is_active: false });
    };

    const findParentDiv = (el) => {
        if (el.nodeName.toLowerCase() === 'div' && (el.classList.contains('drag-item') || el.classList.contains('line')) ) {
            return el;
        }
        return findParentDiv(el.parentElement);
    };

    const handleStartConnecting = (e) => {
        e.persist();
        const statusName = (findParentDiv(e.target)).id;
        setConnectionToCreate({ from: statusName });
        const currentStatus = flowStatuses.results
            .find(({ main_status_details }) => main_status_details.name === statusName);
        const currentStatusStatuses = (currentStatus.available_statuses || []);
        const _unAvailableStatuses = currentStatusStatuses
            .map((statusUrl) => flowStatuses.results.find(({ url }) => url === statusUrl))
            .map(({ main_status_details }) => main_status_details.name);
        setUnAvailableStatuses(_unAvailableStatuses);

        document.querySelectorAll('.drag-item')
            .forEach((dragItem) => {
                if ((statusName !== dragItem.id) && !(_unAvailableStatuses.includes(dragItem.id))) {
                    dragItem.classList.add('blink')
                }
            });
    };

    const dropConnectionLine = (e) => {
        e.persist();
        if (!connectionToCreate) return;
        const targetDiv = findParentDiv(e.target);
        if (unAvailableStatuses.includes(targetDiv.id)) {
            resetConnecting();
            return alert('connection already exists');
        }
        let initiatorIndex;
        const initiatorStatus = copyObject(
            flowStatuses.results.find(({ main_status_details }, index) => {
                if (main_status_details.name === connectionToCreate.from) {
                    initiatorIndex = index;
                    return true;
                }
            })
        );

        const statusToConnect = flowStatuses.results
            .find(({ main_status_details }) => main_status_details.name === targetDiv.id);

        if (initiatorStatus.url === statusToConnect.url) {
            resetConnecting();
            return alert('Cannot connect to itself');
        }

        linkFlowStatuses({
            from_status: initiatorStatus.url,
            to_status: statusToConnect.url,
            link: true,
        });

        updateFlow(match.params.flowId, { is_active: false });
        resetConnecting();
    };

    const resetConnecting = () => {
        setUnAvailableStatuses([]);
        setConnectionToCreate(null);
        document.querySelectorAll('.drag-item')
            .forEach((item) => item.classList.remove('blink'));
    };

    const handleDeleteFlowStatus = () => {
        deleteFlowStatus(flowStatusIdToRemove);
        setFlowStatusIdToRemove(null);
        updateFlow(match.params.flowId, { is_active: false });
    };

    const handleAddSubStatus = (main_status) => {
        const newStatus = {
            is_default: false,
            x: 0,
            y: 0,
            flow: flow.url,
            main_status,
        }
        addFlowStatus(newStatus);
        updateFlow(match.params.flowId, { is_active: false });
    };

    const handleOpenStatusesModal = url => {
        setSubStatus({from: url});
        setShowMainStatusesModal(true);
    };

    const handleAddSubStatusModalClose = (reset) => {
        setShowMainStatusesModal(false);
        if (!reset) return
        setSubStatus(null);
    };

    const handleFlowActivation = () => {
        const value = !isFlowActive;
        setIsFlowActive(value);
        if (value) {
            activateFlow({
                flow: flow.url,
                activate: true,
            });
        } else {
            updateFlow(match.params.flowId, { is_active: false });
        }
    };


    return (
        <div>
            <When condition={!!showMainStatusesModal}>
                <AddSubStatus
                    onSubmit={(main_status) => handleAddSubStatus(main_status)}
                    mainStatuses={(mainStatuses || {}).results}
                    onClose={(reset) => handleAddSubStatusModalClose(reset)}/>
            </When>
            <When condition={!!isCreatingMainStatus}>
                <CreateStatus
                    createStatus={createMainStatus}
                    onToggleModal={setIsCreatingMainStatus}/>
            </When>
            <When condition={!!successMessage}>
                <AlertNotice type="success" message={successMessage}/>
            </When>
            <ConfirmationModal
                onCancel={() => setFlowStatusIdToRemove(null)}
                onConfirm={handleDeleteFlowStatus}
                question="Вы уверены, что хотите удалить этот статус из процесса?"
                show={!!flowStatusIdToRemove}/>
            <Modal
                size="sm"
                show={!!connectionToRemove}
                onHide={() => setConnectionToRemove(null)}
            >
                <Modal.Header className="d-flex justify-content-center">
                    <h5>Удалить связь</h5>
                </Modal.Header>
                <Modal.Body>
                    {connectionToRemove ? (
                        <p className="text-center">{connectionToRemove.split('-')[0]} <ArrowRight/> {connectionToRemove.split('-')[1]}</p>
                    ) : null}

                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                    <div className="text-center">
                        <Button
                            onClick={() => setConnectionToRemove(null)}
                            className="mr-2"
                            variant="outline-secondary">Закрыть
                        </Button>
                        <Button
                            onClick={removeConnection}
                            variant="danger"
                            disabled={false}
                            type="submit">Удалить
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
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
            <Row className="mb-3">
                <Col>
                    <Form.Check
                        className="warning-control-custom"
                        name="create_user"
                        checked={isFlowActive}
                        value={isFlowActive}
                        disabled={pending}
                        custom
                        onChange={handleFlowActivation}
                        type="switch"
                        id="custom-switch"
                        label="Активен"
                    />
                </Col>

            </Row>
            <div className="flow-container"
                 ref={containerRef}
                 id="flow-container"
            >
                {draggables.map(({ x, y, url, main_status_details }) => {
                    return (
                        <Draggable
                            defaultPosition={{x: x, y: y }}
                            onStop={onStop}
                            // onDrag={test}
                            // onStart={test}
                            key={main_status_details.name}
                            bounds="#flow-container"
                        >
                            <div
                                onClick={dropConnectionLine}
                                id={main_status_details.name}
                                className={`drag-item ${main_status_details.name}` }>
                                <div className="icons-container">
                                    <span title="Действия"><Edit className="icon"/></span>
                                    <span
                                        onClick={() => handleOpenStatusesModal(url)} title="Добавить">
                                        <PlusCircle className="icon add-icon"/>
                                    </span>
                                    <span
                                        onClick={handleStartConnecting}
                                        title="Соединить">
                                        <Link
                                         className="icon connect-icon"/>
                                    </span>
                                    <span
                                        onClick={() => setFlowStatusIdToRemove(extractIdFromUrl(url))}
                                        title="Удалить">
                                        <XCircle className="icon remove-icon"/>
                                    </span>
                                </div>
                                <div className="text-center text">{main_status_details.name}</div>
                                <i className={`fa fa-caret-right arrow ${main_status_details.name}`}/>
                            </div>
                        </Draggable>
                    );
                })}
                {generateLines(draggables).map(({ from, to, color, className }, index) => {
                    return (
                        <SteppedLineTo
                            fromAnchor="right bottom"
                            toAnchor="left left"
                            color={color}
                            className={className}
                            key={index}
                            from={from}
                            borderWidth={2}
                            borderColor={color}
                            to={to}
                        />
                    );
                })}
            </div>
        </div>
    );
};


const mapStateToProps = (state) => ({
    mainStatuses: statusesState()(state),
    flowStatuses: flowStatusesSelector(state),
    mainStatusCreated: statusCreatedSelector(state),
    flowStatusCreated: flowStatusCreatedSelector(state),
    flowStatusDeleted: flowStatusDeletedSelector(state),
    flowStatusUpdated: flowStatusUpdatedSelector(state),
    linked: flowStatusesLinkedSelector(state),
    flow: flowSelector(state),
    flowUpdated: flowUpdatedSelector(state),
    pending: isLoadingSelector(state),
    apiError: apiErrorSelector(state),
});

const mapDispatchToProps = {
    getFlowStatuses,
    getMainStatuses: getStatuses,
    addFlowStatus,
    updateFlowStatus,
    linkFlowStatuses,
    resetFlowState,
    resetFlowsState,
    deleteFlowStatus,
    createMainStatus: createStatus,
    resetMainStatusState: resetStatusState,
    getFlow,
    activateFlow,
    updateFlow,
};

export default connect(mapStateToProps, mapDispatchToProps)(Flow);

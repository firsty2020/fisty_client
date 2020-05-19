import React, { useEffect, useState } from 'react';
import {Container, Table} from 'react-bootstrap';
import {AlertNotice, ConfirmationModal, CreateButton, DropDown} from '../../ui';
import { When } from 'react-if';
import CreateLead from './CreateLead';
import {
    leadCreatedSelector,
    leadDeletedSelector,
    leadsSelector, leadUpdatedSelector
} from '../adminReducer';
import {
    createLead,
    deleteLead,
    getLeads,
    resetLeadState,
    updateLead
} from '../adminActions';
import { connect } from 'react-redux';
import {
    autoToggleAlert, copyObject,
    extractIdFromUrl,
    generateSelectOptions
} from '../../../helpers/utils';
import {Check, Edit, Trash} from 'react-feather';
import Pagination from '../../Pagination';
import UpdateLead from './UpdateLead';
import { push } from 'connected-react-router';
import { getStatuses } from '../Config/configsActions';
import {statusesState} from '../Config/configsReducer';


const Leads = ({
                   leads,
                   statuses,
                   created,
                   deleted,
                   updated,
                   getLeads,
                   getStatuses,
                   deleteLead,
                   updateLead,
                   resetLeadState,
               }) => {

    const [ isCreating, setIsCreating ] = useState(false);
    const [ leadIdToDelete, setLeadIdToDelete ] = useState(null);
    const [ leadToUpdate, setLeadToUpdate ] = useState(null);
    const [ successMessage, setSuccessMessage ] = useState('');
    const [ activeStatuses, setActiveStatuses ] = useState({});

    useEffect(() => {
        getLeads();
        getStatuses();
    }, [ getLeads, getStatuses ]);

    useEffect(() => {
        if (created || deleted || updated) {
            getLeads();
            resetLeadState();
            setIsCreating(false);
            setLeadIdToDelete(null);
            setLeadToUpdate(null);
            const action = created ? 'создали' : updated ? 'обновили' : 'удалили';
            autoToggleAlert(`Вы успешно ${action} лида`, setSuccessMessage);
        }
    }, [ setIsCreating, created, deleted, updated, resetLeadState ]);

    useEffect(() => {
        let selectedStatuses = {};
        if (statuses && leads) {
            selectedStatuses = leads.results.reduce((acc, curr) => {
                acc[curr.url] = { value: curr.status, label: findStatus(curr.status).name };
                return acc;
            }, {})
        }
        setActiveStatuses(selectedStatuses);
    }, [ statuses, leads ]);

    const handleDeleteLead = () => {
        deleteLead(leadIdToDelete);
        setLeadIdToDelete(null);
    };

    const handleStatusChange = (lead, { value }) => {
        const status = findStatus(value);
        const newState = { ...activeStatuses, [lead.url]:  {value, label: status.name}, };
        setActiveStatuses(newState);
        updateLead(extractIdFromUrl(lead.url), { status: value });
    };

    const findStatus = statusUrl => statuses.results.find(status => status.url === statusUrl);

    return (
        <div>
            <When condition={!!leadIdToDelete}>
                <ConfirmationModal
                    onConfirm={handleDeleteLead}
                    show={!!leadIdToDelete}
                    question="Вы уверены, что хотите удалить этого лида?"
                    onCancel={() => setLeadIdToDelete(null)}/></When>
            <When condition={!!successMessage}>
                <AlertNotice type="success" message={successMessage}/></When>
            <When condition={!!isCreating}>
                <CreateLead
                    onToggleModal={setIsCreating}/></When>
            <When condition={!!leadToUpdate}>
                <UpdateLead
                    lead={leadToUpdate}
                    onToggleModal={setLeadToUpdate}/></When>
            <Container className="mt-10-auto">
                <div className="mb-3">
                    <div className="row">
                        <div className="col">
                            <CreateButton onClick={setIsCreating}/>
                        </div>
                    </div>
                </div>
                <Table hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Фамилия</th>
                        <th>Телефон</th>
                        <th>Канал</th>
                        <th width="20%">Статус</th>
                        <th width="1%">Активен</th>
                        <th width="5%">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {((leads || {}).results || []).map((lead) => {
                        return (
                            <tr key={lead.url}
                                className="cursor-pointer"
                            >
                                <td>{extractIdFromUrl(lead.url)}</td>
                                <td>{lead.first_name}</td>
                                <td>{lead.last_name}</td>
                                <td>{lead.phone_number}</td>
                                <td>{lead.channel}</td>
                                <td>
                                    {statuses && statuses.results ? (
                                        <DropDown
                                            className="select-status"
                                            name="filter"
                                            value={activeStatuses[lead.url]}
                                            options={generateSelectOptions((statuses || {}).results, 'url', 'name')}
                                            // placeholder={lead.status_name}
                                            onChange={(e) => handleStatusChange(copyObject(lead), e)}
                                        />
                                        ): null
                                    }
                                </td>
                                <td>{lead.is_active ? <Check/> : null}</td>
                                <td>
                                    <div className="d-flex justify-content-around">
                                        <Trash
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // setBranchIdToRemove(branch.id)
                                            }}
                                            className="cursor-pointer"
                                            color="red"/>
                                        <Edit
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setLeadToUpdate(lead);
                                            }}
                                            className="cursor-pointer"
                                            color="blue"
                                        />
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>


                <Pagination
                    action={getLeads}
                    data={leads} />
            </Container>
        </div>
    );
};



const mapStateToProps = (state) => ({
    created: leadCreatedSelector(state),
    leads: leadsSelector(state),
    statuses: statusesState()(state),
    deleted: leadDeletedSelector(state),
    updated: leadUpdatedSelector(state),
});


const mapDispatchToProps = {
    createLead,
    getLeads,
    getStatuses,
    deleteLead,
    updateLead,
    resetLeadState,
    push,
};

export default connect(mapStateToProps, mapDispatchToProps)(Leads);

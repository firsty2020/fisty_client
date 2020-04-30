import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import {AlertNotice, ConfirmationModal, CreateButton, TableList} from '../../ui';
import { When } from 'react-if';
import CreateLead from './CreateLead';
import {
    leadCreatedSelector,
    leadDeletedSelector,
    leadsSelector, leadUpdatedSelector
} from '../adminReducer';
import {createLead, deleteLead, getLeads, resetLeadState} from '../adminActions';
import { connect } from 'react-redux';
import { autoToggleAlert, extractIdFromUrl } from '../../../helpers/utils';
import { Check } from 'react-feather';
import Pagination from '../../Pagination';
import UpdateLead from './UpdateLead';


const leadsTableLayout = {
    headings: [
        'ID', 'Имя', 'Фамилия', 'Телефон', 'Канал', 'Статус', 'Активен', 'Действия',
    ],
    createRow: ({ url, first_name, last_name, phone_number, channel, status_name, is_active }) => [
        extractIdFromUrl(url), first_name, last_name, phone_number, channel, status_name,
        is_active ? <Check/> : null,
    ],
};

const Leads = ({
                   leads,
                   created,
                   deleted,
                   updated,
                   getLeads,
                   deleteLead,
                   resetLeadState,
               }) => {

    const [ isCreating, setIsCreating ] = useState(false);
    const [ leadIdToDelete, setLeadIdToDelete ] = useState(null);
    const [ leadToUpdate, setLeadToUpdate ] = useState(null);
    const [ successMessage, setSuccessMessage ] = useState('');


    useEffect(() => {
        getLeads();
    }, [ getLeads ]);

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

    const handleDeleteLead = () => {
        deleteLead(leadIdToDelete);
        setLeadIdToDelete(null);
    };
    
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
                <TableList
                    onEditItem={(item) => setLeadToUpdate(item)}
                    onDeleteItem={({ url }) => setLeadIdToDelete(extractIdFromUrl(url))}
                    data={(leads || {}).results}
                    layout={leadsTableLayout} />
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
    deleted: leadDeletedSelector(state),
    updated: leadUpdatedSelector(state),
});


const mapDispatchToProps = {
    createLead,
    getLeads,
    deleteLead,
    resetLeadState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Leads);

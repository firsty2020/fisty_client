import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import {AlertNotice, ConfirmationModal, CreateButton, TableList} from '../ui';
import { When } from 'react-if';
import CreateLead from './CreateLead';
import {
    leadCreatedSelector,
    leadDeletedSelector,
    leadsSelector
} from './adminReducer';
import {createLead, deleteLead, getLeads, resetLeadState} from './adminActions';
import { connect } from 'react-redux';
import { autoToggleAlert, extractIdFromUrl } from '../../helpers/utils';
import { Check } from 'react-feather';
import Pagination from '../Pagination';


const leadsTableLayout = {
    headings: [
        'ID', 'Имя', 'Фамилия', 'Телефон', 'Канал', 'Активен', 'Действия',
    ],
    createRow: ({ url, first_name, last_name, phone_number, channel, is_active }) => [
        extractIdFromUrl(url), first_name, last_name, phone_number, channel,
        is_active ? <Check/> : null,
    ],
};

const Leads = ({
                   leads,
                   created,
                   deleted,
                   getLeads,
                   deleteLead,
                   resetLeadState,
               }) => {

    const [ isCreating, setIsCreating ] = useState(false);
    const [ leadIdToDelete, setLeadIdToDelete ] = useState(null);
    const [ successMessage, setSuccessMessage ] = useState('');


    useEffect(() => {
        getLeads();
    }, [ getLeads ]);

    useEffect(() => {
        if (created || deleted) {
            getLeads();
            resetLeadState();
            setIsCreating(false);
            setLeadIdToDelete(null);
            const action = created ? 'создали' : 'удалили';
            autoToggleAlert(`Вы успешно ${action} лида`, setSuccessMessage);
        }
    }, [ setIsCreating, created, deleted, resetLeadState ]);

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
            <Container className="mt-10-auto">
                <div className="mb-3">
                    <div className="row">
                        <div className="col">
                            <CreateButton onClick={setIsCreating}/>
                        </div>
                    </div>
                </div>
                <TableList
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
});


const mapDispatchToProps = {
    createLead,
    getLeads,
    deleteLead,
    resetLeadState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Leads);

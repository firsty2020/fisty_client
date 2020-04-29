import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { AlertNotice, CreateButton, TableList } from '../ui';
import { When } from 'react-if';
import CreateLead from './CreateLead';
import { leadCreatedSelector, leadsSelector } from './adminReducer';
import { createLead, getLeads, resetLeadState } from './adminActions';
import { connect } from 'react-redux';
import { autoToggleAlert, extractIdFromUrl } from '../../helpers/utils';
import { Check } from 'react-feather';
import Pagination from '../Pagination';


const leadsTableLayout = {
    headings: [
        'ID', 'Имя', 'Фамилия', 'Телефон', 'Канал', 'Активен'
    ],
    createRow: ({ url, first_name, last_name, phone_number, channel, is_active }) => [
        extractIdFromUrl(url), first_name, last_name, phone_number, channel,
        is_active ? <Check/> : null,
    ],
};

const Leads = ({ leads, created, getLeads, resetLeadState }) => {

    const [ isCreating, setIsCreating ] = useState(false);
    const [ successMessage, setSuccessMessage ] = useState('');


    useEffect(() => {
        getLeads();
    }, [ getLeads ]);

    useEffect(() => {
        if (created) {
            getLeads();
            resetLeadState();
            setIsCreating(false);
            autoToggleAlert('Вы успешно создали лида', setSuccessMessage);
        }
    }, [ setIsCreating, created, resetLeadState ]);

    return (
        <div>
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
                    data={(leads || {}).results}
                    layout={leadsTableLayout}
                />
                <Pagination
                    action={getLeads}
                    data={leads}
                />
            </Container>
        </div>
    );
};



const mapStateToProps = (state) => ({
    created: leadCreatedSelector(state),
    leads: leadsSelector(state),
});


const mapDispatchToProps = {
    createLead,
    getLeads,
    resetLeadState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Leads);

import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
    contactPersonCreatedSelector,
    createContactPersonPendingSelector,
    contactPersonRolesSelector,
} from '../../adminReducer';
import { createContactPerson } from './contactPersonApi';
import { AlertNotice } from '../../../ui';
import { When } from 'react-if';
import ContactPerson from './ContactPerson';
import { baseURL } from '../../../../axios';


const CreateContactPerson = ({
                                 pending,
                                 created,
                                 history,
                                 match,
                                 createContactPerson,
                             }) => {

    useEffect(() => {
        if (created) {
            setTimeout(
                () =>
                    history.push(`/admin/companies/${match.params.companyId}/contact-persons`),
                3000
            );
        }
    }, [ created, history, match ]);

    const handleCreateContactPerson = (values) => {
        const contactPerson = {...values};
        contactPerson.date_of_birth =
            `${values.date_of_birth.year}-${values.date_of_birth.month}-${values.date_of_birth.day}`;
        contactPerson.company = `${baseURL}companies/${match.params.companyId}/`;
        createContactPerson(contactPerson);
    };

    return (
        <div>
            <Container className="mt-10-auto">
                <When condition={!!created}>
                    <AlertNotice
                        type="success"
                        message="Вы успешно создали контактное лицо"
                    />
                </When>
                <ContactPerson
                    onSubmit={(values) => handleCreateContactPerson(values)}
                    pending={pending} />
            </Container>
        </div>
    );
};


const mapStateToProps = state => ({
    roles: contactPersonRolesSelector(state),
    created: contactPersonCreatedSelector(state),
    pending: createContactPersonPendingSelector(state),
});

const mapDispatchToProps = {
    createContactPerson,
};


CreateContactPerson.propTypes = {};


export default connect(mapStateToProps, mapDispatchToProps)(CreateContactPerson);

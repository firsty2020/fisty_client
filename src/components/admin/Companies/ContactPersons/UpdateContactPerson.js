import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { AlertNotice } from '../../../ui';
import { When } from 'react-if';
import ContactPerson from './ContactPersonForm';
import { getContactPerson, updateContactPerson } from './contactPersonApi';
import {
    contactPersonSelector,
    updateContactPersonResolvedSelector
} from '../../adminReducer';


const UpdateContactPerson = ({
                                 pending,
                                 created,
                                 history,
                                 match,
                                 updated,
                                 contactPerson,
                                 getContactPerson,
                                 updateContactPerson,
                             }) => {

    useEffect(() => {
        const { contactPersonId } = match.params;
        getContactPerson(contactPersonId);
    }, [ match, getContactPerson ]);

    useEffect(() => {
        if (updated) {
            setTimeout(
                () =>
                    history.push(`/admin/companies/${match.params.companyId}/contact-persons`),
                3000
            );
        }
    }, [ updated, history, match ]);

    const handleUpdateContactPerson = (values) => {
        const __contactPerson = { ...contactPerson, ...values };
        __contactPerson.date_of_birth =
            `${values.date_of_birth.year}-${values.date_of_birth.month}-${values.date_of_birth.day}`;
        updateContactPerson(__contactPerson);
    };

    return (
        <div>
            <Container className="mt-10-auto">
                <When condition={!!updated}>
                    <AlertNotice
                        type="success"
                        message="Вы успешно обновили контактное лицо"
                    />
                </When>
                <ContactPerson
                    onSubmit={(values) => handleUpdateContactPerson(values)}
                    contactPerson={contactPerson}
                    isUpdating
                    pending={pending} />
            </Container>
        </div>
    );
};


const mapStateToProps = state => ({
    contactPerson: contactPersonSelector(state),
    updated: updateContactPersonResolvedSelector(state),
});

const mapDispatchToProps = {
    getContactPerson,
    updateContactPerson,
};


UpdateContactPerson.propTypes = {};


export default connect(mapStateToProps, mapDispatchToProps)(UpdateContactPerson);

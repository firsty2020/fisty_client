import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { AlertNotice } from '../../../ui';
import { When } from 'react-if';
import ContactPersonForm from './ContactPersonForm';
import {
    getContactPerson,
    resetContactPersonUpdated,
    updateContactPerson
} from './contactPersonActions';
import {
    contactPersonSelector,
    updateContactPersonResolvedSelector
} from '../../adminReducer';
import { push } from 'connected-react-router';


const UpdateContactPerson = ({
                                 pending,
                                 history,
                                 match,
                                 updated,
                                 contactPerson,
                                 successPath,
                                 getContactPerson,
                                 updateContactPerson,
                                 resetContactPersonUpdated,
                                 push,
                             }) => {

    useEffect(() => {
        const { contactPersonId } = match.params;
        getContactPerson(contactPersonId);
    }, [ match.params.contactPersonId, getContactPerson ]);

    useEffect(() => {
        if (updated) {
            setTimeout(
                () => {
                    push(successPath);
                    resetContactPersonUpdated();
                },
                3000
            );
        }
    }, [ updated, history, successPath, push ]);

    const handleUpdateContactPerson = (values) => {
        const __contactPerson = { ...contactPerson, ...values };
        __contactPerson.gender = __contactPerson.gender.value;
        __contactPerson.role = __contactPerson.role.value;
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
                <ContactPersonForm
                    match={match}
                    cancelPath={successPath}
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
    resetContactPersonUpdated,
    push,
};


UpdateContactPerson.propTypes = {};


export default connect(mapStateToProps, mapDispatchToProps)(UpdateContactPerson);

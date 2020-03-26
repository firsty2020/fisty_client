import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
    contactPersonCreatedSelector,
    createContactPersonPendingSelector,
} from '../../adminReducer';
import { contactPersonRolesSelector } from '../../Configs/configsReducer';
import { createContactPerson } from './contactPersonApi';
import { AlertNotice } from '../../../ui';
import { When } from 'react-if';
import ContactPersonForm from './ContactPersonForm';
import { push } from 'connected-react-router';


const CreateContactPerson = ({
                                 pending,
                                 created,
                                 match,
                                 successPath,
                                 entity,
                                 push,
                                 createContactPerson,
                             }) => {


    useEffect(() => {
        if (created) {
            setTimeout(
                () =>
                    push(successPath),
                3000
            );
        }
    }, [ created, push, successPath ]);

    const handleCreateContactPerson = (values) => {
        const contactPerson = {...values};
        contactPerson[entity.name] = entity.url;
        contactPerson.gender = contactPerson.gender.value;
        contactPerson.role = contactPerson.role.value;
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
                <ContactPersonForm
                    cancelPath={successPath}
                    match={match}
                    contact-person={null}
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
    push,
};


CreateContactPerson.propTypes = {};


export default connect(mapStateToProps, mapDispatchToProps)(CreateContactPerson);

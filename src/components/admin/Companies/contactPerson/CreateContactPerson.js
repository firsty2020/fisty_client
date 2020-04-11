import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
    contactPersonCreatedSelector,
    isLoadingSelector
} from '../../adminReducer';
import { contactPersonRolesSelector } from '../../Configs/configsReducer';
import {
    createContactPerson,
    resetContactPersonCreated
} from './contactPersonActions';
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
                                 resetContactPersonCreated,
                             }) => {

    useEffect(() => {
        if (created) {
            setTimeout(
                () => {
                    push(successPath);
                    resetContactPersonCreated();
                },
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
    pending: isLoadingSelector(state),
});

const mapDispatchToProps = {
    createContactPerson,
    resetContactPersonCreated,
    push,
};


CreateContactPerson.propTypes = {};


export default connect(mapStateToProps, mapDispatchToProps)(CreateContactPerson);

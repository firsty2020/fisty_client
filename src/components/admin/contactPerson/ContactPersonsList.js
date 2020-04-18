import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { removeContactPerson } from './contactPersonActions';
import { ConfirmationModal, TableList } from '../../ui';
import { push } from 'connected-react-router';


const contactPersonTableLayout = {
    headings: [
        'Имя', 'Фамилия', 'Эл. Почта', 'Телефон', 'Действия',
    ],
    createRow: ({first_name, last_name, email, phone_number}) => [
        first_name, last_name, email, phone_number,
    ],
};


const ContactPersonsList = ({
                                match,
                                contactPersons,
                                children,
                                removeContactPerson,
                                onUnlinkContactPerson,
                                push,
                            }) => {

    const [contactPersonToRemove, setContactPersonToRemove] = useState(null);

    const handleRemoveContactPerson = () => {
        removeContactPerson(contactPersonToRemove);
        setContactPersonToRemove(null);
    };

    const shouldShowUnlinkButton = () => {
        if (onUnlinkContactPerson) {
            return (contactPerson) => onUnlinkContactPerson(contactPerson);
        }
        return null;
    };

    return (
        <div>
            <ConfirmationModal
                show={!!contactPersonToRemove}
                onConfirm={handleRemoveContactPerson}
                onCancel={() => setContactPersonToRemove(null)}
                question="Вы уверены что хотите удалить это контактное лицо?"
            />
            <Container className="mt-10-auto" fluid>
                <div>
                    {children}
                </div>
                <TableList
                    onDeleteItem={({id}) => setContactPersonToRemove(id)}
                    onEditItem={({id}) => push(`${match.url}/edit/${id}`)}
                    onUnlink={shouldShowUnlinkButton()}
                    layout={contactPersonTableLayout}
                    data={contactPersons}
                />
            </Container>
        </div>
    );
};


const mapDispatchToProps = {
    removeContactPerson,
    push,
};


export default connect(null, mapDispatchToProps)(ContactPersonsList);

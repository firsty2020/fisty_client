import React, { useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Edit, Trash } from 'react-feather';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeContactPerson } from './contactPersonApi';
import { ConfirmationModal } from '../../../ui';
import { UserMinus } from 'react-feather';

const ContactPersonsList = ({
                                match,
                                contactPersons,
                                children,
                                removeContactPerson,
                                onUnlinkContactPerson,
                            }) => {

    const [ contactPersonToRemove, setContactPersonToRemove ] = useState(null);

    const handleRemoveContactPerson = () => {
        removeContactPerson(contactPersonToRemove);
        setContactPersonToRemove(null);
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
                <Table>
                    <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Фамилия</th>
                        <th>Эл. Почта</th>
                        <th>Телефон</th>
                        <th width="5%">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {((contactPersons && contactPersons.length) ? contactPersons : []).map((contactPerson) => {
                        return (
                            <tr key={contactPerson.id}>
                                <td>{contactPerson.first_name}</td>
                                <td>{contactPerson.last_name}</td>
                                <td>{contactPerson.email}</td>
                                <td>{contactPerson.phone_number}</td>
                                <td>
                                    <div className="d-flex justify-content-around align-items-end">
                                        { onUnlinkContactPerson ? (<div
                                            onClick={() => onUnlinkContactPerson(contactPerson)}
                                            title="Удалить из контакных лиц"
                                            className="cursor-pointer">
                                            <UserMinus/>
                                        </div>) : null }
                                        <div
                                            title="Удалить"
                                            onClick={() => setContactPersonToRemove(contactPerson.id)}
                                            className="cursor-pointer">
                                            <Trash color="red"/>
                                        </div>

                                        <Link to={`${match.url}/edit/${contactPerson.id}`}>
                                            <div
                                                title="Редактировать"
                                                className="cursor-pointer">
                                                <Edit color="blue"
                                                />
                                            </div>

                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};


const mapDispatchToProps = {
    removeContactPerson,
};


export default connect(null, mapDispatchToProps)(ContactPersonsList);

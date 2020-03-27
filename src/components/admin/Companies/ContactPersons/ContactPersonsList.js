import React, { useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Edit, Trash } from 'react-feather';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeContactPerson } from './contactPersonApi';
import { ConfirmationModal } from '../../../ui';


const ContactPersonsList = ({
                                match,
                                contactPersons,
                                children,
                                removeContactPerson,
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
                    {(contactPersons|| []).map((contactPerson) => {
                        return (
                            <tr key={contactPerson.id}>
                                <td>{contactPerson.first_name}</td>
                                <td>{contactPerson.last_name}</td>
                                <td>{contactPerson.email}</td>
                                <td>{contactPerson.phone_number}</td>
                                <td>
                                    <div className="d-flex justify-content-around">
                                        <Trash
                                            onClick={() => setContactPersonToRemove(contactPerson.id)}
                                            className="cursor-pointer"
                                            color="red"/>
                                        <Link to={`${match.url}/edit/${contactPerson.id}`}>
                                            <Edit
                                                className="cursor-pointer"
                                                color="blue"
                                            />
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

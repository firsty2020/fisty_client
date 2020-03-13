import React, {useEffect, useState} from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Edit, PlusCircle, Trash } from 'react-feather';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getContactPersons, removeContactPerson } from './contactPersonApi';
import {
    contactPersonsSelector,
    removeContactPersonResolvedSelector
} from '../../adminReducer';
import { ConfirmationModal } from '../../../ui';


const ContactPersons = ({
                            match,
                            contactPersons,
                            contactPersonRemoved,
                            getContactPersons,
                            removeContactPerson,
                        }) => {

    const [ contactPersonToRemove, setContactPersonToRemove ] = useState(null);

    const params = { company: match.params.companyId };

    useEffect(() => {
        getContactPersons(params);
    }, [ getContactPersons ]);

    useEffect(() => {
        if (contactPersonRemoved) {
            getContactPersons(params);
        }
    }, [ getContactPersons, contactPersonRemoved ]);

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
                <div className="mb-3">
                    <Link to={`${match.url}/create`}>
                        <Button
                            variant="primary">
                            <PlusCircle
                                size={20}
                                className="align-sub"
                            /> Создать
                        </Button>
                    </Link>
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
                                        <Link to={`${match.url}/${contactPerson.id}`}>
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

const mapStateToProps = state => ({
    contactPersons: contactPersonsSelector(state),
    contactPersonRemoved: removeContactPersonResolvedSelector(state),
});

const mapDispatchToProps = {
    getContactPersons,
    removeContactPerson,
};



export default connect(mapStateToProps, mapDispatchToProps)(ContactPersons);

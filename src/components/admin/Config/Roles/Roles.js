import React, { useEffect, useState } from 'react';
import { Edit, PlusCircle, Trash } from 'react-feather';
import { Button, Container, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getContactPersonRoles, removeContactPersonRole } from './rolesApi';
import {
    contactPersonRoleRemovedSelector,
    contactPersonRolesSelector
} from '../configsReducer';
import { ConfirmationModal } from '../../../ui/';
import { When } from 'react-if';
import CreateRole from './CreateRole';
import UpdateRole from './UpdateRole';
import { Check } from 'react-feather';
import Pagination from '../../../Pagination';


const Roles = ({
                   contactPersonRoles,
                   contactPersonRoleRemoved,
                   getContactPersonRoles,
                   removeContactPersonRole,
               }) => {

    const [ isCreatingRole, setIsCreatingRole ] = useState(false);
    const [ roleToDelete, setRoleToDelete ] = useState(null);
    const [ roleToUpdate, setRoleToUpdate ] = useState(null);

    useEffect(() => {
        getContactPersonRoles();
    }, [ getContactPersonRoles ]);

    useEffect(() => {
        if (contactPersonRoleRemoved)
            getContactPersonRoles();
    }, [ getContactPersonRoles, contactPersonRoleRemoved ]);

    const handleCreateRoleModalClose = (isRoleCreatedOrUpdated) => {
        setIsCreatingRole(false);
        if (isRoleCreatedOrUpdated) {
            getContactPersonRoles();
        }
    };

    const handleUpdateRoleModalClose = (isRoleUpdated) => {
        setRoleToUpdate(null);
        if (isRoleUpdated) {
            getContactPersonRoles();
        }
    };

    const handleDeleteRole = () => {
        removeContactPersonRole(roleToDelete);
        setRoleToDelete(null);
    };

    return (
        <div>
            <When condition={isCreatingRole}>
                <CreateRole
                    onClose={(isRoleCreated) => handleCreateRoleModalClose(isRoleCreated)}
                />
            </When>
            <When condition={!!roleToUpdate}>
                <UpdateRole
                    role={roleToUpdate}
                    onClose={(isRoleUpdated) => handleUpdateRoleModalClose(isRoleUpdated)}
                />
            </When>
            <ConfirmationModal
                show={!!roleToDelete}
                onConfirm={handleDeleteRole}
                onCancel={() => setRoleToDelete(null)}
                question="Вы уверены что хотите удалить эту роль?"
            />
            <Container className="mt-10-auto">
                <h3 className="text-center mb-4">Контактные Лица</h3>
                <div className="mb-3">
                    <Button
                        onClick={() => setIsCreatingRole(true)}
                        variant="warning">
                        <PlusCircle
                            size={20}
                            className="align-sub"
                        /> Создать
                    </Button>
                </div>
                <Table>
                    <thead>
                    <tr>
                        <th>Наименование</th>
                        <th width="20%">Создать Пользователя</th>
                        <th width="5%">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {((contactPersonRoles || {}).results || []).map((role) => {
                        return (
                            <tr key={role.id}>
                                <td>{role.name}</td>
                                <td>
                                    {role.create_user ? <Check/> : null}
                                </td>
                                <td>
                                    <div className="d-flex justify-content-around">
                                        <Trash
                                            onClick={() => setRoleToDelete(role.id)}
                                            className="cursor-pointer"
                                            color="red"/>
                                        <Edit
                                            onClick={() => setRoleToUpdate(role)}
                                            className="cursor-pointer"
                                            color="blue"
                                        />
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
                <Pagination
                    action={getContactPersonRoles}
                    data={contactPersonRoles}
                />
            </Container>
        </div>
    );
};

const mapStateToProps = state => ({
    contactPersonRoles: contactPersonRolesSelector(state),
    contactPersonRoleRemoved: contactPersonRoleRemovedSelector(state),
});

const mapDispatchToProps = {
    getContactPersonRoles,
    removeContactPersonRole,
};


export default connect(mapStateToProps, mapDispatchToProps)(Roles);

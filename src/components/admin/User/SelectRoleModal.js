import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import { DropDown } from '../../ui';
import { Link } from 'react-router-dom';

const roleOptions = [
    { value: 'recruiter', label: 'Рекрутер'},
    // { value: 'project-manager', label: 'Менеджер проекта'},
];

const SelectRoleModal = ({ onClose }) => {

    const [ role, setRole ] = useState('');

    return (
        <div>
            <Modal
                onHide={onClose}
                centered
                show
            >
                <Modal.Body>
                    <p className="form-control-label text-center">Выберите роль</p>
                    <DropDown
                        name="location"
                        placeholder="Выберите из списка"
                        onChange={e => console.log(e, 'e') || setRole(e)}
                        value={role}
                        options={roleOptions}
                    />
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button
                        onClick={onClose}
                        variant="secondary" >Отменить
                    </Button>
                    <Link to={`/admin/users/create/${role.value}`}>
                        <Button
                            disabled={!role}
                            variant="warning"
                        >Далее</Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default SelectRoleModal;

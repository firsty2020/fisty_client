import React, {useState} from 'react';
import { DropDown } from '../ui';
import {extractIdFromUrl, generateSelectOptions} from '../../helpers/utils';
import { Button, Modal } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { getUserFromToken } from '../auth/auth';


const SelectProjectModal = ({ projects, toggleModal }) => {

    const [ project, setProject ] = useState(null);

    const role = (getUserFromToken() || {}).role;


    return (
        <Modal
            centered
            show
        >
            <Modal.Body>
                <p className="form-control-label text-center">Выберите проект</p>
                <DropDown
                    name="location"
                    placeholder="Введите проект"
                    value={project}
                    onChange={(e) => setProject(e)}
                    options={generateSelectOptions(projects, 'url', 'name')}
                />
                {/*{touched.location && errors.location ? (
                    <span className="mt-1 invalid-feedback-visible">{errors.location}</span>
                ) : null}*/}
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
            <Button
                onClick={() => toggleModal(false)}
                variant="secondary" >Отменить
            </Button>
            <Link to={`/${role}/projects/${extractIdFromUrl((project || {}).value)}/create-candidate`}>
                <Button
                    disabled={!project}
                    variant="warning"
                >Далее</Button>
            </Link>
        </Modal.Footer>
        </Modal>
    );
}


export default SelectProjectModal;

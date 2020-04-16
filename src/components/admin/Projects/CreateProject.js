import React from 'react';
import { Modal } from 'react-bootstrap';
import ProjectForm from './ProjectForm';


const CreateProject = ({ match }) => {
    return (
        <div>
            <Modal
                show={true}
                size="lg"
                centered
            >
                <Modal.Header>
                    <Modal.Title className="w-100">Создать проект</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProjectForm match={match} />
                </Modal.Body>
            </Modal>
        </div>
    )
};


export default CreateProject;

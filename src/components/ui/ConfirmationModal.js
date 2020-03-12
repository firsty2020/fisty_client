import React from 'react';
import {Button, Modal} from 'react-bootstrap';


const ConfirmationModal = ({ show, question, onConfirm, onCancel}) => (
    <div className="text-center m-a-xl">
        <Modal
            show={show}
            centered>
            <Modal.Body>
                <p className="text-center mt-1">{question}</p>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button variant="secondary" onClick={onCancel}>Нет</Button>
                <Button variant="danger" onClick={onConfirm}>Да</Button>
            </Modal.Footer>
        </Modal>
    </div>
);

export default ConfirmationModal;

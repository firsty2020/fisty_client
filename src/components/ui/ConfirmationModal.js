import React from 'react';
import { Button, Modal } from 'react-bootstrap';


const ConfirmationModal = ({
                               show,
                               confirm = 'Да',
                               decline = 'Нет',
                               question,
                               buttonType = 'danger',
                               onConfirm,
                               onCancel,
                           }) => (
    <Modal
        show={show}
        centered>
        <Modal.Body>
            <p className="text-center mt-1">{question}</p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
            <Button
                variant="secondary"
                onClick={onCancel}
            >{decline}</Button>
            <Button
                variant={buttonType}
                onClick={onConfirm}
            >{confirm}</Button>
        </Modal.Footer>
    </Modal>
);

export default ConfirmationModal;

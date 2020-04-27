import React from 'react';
import StatusFormModal from './StatusFormModal';
import { connect } from 'react-redux';
import { createStatus } from '../configsActions';

const CreateStatus = ({ createStatus, onToggleModal }) => {

    const handleCreateStatus = (values) => {
        createStatus(values);
        onToggleModal(false);
    };

    return (
        <StatusFormModal
            onSubmit={(values) => handleCreateStatus(values)}
            onToggleModal={onToggleModal}
        />
    );
};


const mapDispatchToProps = {
    createStatus,
};



export default connect(null, mapDispatchToProps)(CreateStatus);

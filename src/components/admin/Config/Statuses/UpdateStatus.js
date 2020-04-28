import React from 'react';
import StatusFormModal from './StatusFormModal';
import { connect } from 'react-redux';
import { updateStatus } from '../configsActions';
import {copyObject, extractIdFromUrl} from '../../../../helpers/utils';

const UpdateStatus = ({ updateStatus, status, onToggleModal }) => {

    const handleCreateStatus = (values) => {
        updateStatus(extractIdFromUrl(status.url), { ...status, ...values});
        onToggleModal(null);
    };

    return (
        <StatusFormModal
            status={status}
            onSubmit={(values) => handleCreateStatus(values)}
            onToggleModal={onToggleModal}
        />
    );
};


const mapDispatchToProps = { updateStatus };



export default connect(null, mapDispatchToProps)(UpdateStatus);

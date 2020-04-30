import React  from 'react';
import LeadFormModal from './LeadFormModal';
import { connect } from 'react-redux';
import { createLead } from '../adminActions';


const CreateLead = ({ createLead, onToggleModal }) => {

    const handleCreateLead = (data) => {
        for (let key in data) {
            if (data.hasOwnProperty(key) && data[key] === '') {
                delete data[key];
            }
        }
        createLead(data);
    };

    return (
        <LeadFormModal
            onToggleModal={onToggleModal}
            onSubmit={(data) => handleCreateLead(data)}
        />
    );
};


const mapDispatchToProps = {
    createLead,
};

export default connect(null, mapDispatchToProps)(CreateLead);

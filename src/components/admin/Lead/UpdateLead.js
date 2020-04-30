import React  from 'react';
import LeadFormModal from './LeadFormModal';
import { connect } from 'react-redux';
import { updateLead } from '../adminActions';
import { extractIdFromUrl } from '../../../helpers/utils';


const UpdateLead = ({ lead, updateLead, onToggleModal }) => {

    const handleUpdateLead = (data) => {
        for (let key in data) {
            if (data.hasOwnProperty(key) && data[key] === '') {
                data[key] = null;
            }
        }
        updateLead(extractIdFromUrl(lead.url), data)
    };

    return (
        <LeadFormModal
            lead={lead}
            onToggleModal={onToggleModal}
            onSubmit={(data) => handleUpdateLead(data)}
        />
    );
};


const mapDispatchToProps = {
    updateLead,
};

export default connect(null, mapDispatchToProps)(UpdateLead);

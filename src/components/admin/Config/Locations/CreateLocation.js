import React from 'react';
import LocationFormModal from './LocationFormModal';
import { createLocation } from '../configsApi';
import { connect } from 'react-redux';

const CreateLocation = ({ createLocation, onToggleModal }) => {
    return (
        <div>
            <LocationFormModal
                onToggleModal={onToggleModal}
                onSubmit={(data) => createLocation(data, 'data')}
            />
        </div>
    );
};


const mapDispatchToProps = {
    createLocation,
};



export default connect(null, mapDispatchToProps)(CreateLocation);

import React from 'react';
import LocationFormModal from './LocationFormModal';
import { updateLocation } from '../configsApi';
import { connect } from 'react-redux';

const UpdateLocation = ({ location, updateLocation, onToggleModal }) => {

    return (
        <LocationFormModal
            onSubmit={(data) => updateLocation(location.id, data)}
            onToggleModal={onToggleModal}
            location={location}
        />
    )
};


const mapDispatchToProps = {
    updateLocation,
};



export default connect(null, mapDispatchToProps)(UpdateLocation);

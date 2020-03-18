import React, {useEffect, useRef, useState} from 'react';
import * as Yup from 'yup';
import {
    createLocation,
    getLocations,
    removeLocation,
    updateLocation,
} from './configsApi';
import {
    createLocationPendingSelector,
    createLocationResolvedSelector,
    locationsSelector,
    removeLocationResolvedSelector, updateLocationResolvedSelector
} from './configsReducer';
import { connect } from 'react-redux';
import ConfigFormList from './ConfigFormList';
import { scrollToRef } from '../../../helpers/utils';


const validationSchema = Yup.object().shape({
    location: Yup.string()
        .required('Введите местонахождение'),
});


const Locations = ({
                       createPending,
                       locations,
                       created,
                       removed,
                       updated,
                       createLocation,
                       getLocations,
                       removeLocation,
                       updateLocation,

                   }) => {

    const [ locationToEdit, setLocationToEdit ] = useState(null);
    const [ locationToDelete, setLocationToDelete ] = useState(null);

    useEffect(() => {
        getLocations();
    }, [ getLocations ]);

    useEffect(() => {
        if (created || removed || updated) {
            getLocations();
        }
    }, [ created, removed, updated, getLocations ]);

    const inputRef = useRef(null);

    const handleDelete = () => {
        removeLocation(locationToDelete);
        setLocationToDelete(null);
    };

    const handleEdit = ({ id, name, setFieldValue }) => {
        setLocationToEdit(id);
        setFieldValue('location', name);
        scrollToRef(inputRef);
        inputRef.current.focus();
    };

    return (
        <div>
            <ConfigFormList
                itemName="location"
                inputRef={inputRef}
                validationSchema={validationSchema}
                pending={createPending}
                itemList={locations}
                addItem={createLocation}
                itemToDelete={locationToDelete}
                setItemToDelete={setLocationToDelete}
                handleItemDelete={handleDelete}
                itemToEdit={locationToEdit}
                setItemToEdit={setLocationToEdit}
                handleEditItem={handleEdit}
                updateItem={updateLocation}
            />
        </div>
    );
};


const mapStateToProps = state => ({
    createPending: createLocationPendingSelector(state),
    locations: locationsSelector(state),
    created: createLocationResolvedSelector(state),
    removed: removeLocationResolvedSelector(state),
    updated: updateLocationResolvedSelector(state),
});

const mapDispatchToProps = {
    createLocation,
    getLocations,
    removeLocation,
    updateLocation,
};


Locations.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(Locations);

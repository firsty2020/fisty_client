import React, {useEffect, useRef, useState} from 'react';
import * as Yup from 'yup';
import {
    createLocation,
    removeLocation,
    updateLocation,
} from '../configsApi';
import { getLocations } from '../configsActions';
import {
    createLocationPendingSelector,
    createLocationResolvedSelector,
    locationsSelector,
    removeLocationResolvedSelector,
    updateLocationResolvedSelector,
} from '../configsReducer';
import { connect } from 'react-redux';
import {autoToggleAlert, scrollToRef} from '../../../../helpers/utils';
import Pagination from '../../../Pagination';
import {
    AlertNotice,
    ConfirmationModal,
    CreateButton,
    TableList
} from '../../../ui';
import { Container } from 'react-bootstrap';
import { When } from 'react-if';
import CreateLocation from './CreateLocation';
import UpdateLocation from './UpdateLocation';


const validationSchema = Yup.object().shape({
    location: Yup.string()
        .required('Введите местонахождение'),
});

const locationsTableLayout = {
    headings: [
        '#', 'наименование', 'номер', 'деиствия',
    ],
    createRow: ({ id, name, number }) => [
        id, name, number,
    ],
};

const Locations = ({
                       locations,
                       created,
                       removed,
                       updated,
                       getLocations,
                       removeLocation,

                   }) => {

    const [ locationToEdit, setLocationToEdit ] = useState(null);
    const [ locationToDelete, setLocationToDelete ] = useState(null);
    const [ isCreatingLocation, setIsCreatingLocation ] = useState(false);
    const [ successMessage, setSuccessMessage ] = useState('');

    useEffect(() => {
        getLocations();
    }, [ getLocations ]);

    useEffect(() => {
        if (created || removed || updated) {
            setIsCreatingLocation(false);
            setLocationToDelete(null);
            setLocationToEdit(null);
            const action = created ? 'создали' : removed ? 'удалили' : 'обновили';
            autoToggleAlert(`Вы успещно ${action} локацию`, setSuccessMessage);
            getLocations();
        }
    }, [ created, removed, updated, getLocations ]);

    return (
        <div>
            <When condition={!!isCreatingLocation}>
                <CreateLocation
                    onToggleModal={(open) => setIsCreatingLocation(open)}
                />
            </When>
            <When condition={!!locationToEdit}>
                <UpdateLocation
                    location={locationToEdit}
                    onToggleModal={(open) => setLocationToEdit(open)}
                />
            </When>
            <When condition={!!locationToDelete}>
                <ConfirmationModal
                    question="Вы уверены, что хотите удалиьт эту локацию?"
                    onCancel={() => setLocationToDelete(null)}
                    onConfirm={() => removeLocation(locationToDelete)}
                    show={!!locationToDelete} />
            </When>
            <When condition={!!successMessage}>
                <AlertNotice
                    type="success"
                    message={successMessage}
                />
            </When>
            <Container>
                <CreateButton
                    onClick={setIsCreatingLocation}/>
                <TableList
                    onEditItem={(location) => setLocationToEdit(location)}
                    onDeleteItem={({ id }) => setLocationToDelete(id)}
                    layout={locationsTableLayout}
                    data={(locations || {}).results }/>
                <Pagination
                    action={getLocations}
                    data={locations}
                />
            </Container>
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

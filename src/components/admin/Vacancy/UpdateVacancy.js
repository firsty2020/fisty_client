import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import VacancyFormModal from './VacancyFormModal';
import {
    updateVacancy,
    getApplication,
    resetVacancyUpdated,
} from '../../common/commonActions';
import {
    applicationSelector,
    vacancyUpdatedSelector
} from '../../common/commonReducer';
import {extractIdFromUrl} from '../../../helpers/utils';


const UpdateVacancy = ({
                           applicationId,
                           application,
                           vacancy,
                           updated,
                           getApplication,
                           updateVacancy,
                           onClose,
                           resetVacancyUpdated,
                       }) => {

    useEffect(() => {
        getApplication(applicationId);
    }, [ applicationId, getApplication ]);

    useEffect(() => {
        if (updated) {
            onClose('updated');
            resetVacancyUpdated();
        }
    },  [ updated, onClose, resetVacancyUpdated ]);

    const handleUpdateVacancy = (data) => {
        const { name, sub_category } = data;
        const { url, company } = application;
        updateVacancy(
            extractIdFromUrl(vacancy.url),
            { name, sub_category, application: url, company}
        );
    };

    return (
        <VacancyFormModal
            vacancy={vacancy}
            onClose={() => onClose()}
            onSubmit={(data) => handleUpdateVacancy(data)}/>
    );
};


const mapStateToProps = state => ({
    updated: vacancyUpdatedSelector(state),
    application: applicationSelector(state),
});

const mapDispatchToProps = {
    updateVacancy,
    getApplication,
    resetVacancyUpdated,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateVacancy);

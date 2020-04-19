import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import VacancyFormModal from './VacancyFormModal';
import { createVacancy, getApplication, resetVacancyCreated } from '../../common/commonActions';
import {
    applicationSelector,
    vacancyCreatedSelector
} from '../../common/commonReducer';


const CreateVacancy = ({
                           applicationId,
                           application,
                           created,
                           getApplication,
                           createVacancy,
                           onClose,
                           resetVacancyCreated,
                       }) => {

    useEffect(() => {
        getApplication(applicationId);
    }, [ applicationId, getApplication ]);

    useEffect(() => {
        if (created) {
            onClose('created');
            resetVacancyCreated();
        }
    },  [ created, onClose, resetVacancyCreated ]);

    const handleCreateVacancy = (data) => {
        const { name, sub_category } = data;
        const { url, company } = application;
        createVacancy({ name, sub_category, application: url, company});
    };

    return (
        <VacancyFormModal
            onClose={() => onClose()}
            onSubmit={(data) => handleCreateVacancy(data)}/>
    );
};


const mapStateToProps = state => ({
    created: vacancyCreatedSelector(state),
    application: applicationSelector(state),
});

const mapDispatchToProps = {
    createVacancy,
    getApplication,
    resetVacancyCreated,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateVacancy);

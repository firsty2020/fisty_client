import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
    AlertNotice,
    BackButton,
    ConfirmationModal,
    CreateButton,
    TableList,
} from '../../ui';
import {
    createVacancy,
    getApplication,
    getVacancies,
    removeVacancy,
    resetVacancyRemoved,
} from '../../common/commonActions';
import {
    applicationSelector,
    vacanciesSelector, vacancyCreatedSelector, vacancyRemovedSelector
} from '../../common/commonReducer';
import { push } from 'connected-react-router';
import { autoToggleAlert, extractIdFromUrl } from '../../../helpers/utils';
import { When } from 'react-if';
import CreateVacancy from './CreateVacancy';


const vacanciesTableLayout = {
    headings: [
        '#', 'наименование', 'компания','дата создания', 'действия'
    ],
    createRow: ({ name, company_details, created }, index) => [
        index + 1,
        name,
        company_details.name,
        new Date(created).toLocaleDateString(),
    ],
};


const Vacancies = ({
                       vacancies,
                       match,
                       removed,
                       getVacancies,
                       removeVacancy,
                       resetVacancyRemoved,
                       push,
                   }) => {

    const [ isCreatingVacancy, setIsCreatingVacancy ] = useState(false);
    const [ vacancyIdToRemove, setVacancyIdToRemove ] = useState(null);
    const [ successAlert, setSuccessAlert ] = useState('');
    const applicationId = match.params.applicationId;

    useEffect(() => {
        getVacancies(applicationId);
    }, [ getVacancies, applicationId ]);


    useEffect(() => {
        if (removed) {
            autoToggleAlert('Вы успешно удалили вакансию', setSuccessAlert);
            getVacancies(applicationId);
            resetVacancyRemoved();
        }
    }, [ removed, getVacancies, resetVacancyRemoved, applicationId ]);

    const handleRemoveVacancy = () => {
        removeVacancy(vacancyIdToRemove);
        setVacancyIdToRemove(null);
        resetVacancyRemoved();
    };

    const handleModalClose = e => {
        getVacancies(applicationId);
        setIsCreatingVacancy(false);
        autoToggleAlert('Вы успешно создали вакансию', setSuccessAlert);
    };

    const detectBackPath = () => {
        if (match.params.companyId) {
            return `/admin/companies/${match.params.companyId}/applications/${applicationId}`
        }
        return `/admin/applications/${applicationId}`
    };

    return (
        <div>
            <When condition={!!successAlert}>
                <AlertNotice type="success" message={successAlert}
                />
            </When>
            <When condition={!!isCreatingVacancy}>
                <CreateVacancy
                    applicationId={applicationId}
                    onClose={(e) => handleModalClose(e)}
                />
            </When>
            <ConfirmationModal
                question="Вы уверены, что хотите удалить эту вакансию?"
                onCancel={() => setVacancyIdToRemove(null)}
                onConfirm={handleRemoveVacancy}
                show={!!vacancyIdToRemove} />
            <BackButton path={detectBackPath()} />
            <CreateButton onClick={() => setIsCreatingVacancy(true)}/>
            <TableList
                onDeleteItem={({ url }) => setVacancyIdToRemove(extractIdFromUrl(url))}
                onClickRow={({url}) => push(`${match.url}/${extractIdFromUrl(url)}`)}
                layout={vacanciesTableLayout}
                data={vacancies}
            />
        </div>
    );
};


const mapStateToProps = state => ({
    vacancies: vacanciesSelector(state),
    application: applicationSelector(state),
    created: vacancyCreatedSelector(state),
    removed: vacancyRemovedSelector(state),
});

const mapDispatchToProps = {
    getVacancies,
    getApplication,
    createVacancy,
    removeVacancy,
    resetVacancyRemoved,
    push,
};


Vacancies.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(Vacancies);

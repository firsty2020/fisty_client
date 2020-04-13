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
    resetVacancyCreated,
    resetVacancyRemoved,
} from '../../common/commonActions';
import {
    applicationSelector,
    vacanciesSelector, vacancyCreatedSelector, vacancyRemovedSelector
} from '../../common/commonReducer';
import { push } from 'connected-react-router';
import { autoToggleAlert, extractIdFromUrl } from '../../../helpers/utils';
import { When } from 'react-if';


const vacanciesTableLayout = {
    headings: [
        '#', 'компания','дата создания', 'действия'
    ],
    createRow: (vacancy, index) => [
        index + 1,
        vacancy.company_details.name,
        new Date(vacancy.created).toLocaleDateString(),
    ],
};


const Vacancies = ({
                       vacancies,
                       application,
                       match,
                       created,
                       removed,
                       getVacancies,
                       getApplication,
                       createVacancy,
                       removeVacancy,
                       resetVacancyCreated,
                       resetVacancyRemoved,
                       push,
                   }) => {

    const [ isCreatingVacancy, setIsCreatingVacancy ] = useState(false);
    const [ vacancyIdToRemove, setVacancyIdToRemove ] = useState(null);
    const [ successAlert, setSuccessAlert ] = useState('');
    const applicationId = match.params.applicationId;

    useEffect(() => {
        getVacancies(applicationId);
        getApplication(applicationId);
    }, [ getVacancies, getApplication]);

    useEffect(() => {
        if (created) {
            autoToggleAlert('Вы успешно создали вакансию', setSuccessAlert);
            getVacancies(applicationId);
            resetVacancyCreated();
        }
    }, [ created, getVacancies, resetVacancyCreated ]);

    useEffect(() => {
        if (removed) {
            autoToggleAlert('Вы успешно удалили вакансию', setSuccessAlert);
            getVacancies(applicationId);
            resetVacancyRemoved();
        }
    }, [ removed, getVacancies, resetVacancyRemoved ]);

    const handleCreateVacancy = () => {
        if (!application) return;
        const { url, company } = application;
        createVacancy({ application: url, company });
        setIsCreatingVacancy(false);
    };

    const handleRemoveVacancy = () => {
        removeVacancy(vacancyIdToRemove);
        setVacancyIdToRemove(null);

        resetVacancyRemoved();
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
                <AlertNotice
                    type="success"
                    message={successAlert}
                />
            </When>
            <ConfirmationModal
                question='После нажатия "Создать" вакансия будет создана'
                confirm="Создать"
                decline="Отменить"
                buttonType="warning"
                onCancel={() => setIsCreatingVacancy(false)}
                onConfirm={handleCreateVacancy}
                show={isCreatingVacancy} />
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
    resetVacancyCreated,
    resetVacancyRemoved,
    push,
};


Vacancies.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(Vacancies);

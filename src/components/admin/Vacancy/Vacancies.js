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
    copyEntity,
    resetCopyState,
} from '../../common/commonActions';
import {
    applicationSelector,
    vacanciesSelector,
    vacancyCreatedSelector,
    vacancyRemovedSelector,
    entityCopiedSelector,
} from '../../common/commonReducer';
import { push } from 'connected-react-router';
import { autoToggleAlert, extractIdFromUrl } from '../../../helpers/utils';
import { When } from 'react-if';
import CreateVacancy from './CreateVacancy';
import UpdateVacancy from './UpdateVacancy';
import Pagination from '../../Pagination';


const vacanciesTableLayout = {
    headings: [
        '#', 'наименование', 'компания','дата создания', 'действия'
    ],
    createRow: ({ url, name, company_details, created }) => [
        extractIdFromUrl(url),
        name,
        company_details.name,
        new Date(created).toLocaleDateString(),
    ],
};


const Vacancies = ({
                       vacancies,
                       match,
                       removed,
                       copied,
                       getVacancies,
                       removeVacancy,
                       resetVacancyRemoved,
                       copyEntity,
                       resetCopyState,
                       push,
                   }) => {

    const [ isCreatingVacancy, setIsCreatingVacancy ] = useState(false);
    const [ vacancyIdToRemove, setVacancyIdToRemove ] = useState(null);
    const [ vacancyToUpdate, setVacancyToUpdate ] = useState(null);
    const [ successAlert, setSuccessAlert ] = useState('');
    const [ vacancyIdToCopy, setVacancyIdToCopy ] = useState(null);
    const applicationId = match.params.applicationId;

    useEffect(() => {
        getVacancies({ application: applicationId });
    }, [ getVacancies, applicationId ]);


    useEffect(() => {
        if (removed) {
            autoToggleAlert('Вы успешно удалили вакансию', setSuccessAlert);
            getVacancies({ application: applicationId });
            resetVacancyRemoved();
        }
    }, [ removed, getVacancies, resetVacancyRemoved, applicationId ]);

    useEffect(() => {
        if (copied) {
            autoToggleAlert('Вакансия скопирована', setSuccessAlert);
            resetCopyState();
            setVacancyIdToCopy(null);
            getVacancies({ application: applicationId });
        }
    }, [ copied, getVacancies, resetCopyState ]);

    const handleRemoveVacancy = () => {
        removeVacancy(vacancyIdToRemove);
        setVacancyIdToRemove(null);
        resetVacancyRemoved();
    };

    const handleModalClose = (action) => {
        if (action) {
            const map = { created: 'создали', updated: 'обновили'};
            getVacancies({ application: applicationId });
            autoToggleAlert(`Вы успешно ${map[action]} вакансию`, setSuccessAlert);
        }
        setVacancyToUpdate(null);
        setIsCreatingVacancy(false);
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
            <When condition={!!vacancyToUpdate}>
                <UpdateVacancy
                    vacancy={vacancyToUpdate}
                    applicationId={applicationId}
                    onClose={(e) => handleModalClose(e)}
                />
            </When>
            <ConfirmationModal
                question="Вы уверены, что хотите удалить эту вакансию?"
                onCancel={() => setVacancyIdToRemove(null)}
                onConfirm={handleRemoveVacancy}
                show={!!vacancyIdToRemove} />
            <ConfirmationModal
                show={!!vacancyIdToCopy}
                question="Вы уверены, что хотите копировать эту вакансию?"
                onConfirm={() => copyEntity('vacancy', vacancyIdToCopy)}
                onCancel={() => setVacancyIdToCopy(null)}
            />
            <BackButton path={detectBackPath()} />
            <CreateButton onClick={() => setIsCreatingVacancy(true)}/>
            <TableList
                onCopy={({ url }) => setVacancyIdToCopy(extractIdFromUrl(url))}
                onEditItem={(item) => setVacancyToUpdate(item)}
                onDeleteItem={({ url }) => setVacancyIdToRemove(extractIdFromUrl(url))}
                onClickRow={({url}) => push(`${match.url}/${extractIdFromUrl(url)}`)}
                layout={vacanciesTableLayout}
                data={(vacancies || {}).results}
            />
            <Pagination
                action={getVacancies}
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
    copied: entityCopiedSelector(state),
});

const mapDispatchToProps = {
    getVacancies,
    getApplication,
    createVacancy,
    removeVacancy,
    resetVacancyRemoved,
    copyEntity,
    resetCopyState,
    push,
};


export default connect(mapStateToProps, mapDispatchToProps)(Vacancies);

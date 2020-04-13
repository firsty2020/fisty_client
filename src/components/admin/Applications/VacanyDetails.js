import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {BackButton, DetailsTable, PrimaryButton} from '../../ui';
import { getVacancy } from '../../common/commonActions';
import { applicationSelector, vacancySelector } from '../../common/commonReducer';
import { companySelector } from '../../admin/Companies/companiesReducer';
import {extractIdFromUrl} from '../../../helpers/utils';
import {Link} from 'react-router-dom';


const vacancyDetailsTableLayout = ({ url, company_details, created }) => [
    { title: 'ID',              value: extractIdFromUrl(url) },
    { title: 'Компания',        value: company_details.name },
    { title: 'Дата создания',   value: new Date(created).toLocaleDateString() },
];


const VacancyDetails = ({ match, vacancy, getVacancy }) => {

    useEffect(() => {
        getVacancy(match.params.vacancyId);
    }, [ getVacancy, match.params.vacancyId ]);

    if (!vacancy) {
        return null;
    }

    const  generateBackPath = () => {
        const { companyId, applicationId } = match.params;
        if (companyId) {
            return `/admin/companies/${companyId}/applications/${applicationId}/vacancies`
        }
        return `/admin/applications/${applicationId}/vacancies`
    };
    
    return (
        <div>
            <BackButton path={generateBackPath}/>
            <DetailsTable
                data={vacancyDetailsTableLayout(vacancy)}>
            </DetailsTable>
            <Link to={`${match.url}/projects`}>
                <PrimaryButton text="Проекты"/>
            </Link>
        </div>
    );
};


const mapStateToProps = state => ({
    application: applicationSelector(state),
    company: companySelector(state),
    vacancy: vacancySelector(state),
});

const mapDispatchToProps = { getVacancy };


VacancyDetails.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(VacancyDetails);

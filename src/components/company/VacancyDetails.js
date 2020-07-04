import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BackButton, DetailsTable } from '../ui';
import { getVacancy } from '../common/commonActions';
import { vacancySelector } from '../common/commonReducer';
import { extractIdFromUrl } from '../../helpers/utils';


const vacancyDetailsTableLayout = ({ url, company_details, created, name }) => [
    { title: 'ID',              value: extractIdFromUrl(url) },
    { title: 'Наименование',    value: name },
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

    return (
        <div>
            <BackButton path="/company/vacancies"/>
            <DetailsTable
                data={vacancyDetailsTableLayout(vacancy)}>
            </DetailsTable>
        </div>
    );
};


const mapStateToProps = state => ({
    vacancy: vacancySelector(state),
});

const mapDispatchToProps = { getVacancy };


export default connect(mapStateToProps, mapDispatchToProps)(VacancyDetails);

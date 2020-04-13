import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {BackButton, DetailsTable, PrimaryButton} from '../ui';
import { getApplication } from './commonActions';
import { applicationSelector } from './commonReducer';
import { getCompany } from '../admin/Companies/companiesActions';
import { companySelector } from '../admin/Companies/companiesReducer';
import { extractIdFromUrl } from '../../helpers/utils';
import { Link } from 'react-router-dom';
import { getUserFromToken } from '../auth/auth';


const applicationDetailsTableLayout = ({
                                           id,
                                           position,
                                           employees_count,
                                           job_description,
                                           bonus_enabled,
                                           salary,
                                           formalization_type,
                                           responsibilities,
                                           schedule,
                                           responsibilities_comments,
                                           citizenship,
                                           gender,
                                           age,
                                           education,
                                           russian_level,
                                           other_languages,
                                           driver_license,
                                           mobile_availability,
                                           appearance_requirements,
                                           comments,
                                           city,
                                           address,
                                       }) => [
    { title: 'ID',                                          value: id },
    { title: 'Должность',                                   value: position },
    { title: 'Количество сотрудников',                      value: employees_count },
    { title: 'Условия работы',                              value: job_description },
    { title: 'Бонусы',                                      value: bonus_enabled ? 'Есть' : 'Нет' },
    { title: 'Примерный совокупный заработок в месяц',      value: `${salary} р` },
    { title: 'Трудовой договор',                            value: formalization_type },
    { title: 'Функционал',                                  value: responsibilities },
    { title: 'График работы',                               value: schedule },
    { title: 'Комментарии',                                 value: responsibilities_comments ? responsibilities_comments : '-' },
    { title: 'Гражданство',                                 value: citizenship.join(', ') },
    { title: 'Пол',                                         value: gender.join(', ') },
    { title: 'Возраст',                                     value: `от  ${age.join(' до ')}` },
    { title: 'Образование',                                 value: education ? education.join(', ') : '-' },
    { title: 'Уровень владения русским языком',             value: russian_level },
    { title: 'Другие языки',                                value: other_languages ? other_languages.join(', ') : '-' },
    { title: 'Наличие водительских прав',                   value: driver_license ? driver_license.join(', ') : '-' },
    { title: 'Требования к мобильному телефону',            value: mobile_availability },
    { title: 'Требования к внешности',                      value: appearance_requirements },
    { title: 'Дополнительные пожелания',                    value: comments },
    { title: 'Город поиска',                                value: city },
    { title: 'Куда приглашать кандитатов',                  value: address },
];

const user = getUserFromToken();


const ApplicationDetails = ({
                                application,
                                company,
                                match,
                                getApplication,
                                getCompany,
                            }) => {

    useEffect(() => {
        getApplication(match.params.applicationId);
    }, [ getApplication, match.params.applicationId ]);

    useEffect(() => {
        if (application) {
            const companyId = extractIdFromUrl(application.company);
            getCompany(companyId);
        }
    }, [ getCompany, application ]);

    if (!application) {
        return null;
    }

    const detectBackPath = (role) => {
        if (match.params.companyId) {
            return `/${role}/companies/${match.params.companyId}/applications`
        } else {
            return `/${role}/applications`;
        }
    };

    return (
        <div>
            <BackButton path={detectBackPath(user.role)}/>
            <DetailsTable
                data={applicationDetailsTableLayout(application)}>
                {company ?
                    <tr>
                        <td>Компания</td>
                        <td>{company.name}</td>
                    </tr> : null
                }
            </DetailsTable>
            {(user || {}).role === 'admin' ? (
                <Link to={`${match.url}/vacancies`} className="mr-2">
                    <PrimaryButton text="Вакансии"/>
                </Link>) : null
            }
        </div>
    );
};


const mapStateToProps = state => ({
    application: applicationSelector(state),
    company: companySelector(state),
});

const mapDispatchToProps = { getApplication, getCompany };


ApplicationDetails.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(ApplicationDetails);

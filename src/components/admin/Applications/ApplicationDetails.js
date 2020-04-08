import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { BackButton, DetailsTable } from '../../ui';
import { getApplication } from '../../../common/commonActions';
import { applicationSelector } from '../../../common/commonReducer';
import { getCompany } from '../Companies/companiesApi';
import { companySelector } from '../Companies/companiesReducer';
import { extractIdFromUrl } from '../../../helpers/utils';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


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
    }, [ getCompany ]);

    if (!application) {
        return null;
    }


    return (
        <div>
            <BackButton path='/admin/applications'/>
            <DetailsTable
                data={applicationDetailsTableLayout(application)}>
                {company ?
                    <tr>
                        <td>Компания</td>
                        <td>{company.name}</td>
                    </tr> : null
                }
            </DetailsTable>
            <Link to={`${match.url}/vacancies`}
                  className="mr-2">
                <Button
                    variant="primary">Вакансии
                </Button>
            </Link>
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

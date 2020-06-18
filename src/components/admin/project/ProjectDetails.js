import React, { useEffect } from 'react';
import { BackButton, DetailsTable, PrimaryButton } from '../../ui';
import { connect } from 'react-redux';
import { getProject } from '../adminActions';
import { projectSelector } from '../adminReducer';
import { Link } from 'react-router-dom';
import { extractUserDataFromToken } from '../../auth/auth';


const showBranchNames = (branchDetails) => {
    if (!branchDetails || !branchDetails.length) {
        return ' - ';
    }
    return  branchDetails.reduce((acc, curr) => {
        acc.push(curr[Object.keys(curr)[0]]['name']);
        return acc;
    }, []).join(', ');
};


const projectDetailsTableLayout = ({
                                       id,
                                       name,
                                       vacancy_details,
                                       target_action_count,
                                       target_action_amount,
                                       branch_details,
                                       citizenship,
                                       location_details,
                                       age,
                                       responsibilities,
                                   }) => [
    { title: 'ID',                          value: id },
    { title: 'Наименование',                value: name },
    { title: 'Компания',                    value: vacancy_details.company_details.name },
    { title: 'Вакансия',                    value: vacancy_details.name },
    { title: 'Кол-во выполненных ЦД',       value: target_action_count },
    { title: 'Доля Выполненных ЦД',         value: target_action_amount },
    { title: 'Регион',                      value: location_details ? location_details.name : ''},
    { title: 'Бранч',                       value: showBranchNames(branch_details)},
    { title: 'Граждансвтво',                value: citizenship.join(', ') },
    { title: 'Возраст',                     value: age.join(' - ') },
    { title: 'Требования',                  value: responsibilities },
];


const ProjectDetails  = ({ match, project, getProject }) => {

    useEffect(() => {
        getProject(match.params.projectId);
    }, [ getProject, match.params.projectId ]);

    if (!project) {
        return null;
    }
    
    const isAdmin = (extractUserDataFromToken() || {}).role === 'admin';

    const generateBackPath = () => {
        const url = match.url;
        const i = url.lastIndexOf('/');
        return (url.slice(0, i));
    };

    return (
        <div>
            <BackButton path={generateBackPath()}/>
            <DetailsTable data={projectDetailsTableLayout(project)}/>
            {isAdmin ? (
                <Link to={`${match.url}/custom-fields`}>
                    <PrimaryButton text="Динамичные поля"/>
                </Link>
            ) : null}
        </div>
    );

};


const mapStateToProps = state => ({
    project: projectSelector(state),
});

const mapDispatchToProps = { getProject };



export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);

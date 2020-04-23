import React, {useEffect} from 'react';
import { BackButton, DetailsTable, PrimaryButton } from '../../ui';
import { connect } from 'react-redux';
import { getProject } from '../adminActions';
import {projectSelector} from '../adminReducer';


const projectDetailsTableLayout = ({
                                       id,
                                       name,
                                       vacancy,
                                       company,
                                       target_action_count,
                                       target_action_amount,
                                       location,
                                       branch,
                                       citizenship,
                                       age,
                                       responsibilities,
                                   }) => [
    { title: 'ID',                          value: id },
    { title: 'Наименование',                value: name },
    { title: 'Компания',                    value: company },
    { title: 'Вакансия',                    value: vacancy },
    { title: 'Кол-во выполненных ЦД',       value: target_action_count },
    { title: 'Доля Выполненных ЦД',         value: target_action_amount },
    { title: 'Регион',                      value: location || branch },
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


    const generateBackPath = () => {
        const url = match.url;
        const i = url.lastIndexOf('/');
        return (url.slice(0, i));
    };

    return (
        <div>
            <BackButton path={generateBackPath()}/>
            <DetailsTable
                data={projectDetailsTableLayout(project)}>
            </DetailsTable>
            {/*<Link to={`${match.url}/projects`}>*/}
            {/*    <PrimaryButton text="Проекты"/>*/}
            {/*</Link>*/}
        </div>
    );

};


const mapStateToProps = state => ({
    project: projectSelector(state),
});

const mapDispatchToProps = { getProject };



export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails);

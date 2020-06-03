import React, { useEffect } from 'react';
import {PrimaryButton, TableList} from '../ui';
import Pagination from '../Pagination';
import { projectsSelector } from '../admin/adminReducer';
import { getProjects } from '../admin/adminActions';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';


const Projects = ({ match, projects, getProjects, push }) => {

    useEffect(() => {
        getProjects();
    },  [ getProjects ]);

    const projectsTableLayout = {
        headings: [
            '#', 'название', 'Кол-во выполненных ЦД', 'Доля Выполненных ЦД', 'деиствия'
        ],
        createRow: ({ id, name, completed_targeted_actions_count, target_action_amount }) => [
            id,
            name,
            completed_targeted_actions_count,
            target_action_amount,
            <PrimaryButton
                text={'добавить кандидата'}
                onClick={(e) => redirectToCreateCandidate(e, id)}
            />
        ],
    };

    const redirectToCreateCandidate = (e, projectId) => {
        e.stopPropagation();
        push(`${match.url}/${projectId}/create-candidate`)

    }


    return (
        <div>
            <TableList
               /* onClickRow={({ id }) => push(`${match.url}/${id}`)}
                onEditItem={shouldActions(true)}
                onDeleteItem={shouldActions()}*/
                onClickRow={({ id }) => push(`${match.url}/${id}`)}
                layout={projectsTableLayout}
                data={(projects || {}).results}
            />
            <Pagination
                action={getProjects}
                data={projects}
            />
        </div>
    )
};


const mapStateToProps = state => ({
    projects: projectsSelector(state),
});

const mapDispatchToProps = { getProjects, push };


Projects.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(Projects);

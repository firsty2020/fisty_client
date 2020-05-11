import React, {useEffect} from 'react';
import {TableList} from '../ui';
import Pagination from '../Pagination';
import { projectsSelector } from '../admin/adminReducer';
import { getProjects } from '../admin/adminActions';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';


const projectsTableLayout = {
    headings: [
        '#', 'название', 'Кол-во выполненных ЦД', 'Доля Выполненных ЦД',
    ],
    createRow: ({ name, completed_targeted_actions_count, target_action_amount }, index) => [
        index + 1,
        name,
        completed_targeted_actions_count,
        target_action_amount,
    ],
};


const Projects = ({ match, projects, getProjects, push }) => {

    useEffect(() => {
        getProjects();
    },  [ getProjects ]);

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

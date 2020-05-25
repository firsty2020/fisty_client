import React, {useEffect, useState} from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getCandidates } from './recruiterActions';
import { CreateButton, TableList } from '../ui';
import { candidatesSelector } from './recruiterReducer';
import { extractIdFromUrl } from '../../helpers/utils';
import {getProjects} from '../admin/adminActions';
import {projectsSelector} from '../admin/adminReducer';
import SelectProjectModal from './SelectProjectModal';


const candidatesTableLayout = {
    headings: [
        '#', 'Лид', 'Проект',
    ],
    createRow: ({ url, lead_details, project_details }) => [
        extractIdFromUrl(url),
        lead_details ?
            (`${lead_details.first_name} ${lead_details.last_name}`)
            : '',
        project_details.name,
    ],
};


const Candidates = ({ candidates, projects, getCandidates, getProjects }) => {

    const [ isCreating, setIsCreating ] = useState(false);

    useEffect(() => {
        getCandidates();
        getProjects({ show_all: true });
    }, [ getCandidates, getProjects ]);

    return (
        <div>
            {isCreating ? (
                <SelectProjectModal
                    toggleModal={setIsCreating}
                    projects={(projects || {}).results}/>
            ) : null}
            <Container>
                <CreateButton
                    onClick={() => setIsCreating(true)}
                    text="Добавить"/>
                <TableList
                    layout={candidatesTableLayout}
                    data={(candidates || {}).results}/>
            </Container>
        </div>
    );

};


const mapStateToProps = (state) => ({
    candidates: candidatesSelector(state),
    projects: projectsSelector(state),
});

const mapDispatchToProps = {
    getCandidates,
    getProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(Candidates);

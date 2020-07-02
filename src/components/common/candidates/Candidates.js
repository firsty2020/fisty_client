import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
    deleteCandidate,
    getCandidates,
    resetCandidateState
} from '../commonActions';
import {
    AlertNotice,
    ConfirmationModal,
    CreateButton,
    DropDown,
    TableList
} from '../../ui';
import { candidateDeletedSelector, candidatesSelector } from '../commonReducer';
import {
    autoToggleAlert,
    extractIdFromUrl,
    generateSelectOptions
} from '../../../helpers/utils';
import { getProjects } from '../../admin/adminActions';
import { projectsSelector } from '../../admin/adminReducer';
import SelectProjectModal from '../../recruiter/SelectProjectModal';
import Pagination from '../../Pagination';
import { push } from 'connected-react-router';
import { When } from 'react-if';
import { extractUserDataFromToken } from '../../auth/auth';


const candidatesTableLayout = {
    headings: [
        '#', 'Лид', 'Проект', 'Действия'
    ],
    createRow: ({ url, lead_details, project_details }) => [
        extractIdFromUrl(url),
        lead_details ? lead_details.first_name || lead_details.last_name ?
            (`${lead_details.first_name || ''} ${lead_details.last_name || ''}`) :
        lead_details.phone_number : '-',
        project_details.name,
    ],
};


const Candidates = ({
                        candidates,
                        projects,
                        match,
                        deleted,
                        getCandidates,
                        deleteCandidate,
                        resetCandidateState,
                        getProjects,
                        push,
                    }) => {

    const [ isCreating, setIsCreating ] = useState(false);
    const [ projectFilter, setProjectFilter ] = useState(null);
    const [ candidateToDelete, setCandidateToDelete ] = useState(null);
    const [ successMessage, setSuccessMessage ] = useState('');

    useEffect(() => {
        getCandidates();
        getProjects({ show_all: true });
    }, [ getCandidates, getProjects ]);

    useEffect(() => {
        if (deleted) {
            const params = projectFilter ?
                { project: extractIdFromUrl(projectFilter.value)} : '';
            getCandidates(params);
            resetCandidateState();
            autoToggleAlert('Кандидат успешно удален', setSuccessMessage);
        }
    },[
            deleted,
            projectFilter,
            getCandidates,
            getProjects,
            resetCandidateState,
        ]
    );
    
    const handleProjectFilter = e => {
        let filterParams;
        if (e) {
            filterParams = { project: extractIdFromUrl(e.value)};
        }
        getCandidates(filterParams);
        setProjectFilter(e);
    }

    const handleDeleteCandidate = () => {
        deleteCandidate(candidateToDelete);
        setCandidateToDelete(null);
    };

    const shouldBeEditable = () => {
        const user = extractUserDataFromToken();
        if (user.role === 'recruiter') {
            return null;
        }
        return ({ url, project_details }) => {
            push(`/admin/projects/${project_details.id}/candidates/${extractIdFromUrl(url)}/edit`);
        };
    }

    return (
        <div>
            <When condition={!!successMessage}>
                <AlertNotice type="success" message={successMessage}/>
            </When>
            <When condition={!!isCreating}>
                <SelectProjectModal
                    toggleModal={setIsCreating}
                    projects={(projects || {}).results}/>
            </When>
            <When condition={!!candidateToDelete}>
                <ConfirmationModal
                    show={!!candidateToDelete}
                    question={'Вы уверены, что хотите удалить этого кандидата?'}
                    onConfirm={() => handleDeleteCandidate()}
                    onCancel={() => setCandidateToDelete(null)}
                />
            </When>
            <Container>
                <div className="d-flex justify-content-between">
                    <CreateButton
                        onClick={() => setIsCreating(true)}
                        text="Добавить"/>
                    <DropDown
                        isClearable
                        className="filter-dropdown"
                        placeholder="Фильтровать"
                        value={projectFilter}
                        onChange={(e) => handleProjectFilter(e)}
                        options={generateSelectOptions((projects || {}).results, 'url', 'name')}
                    />
                </div>
                <TableList
                    onEditItem={shouldBeEditable()}
                    onDeleteItem={({ url }) => setCandidateToDelete(extractIdFromUrl(url))}
                    onClickRow={({ url }) => push(`${match.url}/${extractIdFromUrl(url)}`)}
                    layout={candidatesTableLayout}
                    data={(candidates || {}).results}/>
                <Pagination
                    action={getCandidates}
                    data={candidates}
                />
            </Container>
        </div>
    );

};


const mapStateToProps = (state) => ({
    candidates: candidatesSelector(state),
    projects: projectsSelector(state),
    deleted: candidateDeletedSelector(state),
});

const mapDispatchToProps = {
    getCandidates,
    deleteCandidate,
    getProjects,
    resetCandidateState,
    push,
};

export default connect(mapStateToProps, mapDispatchToProps)(Candidates);

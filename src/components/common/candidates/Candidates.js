import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getCandidates } from '../commonActions';
import { CreateButton, DropDown, TableList } from '../../ui';
import { candidatesSelector } from '../commonReducer';
import { extractIdFromUrl, generateSelectOptions } from '../../../helpers/utils';
import { getProjects } from '../../admin/adminActions';
import { projectsSelector } from '../../admin/adminReducer';
import SelectProjectModal from '../../recruiter/SelectProjectModal';
import Pagination from '../../Pagination';
import { push } from 'connected-react-router';


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


const Candidates = ({
                        candidates,
                        projects,
                        match,
                        getCandidates,
                        getProjects,
                        push,
                    }) => {

    const [ isCreating, setIsCreating ] = useState(false);
    const [ projectFilter, setProjectFilter ] = useState(null);

    useEffect(() => {
        getCandidates();
        getProjects({ show_all: true });
    }, [ getCandidates, getProjects ]);
    
    const handleProjectFilter = e => {
        let filterParams;
        if (e) {
            filterParams = { project: extractIdFromUrl(e.value)};
        }
        getCandidates(filterParams);
        setProjectFilter(e);
    }

    return (
        <div>
            {isCreating ? (
                <SelectProjectModal
                    toggleModal={setIsCreating}
                    projects={(projects || {}).results}/>
            ) : null}
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
});

const mapDispatchToProps = {
    getCandidates,
    getProjects,
    push,
};

export default connect(mapStateToProps, mapDispatchToProps)(Candidates);

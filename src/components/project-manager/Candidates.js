import React, {useEffect, useState} from 'react';
import { Container } from 'react-bootstrap';
import {AlertNotice, BackButton, ConfirmationModal, TableList} from '../ui';
import {autoToggleAlert, extractIdFromUrl} from '../../helpers/utils';
import {
    candidateDeletedSelector,
    candidatesSelector
} from '../common/commonReducer';
import {
    deleteCandidate,
    getCandidates,
    resetCandidateState
} from '../common/commonActions';
import { push } from "connected-react-router";
import { connect } from 'react-redux';
import {When} from "react-if";


const candidatesTableLayout = {
    headings: [
        '#', 'Лид', 'Проект', 'Действия'
    ],
    createRow: ({ url, lead_details, project_details }) => [
        extractIdFromUrl(url),
        lead_details.first_name || lead_details.last_name ?
            (`${lead_details.first_name || ''} ${lead_details.last_name || ''}`) :
            lead_details.phone_number,
        project_details.name,
    ],
};


const Candidates = ({
                        match,
                        candidates,
                        deleted,
                        getCandidates,
                        deleteCandidate,
                        resetCandidateState,
                    }) => {

    const [ candidateToDelete, setCandidateToDelete ] = useState(null);
    const [ successMessage, setSuccessMessage ] = useState('');

    const params = { project: match.params.projectId };

    useEffect(() => {
        getCandidates(params);
    }, [ getCandidates ]);

    useEffect(() => {
            if (deleted) {
                getCandidates(params);
                resetCandidateState();
                autoToggleAlert('Кандидат успешно удален', setSuccessMessage);
            }
        },[ deleted, getCandidates, resetCandidateState ],
    );

    const handleDeleteCandidate = () => {
        deleteCandidate(candidateToDelete);
        setCandidateToDelete(null);
    };

    return (
        <div>
            <When condition={!!successMessage}>
                <AlertNotice type="success" message={successMessage}/>
            </When>
            <ConfirmationModal
                show={!!candidateToDelete}
                question={'Вы уверены, что хотите удалить этого кандидата?'}
                onConfirm={() => handleDeleteCandidate()}
                onCancel={() => setCandidateToDelete(null)}
            />
            <Container>
                <BackButton path={`/project-manager/projects/${match.params.projectId}`}/>
                <TableList
                    onDeleteItem={({ url }) => setCandidateToDelete(extractIdFromUrl(url))}
                    // onClickRow={({ url }) => push(`${match.url}/${extractIdFromUrl(url)}`)}
                    layout={candidatesTableLayout}
                    data={(candidates || {}).results}/>
            </Container>
        </div>
    );
};


const mapStateToProps = (state) => ({
    candidates: candidatesSelector(state),
    deleted: candidateDeletedSelector(state),
});

const mapDispatchToProps = {
    getCandidates,
    deleteCandidate,
    resetCandidateState,
    push,
};

export default connect(mapStateToProps, mapDispatchToProps)(Candidates);

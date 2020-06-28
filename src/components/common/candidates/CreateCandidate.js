import React, { useEffect, useState } from 'react';
import CandidateForm from './CandidateForm';
import { connect } from 'react-redux';
import { candidateCreatedSelector } from '../commonReducer';
import { autoToggleAlert } from '../../../helpers/utils';
import { AlertNotice } from '../../ui';
import { When } from "react-if";
import { resetCandidateState, createCandidate } from '../commonActions';
import { push } from 'connected-react-router';
import { extractUserDataFromToken } from '../../auth/auth';


const CreateCandidate = ({
                             match,
                             created,
                             createCandidate,
                             resetCandidateState,
                             push,
                         }) => {

    const [ successMessage, setSuccessMessage ] = useState('');

    useEffect(() => {
        if (created) {
            resetCandidateState();
            autoToggleAlert('Кандидат успешно добавлен', setSuccessMessage);
            setTimeout(() => push(`/${role}/candidates`), 2000);
        }
    }, [ created, push, resetCandidateState ]);

    const role = (extractUserDataFromToken() || {}).role;

    return (
        <div>
            <When condition={!!successMessage}>
                <AlertNotice
                    type="success"
                    message={successMessage}
                />
            </When>
            <CandidateForm
                role={role}
                match={match}
                onSubmit={(data) => createCandidate(data)}/>
        </div>
    );
}

const mapStateToProps = (state) => ({
    created: candidateCreatedSelector(state),
});

const mapDispatchToProps = {
    resetCandidateState,
    createCandidate,
    push,
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCandidate);

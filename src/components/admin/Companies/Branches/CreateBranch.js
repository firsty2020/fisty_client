import React, {useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { locationsSelector } from '../../Configs/configsReducer';
import { contactPersonsSelector } from '../../adminReducer';
import BranchForm from './BranchForm';
import { createBranch } from './branchApi';
import {
    createBranchPendingSelector,
    createBranchResolvedSelector
} from './branchReducer';
import { push } from 'connected-react-router';
import {AlertNotice} from '../../../ui';
import { When } from "react-if";


const CreateBranch = ({ match, pending, created, createBranch, push }) => {

    useEffect(() => {
        if (created) {
            setTimeout(() => push(`/admin/companies/${match.params.companyId}/branches`), 2000);
        }
    }, [ created, push, match.params.companyId ]);

    const handleCreateBranch = (branchData) => {
        createBranch(branchData);
    };

    return (
        <Container className="mt-10-auto">
            <When condition={!!created}>
                <AlertNotice type="success" message="Вы успешно создали бранч"/>
            </When>
            <BranchForm
                pending={pending}
                onSubmit={(data) => handleCreateBranch(data)}
                match={match}/>
        </Container>
    );
};


const mapStateToProps = state => ({
    locations: locationsSelector(state),
    contactPersons: contactPersonsSelector(state),
    pending: createBranchPendingSelector(state),
    created: createBranchResolvedSelector(state),
});

const mapDispatchToProps = {
    createBranch,
    push,
};


CreateBranch.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(CreateBranch);

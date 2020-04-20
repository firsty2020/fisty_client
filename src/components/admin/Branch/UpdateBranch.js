import React, {useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getBranch, updateBranch } from './branchApi';
import {
    branchSelector,
    updateBranchPendingSelector,
    updateBranchResolvedSelector
} from './branchReducer';
import BranchForm from './BranchForm';
import { AlertNotice } from '../../ui';
import { When } from 'react-if';
import { push } from 'connected-react-router';


const UpdateBranch = ({
                          match,
                          branch,
                          updated,
                          pending,
                          push,
                          getBranch,
                          updateBranch
                      }) => {

    const branchId = match.params.branchId;

    useEffect(() => {
        getBranch(branchId);
    }, [ getBranch, branchId ]);

    useEffect(() => {
        if (updated) {
            setTimeout(
                () =>
                    push(`/admin/companies/${match.params.companyId}/branches`),
                2000
            );
        }
    }, [ updated, push, match.params.companyId ]);


    if (!branch) {
        return null;
    }

    return (
        <Container className="mt-10-auto">
            <When condition={!!updated}>
                <AlertNotice type="success" message="Вы успешно обновили бранч"/>
            </When>
            <BranchForm
                branch={branch}
                pending={pending}
                onSubmit={(data) => updateBranch(branchId, data)}
                match={match}/>
        </Container>
    );
};


const mapStateToProps = state => ({
    branch: branchSelector(state),
    updated: updateBranchResolvedSelector(state),
    pending: updateBranchPendingSelector(state),
});

const mapDispatchToProps = {
    getBranch,
    updateBranch,
    push,
};


UpdateBranch.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(UpdateBranch);

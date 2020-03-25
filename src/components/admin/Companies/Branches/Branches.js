import React, {useEffect, useState} from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Edit, PlusCircle, Trash } from 'react-feather';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { BackButton, ConfirmationModal } from '../../../ui';
import { getBranches, removeBranch } from './branchApi';
import {
    branchesSelector,
    branchRemovedSelector,
    getBranchesPendingSelector
} from './branchReducer';


const Branches = ({ match, pending, removed, branches, getBranches, removeBranch }) => {

    const [ branchIdToRemove, setBranchIdToRemove ] = useState(null);

    const params = { company: match.params.companyId };

    useEffect(() => {
        getBranches(params);
    }, [ getBranches, params.company ]);

    useEffect(() => {
        if (removed) {
            getBranches(params);
        }
    }, [ getBranches, removed, params.company ]);

    const handleRemoveBranch = () => {
        removeBranch(branchIdToRemove);
        setBranchIdToRemove(null);
    };

    return (
        <div>
            <ConfirmationModal
                show={!!branchIdToRemove}
                onConfirm={handleRemoveBranch}
                onCancel={() => setBranchIdToRemove(null)}
                question="Вы уверены что хотите удалить этот бранч?"
            />
            <Container className="mt-10-auto" fluid>
                <BackButton path={`/admin/companies/${match.params.companyId}`}/>
                <div className="mb-3">
                    <Link to={`${match.url}/create`}>
                        <Button
                            variant="primary">
                            <PlusCircle
                                size={20}
                                className="align-sub"
                            /> Создать
                        </Button>
                    </Link>
                </div>
                <Table>
                    <thead>
                    <tr>
                        <th>Название</th>
                        <th>Адрес</th>
                        <th>Город</th>
                        <th width="5%">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {(branches || []).map((branch) => {
                        return (
                            <tr key={branch.id}>
                                <td>{branch.name}</td>
                                <td>{branch.address}</td>
                                <td>{branch.city}</td>
                                <td>
                                    <div className="d-flex justify-content-around">
                                        <Trash
                                            onClick={() => setBranchIdToRemove(branch.id)}
                                            className="cursor-pointer"
                                            color="red"/>
                                        <Link to={`${match.url}/${branch.id}`}>
                                            <Edit
                                                className="cursor-pointer"
                                                color="blue"
                                            />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};


const mapStateToProps = state => ({
    branches: branchesSelector(state),
    pending: getBranchesPendingSelector(state),
    removed: branchRemovedSelector(state),
});


const mapDispatchToProps = {
    getBranches,
    removeBranch,
};


export default connect(mapStateToProps, mapDispatchToProps)(Branches);

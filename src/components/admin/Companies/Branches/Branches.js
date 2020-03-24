import React, {useEffect} from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Edit, PlusCircle, Trash } from 'react-feather';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { BackButton } from '../../../ui';
import { getBranches } from './branchApi';
import {branchesSelector, getBranchesPendingSelector} from './branchReducer';


const Branches = ({ match, pending, branches, getBranches }) => {

    useEffect(() => {
        getBranches({ company: match.params.companyId });
    }, [ getBranches, match.params.companyId ]);

    return (
        <div>
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
                        <th>Адресс</th>
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
                                            onClick={() => alert(branch.id)}
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
});

const mapDispatchToProps = {
    getBranches,
};



export default connect(mapStateToProps, mapDispatchToProps)(Branches);

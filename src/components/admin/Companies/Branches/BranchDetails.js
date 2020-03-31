import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { getBranch } from './branchApi';
import { BackButton } from '../../../ui';
import { branchSelector } from './branchReducer';
import {
    getContactPerson,
    getContactPersons
} from '../ContactPersons/contactPersonActions';


const BranchDetails = ({ match, branch, getBranch, getContactPersons }) => {

    
    useEffect(() => {
        getBranch(match.params.branchId);
    }, [ getBranch, match.params.branchId ]);

    if (!branch) {
        return null;
    }

    return (
        <div>
            <BackButton path={`/admin/companies/${match.params.companyId}/branches`} />
            <Table responsive className="company-details-table">
                <tbody>
                    <tr>
                        <td>ID</td>
                        <td>{branch.id}</td>
                    </tr>
                    <tr>
                        <td>Название</td>
                        <td>{branch.name}</td>
                    </tr>
                    <tr>
                        <td>Адрес</td>
                        <td>{branch.address}</td>
                    </tr>
                    <tr>
                        <td>Местонахождение</td>
                        <td>{branch.location_name}</td>
                    </tr>
                </tbody>
            </Table>
            <Link to={`${match.url}/contact-persons`}
                  className="mr-2">
                <Button
                    onClick={() => null}
                    variant="primary">Контактные лица
                </Button>
            </Link>
        </div>
    );
};


const mapStateToProps = state => ({
    branch: branchSelector(state),
});

const mapDispatchToProps = {
    getBranch,
    getContactPersons,
};


BranchDetails.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(BranchDetails);

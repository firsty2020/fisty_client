import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getBranch } from './branchApi';
import { BackButton, DetailsTable } from '../../../ui';
import { branchSelector } from './branchReducer';
import { getContactPersons } from '../ContactPersons/contactPersonActions';


const branchDetailsTableLayout = ({ id, name, address, location_name }) => [
    { title: 'ID',              value: id },
    { title: 'Название',        value: name },
    { title: 'Адрес',           value: address },
    { title: 'Местонахождение', value: location_name },
];


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
            <DetailsTable
                data={branchDetailsTableLayout(branch)}
            />
            <Link to={`${match.url}/contact-persons`}
                  className="mr-2">
                <Button
                    variant="warning">Контактные лица
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

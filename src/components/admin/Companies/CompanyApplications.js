import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { BackButton, TableList } from '../../ui';
import { getApplications } from '../../../common/commonApi';
import {
    applicationsSelector,
    getApplicationsPendingSelector
} from '../../../common/commonReducer';
import { Button } from 'react-bootstrap';
import { PlusCircle } from 'react-feather';
import { Link } from 'react-router-dom';


const companiesTableLayout = {
    headings: [
        '#', 'должность', 'тип договора', 'оклад',
        'кол-во сотрудников',
    ],
    createRow: (application, index) => [
        index + 1, application.position, application.formalization_type,
        application.salary + ' р.', application.employees_count,
    ],
};


const CompanyApplications = ({ applications, pending, match, getApplications }) => {

    useEffect(() => {
        getApplications({ company: match.params.companyId });
    }, [ getApplications, match.params.companyId ]);

    const handleClickOnRow = (item) => {

    };

    return (
        <div>
            <BackButton path={`/admin/companies/${match.params.companyId}`} />
            <div className="mb-3">
                <Link
                    to={`${match.url}/create`}>
                    <Button variant="primary">
                        <PlusCircle
                            size={20}
                            className="align-sub"
                        /> Создать
                    </Button>
                </Link>
            </div>
            <TableList
                onClickRow={(item) => handleClickOnRow(item)}
                layout={companiesTableLayout}
                data={applications}
                showSpinner={!!pending}
            />
        </div>
    );
};


const mapStateToProps = state => ({
    applications: applicationsSelector(state),
    pending: getApplicationsPendingSelector(state),

});

const mapDispatchToProps = { getApplications };


CompanyApplications.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(CompanyApplications);

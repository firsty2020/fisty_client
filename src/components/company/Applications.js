import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TableList } from '../ui';
import { getApplications } from '../../common/commonApi';
import {
    applicationsSelector,
    getApplicationsPendingSelector
} from '../../common/commonReducer';
import { getAuthUser } from '../auth/auth';
import { userSelector } from '../auth/authReducer';


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

const Applications = ({ applications, pending, user, getAuthUser, getApplications }) => {

    useEffect(() => {
        getAuthUser();
    }, [ getAuthUser ]);

    useEffect(() => {
        if (!user) return;
        getApplications({ company: user.company });
    }, [ getApplications, user ]);


    return (
        <div>
            <TableList
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
    user: userSelector(state),
});

const mapDispatchToProps = { getApplications, getAuthUser };


Applications.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(Applications);

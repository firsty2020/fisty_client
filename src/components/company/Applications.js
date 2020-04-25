import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TableList } from '../ui';
import { getApplications } from '../common/commonActions';
import { applicationsSelector } from '../common/commonReducer';
import { getAuthUser } from '../auth/auth';
import { userSelector } from '../auth/authReducer';
import { extractIdFromUrl } from '../../helpers/utils';
import { push } from 'connected-react-router';
import Pagination from '../Pagination';


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

const Applications = ({
                          applications,
                          user,
                          match,
                          getAuthUser,
                          getApplications,
                          push,
                      }) => {

    useEffect(() => {
        getAuthUser();
    }, [ getAuthUser ]);

    useEffect(() => {
        if (!user) return;
        getApplications({ company: extractIdFromUrl(user.company) });
    }, [ getApplications, user ]);

    return (
        <div>
            <TableList
                layout={companiesTableLayout}
                data={(applications || {}).results}
                onClickRow={({ id }) => push(`${match.url}/${id}`)}
            />
            <Pagination
                action={getApplications}
                data={applications}/>
        </div>
    );
};


const mapStateToProps = state => ({
    applications: applicationsSelector(state),
    user: userSelector(state),
});

const mapDispatchToProps = { getApplications, getAuthUser, push };


Applications.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(Applications);

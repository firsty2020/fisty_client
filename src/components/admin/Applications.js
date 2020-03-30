import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { TableList } from '../ui';
import { getApplications } from '../../common/commonApi';
import {
    applicationsSelector,
    getApplicationsPendingSelector
} from '../../common/commonReducer';


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

const Applications = ({ applications, getApplications, pending }) => {

    useEffect(() => {
        getApplications();
    }, [ getApplications ]);

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

});

const mapDispatchToProps = { getApplications };


Applications.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(Applications);

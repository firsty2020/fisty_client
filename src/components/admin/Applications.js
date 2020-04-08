import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { TableList } from '../ui';
import { getApplications } from '../../common/commonActions';
import { applicationsSelector } from '../../common/commonReducer';
import { isLoadingSelector } from './adminReducer';


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
            />
        </div>
    );
};


const mapStateToProps = state => ({
    applications: applicationsSelector(state),
    pending: isLoadingSelector(state),

});

const mapDispatchToProps = { getApplications };


Applications.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(Applications);

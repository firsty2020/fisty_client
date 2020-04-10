import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { TableList } from '../../ui';
import { getApplications } from '../../common/commonActions';
import { applicationsSelector } from '../../common/commonReducer';
import { push } from 'connected-react-router';


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

const Applications = ({ applications, getApplications, push }) => {

    useEffect(() => {
        getApplications();
    }, [ getApplications ]);

    return (
        <div>
            <TableList
                onClickRow={({id}) => push(`/admin/applications/${id}`)}
                layout={companiesTableLayout}
                data={applications}
            />
        </div>
    );
};


const mapStateToProps = state => ({
    applications: applicationsSelector(state),
});

const mapDispatchToProps = { getApplications, push };


Applications.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(Applications);

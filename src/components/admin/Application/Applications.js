import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { TableList } from '../../ui';
import { getApplications } from '../../common/commonActions';
import { applicationsSelector } from '../../common/commonReducer';
import { push } from 'connected-react-router';
import Pagination from '../../Pagination';


const Applications = ({ applications, layout, getApplications, push }) => {

    useEffect(() => {
        getApplications();
    }, [ getApplications ]);

    return (
        <div>
            <TableList
                onClickRow={({id}) => push(`/admin/applications/${id}`)}
                layout={layout}
                data={(applications || {}).results}
            />
            <Pagination
                action={getApplications}
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

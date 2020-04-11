import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BackButton, TableList } from '../../ui';
import { getApplications } from '../../common/commonActions';
import { applicationsSelector } from '../../common/commonReducer';
import { Button } from 'react-bootstrap';
import { PlusCircle } from 'react-feather';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';


const Applications = ({ applications, layout, match, getApplications, push }) => {

    useEffect(() => {
        getApplications({ company: match.params.companyId });
    }, [ getApplications, match.params.companyId ]);

    return (
        <div>
            <BackButton path={`/admin/companies/${match.params.companyId}`} />
            <div className="mb-3">
                <Link
                    to={`/admin/companies/${match.params.companyId}/application/create`}>
                    <Button variant="warning">
                        <PlusCircle
                            size={20}
                            className="align-sub"
                        /> Создать
                    </Button>
                </Link>
            </div>
            <TableList
                onClickRow={({id}) => push(`${match.url}/${id}`)}
                layout={layout}
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

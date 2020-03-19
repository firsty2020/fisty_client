import React, {useEffect} from 'react';
import { ApplicationForm } from '../ui';
import { connect } from 'react-redux';
import { getAuthUser } from '../auth/auth';
import { userSelector } from '../auth/authReducer';


const CreateApplication = ({ user, getAuthUser }) => {

    useEffect(() => {
        getAuthUser();
    }, [ getAuthUser ]);

    console.log(user, 'user')

    const submitApplication = (values) => {
        console.log(values, 'values')
    };

    return (
        <div>
            <ApplicationForm
                onSubmitApplication={submitApplication}
                pending={false}
            />
        </div>
    );
};


const mapStateToProps = state => ({
    user: userSelector(state),
});

const mapDispatchToProps = { getAuthUser };


CreateApplication.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(CreateApplication);

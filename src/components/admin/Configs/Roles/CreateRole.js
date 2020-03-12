import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
    createContactPersonRolePendingSelector,
    createContactPersonRoleResolvedSelector
} from '../../adminReducer';
import { createContactPersonRole } from './rolesApi';
import CreateOrUpdateRoleModal from './CreateOrUpdateRoleModal';


const CreateRole = ({
                        pending,
                        created,
                        createRole,
                        onClose,
                    }) => {

    useEffect(() => {
        if (created) {
            onClose(true);
        }
    }, [ created, onClose ]);

    return (
        <CreateOrUpdateRoleModal
            pending={pending}
            onSubmit={(values) => createRole(values)}
            onClose={onClose}
        >
        </CreateOrUpdateRoleModal>
    );
};


const mapStateToProps = state => ({
    pending: createContactPersonRolePendingSelector(state),
    created: createContactPersonRoleResolvedSelector(state),
});

const mapDispatchToProps = {
    createRole: createContactPersonRole,
};


CreateRole.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(CreateRole);

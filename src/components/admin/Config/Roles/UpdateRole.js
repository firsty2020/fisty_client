import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CreateOrUpdateRoleModal from './CreateOrUpdateRoleModal';
import { updateContactPersonRole } from './rolesApi';
import {
    updateContactPersonRolePendingSelector,
    updateContactPersonRoleResolvedSelector
} from '../configsReducer';

const UpdateRole = ({
                        pending,
                        role,
                        updated,
                        updateRole,
                        onClose,
                    }) => {

    useEffect(() => {
        if (updated) {
            onClose(true);
        }
    }, [ updated, onClose ]);

    return (
        <CreateOrUpdateRoleModal
            pending={pending}
            onSubmit={(values) => updateRole({ id: role.id, ...values})}
            onClose={onClose}
            role={role}
        >
        </CreateOrUpdateRoleModal>
    );
};


const mapStateToProps = state => ({
    pending: updateContactPersonRolePendingSelector(state),
    updated: updateContactPersonRoleResolvedSelector(state),
});

const mapDispatchToProps = {
    updateRole: updateContactPersonRole,
};


UpdateRole.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(UpdateRole);

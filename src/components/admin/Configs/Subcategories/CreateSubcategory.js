import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createSubcategory, resetSubcategoryState } from '../configsActions';
import SubcategoryFormModal from './SubcategoryFormModal';
import { subcategoryCreatedSelector } from '../configsReducer';


const CreateSubcategory = ({ created, createSubcategory, onClose, resetSubcategoryState }) => {

    useEffect(() => {
        if (created) {
            onClose('created');
            resetSubcategoryState();
        }
    },  [ created, onClose, resetSubcategoryState ]);

    const handleCreateSubcategory = (data) => {
        createSubcategory(data);
    };

    return (
        <SubcategoryFormModal
            onClose={() => onClose()}
            onSubmit={(data) => handleCreateSubcategory(data)}/>
    );
};


const mapStateToProps = state => ({
    created: subcategoryCreatedSelector(state),
});

const mapDispatchToProps = {
    createSubcategory,
    resetSubcategoryState,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSubcategory);

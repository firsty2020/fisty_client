import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { resetSubcategoryState, updateSubcategory } from '../configsActions';
import SubcategoryFormModal from './SubcategoryFormModal';
import {
    subcategoryCreatedSelector,
    subcategoryUpdatedSelector
} from '../configsReducer';
import { extractIdFromUrl } from '../../../../helpers/utils';


const UpdateSubcategory = ({
                               subcategory,
                               updated,
                               onClose,
                               updateSubcategory,
                               resetSubcategoryState,
                           }) => {
    

    useEffect(() => {
        if (updated) {
            onClose('updated');
            resetSubcategoryState();
        }
    },  [ updated, onClose, resetSubcategoryState ]);

    const handleUpdateSubcategory = (data) => {
        const id = extractIdFromUrl(subcategory.url);
        updateSubcategory(id, data);
    };

    return (
        <SubcategoryFormModal
            onClose={onClose}
            subcategory={subcategory}
            onSubmit={(data) => handleUpdateSubcategory(data)}/>
    );
};


const mapStateToProps = state => ({
    created: subcategoryCreatedSelector(state),
    updated: subcategoryUpdatedSelector(state),
});

const mapDispatchToProps = {
    UpdateSubcategory,
    resetSubcategoryState,
    updateSubcategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSubcategory);

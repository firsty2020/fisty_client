import React, {useEffect, useRef, useState} from 'react';
import * as Yup from 'yup';
import {
    createCategory,
    getCategories,
    removeCategory,
    updateCategory,
    resetCategoryState,
} from './configsActions';
import {
    categoriesSelector,
    categoryCreatedSelector,
    categoryDeletedSelector,
    categoryUpdatedSelector,
} from './configsReducer';
import { connect } from 'react-redux';
import ConfigFormList from './ConfigFormList';
import { extractIdFromUrl, scrollToRef } from '../../../helpers/utils';
import { isLoadingSelector } from '../../common/commonReducer';
import Pagination from '../../Pagination';


const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Введите название категории'),
});


const Categories = ({
                        isLoading,
                        categories,
                        created,
                        deleted,
                        updated,
                        createCategory,
                        getCategories,
                        removeCategory,
                        updateCategory,
                        resetCategoryState,
                    }) => {

    const [ categoryToEdit, setCategoryToEdit ] = useState(null);
    const [ categoryToDelete, setCategoryToDelete ] = useState(null);

    useEffect(() => {
        getCategories();
    }, [ getCategories ]);

    useEffect(() => {
        if (created || deleted || updated) {
            getCategories();
            resetCategoryState();
        }
    }, [ getCategories, created, deleted, updated ]);

    const inputRef = useRef(null);

    const handleDelete = () => {
        removeCategory(extractIdFromUrl(categoryToDelete));
        setCategoryToDelete(null);
    };

    const handleEdit = ({ name, setFieldValue, url }) => {
        setCategoryToEdit(extractIdFromUrl(url));
        setFieldValue('name', name);
        scrollToRef(inputRef);
        inputRef.current.focus();
    };

    return (
        <div>
            <ConfigFormList
                itemName="name"
                inputRef={inputRef}
                validationSchema={validationSchema}
                pending={isLoading}
                itemList={(categories || {}).results}
                addItem={createCategory}
                itemToDelete={categoryToDelete}
                setItemToDelete={setCategoryToDelete}
                handleItemDelete={handleDelete}
                itemToEdit={categoryToEdit}
                setItemToEdit={setCategoryToEdit}
                handleEditItem={handleEdit}
                updateItem={updateCategory}
            />
            <Pagination
                action={getCategories}
                data={categories}
            />
        </div>
    );
};


const mapStateToProps = state => ({
    categories: categoriesSelector(state),
    created: categoryCreatedSelector(state),
    deleted: categoryDeletedSelector(state),
    updated: categoryUpdatedSelector(state),
    isLoading: isLoadingSelector(state),
});

const mapDispatchToProps = {
    createCategory,
    getCategories,
    removeCategory,
    updateCategory,
    resetCategoryState,
};


Categories.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(Categories);

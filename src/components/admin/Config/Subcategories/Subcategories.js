import React, {useEffect, useState} from 'react';
import { Container } from 'react-bootstrap';
import {
    AlertNotice,
    ConfirmationModal,
    CreateButton,
    TableList,
} from '../../../ui';
import CreateSubcategory from './CreateSubcategory';
import { When } from 'react-if';
import { autoToggleAlert, extractIdFromUrl } from '../../../../helpers/utils';
import {
    deleteSubcategory,
    getSubcategories,
    resetSubcategoryState
} from '../configsActions';
import {
    subcategoriesSelector,
    subcategoryDeletedSelector
} from '../configsReducer';
import { connect } from 'react-redux';
import UpdateSubcategory from './UpdateSubcategory';
import Pagination from '../../../Pagination';


const subcategoriesTableLayout = {
    headings: [
        '#', 'название', 'категория', 'действия'
    ],
    createRow: (subcategory, index) => [
        index + 1, subcategory.name, subcategory.category_name,
    ],
};


const Subcategories = ({
                           subcategories,
                           deleted,
                           getSubcategories,
                           deleteSubcategory,
                           resetSubcategoryState,
                       }) => {

    const [ isAddingSubcategory, setIsAddingSubcategory ] = useState(false);
    const [ subcategoryIdToDelete, setSubcategoryIdToDelete ] = useState(null);
    const [ subcategoryToUpdate, setSubcategoryToUpdate ] = useState(null);
    const [ successMessage, setSuccessMessage ] = useState(null);

    useEffect(() => {
        getSubcategories();
    }, [ getSubcategories ]);

    useEffect(() => {
        if (deleted) {
            autoToggleAlert('Вы успешно удалил подкатегорию', setSuccessMessage);
            getSubcategories();
            resetSubcategoryState();
        }
    }, [ getSubcategories, deleted, resetSubcategoryState ]);

    const handleClose = (action) => {
        const mapping = { created: 'создали', updated: 'обновили' };
        if (action) {
            autoToggleAlert(`Вы успешно ${mapping[action]} подкатегорию`, setSuccessMessage);
            getSubcategories();
        }
        setIsAddingSubcategory(false);
        setSubcategoryToUpdate(null);
    };

    const handleDeleteSubcategory = () => {
        deleteSubcategory(subcategoryIdToDelete);
        setSubcategoryIdToDelete(null);
    };
    

    return (
        <Container>
            <ConfirmationModal
                question="Вы уверены, что хотите удалить эту подкатегорию?"
                onCancel={() => setSubcategoryIdToDelete(null)}
                onConfirm={handleDeleteSubcategory}
                show={!!subcategoryIdToDelete}/>
            <When condition={!!successMessage}>
                <AlertNotice type="success" message={successMessage}/>
            </When>
            <When condition={!!isAddingSubcategory}>
                <CreateSubcategory
                    onClose={(action) => handleClose(action)}/>
            </When>
            <When condition={!!subcategoryToUpdate}>
                <UpdateSubcategory
                    onClose={(action) => handleClose(action)}
                    subcategory={subcategoryToUpdate}/>
            </When>
            <CreateButton onClick={setIsAddingSubcategory}/>
            <TableList
                onDeleteItem={({ url }) => setSubcategoryIdToDelete(extractIdFromUrl(url))}
                onEditItem={(item) => setSubcategoryToUpdate(item)}
                layout={subcategoriesTableLayout}
                data={(subcategories || {}).results} />
                <Pagination
                    data={subcategories}
                    action={getSubcategories}
                />
        </Container>
    );
};


const mapStateToProps = state => ({
    subcategories: subcategoriesSelector(state),
    deleted: subcategoryDeletedSelector(state),
});

const mapDispatchToProps = {
    getSubcategories,
    deleteSubcategory,
    resetSubcategoryState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Subcategories);

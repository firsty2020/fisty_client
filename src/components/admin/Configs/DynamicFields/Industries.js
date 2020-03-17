import React, {useEffect, useRef, useState} from 'react';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import {
    addIndustryOption,
    getIndustryOptions,
    updateIndustryOption,
    removeIndustryOption,
} from '../configsApi';
import {
    addIndustryOptionPendingSelector,
    addIndustryOptionResolvedSelector,
    industryOptionsSelector,
    removeIndustryOptionsResolvedSelector,
    updateIndustryOptionResoledSelector,
} from '../configsReducer';
import { scrollToRef } from '../../../../utils';
import ConfigFormList from '../ConfigFormList';


const industryValidationSchema = Yup.object().shape({
    item: Yup.string()
        .required('Введите опцию'),
});

const Industries = ({
                        addIndustryOption,
                        addIndustryPending,
                        addIndustryResolved,
                        updateIndustryOptionResolved,
                        industryOptionRemoved,
                        industryOptions,
                        getIndustryOptions,
                        updateIndustryOption,
                        removeIndustryOption,
                    }) => {

    const [ industryOptionToEdit, setIndustryOptionToEdit ] = useState(null);
    const [ industryOptionToDelete, setIndustryOptionToDelete ] = useState(null);

    useEffect(() => {
        getIndustryOptions();
    }, [ getIndustryOptions ]);

    useEffect(() => {
        if (addIndustryResolved) {
            getIndustryOptions();
        }
    }, [ addIndustryResolved, getIndustryOptions ]);

    useEffect(() => {
        if (industryOptionRemoved) {
            getIndustryOptions();
        }
    }, [ industryOptionRemoved, getIndustryOptions ]);

    useEffect(() => {
        if (updateIndustryOptionResolved) {
            getIndustryOptions();
        }
    }, [ updateIndustryOptionResolved, getIndustryOptions ]);

    const handleEdit = ({ id, name, setFieldValue }) => {
        setIndustryOptionToEdit(id);
        setFieldValue('item', name);
        scrollToRef(industryInputRef);
        industryInputRef.current.focus();
    };

    const handleDelete = () => {
        removeIndustryOption(industryOptionToDelete);
        setIndustryOptionToDelete(null);
    };

    const industryInputRef = useRef(null);

    return (
        <div>
            <ConfigFormList
                heading={'Отрасль - выпадающий список'}
                validationSchema={industryValidationSchema}
                itemToEdit={industryOptionToEdit}
                itemToDelete={industryOptionToDelete}
                inputRef={industryInputRef}
                pending={addIndustryPending}
                itemList={industryOptions}
                handleEditItem={handleEdit}
                handleItemDelete={handleDelete}
                updateItem={updateIndustryOption}
                addItem={addIndustryOption}
                setItemToEdit={setIndustryOptionToEdit}
                setItemToDelete={setIndustryOptionToDelete}
            />
        </div>
    );
};


const mapStateToProps = state => ({
    addIndustryPending: addIndustryOptionPendingSelector(state),
    addIndustryResolved: addIndustryOptionResolvedSelector(state),
    industryOptions: industryOptionsSelector(state),
    updateIndustryOptionResolved: updateIndustryOptionResoledSelector(state),
    industryOptionRemoved: removeIndustryOptionsResolvedSelector(state),
});

const mapDispatchToProps = {
    addIndustryOption,
    getIndustryOptions,
    updateIndustryOption,
    removeIndustryOption,
};


Industries.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(Industries);

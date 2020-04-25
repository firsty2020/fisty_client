import React, {useEffect, useRef, useState} from 'react';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import {
    addIndustryOption,
    getIndustryOptions,
    updateIndustryOption,
    removeIndustryOption,
} from './configsApi';
import {
    addIndustryOptionPendingSelector,
    addIndustryOptionResolvedSelector,
    industryOptionsSelector,
    removeIndustryOptionsResolvedSelector,
    updateIndustryOptionResoledSelector,
} from './configsReducer';
import { scrollToRef } from '../../../helpers/utils';
import ConfigFormList from './ConfigFormList';
import Pagination from '../../Pagination';


const industryValidationSchema = Yup.object().shape({
    industry: Yup.string()
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
        setFieldValue('industry', name);
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
                itemName="industry"
                validationSchema={industryValidationSchema}
                itemToEdit={industryOptionToEdit}
                itemToDelete={industryOptionToDelete}
                inputRef={industryInputRef}
                pending={addIndustryPending}
                itemList={(industryOptions || {}).results}
                handleEditItem={handleEdit}
                handleItemDelete={handleDelete}
                updateItem={updateIndustryOption}
                addItem={addIndustryOption}
                setItemToEdit={setIndustryOptionToEdit}
                setItemToDelete={setIndustryOptionToDelete}
            />
            <Pagination
                action={getIndustryOptions}
                data={industryOptions}
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

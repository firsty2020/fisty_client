import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import {
    addSpecificationOption,
    getSpecificationOptions,
    updateSpecificationOption,
    removeSpecificationOption,
} from './configsApi';
import {
    addSpecificationOptionResolvedSelector,
    specificationOptionsSelector,
    removeSpecificationOptionsResolvedSelector,
    updateSpecificationOptionResolvedSelector,
} from './configsReducer';
import { scrollToRef } from '../../../utils';
import ConfigFormList from './ConfigFormList';


const specificationValidationSchema = Yup.object().shape({
    specification: Yup.string()
        .required('Введите опцию'),
});


const Specifications = ({
                            addSpecificationOptionResolved,
                            specificationOptions,
                            specificationOptionUpdated,
                            specificationOptionRemoved,
                            addSpecificationOption,
                            getSpecificationOptions,
                            updateSpecificationOption,
                            removeSpecificationOption,
                        }) => {

    const [ specificationOptionToEdit, setSpecificationOptionToEdit ] = useState(null);
    const [ specificationOptionToDelete, setSpecificationOptionToDelete ] = useState(null);

    useEffect(() => {
        getSpecificationOptions();
    }, [ getSpecificationOptions ]);

    useEffect(() => {
        if (addSpecificationOptionResolved) {
            getSpecificationOptions();
        }
    }, [ addSpecificationOptionResolved, getSpecificationOptions ]);

    useEffect(() => {
        if (specificationOptionRemoved) {
            getSpecificationOptions();
        }
    }, [ specificationOptionRemoved, getSpecificationOptions ]);

    useEffect(() => {
        if (specificationOptionUpdated) {
            getSpecificationOptions();
        }
    }, [ specificationOptionUpdated, getSpecificationOptions ]);

    const handleEdit = ({ id, name, setFieldValue }) => {
        setSpecificationOptionToEdit(id);
        setFieldValue('specification', name);
        scrollToRef(specificationInputRef);
        specificationInputRef.current.focus();
    };

    const handleDelete = () => {
        removeSpecificationOption(specificationOptionToDelete);
        setSpecificationOptionToDelete(null);
    };

    const specificationInputRef = useRef(null);

    return (
        <div className="mt-5">
            <ConfigFormList
                itemName="specification"
                validationSchema={specificationValidationSchema}
                itemToEdit={specificationOptionToEdit}
                itemToDelete={specificationOptionToDelete}
                inputRef={specificationInputRef}
                pending={false}
                itemList={specificationOptions}
                handleEditItem={handleEdit}
                handleItemDelete={handleDelete}
                updateItem={updateSpecificationOption}
                addItem={addSpecificationOption}
                setItemToEdit={setSpecificationOptionToEdit}
                setItemToDelete={setSpecificationOptionToDelete}
            />
        </div>
    );
};


const mapStateToProps = state => ({
    addSpecificationOptionResolved: addSpecificationOptionResolvedSelector(state),
    specificationOptions: specificationOptionsSelector(state),
    specificationOptionUpdated: updateSpecificationOptionResolvedSelector(state),
    specificationOptionRemoved: removeSpecificationOptionsResolvedSelector(state),
});

const mapDispatchToProps = {
    addSpecificationOption,
    getSpecificationOptions,
    updateSpecificationOption,
    removeSpecificationOption,
};


Specifications.propTypes = {

};


export default connect(mapStateToProps, mapDispatchToProps)(Specifications);

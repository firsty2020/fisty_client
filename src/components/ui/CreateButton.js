import React from 'react';
import { PlusCircle } from 'react-feather';
import {Button} from 'react-bootstrap';


const CreateButton = (props) => (
    <div className="mb-3">
        <Button
            variant="warning"
            {...props}
        >
            <PlusCircle
                size={20}
                className="align-sub"
            /> Создать
        </Button>
    </div>
);


export default CreateButton;

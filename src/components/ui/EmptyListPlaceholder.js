import React from 'react';
import { Database } from 'react-feather';


const EmptyListPlaceholder = () => (
    <div className="text-center m-a-xl">
        <Database size={36} />
        <p>список пуст</p>
    </div>
);


export default EmptyListPlaceholder;

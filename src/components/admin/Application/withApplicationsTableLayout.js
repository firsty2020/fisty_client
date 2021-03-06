import React from 'react';
import { string } from 'prop-types';


const withApplicationsTableLayout = (WrappedComponent) => (props) => {

    const applicationsTableLayout = {
        headings: [
            '#', 'должность', 'тип договора', 'оклад',
            'кол-во сотрудников', 'Действия',
        ],
        createRow: (application) => [
            application.id, application.position, application.formalization_type.join(', '),
            application.salary + ' р.', application.employees_count,
        ],
    };


    return (
        <WrappedComponent
            layout={applicationsTableLayout}
            applications={props.applications}
            {...props}
        />
    );
};

withApplicationsTableLayout.proptypes = {
    entityName: string.isRequired,
};


export default withApplicationsTableLayout;

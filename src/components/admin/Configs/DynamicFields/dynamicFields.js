export const findConfigForFieldType = ({ field_configuration, field_type }) => {
    const mapping = {
        text: '',
        file: 'file_extensions',
        date: 'date_format',
        choice: 'choices'
    };

    if  (mapping[field_type] && field_configuration[mapping[field_type]]) {
        return { [mapping[field_type]]: field_configuration[mapping[field_type]]}

    }
    return {};
};

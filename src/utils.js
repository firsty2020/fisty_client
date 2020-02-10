/**
 * Handle various types of response errors and transform to line separated string
 * to show in alert notice
 * @param error {object}
 * @returns {string}
 */
const handleResponseErrors = (error) => {
    const errors = [];
    for (const field in error) {
        if (error.hasOwnProperty(field)) {
            if (field === 'non_field_errors') {
                errors.push(error[field] + '\n');
            } else {
                errors.push(`${field} - ${error[field]}\n`);
            }
        }
    }
    return errors.join('');
};

export {
    handleResponseErrors,
}

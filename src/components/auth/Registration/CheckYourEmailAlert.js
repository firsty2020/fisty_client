import React from 'react';
import Alert from 'react-bootstrap/Alert';


const CheckYourEmailAlert = () => {
    return (
        <Alert variant="success">
            <Alert.Heading>Проверьте Вашу Почту.</Alert.Heading>
            <hr />
            <p className="mb-0">
                На Ваш почтовый адрес должно прийти письмо с дальнейшими указаниями.
            </p>
        </Alert>
    )
};


export default CheckYourEmailAlert;

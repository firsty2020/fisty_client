import React, {useEffect} from 'react';
import {BackButton, DetailsTable} from '../../ui';
import { connect } from 'react-redux';
import { getUser } from '../../auth/authActions';
import {userSelector} from '../../auth/authReducer';
import {capitalizeFirstLetter, extractIdFromUrl} from '../../../helpers/utils';
import {Container} from 'react-bootstrap';

const userDetailsTableLayout = ({
                                    url, first_name, last_name, middle_name,
                                    role, sub_role, status, email, phone_number,
                                    citizenship, country, city, languages,
                                    education, gender, date_of_birth, experience,
                                    company,

}) => [
    { title: '#',              value: extractIdFromUrl(url) },
    { title: 'Ф.И.О.',         value:  `${last_name} ${first_name} ${middle_name}`},
    { title: 'Роль',           value:  role },
    { title: 'Тип',            value:  sub_role },
    { title: 'Статус',         value:  status },
    { title: 'Эл. почта',      value:  email },
    { title: 'Телефон',        value:  phone_number },
    { title: 'Компания',       value:  company },
    { title: 'Гражданство',    value:  capitalizeFirstLetter(citizenship) },
    { title: 'Страна',         value:  capitalizeFirstLetter(country) },
    { title: 'Город',          value:  capitalizeFirstLetter(city) },
    { title: 'Языки',          value:  languages ? languages.map((l) => l.toLowerCase()).join(', ') : '-' },
    { title: 'Образование',    value:  education },
    { title: 'Опыт работы',    value:  experience, },
    { title: 'Пол',            value:  gender },
    { title: 'Дата рождения',  value:  date_of_birth },
];


const UserDetails = ({ match, user, getUser }) => {

    useEffect(() => {
        getUser(match.params.userId);
    }, [ getUser, match.params.userId ]);

    if (!user) {
        return null
    }

    return (
        <Container>
            <BackButton path={`/admin/users/all`} />
            <DetailsTable
                data={userDetailsTableLayout(user)}
            />
        </Container>
    );
};

const mapStateToProps = (state) => ({
    user: userSelector(state),
});

const mapDispatchToProps = {
    getUser,
};


export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);

import React, { useEffect } from 'react';
import { getUsers } from '../admin/User/usersActions';
import { connect } from 'react-redux';
import { usersSelector } from '../admin/adminReducer';
import Container from 'react-bootstrap/Container';
import { BackButton, CreateButton, TableList } from '../ui';
import { extractIdFromUrl } from '../../helpers/utils';

const usersTableLayout = {
    headings: [
        '#', 'Имя', 'Фамилия', 'Эл. Почта', 'Действия',
    ],
    createRow: ({ url, first_name, last_name, email }) => [
        extractIdFromUrl(url), first_name,  last_name, email,
    ],
};

const ManageRecruiters = ({ match, users, getUsers, }) => {

    const params = { role: 'recruiter' };

    useEffect(() => {
        getUsers(params);
    }, [ getUsers ]);

    return (
        <div>
            <Container>
                <BackButton path={`/project-manager/projects/${match.params.projectId}`}/>
                <CreateButton text="Добавитъ"/>
                <TableList
                    layout={usersTableLayout}
                    data={(users || {}).results}
                    onUnlink={(i) => console.log(i, 'i')}
                />
            </Container>
        </div>
    );
};


const mapStateToProps = (state) => ({
    users: usersSelector(state),
});

const mapDispatchToProps = {
    getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageRecruiters);

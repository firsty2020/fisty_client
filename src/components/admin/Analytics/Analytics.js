import React, {useEffect} from 'react';
import {
    Row,
    Col,
    Card,
    CardHeader,
} from 'reactstrap';
import { Doughnut, Pie } from 'react-chartjs-2';
import GraphCard from './CardGraph';
import { connect } from 'react-redux';
import { statisticsSelector } from '../adminReducer';
import { getStatistics } from '../adminActions';


const Analytics = ({ statistics, getStatistics }) => {

    useEffect(() => {
        getStatistics();
    }, [ getStatistics ]);

    if (!statistics) {
        return null;
    }

    const generateColor = () => {
        const o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
    };

    const usersData = () => {

        const {
            users_role_recruiters,
            users_role_candidates,
            users_role_partner,
            users_role_client,
            users_role_admin,
            users_role_company,
            active_users,
        } = statistics;
        
        const labels = ['Рекрутеры', 'Кандидаты', 'Партнеры', 'Клиенты', 'Админы', 'Компании' ];
        const backgroundColor = labels.map(() => generateColor());

        return {
            graph: {
                labels ,
                datasets: [
                    {
                        data: [
                            users_role_recruiters,
                            users_role_candidates,
                            users_role_partner,
                            users_role_client,
                            users_role_admin,
                            users_role_company,
                        ],
                        backgroundColor,
                    }
                ]
            },
            total: users_role_recruiters
                + users_role_candidates
                + users_role_partner
                + users_role_client
                + users_role_admin
                + users_role_company,
            aux: { title: 'Активные', value: active_users }
        }
    };

    const applicationsData = () => {

        const { applications_count, applications_without_vacancy, new_applications } = statistics;
        const labels = [ 'с вакансией', 'без вакансии' ];
        const backgroundColor = labels.map(() => generateColor());

        return {
            graph: {
                labels,
                datasets: [
                    {
                        data: [ applications_count - applications_without_vacancy, applications_without_vacancy ],
                        backgroundColor,
                    }
                ]
            },
            total: applications_count,
            aux: { title: 'Новые', value: new_applications },
        }
    };

    const leadsData = () => {

        const { active_lead_count, new_lead_count, approved_lead_count } = statistics;
        const labels = [ 'активные', 'новые', 'одобренные' ];
        const backgroundColor = labels.map(() => generateColor());

        return {
            graph: {
                labels,
                datasets: [
                    {
                        data: [ active_lead_count, new_lead_count, approved_lead_count ],
                        backgroundColor,
                    }
                ]
            },
            total: active_lead_count + new_lead_count + approved_lead_count,
        }
    };


    return (
        <div className="mt-5">
            <Row>
                <Col>
                    <GraphCard
                        dataTitle="Пользователи"
                        Graph={Doughnut}
                        data={usersData().graph}
                        total={usersData().total}
                        aux={usersData().aux}
                    >
                    </GraphCard>
                </Col>
                <Col>
                    <GraphCard
                        dataTitle="Заявки"
                        Graph={Pie}
                        data={applicationsData().graph}
                        total={applicationsData().total}
                        aux={applicationsData().aux}
                    >
                        <p className="mb-0">Всего: 112</p>
                        <p>Активные: 4</p>
                    </GraphCard>
                </Col>
                {leadsData().total ? (<Col>
                    <GraphCard
                        dataTitle="Лиды"
                        Graph={Pie}
                        data={leadsData().graph}
                        total={leadsData().total}
                    >
                    </GraphCard>
                </Col>) : null}
            </Row>
            <Card>
                <CardHeader>
                    <Row>
                        <Col xs={3}>
                            <h5>Компании</h5>
                            <span className="h5 font-weight-bold">{statistics.companies_count}</span>
                        </Col>
                        <Col xs={3}>
                            <h5>Вакансии</h5>
                            <div className="h5 font-weight-bold">{statistics.vacancies_count}</div>
                        </Col>
                        <Col xs={3}>
                            <h5>Проекты</h5>
                            <div className="h5 font-weight-bold">{statistics.projects_count}</div>
                        </Col>
                        <Col xs={3}>
                            <h5>Кандидатов одобрено</h5>
                            <div className="h5 font-weight-bold">{statistics.approved_candidates}</div>
                        </Col>
                    </Row>
                </CardHeader>
            </Card>
        </div>
    );
};


const mapStateToProps = (state) =>( {
    statistics: statisticsSelector(state),
});

const mapDispatchToProps = {
    getStatistics,
};

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);

import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import './GraphCard.css';


const GraphCard = ({ data, Graph, dataTitle, total, aux }) => {

    return (
        <Card>
            <CardHeader>{dataTitle}</CardHeader>
            <CardBody className="content-background-color min-340">
                { total ? (
                    <Graph
                        data={data}
                        legend={{ display: true, position: 'left' }}
                    />
                ): null}
                <div className="aux-data">
                    <p className="mb-0">Всего: { total }</p>
                    {aux ? (
                        <p>{aux.title}: {aux.value}</p>
                    ): null}
                </div>
            </CardBody>
        </Card>
    );
};


export default GraphCard;

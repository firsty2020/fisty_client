import React from 'react';
import { Form } from 'react-bootstrap';

const Question = ({ question, index, onAnswer }) => {

    return (
        <div className="mt-4">
            <p>{index + 1}) {question.question}</p>
            {question.question_answers.map((answer) => {
                return (
                    <div key={answer.uid}>
                        <Form.Check
                            onChange={() => onAnswer({ question_id: question.id, uid: answer.uid })}
                            custom
                            name={`answer${question.id}`}
                            type="radio"
                            id={answer.uid}
                            label={answer.answer}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Question;

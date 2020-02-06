import React from 'react';
import {Form} from 'react-bootstrap';
import {shape, string, arrayOf, number} from 'prop-types';

const Question = ({question, index, onAnswer}) => {

    return (
        <div className="mt-4">
            <p>{index + 1}) {question.question}</p>
            {question.question_answers.map((answer) => {
                return (
                    <div key={answer.uid}>
                        <Form.Check
                            onChange={() => onAnswer({
                                question_id: question.id,
                                uid: answer.uid
                            })}
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

Question.propTypes = {
    question: shape({
        id: number.isRequired,
        question: string.isRequired,
        question_answers: arrayOf(shape({
            uid: string.isRequired,
            answer: string.isRequired,
        })).isRequired,
    }).isRequired,
};

export default Question;

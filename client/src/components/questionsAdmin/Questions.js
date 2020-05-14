import React, { useEffect, useContext } from 'react';
import AppContext from '../../context/appContext';
import Question from './Question';

const Questions = () => {

  const appContext = useContext(AppContext);
  const { getQuestions, questions } = appContext;


  useEffect(() => {
    getQuestions();
    // eslint-disable-next-line
  }, []);



  return (
    <div className='container'>
      {questions && questions.length > 0 && questions.map(question => (
          <Question key={question._id} question={question}/>
         
       

      ))}

    </div>
  )
}

export default Questions

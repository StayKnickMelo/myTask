import React, {useContext, useEffect} from 'react';
import AppContext from '../../context/appContext';
import AnsweredItem from './AnsweredItem';

import Modal from '../layout/Modal';

const UserQuestions = () => {

  const appContext = useContext(AppContext);
  const { answered, getAnswered} = appContext;

  useEffect(()=>{
    getAnswered();
    //eslint-disable-next-line
  },[]);
  return (
    <div className='container'>
      <div className='userQuestionsContainer'>
        <div>
          <button onClick={()=>{
            document.querySelector('.modal').style.display = 'flex'
          }}>Ask A Question  <i className="fas fa-question"></i></button>
        </div>
      </div>

      <div>
        {answered && answered.length > 0 && (
          answered.map(answer => (
         <AnsweredItem key={answer._id} answer={answer}/>
          ))
        )}
      </div>

      <Modal/>

    </div>
  )
}

export default UserQuestions;

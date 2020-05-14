import React, { useState, useContext} from 'react';
import AppContext from '../../context/appContext';


const Question = ({ question }) => {

  const appContext = useContext(AppContext);
  const { answerQuestion} = appContext;

  const [answer, setAnswer] = useState('');
  const [displayFrom, setDisplayForm] = useState(false);


  const onSubmit = (e)=>{
    e.preventDefault();

    const answerToSubmit = {
      answer,
    }

    answerQuestion(question._id, answerToSubmit);
  }





  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignContent: 'center' }}>
      <div className="questionBox" key={question._id}>
        <div className='questionItem' >
          <h2>{question.question}</h2>
        </div>
        <button onClick={() => {
          setDisplayForm(true)
        }}>Answer</button>
      </div>

      {displayFrom && (
        <form onSubmit={onSubmit} className='answerForm'>
          <textarea type="text" value={answer} onChange={(e)=> setAnswer(e.target.value)} required />
          <div>
            <input type="submit" value="Submit Answer" />
            <button onClick={() => {
              setDisplayForm(false);
            }} type='button'>Cancel</button>
          </div>
        </form>

      )}
    </div>

  )
}

export default Question

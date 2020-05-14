import React, {useState, useContext} from 'react';
import AppContext from '../../context/appContext';


const Modal = () => {

  const appContext = useContext(AppContext);
  const { addQuestion} = appContext;

  const [question, setQuestion] = useState('');


  window.addEventListener('click', (e) => {
    if (e.target.className === 'modal') {
      document.querySelector('.modal').style.display = 'none';
    }
  });

  const onSubmit = (e)=>{
    e.preventDefault();

    const newQuestion = {
      question
    };


    addQuestion(newQuestion);

    

    setQuestion('');

    document.querySelector('.modal').style.display = 'none';



  
  }


  return (
    <div className='modal'>
      <div className='modalBox'>
        <form onSubmit={onSubmit} className='answerForm'>
          <textarea onChange={(e)=> setQuestion(e.target.value)}  rows='50' type="text" value={question} required />
          <div>
            <input type="submit" value="Submit Question" />
            <button onClick={()=> {
              document.querySelector('.modal').style.display = 'none';
            }} type='button'>Cancel</button>
          </div>
        </form>
        
      </div>

    </div>
  )
}

export default Modal

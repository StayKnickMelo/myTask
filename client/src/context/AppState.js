import React, {useReducer} from 'react';
import AppContext from './appContext';
import appReducer from './appReducer';

import axios from 'axios';
import { GET_QUESTIONS, ADD_QUESTION, ANSWER_QUESTION, LOG_IN, GET_ANSWERED } from '../types';


const AppState= (props)=>{
  const initialState = {
    questions: [],
    answered: [],
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: false,
    show: false
  };


  const [state, dispatch] = useReducer(appReducer, initialState);


  // LOG IN
  const logIn = async(user)=>{
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    try {
      const res = await axios.post('http://localhost:5000/users/login', user, config);

      dispatch({
        type:LOG_IN,
        payload: res.data.token
      })

    } catch (error) {
      console.log(error)
      
    }
  }


  // ADD QUESTION
  const addQuestion = async(question)=>{

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    try {
      const res = await axios.post('http://localhost:5000/questions', question, config);


      

      dispatch({
        type: ADD_QUESTION,
        payload: res.data.data
      });

      getQuestions()


      
    } catch (error) {
      console.log(error)
      
    }

  }


  // GET QUESTIONS
  const getQuestions = async ()=>{

    try {
      const res = await axios.get('http://localhost:5000/questions');


      const questions = res.data.data.filter(question => question.isAnswered === false);
      console.log(questions)

      dispatch({
        type: GET_QUESTIONS,
        payload: questions
      });
      
    } catch (error) {
      console.log(error);
      
    }

  
  }

  // GET ALL ANSWERED
  const getAnswered = async ()=>{
    try {
      const res = await axios.get('http://localhost:5000/questions/answered');

      dispatch({
        type: GET_ANSWERED,
        payload: res.data.data
      })
      
    } catch (error) {
      console.log(error)
      
    }
  }

  // ANSWER QUESTION
  const answerQuestion = async (id, answer)=>{
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    try {

      const res = await axios.put(`http://localhost:5000/questions/answer/${id}`,answer, config);

      dispatch({
        type: ANSWER_QUESTION,
        payload: res.data.data
      });

      
      
    } catch (error) {
      console.log(error)
      
    }
  }



  return (
   <AppContext.Provider
   value={{
     questions: state.questions,
     answered: state.answered,
     user: state.user,
     isAuthenticated: state.isAuthenticated,
     show: state.show,
     getQuestions,
     getAnswered,
     addQuestion,
     answerQuestion,
     logIn
   }}>
     {props.children}
   </AppContext.Provider>
  )
}


export default AppState;
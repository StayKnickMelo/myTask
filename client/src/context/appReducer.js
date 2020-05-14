import { GET_QUESTIONS, ADD_QUESTION, LOG_IN, ANSWER_QUESTION, GET_ANSWERED } from "../types"

const appReducer = (state, action)=>{
  switch(action.type){
    case LOG_IN:
      localStorage.setItem('token', action.payload);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true

      }
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload
      }
    case GET_ANSWERED:
      return{
        ...state,
        answered: action.payload
      }
    case ADD_QUESTION:
      return {
        ...state,
        questions: [...state.questions, action.payload]
      }
    case ANSWER_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(question => question._id !== action.payload._id),
        answered: [...state.answered, action.payload]
      }
    default:
      return state

  }
}


export default appReducer;
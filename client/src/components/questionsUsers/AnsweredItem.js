import React from 'react'

const AnsweredItem = ({ answer}) => {
  return (
    <div className='answeredBox' key={answer._id}>
      <div className='question'>
        <span>{answer.question}</span>
      </div>

      <div className='answer'>
        <span>{answer.answer}</span>
      </div>
    </div>)
  
}

export default AnsweredItem

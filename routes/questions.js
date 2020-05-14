const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Question = require('../Model/Question');
const {auth} = require('../middleware/auth');

// @route   GET /questions
// @desc    Get all questions
// @access  Public
router.get('/', async(req,res)=>{
  try {

    const questions = await Question.find();

    res.status(200).json({
      success: true,
      data: questions,
      count: questions.length
    })
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      msg: 'Server Error'
    })
    
  }
})

// @route   GET /answered
// @desc    Get all answers
// @access  Public
router.get('/answered', async(req,res)=>{
  try {
    const answered = await Question.find({isAnswered: true})

    res.status(200).json({
      success: true,
      data: answered,
      count: answered.length
    })
    
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: 'Server Error'
    })
    
  }
})


// @route   POST /questions
// @desc    Submit a Question
// @access  Public
router.post('/', [
  check('question', 'Please submit a question').not().isEmpty()
], async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    })
  };
  try {

    const question = await Question.create(req.body);

    res.status(201).json({
      success: true,
      data: question
    });


  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      success: false,
      msg: 'Server Error'
    });
  }
});

// @route   PUT /questions/answer/:id
// @desc    Answer a question
// @access  Private
router.put('/answer/:id', [[
  check('answer', 'Please Submit an Answer').not().isEmpty()
],auth], async (req,res)=>{

  const {answer} = req.body;

  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({
      success: false,
      errors: errors.array()
    })
  }

  try{

    const question = await Question.findById(req.params.id);

    if(!question){
      return res.status(404).json({
        success: false,
        msg: 'Question Not Found'
      });
    }

    if(req.user.role !== 'admin'){
      return res.status(401).json({
        success: false,
        msg: 'Unauthorized'
      })
    };

    question.answer = answer
    question.isAnswered = true;


    await question.save();

    res.status(200).json({
      success: true,
      data: question
    })

  }catch(error){

    console.error(error.message);

    res.status(500).json({
      success: false,
      msg: 'Server Error'
    })

  }

});


module.exports = router
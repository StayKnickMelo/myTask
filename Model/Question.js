const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  isAnswered: {
    type: Boolean,
    default: false
  },
  answer: {
    type: String
  },
  createdAt:{
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Qusetion', QuestionSchema);
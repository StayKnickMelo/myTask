const mongoose = require('mongoose');
const config = require('config')


const connectDB = async()=>{

  try {

    const conn = await  mongoose.connect(config.get('MongoURI'), {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);
    
  } catch (error) {

    console.log(error.message);
    process.exit(1);
    
  }


}


module.exports = connectDB;
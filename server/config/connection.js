const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Remove the following options
      // useCreateIndex: true,
      // useFindAndModify: false
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;

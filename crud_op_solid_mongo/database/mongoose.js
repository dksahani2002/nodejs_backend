import mongoose from 'mongoose';
const mongoURL=process.env.DBURI;
mongoose.connect(mongoURL);

const connectDB= async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

// module.exports = connectDB;
export default connectDB
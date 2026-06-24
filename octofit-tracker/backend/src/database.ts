import mongoose from 'mongoose';

export const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

export const connectDatabase = async () => {
  return mongoose.connect(mongoUri);
};

export { mongoose };

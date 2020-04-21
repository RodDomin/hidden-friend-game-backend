import mongoose from 'mongoose';

class Database {
  static async run(): Promise<boolean> {
    try {
      await mongoose.connect(process.env.MONGO_URI as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      return true;
    } catch (err) {
      return false;
    }
  }
}

export default Database;

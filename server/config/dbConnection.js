import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectionToDB = async () => {
  try {
    const { connection } = await mongoose.connect(
      process.env.MONGO_URL || `mongodb://127.0.01:27017/lms`
    );
    if (connection) {
      console.log(`Server Connected to Database at ${connection.host}`);
    }
  } catch (e) {
    console.log(e);
    prcocess.exit(1);
  }
};

export default connectionToDB;

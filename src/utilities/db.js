import mongoose from "mongoose";

mongoose.set('strictQuery', false);
const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO);
      } catch (error) {
        throw new Error("connection failed = "+error);
      }
}

export default connect;
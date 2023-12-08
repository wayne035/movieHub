import mongoose from 'mongoose';

export default async function connectDB(){
  try{
    await mongoose.connect(process.env.MONGODB_CONNECT!);
    console.log('mongodb 連線成功');
  }catch(e){
    console.log((e as Error).message);
  }
};
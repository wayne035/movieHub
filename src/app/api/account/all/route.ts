import connectDB from '@/mongoDB';
import Account from '@/models/Account';
import { NextResponse } from 'next/server';
//得到所有用戶==============================================================
export async function POST(req: Request) {
  try {
    await connectDB();
    const { uid } = await req.json();
    const getAllAccounts = await Account.find({ uid });
    if(getAllAccounts){
      return NextResponse.json({success: true, data: getAllAccounts});
    }else{
      return NextResponse.json({success: false, message: '糟糕!出了點問題!'});
    }
  } catch(e){
    return NextResponse.json({success: false, message: (e as Error).message});
  }
}
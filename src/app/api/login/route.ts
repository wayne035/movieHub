import connectDB from "@/mongoDB";
import Account from "@/models/Account";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try{
    await connectDB();
    const { pin, accountId, uid } = await req.json();
    const CurrentAccount = await Account.findOne({ _id: accountId, uid });
    if(!CurrentAccount){
      return NextResponse.json({success: false, message: "找不到用戶"});
    }
    const checkPin = await compare(pin, CurrentAccount.pin);
    if(checkPin){
      return NextResponse.json({success: true, message: "歡迎回來Movie Hub"});
    }else{
      return NextResponse.json({success: false, message: "PIN 碼不正確！請再試一次"});
    }
  } catch(e){
    return NextResponse.json({success: false, message: (e as Error).message});
  }
}
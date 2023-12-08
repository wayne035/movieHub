import connectDB from '@/mongoDB';
import Account from '@/models/Account';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
//創建用戶=============================================================
export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, pin, uid } = await req.json();
    if(!name || !pin){
      return NextResponse.json({success: false, message: '請輸入用戶名或PIN碼'});
    }
    if(pin.length !== 4) return NextResponse.json({message: 'PIN碼需要4碼'});
    const accountRepeat = await Account.find({ uid, name });
    if(accountRepeat && accountRepeat.length > 0){
      return NextResponse.json({success: false,message: '請嘗試使用不同的名稱'});
    }
    const allAccounts = await Account.find({ uid });
    if(allAccounts && allAccounts.length === 4){
      return NextResponse.json({success: false, message: '您最多只能新增 4 個帳戶'});
    }
    const hashPin = await hash(pin, 10);
    const newAccount = await Account.create({name, pin:hashPin, uid});
    if(newAccount){
      return NextResponse.json({success: true, message: '帳戶創建成功'});
    }else{
      return NextResponse.json({success: false, message: '糟糕!出了點問題!'});
    }
  }catch (e){
    return NextResponse.json({success: false, message: (e as Error).message});
  }
}
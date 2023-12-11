import connectDB from '@/mongoDB';
import Account from '@/models/Account';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

interface userID{
  params: {
    id: string
  },
}
//編輯用戶==================================================================
export async function PATCH(req: Request, {params}: userID){
  try{
    await connectDB();
    const {name, pin, uid} = await req.json();
    const {id} = params;

    if(pin.length !== 4) return NextResponse.json({message: 'PIN碼需要4碼'});

    const accountRepeat = await Account.find({ uid, name });
    if(accountRepeat && accountRepeat.length > 0){
      return NextResponse.json({success: false, message: '請嘗試使用不同的名稱'});
    }

    const hashPin = await hash(pin, 10);
    const updateAccount = await Account.updateOne({_id: id},{$set: {name, pin: hashPin}})
    if(updateAccount){
      return NextResponse.json({success: true, message: '用戶修改成功'});
    }else{
      return NextResponse.json({success: false, message: '糟糕!出了點問題!'});
    }

  }catch(e){
    console.log((e as Error).message);
  }
}
//刪除用戶==================================================================
export async function DELETE(req: Request, {params}: userID) {
    try{
      await connectDB();
      const {id: userID} = params;
      if(!userID){
        return NextResponse.json({success: false, message: 'ID不存在'});
      }
      const deleteAccount = await Account.findByIdAndDelete({_id:userID});
      if(deleteAccount){
        return NextResponse.json({success: true, message: '帳號刪除成功'});
      }else{
        return NextResponse.json({success: false, message: '糟糕!出了點問題!'});
      }
    }catch(e){
      return NextResponse.json({success: false, message: (e as Error).message});
    }
  }
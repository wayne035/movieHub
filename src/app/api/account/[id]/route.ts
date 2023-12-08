import connectDB from '@/mongoDB';
import Account from '@/models/Account';
import { NextResponse } from 'next/server';

interface userID{
  params: {id: string},
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
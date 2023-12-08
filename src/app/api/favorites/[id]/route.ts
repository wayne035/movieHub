import connectDB from '@/mongoDB';
import Favorites from '@/models/Favorite';
import { NextResponse } from 'next/server';

interface VideoID{
  params: {
    id: string,
  }
}
//刪除收藏影片==========================================
export async function DELETE(req: Request, { params }: VideoID) {
    try{
      await connectDB();
      const { id } = params;
      if(!id){
        return NextResponse.json({success: false, message: '需要收藏影片ID'});
      }
      const deletedFavoriteItem = await Favorites.findByIdAndDelete(id);
      if(deletedFavoriteItem){
        return NextResponse.json({success: true, message: '已從您收藏的影片中刪除'});
      }else{
        return NextResponse.json({success: false, message: '糟糕!出了點問題!'});
      }
    }catch(e){
      return NextResponse.json({success: false, message: (e as Error).message});
    }
  }
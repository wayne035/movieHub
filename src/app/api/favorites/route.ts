import connectDB from '@/mongoDB';
import Favorites from '@/models/Favorite';
import { NextResponse } from 'next/server';
//取得所有收藏影片資料==========================================
export async function GET(req: Request){
  try{
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const accountID = searchParams.get('accountID');
    const getAllFavorites = await Favorites.find({ uid: id, accountID });
    if(getAllFavorites){
      return NextResponse.json({success: true, data: getAllFavorites});
    } else {
      return NextResponse.json({success: false, message: '無收藏影片'});
    }
  }catch(e){
    return NextResponse.json({success: false, message: (e as Error).message});
  }
}
//添加至收藏影片==========================================
export async function POST(req: Request) {
  try{
    await connectDB();
    const data = await req.json();
    const favoriteRepeat = await Favorites.find({
      uid: data.uid,
      movieID: data.movieID,
      accountID: data.accountID,
    });
    if(favoriteRepeat && favoriteRepeat.length > 0){
      return NextResponse.json({success: false, message: '已經收藏過了!'});
    }
    const addFavorite = await Favorites.create(data);
    if(addFavorite){
      return NextResponse.json({success: true, message: '成功添加到您收藏的影片'});
    } else {
      return NextResponse.json({success: false, message: '糟糕!出了點問題!'});
    }
  }catch(e){
    return NextResponse.json({success: false, message: (e as Error).message});
  }
}
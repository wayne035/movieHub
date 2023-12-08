import axios from "axios";

const TMDB_KEY = process.env.NEXT_PUBLIC_TMDB_KEY!;
const TMDB_URL = process.env.NEXT_PUBLIC_TMDB_URL!;
//最受歡迎影片資訊===========================================================
export const getTWMovies = async () => {
  const res = await axios.get(`${TMDB_URL}/movie/popular?api_key=${TMDB_KEY}&language=zh-TW&page=1`, { headers: {'Cache-Control' : 'no-store'}})
  return res && res.data.results;
};
//流行影片===================================================================
export const getTrendingVideo = async (type: string)=> {
  const res = await axios.get(`${TMDB_URL}/trending/${type}/day?api_key=${TMDB_KEY}&language=zh-TW`);
  return res && res.data.results;
};
//高評價影片=================================================================
export const getTopratedVideo = async (type: string)=> {
  const res = await axios.get(`${TMDB_URL}/${type}/top_rated?api_key=${TMDB_KEY}&language=zh-TW`);
  return res && res.data.results;
};
//最受歡迎影片================================================================
export const getPopularVideo = async (type: string)=> {
  const res = await axios.get(`${TMDB_URL}/${type}/popular?api_key=${TMDB_KEY}&language=zh-TW`);
  return res && res.data.results;
};
//電影或電視類別================================================================
export const getTVorMoviesType = async (type: string, id: number)=> {
  const res = await axios.get(`${TMDB_URL}/discover/${type}?api_key=${TMDB_KEY}&language=zh-TW&include_adult=false&sort_by=popularity.desc&with_genres=${id}`);
  return res && res.data.results;
};
//電視或電影搜尋結果=============================================================
export const getTVorMovieSearchResults = async (type: string, query: string|string[])=> {
  const res = await axios.get(`${TMDB_URL}/search/${type}?api_key=${TMDB_KEY}&include_adult=false&language=zh-TW&query=${query}`);
  return res.data && res.data.results;
};
//電視或電影詳細信息==============================================================
export const getTVorMovieDetailsByID = async (type: string, id: number)=> {
  const res = await axios.get(`${TMDB_URL}/${type}/${id}?api_key=${TMDB_KEY}&language=en-US&append_to_response=videos`);
  return res.data;
};
//相似的電視或電影================================================================
export const getSimilarTVorMovies = async (type: string, id: number)=> {
  const res = await axios.get(`${TMDB_URL}/${type}/${id}/similar?api_key=${TMDB_KEY}&language=zh-TW`);
  return res.data && res.data.results;
};
//我的收藏資訊====================================================================
export const getAllfavorites = async (uid: string, accountID: string)=> {
  const res = await axios.get(`/api/favorites?id=${uid}&accountID=${accountID}`);
  return res.data && res.data.data;
};


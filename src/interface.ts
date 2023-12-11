export interface Account{
  name: string,
  pin: string,
  uid: string,
  _id: string,
}
export interface Media{
  backdrop_path: string,
  poster_path: string,
  type: string,
  movieID?: number,
  id: number,
  addedToFavorites?: boolean,
  title?: string,
  name?: string,
  overview?: string,
}
export interface FavoritesInfo{
  backdrop_path: string,
  poster_path: string,
  type: string,
  movieID: number,
  title?: string,
  name?: string,
  overview?: string,
  _id: string,
  uid: string,
  accountID: string,
}
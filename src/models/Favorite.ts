import mongoose,{ Schema, model } from 'mongoose';

const favoriteSchema = new Schema(
  {
    uid: {type: String, require: true},
    accountID: {type: String, require: true},
    backdrop_path: {type: String, require: true},
    poster_path: {type: String, require: true},
    movieID: {type: Number, require: true},
    type: {type: String, require: true},
    name: String,
    title: String,
    overview: String,
  },
  { timestamps: true }
);

const Favorites = mongoose.models.Favorites || model('Favorites', favoriteSchema);

export default Favorites;
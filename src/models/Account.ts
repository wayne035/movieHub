import mongoose,{ Schema, model } from 'mongoose';

const accountSchema = new Schema(
  {
    uid: {type: String, require: true},
    name: {type: String, require: true},
    pin: {type: String, require: true},
  },
  { timestamps: true }
);

const Account = mongoose.models.Account || model('Account', accountSchema);

export default Account;
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      min: [4, "Username too short"],
      max: 12,
      required: [true, "Kindly provide a username"],
      unique: true
    },
    password: {
      type: String,
      min: [6, "Password too short"],
      max: 50,
      required: [true, "Kindly provide a valid password"]
    },
    phone: {
        type: Number,
        min: [6, "Phone Number too short"],
        required: [true, "Kindly provide a valid phone number"],
        unique: true
      }
  },
  {
    timestamps: true
  })

  UserSchema.plugin(uniqueValidator, {
    message: 'This {PATH} has already been added.'
  })

  const User = mongoose.model('Contact', UserSchema);

  export default User;





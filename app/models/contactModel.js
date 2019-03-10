import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const ContactSchema = new mongoose.Schema({
    username: {
      type: String,
      min: [4, "Username too short"],
      max: 12,
      required: [true, "Kindly provide a username"],
      unique: true
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


  ContactSchema.plugin(uniqueValidator, {
    message: 'This {PATH} has already been added.'
  })

  const Contact = mongoose.model('Contact', ContactSchema);

  export default Contact;





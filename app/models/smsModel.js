import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const smsSchema = new mongoose.Schema({
    smsMessage: {
      type: String,
      required: [false, "Kindly provide a message"],
    },
    sender: {
      type: Number,
      ref: 'User',
    },
    recipient: {
      type: Number,
      required: [false, "Kindly provide a message recipient"],
    },
    status: {
        type: String,
        unique: false
      }
  },
  {
    timestamps: true
  })

smsSchema.plugin(
    uniqueValidator, {
        message: 'This {PATH} has already been added.'
    });

const Sms = mongoose.model('Sms', smsSchema)

export default Sms;

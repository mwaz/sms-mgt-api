import Sms from '../models/smsModel';
import Controller from '../controllers/index';
import Contact from  '../models/contactModel';

export default class SmsController extends Controller {
  async sendSms (req, res){
    const { body, user } = req;

    await super.validate(body, {
      smsMessage: 'required|string',
      recipient: 'required|number'
    });
    const checkRecipient = await Contact.findOne({ phone: body.recipient }); 
    if(!checkRecipient) {
        return res.status(400).jsend.fail({
            message: `Oops! looks like ${body.recipient} is not a contact yet!`,
            status: 'Sms not sent'
        })
    }
    body.contactReference = checkRecipient._id;
    body.sender = user.phone;
    body.status = 'sent';

    const { smsMessage, recipient, sender, status, contactReference } = body;

    const textMessage = await Sms.create({
      smsMessage,
      recipient,
      sender,
      status,
      contactReference
    });
    return res.status(201).jsend.success({ sms: textMessage })
    };

    async readSms (req, res){
        const { user } = req;
        const messageExists = await Sms.find({
            recipient: user.phone
        });
        if (messageExists.length !== 0){
            return res.status(200).jsend.success({
                textMessages: messageExists,
                inbox: messageExists.length
            })
        }
        return res.status(200).jsend.success({
            message: `hurray! seems like you have no text messages`,
        })
    };

    async readSingleSms (req, res){
        const { user, params } = req;
        const messageExists = await Sms.findOne({
            _id: params.smsId
        });

        const {smsMessage , sender, contactReference} = messageExists;

        if (messageExists.length !== 0){
            return res.status(200).jsend.success({
                textMessage : {
                    sms: smsMessage,
                    sender,
                    contactReference
                },
            })
        }
        return res.status(200).jsend.success({
            message: `hurray! seems like you have no text messages`,
        })
    };


    async deleteSms (req, res){
        const {params, user} = req;

        const message = await Sms.findOneAndDelete({
            _id: params.smsId

        })
        if(!message){
            return res.status(400).jsend.fail({
                message: 'Oops, looks like the text message does not exist'
            });
        }

        return res.status(200).jsend.success({
            message: 'your message has been successfully deleted',
            deletedMessage: {
               message
            },
        });
    };
    async getSmsStatus (){

    };
  
}
import Sms from '../models/smsModel';
import Controller from '../controllers/index';


export default class SmsController extends Controller {
  async sendSms (req, res){
    const { body } = req;

    await super.validate(body, {
      smsMessage: 'required|string',
      recipient: 'required|number'
    });
    body.sender = req.user.phone;
    body.status = 'sent';
    
    const { smsMessage, recipient, sender, status } = body;
    
    const textMessage = await Sms.create({
      smsMessage,
      recipient,
      sender,
      status
    });
    return res.status(201).jsend.success({ sms: textMessage })
    };

    async readSms (){

    };

    async deleteSms (){

    };

    async getSmsStatus (){

    };
  
}
import Contact from '../models/contactModel';
import Controller from '../controllers/index.js';
import Sms from '../models/smsModel';


export default class ContactController extends Controller {
    async addContact ({ body }, res) {
        super.validate(body, {
            username: 'required|string',
            phone: 'required|number'
        });

        const { username, phone } = body;

        const contact = await Contact.create({
            username,
            phone
        });
        return res.status(201).jsend.success({ contact })
    }
    async deleteContact (req, res) {
        const { params, user } = req
        
        const contact = await Contact.find({
            _id: params.contactId
        });

        const recipients = await Sms.find({
            recipient: user.phone,
        })

        const senders = await Sms.find({
            sender: user.phone
        })

        if (recipients){
          await Sms.deleteMany({
            recipient: user.phone,
        });
        }
        if (senders){
          await Sms.deleteMany({
            sender: user.phone
          });
        }

        if(senders || recipients || contact){
        const contact = await Contact.findByIdAndDelete({
            _id: params.contactId
        });

        return res.status(200).jsend.success({ 
            message: 'Successfully deleted Contact',
            deletedContact: contact
         })
    }
    return res.status(400).jsend.fail({ 
        message: 'Oops! looks like the contact you are looking for does not exist'
     })
        }
    
    }



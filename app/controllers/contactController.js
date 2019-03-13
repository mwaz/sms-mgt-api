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

    async getContact (req, res) {
        const { params } = req;

        const contact = await Contact.findOne({
            phone: params.contactId
        });
        console.log(contact, '[][][][][[]][][][][][][][][][][][][][][][][][][] your output');

        if(!contact){
            return res.status(400).jsend.fail({ 
                message: `Oops! contact ${params.contactId} does not exist`,
             })
        }
        return res.status(200).jsend.success({ contact })
    }

    async getAllContacts (req, res) {

        const contact = await Contact.find({});

        if(!contact){
            return res.status(400).jsend.fail({ 
                message: `Oops! contacts do not exist`,
             })
        }
        return res.status(200).jsend.success({ contact })
    }

    async deleteContact (req, res) {
        const { params, user } = req;
        
        const contact = await Contact.findOne({
            phone: params.contactId
        });

       const deleteReceivedMessages = await Sms.deleteMany({
            sender: contact.phone
        })
        const deleteReferences = await Sms.bulkWrite([
            {
                updateOne: {
                    filter: { sender: user.phone, recipient: contact.phone },
                    update: { sender : 0 }
                }
            }
        ]);

        if(contact){
            await deleteReceivedMessages;
            await deleteReferences;
            await Contact.findOneAndDelete({
            phone: contact.phone
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



import Contact from '../models/userModel';
import Controller from '../controllers/index';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import databaseConfiguration from '../../utils/dbConfig';

export default class ContactController extends Controller {
  
  async addContact ({ body }, res) {
    await super.validate(body, {
      username: 'required|string',
      password: 'required|string',
      phone: 'required|number'
    });

    const generatePasswordSalt =  await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(body.password, generatePasswordSalt);
    body.password = hashedPassword;
    
    const { username, password, phone }  = body;

    const newUser = await Contact.create({
        username,
        password,
        phone
    });
    return res.status(201).jsend.success({ user: newUser })
  }
  async deleteContact ({ body }, res) {
    // delete Logic here
  }

  async loginContact({body}, res) {
    await super.validate(body, {
      username: 'required|string',
      password: 'required|string'
    });

    const { username, password }  = body;
    const userDetails = await Contact.findOne({ username });

    if (!userDetails) {
      return res.status(400).jsend.fail({
        message: `Invalid username or password, kindly try again`,
      })
    }

    const comparePasswords = await bycrypt.compare(password, userDetails.password);

    if (!comparePasswords) {
      return res.status(400).jsend.fail({
        message: `Invalid username or password, kindly try again`,
      })
    }
   
    const token = jwt.sign(userDetails.toJSON(),
    // databaseConfiguration.secret,
    'iam$#%^&*(^%$#%^&*^%$#%^&*^%$#@$%^&',
    {
      expiresIn: 604800
    });



    return res.status(200).jsend.success({
      message: `Welcome ${userDetails.username} your phone number is ${userDetails.phone}`,
      inbox: `You have ${0} messages`,
      token: `JWT ${token}`
      });
    }
  }
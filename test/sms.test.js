'use strict';
import app from '../index';
import chai from 'chai';
import request from 'supertest';
import authData from './support/test-data/auth';
import ContactsData from './support/test-data/contacts';
import smsData from './support/test-data/sms';
import chaiHttP  from 'chai-http';
import { exec } from 'child_process';
chai.use(chaiHttP);
const api = new request(app);
const expect = chai.expect;
const should = chai.should();
const baseUrl = '/sms-mgt/api'

const authenticatedUser = request.agent(app);

const userAuthentication = async() => {
   await authenticatedUser.post(`${baseUrl}/users/signup`)
    .send(authData.userRegistration)
   const login = await authenticatedUser.post(`${baseUrl}/users/login`)
    .send(authData.userLogin)
return login.body.data.token
}

const creatingContact = async() => {
    const contact = await api
    .post(`${baseUrl}/contacts`)
    .set('Authorization', await userAuthentication())
    .send(ContactsData.contactRegistration)
return contact.body.data.contact.phone
 }


describe('SMS (C-R-D) : /sms', function(){
    beforeEach(async() =>{
        await creatingContact();
    })
      describe('POST /sms - Sending sms', async function(){
          it('Can send an SMS to an authenticated user', async() => {
            const sms = await api
            .post(`${baseUrl}/sms`)
            .set('Authorization', await userAuthentication())
            .send(smsData.dummySms)
            .set('Accept', 'application/json')
            expect(sms.status).to.be.eql(201);
            expect(sms.body.data.sms.status).to.be.eql('sent');
            expect(sms.body.data.sms).to.have.property('_id');
          })

          it('Cannot send an SMS to an unregistered contact', async() => {
            const sms = await api
            .post(`${baseUrl}/sms`)
            .set('Authorization', await userAuthentication())
            .send(smsData.dummySmsUnregistered)
            .set('Accept', 'application/json')
            expect(sms.status).to.be.eql(400);
            expect(sms.body.status).to.be.eql('fail');
            expect(sms.body.data.message).to.be.eql(`Oops! looks like ${smsData.dummySmsUnregistered.recipient} is not a contact yet!`);
          })
       
    });

    describe('GET /sms - Get Sms', function(){
        it('Can get all sms of an authenticated user', async() => {
            await api
            .post(`${baseUrl}/sms`)
            .set('Authorization', await userAuthentication())
            .send(smsData.dummySms)
            .set('Accept', 'application/json')
            const retrivedSms = await api
            .get(`${baseUrl}/sms`)
            .set('Authorization', await userAuthentication())
            expect(retrivedSms.status).to.be.eql(200);
            expect(retrivedSms.body.status).to.be.eql('success');
          })

          it('Can get a single message of an authenticated user', async() => {
            const sms = await api
            .post(`${baseUrl}/sms`)
            .set('Authorization', await userAuthentication())
            .send(smsData.dummySms)
            .set('Accept', 'application/json')
            const singleMessage = sms.body.data.sms._id
            const retrivedSms = await api
            .get(`${baseUrl}/sms/${singleMessage}`)
            .set('Authorization', await userAuthentication())
            expect(retrivedSms.status).to.be.eql(200);
            expect(retrivedSms.body.status).to.be.eql('success');
            expect(retrivedSms.body.data).to.have.property('textMessage');
          })

    
    });
    describe('DELETE /sms - Delete SMS', function(){
        it('Can delete a single message of an authenticated user', async() => {
            const sms = await api
            .post(`${baseUrl}/sms`)
            .set('Authorization', await userAuthentication())
            .send(smsData.dummySms)
            .set('Accept', 'application/json')
            const singleMessage = sms.body.data.sms._id
            const deleteSms = await api
            .delete(`${baseUrl}/sms/${singleMessage}`)
            .set('Authorization', await userAuthentication())
            expect(deleteSms.status).to.be.eql(200);
            expect(deleteSms.body.status).to.be.eql('success');
            expect(deleteSms.body.data.message).to.be.eql('your message has been successfully deleted');
          })
    });
});

'use strict';
import app from '../index';
import chai from 'chai';
import request from 'supertest';
import authData from './support/test-data/auth';
import contactsData from './support/test-data/contacts';
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


describe('Contacts (C-R-D) : /contacts', async function(){
      describe('POST /Contacts - Create Contact', async function(){
          it('Creates a contact for a logged in user', async() => {
            const contact = await api
            .post(`${baseUrl}/contacts`)
            .set('Authorization', await userAuthentication())
            .send(contactsData.contactRegistration)
            .set('Accept', 'application/json')
            expect(contact.status).to.be.eql(201);
            expect(contact.body.status).to.be.eql('success');
            expect(contact.body.data.contact).to.have.property('_id');
          })

          it('Cannot create duplicate contacts', async() => {
            await api
            .post(`${baseUrl}/contacts`)
            .set('Authorization', await userAuthentication())
            .send(contactsData.contactRegistration)
            const contact = await api
            .post(`${baseUrl}/contacts`)
            .send(contactsData.contactRegistration)
            .set('Authorization', await userAuthentication())
            .set('Accept', 'application/json')
            expect(contact.status).to.be.eql(409);
            expect(contact.body.status).to.be.eql('fail');
            expect(contact.body.data.message).to.contain('This username has already been added.');
          })
    });
    describe('GET /contacts - Retrive Contacts', function(){
        it('can retrive a single contact', async() => {
            const contact = await api
            .post(`${baseUrl}/contacts`)
            .set('Authorization', await userAuthentication())
            .send(contactsData.contactRegistration)
            .set('Accept', 'application/json')
            const contactId = contact.body.data.contact.phone;
            const singleContact = await api
            .get(`${baseUrl}/contacts/${contactId}`)
            .set('Authorization', await userAuthentication())
            expect(singleContact.status).to.be.eql(200);
            expect(singleContact.body.status).to.be.eql('success');
            expect(singleContact.body.data.contact).to.have.property('phone');
          })

          it('can retrive multipe contacts', async() => {
            await api
            .post(`${baseUrl}/contacts`)
            .set('Authorization', await userAuthentication())
            .send(contactsData.contactRegistration)
            await api
            .post(`${baseUrl}/contacts`)
            .set('Authorization', await userAuthentication())
            .send(contactsData.contactRegistration2)
            .set('Accept', 'application/json')
            const multipleContacts = await api
            .get(`${baseUrl}/contacts/`)
            .set('Authorization', await userAuthentication())
            const arrayLength = multipleContacts.body.data.contact.length
            expect(multipleContacts.status).to.be.eql(200);
            expect(arrayLength).to.be.eql(2);   
          })

          it('cannot retrive an inexistent contact', async() => {
            const singleContact = await api
            .get(`${baseUrl}/contacts/${contactsData.inexistentContact.phone}`)
            .set('Authorization', await userAuthentication())
            expect(singleContact.status).to.be.eql(400);
            expect(singleContact.body.status).to.be.eql('fail');
            expect(singleContact.body.data.message).to.be.eql(`Oops! contact ${contactsData.inexistentContact.phone} does not exist`);
          })
    });
    describe('DELETE /contacts - delete Contacts', function(){
        it('can delete a single contact', async() => {
            const contact = await api
            .post(`${baseUrl}/contacts`)
            .set('Authorization', await userAuthentication())
            .send(contactsData.contactRegistration)
            .set('Accept', 'application/json')
            const contactId = contact.body.data.contact.phone;
            const singleContact = await api
            .delete(`${baseUrl}/contacts/${contactId}`)
            .set('Authorization', await userAuthentication())
            expect(singleContact.status).to.be.eql(200);
            expect(singleContact.body.status).to.be.eql('success');
            expect(singleContact.body.data.message).to.be.eql('Successfully deleted Contact');
          })
    });
});

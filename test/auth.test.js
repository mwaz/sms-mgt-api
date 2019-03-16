'use strict';
import app from '../index';
import chai from 'chai';
import request from 'supertest';
import data from './support/test-data/auth';
import chaiHttP  from 'chai-http';
import { exec } from 'child_process';
chai.use(chaiHttP);
const api = new request(app);
const expect = chai.expect;
const should = chai.should();
const baseUrl = '/sms-mgt/api/users'

describe('Authentication : /users', function(){
      describe('POST /users - Signup', function(){
        it('Can signup a user', async function() {
            const res = await api
            .post(`${baseUrl}/signup`)
            .send(
              data.userRegistration
            )
            .set('Accept', 'application/json')
            expect(res).to.have.status(201)
            expect(res.body).should.be.a('Object')
            expect(res.body).should.have.property('status');
            expect(res.body.status).to.be.eql("success");
            expect(res.body.data.user).to.have.property("_id");
        })

        it('Cannot signup a user without username ', async function() {
            const res = await api
            .post(`${baseUrl}/signup`)
            .send(
              data.userRegistrationNoUsername
            )
            .set('Accept', 'application/json')

            expect(res.status).to.be.eql(422);
            expect(res.body.status).to.be.eql('fail');
            expect(res.body.data.errors[0].validation).to.be.eql('required');
            expect(res.body.data.errors[0].message).to.be.eql('The username is required.');
        })

        it('Cannot create a duplicate user - duplicate username', async function() {
            await api
            .post(`${baseUrl}/signup`)
            .send(
              data.userRegistration
            )
            const res = await api
            .post(`${baseUrl}/signup`)
            .send(
              data.userRegistration
            )
            .set('Accept', 'application/json')
            expect(res).to.have.status(409)
            expect(res.body.status).to.be.eql('fail');
            expect(res.body.data.message).to.be.eql('This username has already been added.');
        })
        it('Cannot create a duplicate user - duplicate phone', async function() {
            await api
            .post(`${baseUrl}/signup`)
            .send(
              data.userRegistration
            )
            const res = await api
            .post(`${baseUrl}/signup`)
            .send(
              data.userRegistrationDuplicatePhone
            )
            .set('Accept', 'application/json')
            expect(res).to.have.status(409)
            expect(res.body.status).to.be.eql('fail');
            expect(res.body.data.message).to.be.eql('This phone has already been added.');
        })
    });
    describe('POST /users - Login', function(){
        it('Can login a user with registration credentials', async () => {
            await api
            .post(`${baseUrl}/signup`)
            .send(
              data.userRegistration
            )
            const res = await api
            .post(`${baseUrl}/login`)
            .send(
              data.userLogin
            )
            .set('Accept', 'application/json')
            expect(res).to.have.status(200)
            expect(res.body.status).to.be.eql('success');
            expect(res.body.data.message).to.be.eql(`Welcome ${data.userLogin.username} your phone number is ${data.userRegistration.phone}`);
        })

        it('Cannot login a user with invalid credentials', async () => {
            await api
            const res = await api
            .post(`${baseUrl}/login`)
            .send(
              data.invalidLoginCredentials
            )
            .set('Accept', 'application/json')
            expect(res).to.have.status(400)
            expect(res.body.status).to.be.eql('fail');
            expect(res.body.data.message).to.be.eql(`Invalid username or password, kindly try again`);
        })
    });
});

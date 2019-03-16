import mongoose from 'mongoose';

afterEach(async() => {
    await mongoose.connection.collections.users.drop(async() => {
         //this function runs after the drop is complete
         console.log('users db dropped');
    });
    await mongoose.connection.collections.contacts.drop(async ()=> {
        console.log('contacts db dropped');
    })
    
});

after(async() => {
    await mongoose.connection.collections.sms.drop(async ()=> {
        console.log('sms db dropped');
    })
    await process.exit(0);
})
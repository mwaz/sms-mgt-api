const userRegistration = {
    "username": "TestUser",
    "password": "TestPassword",
    "phone": 12345678
  }
const userLogin = {
    "username": "TestUser",
    "password": "TestPassword",
  }
const invalidLoginCredentials = {
    "username": "TestUserrNonExistent",
    "password": "TestPassword",
  }
const userRegistrationNoUsername = {
    "username": "",
    "password": "TestPassword",
    "phone": 12345678
  }
  const userRegistrationDuplicatePhone = {
    "username": "TestUser2",
    "password": "TestPassword",
    "phone": 12345678
  }

export default {
    userRegistration,
    userLogin,
    invalidLoginCredentials,
    userRegistrationNoUsername,
    userRegistrationDuplicatePhone
}
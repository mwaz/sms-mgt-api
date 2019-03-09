import { validateAll } from 'indicative';

class ValidationError extends Error {
    /**
     * Set the validation errors on instance.
     *
     * @param {Object} errors the validation errors
     * @return {null} null
     */
    constructor (errors) {
      super()
      this.type = 'ValidationError'
      this.errors = errors
    }
  }

  /**
  * A base controller that all other controllers extend
  */
 export default class Controller {
   /**
    * A function to validate incoming request data
    *
    *
    * @param {Object} data an object containing data to be validated.
    * @param {Object} rules an object containing a list of validation rules
    * @param {Object} messages an object containing a list of custom validation messages
    * @return {null} null
    *
    * @throws {ValidationError} ValidationError throws a ValidationError if validation fails.
    */
   async validate (data, rules, messages = {}) {
     const customMessages = {
       ...messages,
       'required': 'The {{ field }} is required.'
     }
 
     try { await validateAll(data, rules, customMessages) } catch (errors) { throw new ValidationError(errors) }
   }
 }
 
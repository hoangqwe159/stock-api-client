
/**
 * Validate sign in input
 * @param {string} email - user's email
 * @param {string} password - user's password
 */
export const validateSignIn = (email, password) => {
  var errors = {}
  if(email.trim().length === 0){
    errors = 'Email cannot be empty'
  }
  else if(password.trim().length === 0){
    errors = 'Password cannot be empty'
  }

  return errors
}

/**
 * Validate sign up input
 * @param {string} email - user's email
 * @param {string} password - user's password
 *  * @param {string} checkPassword - user's check password
 */
export const validateSignUp = (email, password, checkPassword) => {
  var errors = {}
  if(email.trim().length === 0){
    errors.email = 'Email cannot be empty'
  }
  if(password.trim().length === 0){
    errors.password = 'Password cannot be empty'
  }
  if(checkPassword.trim().length === 0){
    errors.checkPassword = 'Please re-enter your password'
  }
  
  if(password !== checkPassword){
    errors.checkPassword = 'Password does not match'
  }
  return errors
}

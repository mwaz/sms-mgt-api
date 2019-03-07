exports.validateAuth = async req => {
    const username = req.body.username,
      email = req.body.email,
      password = req.body.password;
    confirmPassword = req.body.confirmPassword;
    return new Promise((resolve, reject) => {
      if (!username) {
        let error = "Username cannot be empty";
        reject(error);
      }
      if (!email) {
        let error = "Email cannot be empty";
        reject(error);
      }
      if (!password) {
        let error = "Password cannot be empty";
        reject(error);
      }
      if (!confirmPassword) {
        let error = "Confirm password cannot be empty";
        reject(error);
      }
      if (password !== confirmPassword) {
        let error = "Passwords do not match";
        reject(error);
      }
      resolve();
    });
  };
  
  exports.validateLogin = async req => {
    return new Promise((resolve, reject) => {
      if (!req.body.username || !req.body.password) {
        const loginError = "Kindly fill in all login details";
        reject(loginError);
      }
      resolve();
    });
  };
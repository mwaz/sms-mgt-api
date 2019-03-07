const appRouter = function(app) {
    const users = require("../controllers/authController");
    const passport = require("passport");
    const privateRoute = passport.authenticate("jwt", { session: false });
  
    // Create a new user
    const baseURL = "/sms-mgt/api";
    app.post("/auth/signup", users.signup);
    app.post("/auth/login", users.login);
    app.get("/auth/profile", privateRoute, users.profile);
}
module.exports = appRouter;
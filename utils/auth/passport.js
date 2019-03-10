import newStrategy from 'passport-jwt';
import User from '../../app/models/userModel';
import config from '../../config';
const JwtSTrategy = newStrategy.Strategy;
const ExtractJWT = newStrategy.ExtractJwt;


module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = 'iam$#%^&*(^%$#%^&*^%$#%^&*^%$#@$%^&';
  // opts.secretOrKey =  config[process.env.NODE_ENV]['SECRET'];
  passport.use(
    new JwtSTrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload._id, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
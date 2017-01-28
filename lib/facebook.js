const passport = require("passport");
const FacebookTokenStrategy = require('passport-facebook-token');
const passportJWT = require("passport-jwt");
const cfg = require("../config.js");
const provider = cfg.authProviders.find(provider => provider.name === 'facebook').id;
console.log('Provider for facebook.js:', provider);

/**
   * Retrieve user profile from Facebook.
   *
   * This function constructs a normalized profile, with the following properties:
   *
   *   - `provider`         always set to `facebook`
   *   - `id`               the user's Facebook ID
   *   - `username`         the user's Facebook username
   *   - `displayName`      the user's full name
   *   - `name.familyName`  the user's last name
   *   - `name.givenName`   the user's first name
   *   - `name.middleName`  the user's middle name
   *   - `gender`           the user's gender: `male` or `female`
   *   - `profileUrl`       the URL of the profile for the user on Facebook
   *   - `emails`           the proxied or contact email address granted by the user
   *
*/
const findOrCreateQueryString = `
  WITH ins AS (
    INSERT INTO users (provider, provider_id, username, display_name, family_name, given_name, middle_name, gender, profile_url, email)
    VALUES (:provider, :providerId, :username, :displayName, :familyName, :givenName, :middleName, :gender, :profileUrl, :email)
    ON CONFLICT (provider, provider_id) DO NOTHING
    RETURNING *
  )
  SELECT * FROM ins
  UNION
  SELECT * FROM users
    WHERE provider = :provider AND provider_id = :providerId;`


// map profile parameters provided by facebook to SQL query named parameters
function queryParmsFromProfile({id, username, displayName, name, gender, profileUrl, emails}) {
  const params = {
    provider: provider,
    providerId: id,
    username: username || displayName,
    displayName,
    familyName: name.familyName,
    givenName: name.givenName,
    middleName: name.middleName,
    gender,
    profileUrl: null,
    email: emails[0].value || null
  };
  console.log('Query params:', params);
  return params;
}

// inclusive filter of fields that should be passed back to the client
function filteredUserFields({id, provider, provider_id, username, display_name, family_name, given_name, middle_name, gender, profile_url, email}) {
  const filteredResult = {
    id,
    provider,
    provider_id,
    username,
    display_name,
    family_name,
    given_name,
    middle_name,
    gender,
    profile_url,
    email
  };
  console.log('filtered user', filteredResult);
  return filteredResult;
};

module.exports = function(knex) {

  function findOrCreateUser(profile) {
    console.log('facebook profile:', profile);
    return knex
      .raw(findOrCreateQueryString, queryParmsFromProfile(profile))
      .then(result => {
        console.log('Query result:', result);
        if(result.rows.length !== 1) {
          return Promise.reject(new Error("Unexpected result length for find or create user."));
        }
        return result.rows[0];
      });
  }

  passport.use(new FacebookTokenStrategy({
      clientID: cfg.facebookAppId,
      clientSecret: cfg.facebookAppSecret
    }, function(accessToken, refreshToken, profile, done) {

      findOrCreateUser(profile)
      .then(user => {
        console.log('returned user:', user);
        return done(null, filteredUserFields(user));
      })
      .catch(error => {
        return done(error, null);
      });
    }
  ));

};
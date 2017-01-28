module.exports = {
    jwtSecret: process.env.JWT_SECRET || "need to define a secret",
    jwtSession: {
        session: false
    },
    authProviders: [
      {
        name: 'facebook',
        id: 1
      }
    ],
    facebookAppId: process.env.FACEBOOK_APP_ID,
    facebookAppSecret:process.env.FACEBOOK_APP_SECRET
};
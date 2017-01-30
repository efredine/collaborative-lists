module.exports = {
    yelp: {
        consumer_key: process.env.YELP_CONSUMER_KEY,
        consumer_secret: process.env.YELP_CONSUMER_SECRET,
        token: process.env.YELP_TOKEN,
        token_secret: process.env.YELP_TOKEN_SECRET
    },
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
module.exports = {
    jwtSecret: process.env.JWT_SECRET || "need to define a secret",
    jwtSession: {
        session: false
    }
};
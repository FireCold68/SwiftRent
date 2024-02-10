const { expressjwt: expressjwt } = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    const api = process.API_URL;
    return expressjwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked,
    }).unless({
        path: [
            { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
            { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
            { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
            `${api}/users/login`,
            `${api}/users/register`,
            `${api}/users/get/count`,
        ]
    })
}

async function isRevoked(req, token){
    if (!token.payload.isAdmin){
        return true;
    }
}
module.exports = authJwt;
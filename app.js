require('dotenv').config();
const express = require('express');
const app = express();
const {auth} = require('express-openid-connect');
const allowedUsers = process.env.ALLOWED_LOGINS.split(',');

app.use(
    auth({
        authRequired: false,
        auth0Logout: true,
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        baseURL: process.env.BASE_URL,
        clientID: process.env.CLIENT_ID,
        secret: process.env.SECRET
    })
);

function authorized(req) {
    if (req.oidc.isAuthenticated() && req.oidc.user.email_verified && allowedUsers.includes(req.oidc.user.email))
        return req.oidc.user.email;
    else
        return false;
}

app.get('/', (req, res) => {
    if (req.oidc.isAuthenticated()) {
        res.send(`
            Logged in<br>
            <br>
            <a href="/profile">See profile</a><br>
            <a href="/authorized">Authorized?</a><br>
            <a href="/logout">Logout</a><br>
        `);

    } else {
        res.send(`
            Logged out<br>
            <br>
            <a href="/login">Login</a><br>
        `);
    }
});

app.get('/authorized', (req, res) => {
    const userName = authorized(req, res);
    if (userName)
        res.send(userName);
    else
        res.sendStatus(401);
});

app.get('/profile', (req, res) => {
    res.send(
        'Logged in<br><br><pre>' +
        JSON.stringify(req.oidc.user, null, 2) +
        `</pre><br>
        <a href="/logout">Logout</a><br>`
    );
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

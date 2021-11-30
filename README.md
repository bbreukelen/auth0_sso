### Ready to use express Authentication implementation

This is a ready to use node express application that allows for authentication and authorization using Google accounts on auth0.  
The implementation shows a login link.  
The login link sends you to an open auth authentication page which allows for logging in with Google.  
You can specify known google account names and restrict access to those accounts with a single line of code in an express route.  
   
##### How to implement  
```console
git clone https://github.com/bbreukelen/auth0_sso.git
cd auth0_sso
npm install
cp DOTenv.sample to .env
openssl rand -hex 32
```

Copy/paste the 32-digit secret into .env SECRET.  
Go to auth0.com and register for an account or login.
Applications > create application > regular web application > node.js > integrate > save  
Copy the domain and client_id into .env ISSUER_BASE_URL and CLIENT_ID.  
Add allowed users to .env ALLOWED_LOGINS.

```console
npm start
```

Open http://localhost:3000 in your browser



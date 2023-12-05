// install bcrypt and express-session by ("npm install bcrypt express-session connect-mongo")
/*const { URL } = require('url');
const { Response } = require('node-fetch');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const MongoDBStore = connectMongo(expressSession);
dotenv.config();

const connectionString = process.env.CONNECTION_STRING;
const MongoClient = require('mongodb').MongoClient;
const dbName = "handcrafted-haven";

const sessionSecret = process.env.SESSION_SECRET || 'your-secret-key';

class DBConnection {
    

    async createUser(username, password) {
        const hashedPassword = await bcrypt.hash(password, 10); // Hashed the password using bcrypt
        const user = { username, password: hashedPassword };
        return await this.createDocument('users', user);
    }

    async loginUser(username, password) {
        const user = await this.queryCollection('users', { username });

        if (user.length === 1 && await bcrypt.compare(password, user[0].password)) {
            return user;
        } else {
            return null;
        }
    }


}

const dbConnection = new DBConnection();

const sessionStore = new MongoDBStore({
    client: new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }),
    dbName: dbName,
    collection: 'sessions',
    ttl: 60 * 60 * 24, // Session expiration time in seconds (1 day)
});

export const config = {
    api: {
        bodyParser: false,
    },
};

const sessionMiddleware = expressSession({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 60 * 60 * 24 * 1000, // Cookie expiration time in milliseconds (1 day)
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        sameSite: 'strict',
    },
});

export default async function handler(req, res) {
    await sessionMiddleware(req, res);

    if (req.method === 'POST') {
        // API route for user registration (create account)
        const { username, password } = await req.body;
        await dbConnection.init();
        const result = await dbConnection.createUser(username, password);

        if (result.insertedCount === 1) {
            res.status(201).json({ success: true });
        } else {
            res.status(500).json({ success: false, error: 'User registration failed' });
        }
    } else if (req.method === 'PUT') {
        // API route for user login
        const { username, password } = await req.body;
        await dbConnection.init();
        const user = await dbConnection.loginUser(username, password);

        if (user) {
            req.session.user = user; // Store user data in the session
            res.status(200).json({ success: true, user });
        } else {
            res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
    } else if (req.method === 'GET') {
        // Additional API route for fetching product reviews
        const { searchParams } = new URL(req.url);
        const productId = searchParams.get('productId');
        const reviews = await dbConnection.queryCollection('reviews', { productId });
        res.status(200).json({ reviews });
    } else {
        res.status(405).end(); // Method not allowed
    }
}
*/
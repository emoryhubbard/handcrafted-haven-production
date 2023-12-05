const dotenv = require('dotenv');
dotenv.config();

const connectionString = process.env.CONNECTION_STRING;
const MongoClient = require('mongodb').MongoClient;
const dbName = "handcrafted-haven";

export default class DBConnection {
    constructor() {
        this.client = null;
    }
    async init(callback = this.doNothing) {
        if (this.client != null) {
            console.log('Be aware that database connection is already initialized');
            callback()
            return;
        }
        this.client = new MongoClient(connectionString);
        await this.client.connect();
        callback();
    }
    doNothing() {}
    getClient() {
        if (this.client == null)
            throw Error('Database connection not initialized, call init() first');
        return this.client;
    }
    async queryCollection(collection, query = null) {
        this.initIfNeeded();
        if (query == null) {
            const cursor = this.client.db(dbName).collection(collection).find();
            return await cursor.toArray();
        }
        const cursor = this.client.db(dbName).collection(collection).find(query);
        return await cursor.toArray();
    }
    async initIfNeeded() {
        if (this.client == null)
            await this.init();
    }
    async createDocument(collection, json) {
        this.initIfNeeded();
        const cursor = await this.client.db(dbName).collection(collection).insertOne(json);
        console.log("createDocument cursor: ", cursor);
        return cursor;
    }
    async updateDocument(query, collection, json) {
        this.initIfNeeded();
        const cursor = await this.client.db(dbName).collection(collection).replaceOne(query, json);
        console.log("updateDocument cursor: ", cursor);
        return cursor;
    }
    async deleteDocument(query, collection) {
        this.initIfNeeded();
        const cursor = await this.client.db(dbName).collection(collection).deleteOne(query);
        console.log("deleteDocument cursor: ", cursor);
        return cursor;
    }
    async insertDocByIntId(collection, doc) {
        this.initIfNeeded()
        let results = null

        for (let i=0; i<1; i++) {
            try {
                let highDoc = await this.client.db(dbName).collection(collection).findOne({}, { sort: { _id: -1 } })
            if (highDoc._id)
                doc._id = highDoc._id + 1
            if (!highDoc._id)
                doc._id = 1
            }
            catch (e) {
                console.log("When Calling Find, got an eror: " + e)
            }
            try {   
                results =  await this.client.db(dbName).collection(collection).insertOne(doc);
            }
            catch (e) {
                console.log("When Calling InsertOne, got an error: " + e)
            }
        }
        return results;
    }
    async search(collection, text) {
        await this.client.db(dbName).collection(collection).createIndex({name:"text", description:"text"})
        let results
        results = this.client.db(dbName).collection(collection).find({$text:{$search: text}})
        return results
    }
}

            /*if( results.hasWriteError() ) {
                if( results.writeError.code == 11000 )
                    continue;
                else
                    print( "unexpected error inserting data: " + tojson( results ) );
            }*/
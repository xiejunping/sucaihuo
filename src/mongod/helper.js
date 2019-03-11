const MongoClient = require('mongodb').MongoClient;
const {url, database} = require('./config');

class MongoDB {
    // 单例
    static getInstance () {
        if (MongoDB.instance) return MongoDB.instance;
        MongoDB.instance = new MongoDB();
    }

    constructor () {
        this.client = null; // 多次连接共享
    }

    connect () {
        return new Promise((resolve, reject) => {
            if (this.client) resolve(this.client);
            const client = new MongoClient(url);
            client.connect((err, client) => {
                err && reject(err);
                console.log('Connected Mongodb to Server');

                this.client = client.db(database);
                resolve(this.client);
            });
        })
    }

    insert (tableName, rowInfo) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                db.collection(tableName).insertMany(rowInfo, (err, rs) => {
                    err && reject(err);
                    resolve(rs);
                });
            });
        })
    }
}

module.exports = MongoDB.getInstance();
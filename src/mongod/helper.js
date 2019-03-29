const Config = require('./config');
const MongoClient = require('mongodb').MongoClient;

class MongoDB {
    // 单例
    static getInstance () {
        if (!MongoDB.instance) MongoDB.instance = new MongoDB(Config);
        return MongoDB.instance;
    }

    constructor ({url, database}) {
        this.url = url;
        this.database = database;
        this.client = null; // 多次连接共享
    }

    connect () {
        return new Promise((resolve, reject) => {
            if (this.client) resolve(this.client);
            const client = new MongoClient(this.url);
            client.connect((err, client) => {
                err && reject(err);
                console.log('Connected Mongodb to Server');

                this.client = client.db(this.database);
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
            }).catch(err => {
                console.log(err);
            });
        })
    }
}

module.exports = MongoDB.getInstance();

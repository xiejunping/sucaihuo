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

    connect (url, dbName) {
        return new Promise((resolve, reject) => {
            if (this.client) resolve(this.client);
            const client = new MongoClient(url, { useNewUrlParser: true });
            client.connect((err, pool) => {
                console.log(err, pool)
                if (err) reject(err);
                else {
                    console.log('Connected Mongodb to Server');
                    this.client = pool.db(dbName);
                    resolve(this.client);
                }
            });
        })
    }

    insert (tableName, rowInfo) {
        return new Promise((resolve, reject) => {
            this.connect(this.url, this.database).then(db => {
                db.collection(tableName).insertMany(rowInfo, (err, rs) => {
                    if (err) reject(err);
                    else resolve(rs);
                });
            }).catch(err => {
                console.log(err);
            });
        })
    }
}

module.exports = MongoDB.getInstance();

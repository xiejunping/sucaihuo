const dev = {
    url: 'mongodb://118.25.36.124:27017',
    // url: 'mongodb://127.0.0.1:27017', // 正式环境上要用127 'Cannot read property 'db' of null'
    database: 'wapman'
};

const prod = {
    url: 'mongodb://127.0.0.1:27017',
    database: 'wapman'
};

module.exports = process.env.NODE_ENV === 'production' ? prod : dev;

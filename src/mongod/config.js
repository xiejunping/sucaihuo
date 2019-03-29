const dev = {
    url: 'mongodb://jsvue.cn:27017',
    database: 'wapman'
};

const prod = {
    url: 'mongodb://127.0.0.1:27017',
    database: 'wapman'
};

module.exports = process.env.NODE_ENV === 'production' ? prod : dev;

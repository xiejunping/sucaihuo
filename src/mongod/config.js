const dev = {
    url: 'mongodb://jsvue.cn:27017',
    database: 'wapman'
};

const prod = {
    url: '',
    database: ''
};

module.exports = process.env.NODE_ENV === 'production' ? prod : dev;

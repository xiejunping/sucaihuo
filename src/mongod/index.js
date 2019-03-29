const Mongoose = require('./helper');

const data = [
    {
        url: 'https://www.oschina.net/news/104997/vsc-1-32-released',
        desc: '',
        text: ' www.oschina.net',
        title: '# Visual Studio Code 1.32 发布2019-03-11'
    }
];

const mp = async () => {
    const a = await Mongoose.insert('news', data);
};

mp()

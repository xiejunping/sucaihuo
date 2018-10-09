const Mysql = require('./helper');
const DB = new Mysql('wap_login');

const loginControl = {
    insertBillion: async () => {
        let begin = 946828800
        for (let i = 0; i < 40000; i++) {
            begin += 40000
            const sqlMod = `insert into wap_login set uid = 2 , name = 'cabber' , creat_date = FROM_UNIXTIME(${begin})`
            await DB.queryStr(sqlMod)
        }
    }
}

loginControl.insertBillion()



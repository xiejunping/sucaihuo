const fs = require('fs');
const path = require('path');
const DATA1 = require('../../data/json.json');
const { formatDate } = require('../../common/utils');

const { data } = DATA1
const ad_data = data.list.filter(ret => ret.level === 1).map(ret => {
    return {
        parent: 0,
        level: 1,
        id: ret.industry_id,
        value: ret.industry_name,
    }
})
const se_data = data.list.filter(ret => ret.level === 2)
const th_data = data.list.filter(ret => ret.level === 3)

const final_data = ad_data.map(ret => {
    ret.children = se_data.filter(met => met.first_industry_id === ret.id).map(met => {
        return {
            parent: ret.id,
            level: 2,
            id: met.industry_id,
            value: met.industry_name,
            children: th_data.filter(net => net.second_industry_id === met.industry_id).map(net => {
                return {
                    parent: met.industry_id,
                    level: 3,
                    id: net.industry_id,
                    value: net.industry_name,
                    children: []
                }
            })
        }
    })
    return ret
})

// 写入文件
fs.writeFile(path.resolve(__dirname, '../../data/json1.json'), JSON.stringify(final_data), error => {
    if (error) return console.log("写入文件失败,原因是" + error.message);
    console.log('写入成功', formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss.S'));
});
const OpenCC = require('opencc')
const opencc = new OpenCC('s2tw.json')

const a = [
    '充值成功',
    '您已成功充值',
    '提现成功',
    '您已成功提现',
    '中奖信息',
    '恭喜您在游戏 - 第  期 - 中奖  元宝  开奖结果为：',
    '已封盘，下注结果以系统开奖为标准，如有异议，请及时联系客服。',
    '大宝小来黑猫白猫平局',
    '新开一局，现在可以开始下注了^_^',
    '跷跷板 黑白猫',
    '用户投注了'
]

for(const v of a) {
    console.log(opencc.convertSync(v))
}

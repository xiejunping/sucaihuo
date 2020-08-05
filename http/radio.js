/* Cabber create 2020/8/4  */

const APIClient = require('./request.class');

const Model = {
    /**
     * 签到
     * @param {String} cookies
     * @return {Object} 
     */
    async signDay(cookies) {
        const Api = new APIClient({
            url: 'http://wx.hnradio.com/user/goSign?key=ed67d43813c2f54feb585aebc2351c3f',
            method: 'POST',
            cookies: cookies,
        })
        try {
            return res = await Api.reqText();
        } catch (err) {
            this.handleError(err);
        }
    },
    /**
     * 进入签到页
     * @param {String} cookies 
     * @return {Object} res
     */
    async getSignCode(cookies) {
        const Api = new APIClient({
            url: 'http://wx.hnradio.com/user/sign?key=ed67d43813c2f54feb585aebc2351c3f',
            cookies: cookies,
        });
        try {
            return res = await Api.htmlWX();
        } catch (err) {
            this.handleError(err);
        }
    },
    /**
     * 请求错误后提示
     * @param {Object} error
     */
    handleError(error) {
        console.log(error);
    },
};

module.exports = Model;
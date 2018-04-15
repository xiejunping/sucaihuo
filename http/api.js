/* Cobbler create 2018/4/2 */

const APIClient = require('./request.class');

const Model = {
    /**
     * 用户登陆
     * @param {Object} params
     * @return {Object} res
     */
    async userLogin(params) {
        const Api = new APIClient({
            url: '/Login/check',
            data: params,
            method: 'POST',
        });
        try {
            return res = await Api.req();
        } catch (err) {
            this.handleError(err);
        }
    },
    /**
     * 答到
     * @param {String} key
     * @param {String} cookies
     * @return {Object} res
     */
    async signDay(key, cookies) {
        const Api = new APIClient({
            url: '/Member/signDay',
            data: {key},
            cookies: cookies,
            method: 'POST',
        });
        try {
            return res = await Api.reqText();
        } catch (err) {
            this.handleError(err);
        }
    },
    /**
     * 获取答到用的KEY
     * @param {Sting} cookies
     * @return {Object} res
     */
    async getSignCode(cookies) {
        const Api = new APIClient({
            url: '/member/sign.html',
            cookies: cookies,
        });
        try {
            return res = await Api.html();
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

/* Cobbler create 2018/4/2 */

const APIClient = require('./request.class');

const Model = {
    async userLogin(params) {
        const Api = new APIClient({
            url: '/Login/check',
            data: params,
            method: 'POST'
        });
        try {
            return res = await Api.Req();
        } catch (err) {
            this.handleError(err);
        }
    },
    async signDay(key, cookies) {
        const Api = new APIClient({
            url: '/Member/signDay',
            data: {key},
            cookies: cookies,
            method: 'POST'
        });
        try {
            return res = await Api.ReqText();
        } catch (err) {
            this.handleError(err);
        }
    },
    async getSignCode(cookies) {
        const Api = new APIClient({
            url: '/member/sign.html',
            cookies: cookies
        });
        try {
            return res = await Api.Html();
        } catch (err) {
            this.handleError(err);
        }
    },
    handleError(error) {
        console.log(error);
    }
};

module.exports = Model;
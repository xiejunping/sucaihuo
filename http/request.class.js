/* Cobbler create 2018/4/2 */

const fetch = require('node-fetch');
const FormData = require('form-data');
const URLSearchParams = require('url').URLSearchParams;
const config = require('../config/fetch.config');

/**
 * Http 请求类
 */
class APIClient {
    /**
     * 构造方法
     * @param {Object} params 请求参数
     */
    constructor({url, data, timeout, cookies, method}) {
        const reg = new RegExp(/^((https|http)?:\/\/)[^\s]+/);

        this.url = reg.test(url) ? url : config.host + url;
        this.data = data;
        this.cookies = cookies;
        this.method = method || 'GET';
        this.timeout = timeout || 60000;
        this.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': this.cookies,
        };
    }

    /**
     * 请求参数初始化
     * @return {Objcet} params
     */
    init() {
        const params = {
            method: this.method,
            body: this.data,
            timeout: this.timeout,
            headers: this.headers,
        };
        return params;
    }

    /**
     * plain text or html
     * @return {String} text
     */
    async html() {
        const response = await fetch(this.url, {
            headers: this.headers,
        });
        if (response.status !== 200) throw new Error(response.statusText);
        return await response.text();
    }

    /**
     * plain text or html by weixin
     * @return {String} text
     */
    async htmlWX() {
        const cookie = {}
        const { Headers } = fetch;
        const headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; GM1900 Build/QKQ1.190716.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045227 Mobile Safari/537.36 MMWEBID/6040 MicroMessenger/7.0.17.1720(0x27001137) Process/tools WeChat/arm64 NetType/WIFI',
            'Cookie': this.cookies,
        });
        const response = await fetch(this.url, { headers });
        if (response.status !== 200) throw new Error(response.statusText);
        if (response.status !== 200) throw new Error(response.statusText);
        for (const header of response.headers) {
            const index = header.findIndex((ret) => ret === 'set-cookie');
            if (index > -1) {
                const [, value] = header;
                cookie.cookie = await this.setCookie(value);
                break;
            }
        }
        return Object.assign({}, { html: await response.text() }, cookie);
    }

    /**
     * return text or html
     * @return {String} text
     */
    async reqText() {
        const urls = new URLSearchParams();
        const params = this.init();

        for (const key in params.body) {
            if ({}.hasOwnProperty.call(params.body, key)) {
                urls.append(key, params.body[key]);
            }
        }
        params.body = urls;

        const response = await fetch(this.url, params);
        if (response.status !== 200) throw new Error(response.statusText);
        return await response.text();
    }

    /**
     * post with normal
     * @return {Json} res
     */
    async req() {
        const cookie = {cookie: this.cookies};
        const params = this.init();
        const urls = new URLSearchParams();

        for (const key in params.body) {
            if ({}.hasOwnProperty.call(params.body, key)) {
                urls.append(key, params.body[key]);
            }
        }
        params.body = urls;

        const response = await fetch(this.url, params);
        if (response.status !== 200) throw new Error(response.statusText);

        for (const header of response.headers) {
            const index = header.findIndex((ret) => ret === 'set-cookie');
            if (index > -1) {
                const [, value] = header;
                cookie.cookie = await this.setCookie(value);
                break;
            }
        }
        return Object.assign({}, await response.json(), cookie);
    }

    /**
     * post with form-data
     * @return {Json} res
     */
    async reqFData() {
        const params = this.init();
        const form = new FormData();

        for (const key in params.body) {
            if ({}.hasOwnProperty.call(params.body, key)) {
                form.append(key, params.body[key]);
            }
        }
        params.headers = form.getHeaders();
        params.body = form;

        const response = await fetch(this.url, params);
        if (response.status !== 200) throw new Error(response.statusText);
        return await response.json();
    }

    /**
     * post with json
     * @return {Json} res
     */
    async reqJson() {
        const params = this.init();
        params.headers = {'Content-Type': 'application/json'};
        params.body = JSON.stringify(this.body);

        const response = await fetch(this.url, params);
        if (response.status !== 200) throw new Error(response.statusText);
        return await response.json();
    }

    /**
     * set cookie
     * @param {String} value 头部信息
     * @return {String} cookie
     */
    async setCookie(value) {
        const regexp = new RegExp(/((expires)+(=)+(.){29}(;){1})/gi);
        const cook = value.replace(regexp, '').split(',');

        const cookie = cook.map((t) => {
            return t.trim().split(';')[0];
        });
        return cookie.join(';');
    }
}

module.exports = APIClient;

/* Cobbler create 2018/4/2 */

const fetch = require('node-fetch');
const formData = require('form-data');
const URLSearchParams = require('url').URLSearchParams;
const config = require('../config/fetch.config');

class APIClient {

    constructor ({url, data, timeout, cookies, method}) {
        const reg = new RegExp(/^((https|http)?:\/\/)[^\s]+/);

        this.url = reg.test(url) ? url : config.host + url;
        this.data = data;
        this.cookies = cookies;
        this.method = method || 'GET';
        this.timeout = timeout || 60000;
        this.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': this.cookies
        };
    }

    // 请求参数
    init () {
        const params = {
            method: this.method,
            body: this.data,
            timeout: this.timeout,
            headers: this.headers
        };
        return params;
    }

    // plain text or html
    async Html () {
        const response = await fetch(this.url, {
            headers: this.headers
        });
        if (response.status !== 200) throw new Error(response.statusText);
        return await response.text();
    }

    // return text or html
    async ReqText () {
        const urls = new URLSearchParams();
        const params = this.init();

        for(const key in params.body) {
            urls.append(key, params.body[key]);
        }
        params.body = urls;

        const response = await fetch(this.url, params);
        if (response.status !== 200) throw new Error(response.statusText);
        return await response.text();
    }

    // post with normal
    async Req () {
        const cookie = {cookie: this.cookies};
        const params = this.init();
        const urls = new URLSearchParams();

        for(const key in params.body) {
            urls.append(key, params.body[key]);
        }
        params.body = urls;

        const response = await fetch(this.url, params);
        if (response.status !== 200) throw new Error(response.statusText);

        for(const header of response.headers) {
            const index = header.findIndex(ret => ret === 'set-cookie');
            if (index > -1) {
                const [key, value] = header;
                cookie.cookie = await this.SetCookie(value);
                break;
            }
        }
        return Object.assign({}, await response.json(), cookie);
    }

    // post with form-data
    async ReqFData () {
        const params = this.init();
        const form = new formData();

        for(const key in params.body) {
            form.append(key, params.body[key]);
        }
        params.headers = form.getHeaders();
        params.body = form;

        const response = await fetch(this.url, params);
        if (response.status !== 200) throw new Error(response.statusText);
        return await response.json();
    }

    // post with json
    async ReqJson () {
        const params = this.init();
        params.headers = {'Content-Type': 'application/json'};
        params.body = JSON.stringify(this.body);

        const response = await fetch(this.url, params);
        if (response.status !== 200) throw new Error(response.statusText);
        return await response.json();
    }

    // set cookie
    async SetCookie (value) {
        const regexp = new RegExp(/((expires)+(=)+(.){29}(;){1})/gi);
        const cook = value.replace(regexp, '').split(',');

        const cookie = cook.map(t => {
            return t.trim().split(';')[0];
        });
        return cookie.join(';');
    }
}

module.exports = APIClient;
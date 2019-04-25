"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var HttpService = (function () {
    function HttpService(http) {
        // this.passHeader.append('Access-Control-Allow-Credentials', 'true');
        // this.passHeader.append('Access-Control-Allow-Origin', '*');
        // this.passHeader.append('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,PATCH,OPTIONS');
        // this.passHeader.append('Content-Type', 'application/json;charset=utf-8');
        this.http = http;
        this.passHeader = new http_1.Headers();
    }
    HttpService.prototype.getData = function (conf) {
        return this.requestFn('get', conf);
    };
    HttpService.prototype.postData = function (conf) {
        return this.requestFn('post', conf);
    };
    HttpService.prototype.deleteData = function (conf) {
        return this.requestFn('delete', conf);
    };
    HttpService.prototype.patchData = function (conf) {
        return this.requestFn('patch', conf);
    };
    HttpService.prototype.putData = function (conf) {
        return this.requestFn('put', conf);
    };
    HttpService.prototype.getHeader = function (newHeader) {
        if (newHeader) {
            for (var _i = 0, newHeader_1 = newHeader; _i < newHeader_1.length; _i++) {
                var key = newHeader_1[_i];
                this.passHeader.append(key, newHeader[key]);
            }
        }
        if (localStorage.getItem('Authorization')) {
            this.passHeader.set('Authorization', localStorage.getItem('Authorization'));
        }
        // console.log('header:', this.passHeader);
        return this.passHeader;
    };
    HttpService.prototype.setHttpMath = function (obj) {
        var temp = obj || {};
        temp['_time'] = Math.random().toString();
        return temp;
    };
    HttpService.prototype.updateHeaderStorage = function (response) {
        if (response && response.headers.get('Authorization')) {
            localStorage.setItem('Authorization', response.headers.get('Authorization'));
        }
    };
    HttpService.prototype.requestFn = function (method, conf) {
        var _this = this;
        var url = conf.url;
        var data = conf.data;
        var search = conf.search || {};
        var options = {
            headers: this.getHeader(conf.header || null),
            search: this.setHttpMath(search),
        };
        if (conf.responseType) {
            options['responseType'] = conf.responseType;
        }
        // if (!data) {
        //   data = options;
        //   options = null;
        // }
        var successReg = new RegExp(/^2\d\d$/);
        var _m;
        if (method.toLocaleLowerCase() !== 'get') {
            if (url.indexOf('?') === -1) {
                url += '?_time=' + Math.random().toString();
            }
            else {
                url += '&_time=' + Math.random().toString();
            }
        }
        switch (method.toLocaleLowerCase()) {
            case 'get':
                return this.http.get(url, options).map(function (response) {
                    _this.updateHeaderStorage(response);
                    if (response && successReg.test(response.status)) {
                        if (response['_body']) {
                            return response.json && response.json();
                        }
                        else {
                            return response;
                        }
                    }
                    else {
                        throw response;
                    }
                });
            case 'delete':
                return this.http.delete(url, options).map(function (response) {
                    _this.updateHeaderStorage(response);
                    if (response && successReg.test(response.status)) {
                        if (response['_body']) {
                            return response.json && response.json();
                        }
                        else {
                            return response;
                        }
                    }
                    else {
                        throw response;
                    }
                });
            case 'post':
                return this.http.post(url, data, options).map(function (response) {
                    _this.updateHeaderStorage(response);
                    if (response && successReg.test(response.status)) {
                        if (response['_body']) {
                            return response.json && response.json();
                        }
                        else {
                            return response;
                        }
                    }
                    else {
                        throw response;
                    }
                });
            case 'put':
                return this.http.put(url, data, options).map(function (response) {
                    _this.updateHeaderStorage(response);
                    if (response && successReg.test(response.status)) {
                        if (response['_body']) {
                            return response.json && response.json();
                        }
                        else {
                            return response;
                        }
                    }
                    else {
                        throw response;
                    }
                });
            case 'patch':
                return this.http.patch(url, data, options).map(function (response) {
                    _this.updateHeaderStorage(response);
                    if (response && successReg.test(response.status)) {
                        if (response['_body']) {
                            return response.json && response.json();
                        }
                        else {
                            return response;
                        }
                    }
                    else {
                        throw response;
                    }
                });
        }
        return null;
    };
    HttpService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    HttpService.ctorParameters = function () { return [
        { type: http_1.Http, },
    ]; };
    return HttpService;
}());
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map
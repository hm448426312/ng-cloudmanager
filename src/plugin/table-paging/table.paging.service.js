"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var _ = require("lodash");
var TablePagingService = (function () {
    function TablePagingService() {
    }
    TablePagingService.prototype.filterTableData = function (value, filter, sort) {
        filter = filter || null;
        sort = sort || null;
        value = _.cloneDeep(value);
        var result = [];
        if (value) {
            if (sort && sort.value) {
                value.sort(function (a, b) {
                    var res = sort.value === 'asc' ? a[sort.key] > b[sort.key] : b[sort.key] > a[sort.key];
                    return res ? 1 : 0;
                });
            }
            if (filter && filter.key && filter.key.length > 0) {
                var keys = filter.key;
                var values = filter.value;
                var matchs = filter.match;
                if (keys.length > 0) {
                    for (var j = 0; j < value.length; j++) {
                        var list = value[j];
                        var flag = true;
                        for (var i = 0; i < keys.length; i++) {
                            if (matchs[i] && matchs[i] == 'full') {
                                if (list[keys[i]] != list[values[i]]) {
                                    flag = false;
                                    break;
                                }
                            }
                            else {
                                if (list[keys[i]].indexOf && list[keys[i]].indexOf(values[i]) === -1) {
                                    flag = false;
                                    break;
                                }
                            }
                        }
                        if (flag) {
                            result.push(list);
                        }
                    }
                }
            }
            else {
                result = value;
            }
        }
        return result;
    };
    TablePagingService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    TablePagingService.ctorParameters = function () { return []; };
    return TablePagingService;
}());
exports.TablePagingService = TablePagingService;
//# sourceMappingURL=table.paging.service.js.map
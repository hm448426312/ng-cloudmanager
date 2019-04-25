"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var _ = require("lodash");
var FilterSearchPipe = (function () {
    function FilterSearchPipe() {
    }
    FilterSearchPipe.prototype.transform = function (value, key, val, len) {
        var formatKey = key || '';
        var formatVal = val || '';
        var argValue = [];
        if (value) {
            argValue = _.cloneDeep(value);
        }
        var tempVal = [];
        if (formatKey && formatVal) {
            tempVal = _.filter(argValue, function (o) {
                if (o[formatKey].indexOf(val) != -1) {
                    return o;
                }
            });
        }
        else {
            tempVal = argValue;
        }
        if (len && tempVal.length > len) {
            return tempVal.slice(0, len);
        }
        return tempVal;
    };
    FilterSearchPipe.decorators = [
        { type: core_1.Pipe, args: [{ name: 'arrFilter' },] },
    ];
    /** @nocollapse */
    FilterSearchPipe.ctorParameters = function () { return []; };
    return FilterSearchPipe;
}());
exports.FilterSearchPipe = FilterSearchPipe;
//# sourceMappingURL=filter.search.pipe.js.map
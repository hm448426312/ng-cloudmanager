"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
var DcEventService = (function () {
    function DcEventService() {
        this._eventBus = new rxjs_1.Subject();
    }
    DcEventService.prototype.broadcast = function (key, data) {
        this._eventBus.next({ key: key, data: data });
    };
    DcEventService.prototype.on = function (key) {
        return this._eventBus.asObservable().filter(function (event) { return event.key === key; }).map(function (event) { return event.data; });
    };
    DcEventService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DcEventService.ctorParameters = function () { return []; };
    return DcEventService;
}());
exports.DcEventService = DcEventService;
//# sourceMappingURL=broadcast.service.js.map
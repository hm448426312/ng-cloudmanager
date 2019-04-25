"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TabContentDirective = (function () {
    function TabContentDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    TabContentDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[dcTabContentHost]'
                },] },
    ];
    /** @nocollapse */
    TabContentDirective.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef, },
    ]; };
    return TabContentDirective;
}());
exports.TabContentDirective = TabContentDirective;
//# sourceMappingURL=tab.directive.js.map
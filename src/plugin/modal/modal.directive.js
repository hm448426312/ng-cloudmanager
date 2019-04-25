"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ModalContainerDirective = (function () {
    function ModalContainerDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    ModalContainerDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[dcModalContainerHost]'
                },] },
    ];
    /** @nocollapse */
    ModalContainerDirective.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef, },
    ]; };
    return ModalContainerDirective;
}());
exports.ModalContainerDirective = ModalContainerDirective;
//# sourceMappingURL=modal.directive.js.map
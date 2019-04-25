"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modal_service_1 = require("../modal/modal.service");
var modal_tip_component_1 = require("./modal.tip.component");
var ModalTipService = (function () {
    function ModalTipService(modal) {
        this.modal = modal;
    }
    ModalTipService.prototype.openTip = function (config) {
        var result = this.modal.open({
            id: config.id || 'modal-tip-outer',
            component: modal_tip_component_1.ModalTipComponent,
            title: config.title || '',
            width: config.width || '450px',
            data: config,
            noHeaderShadow: true,
            handler: function (btn) {
                if (config.handler) {
                    config.handler(btn);
                }
                result.modalInstance.hide();
            },
            backdropCloseable: config.backdropCloseable || false
        });
        return result;
    };
    ModalTipService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ModalTipService.ctorParameters = function () { return [
        { type: modal_service_1.ModalService, },
    ]; };
    return ModalTipService;
}());
exports.ModalTipService = ModalTipService;
//# sourceMappingURL=modal.tip.service.js.map
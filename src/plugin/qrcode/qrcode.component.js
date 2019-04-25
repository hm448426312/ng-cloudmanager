"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modal_service_1 = require("../modal/modal.service");
var show_qrcode_component_1 = require("./show.qrcode.component");
var QrcodeComponent = (function () {
    function QrcodeComponent(el, renderer, modal) {
        this.el = el;
        this.renderer = renderer;
        this.modal = modal;
    }
    QrcodeComponent.prototype.ngOnInit = function () {
    };
    QrcodeComponent.prototype.expandSize = function () {
        var data = {
            data: this.data
        };
        this.modal.open({
            title: '领取码',
            component: show_qrcode_component_1.ShowQrcodeComponent,
            backdropCloseable: false,
            width: '340px',
            data: data
        });
    };
    QrcodeComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-qrcode',
                    template: "\n    <div (click)=\"expandSize()\" class=\"qrcode-container\">\n      <img *ngIf=\"showImg\" [height]=\"size || 30\" [width]=\"size || 30\" [src]=\"showImg\"/>\n      <qr-code *ngIf=\"!showImg\" [value]=\"data\" [size]=\"size\"></qr-code>\n    </div>\n  ",
                    styles: [
                        "\n      .qrcode-container {\n        cursor: pointer;\n        display: inline-block;\n      }\n    "
                    ]
                },] },
    ];
    /** @nocollapse */
    QrcodeComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.Renderer2, },
        { type: modal_service_1.ModalService, },
    ]; };
    QrcodeComponent.propDecorators = {
        "showImg": [{ type: core_1.Input },],
        "data": [{ type: core_1.Input },],
        "size": [{ type: core_1.Input },],
    };
    return QrcodeComponent;
}());
exports.QrcodeComponent = QrcodeComponent;
//# sourceMappingURL=qrcode.component.js.map
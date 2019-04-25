"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ShowQrcodeComponent = (function () {
    function ShowQrcodeComponent() {
        this.data = {};
    }
    ShowQrcodeComponent.prototype.ngOnInit = function () {
    };
    ShowQrcodeComponent.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <div class=\"show-qrcode-container\">\n      <img height=\"300\" width=\"300\" [src]=\"data.src\" *ngIf=\"data.src\">\n      <qr-code [value]=\"data.data\" [size]=\"300\" *ngIf=\"data.data\"></qr-code>\n    </div>\n  ",
                    styles: [
                        "\n      .show-qrcode-container {\n        margin: 20px;\n      }\n    "
                    ]
                },] },
    ];
    /** @nocollapse */
    ShowQrcodeComponent.ctorParameters = function () { return []; };
    return ShowQrcodeComponent;
}());
exports.ShowQrcodeComponent = ShowQrcodeComponent;
//# sourceMappingURL=show.qrcode.component.js.map
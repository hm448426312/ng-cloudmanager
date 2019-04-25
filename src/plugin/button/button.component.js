"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ButtonComponent = (function () {
    function ButtonComponent() {
        this.type = this.type || 1;
    }
    ButtonComponent.prototype.ngOnInit = function () {
    };
    ButtonComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-button',
                    template: "\n    <div class=\"dc-button-container\">\n      <div class=\"{{class}}\" [ngClass]=\"{'disable':disable,'icon':icon?true:false, 'dcButton':type===1, 'cancelButton':type===2}\"\n           [ngStyle]=\"{'background-image':icon?'url('+icon+')':'none'}\">{{text || '\u786E\u5B9A'}}\n      </div>\n    </div>\n  ",
                    styles: [
                        "\n      .dc-button-container {\n        display: inline-table;\n        width: auto;\n        height: 26px;\n      }\n\n      .dcButton {\n        padding: 0 20px;\n        color: #fff;\n        display: table-cell;\n        min-width: 94px;\n        font-size: 14px;\n        height: 26px;\n        line-height: 26px;\n        background: #0081cc;\n        border-radius: 15px;\n        /*box-shadow: 0px 0px 4px 0.1px rgba(0, 0, 0, .2);*/\n        cursor: pointer;\n        vertical-align: top;\n        text-align: center;\n      }\n\n      .dcButton:hover {\n        background: #0067a3;\n        /*box-shadow: 0px 0px 4px 0.8px rgba(0, 0, 0, .2);*/\n      }\n\n      .dcButton:active {\n        box-shadow: none\n      }\n\n      .cancelButton {\n        padding: 0 20px;\n        color: #333;\n        display: table-cell;\n        min-width: 94px;\n        font-size: 14px;\n        height: 26px;\n        line-height: 24px;\n        background: #fff;\n        border-radius: 15px;\n        box-shadow: 0px 0px 4px 0.1px rgba(0, 0, 0, .2);\n        cursor: pointer;\n        vertical-align: top;\n        text-align: center;\n      }\n\n      .cancelButton:hover {\n        color: #0067a3;\n        box-shadow: 0px 0px 4px 0.8px rgba(0, 0, 0, .2);\n      }\n\n      .cancelButton:active {\n        color: #0067a3;\n        box-shadow: 0px 0px 4px 0.8px rgba(0, 0, 0, .2);\n      }\n\n      .dcButton.disable, .cancelButton.disable {\n        cursor: not-allowed;\n        color: #999;\n        background: #e2e2e2;\n        box-shadow: none\n      }\n\n      .dcButton.icon, .cancelButton.icon {\n        background-repeat: no-repeat;\n        background-size: 16px;\n        background-position: 10px 4px;\n        padding-left: 36px;\n      }"
                    ]
                },] },
    ];
    /** @nocollapse */
    ButtonComponent.ctorParameters = function () { return []; };
    ButtonComponent.propDecorators = {
        "icon": [{ type: core_1.Input },],
        "class": [{ type: core_1.Input },],
        "text": [{ type: core_1.Input },],
        "disable": [{ type: core_1.Input },],
        "type": [{ type: core_1.Input },],
        "hideTitle": [{ type: core_1.Input },],
    };
    return ButtonComponent;
}());
exports.ButtonComponent = ButtonComponent;
//# sourceMappingURL=button.component.js.map
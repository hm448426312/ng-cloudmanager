"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NButtonComponent = (function () {
    function NButtonComponent() {
        this.type = this.type || 1;
    }
    NButtonComponent.prototype.ngOnInit = function () {
    };
    NButtonComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-nbutton',
                    template: "\n    <div class=\"dc-nbutton-container\">\n      <div class=\"{{class}}\" [ngClass]=\"{'disable':disable,'icon':icon?true:false, 'dcNButton':type===1, 'cancelNButton':type===2}\"\n           [ngStyle]=\"{'background-image':icon?'url('+icon+')':'none'}\">{{text || '\u786E\u5B9A'}}\n      </div>\n    </div>\n  ",
                    styles: [
                        "\n      .dc-nbutton-container {\n        display: inline-table;\n        width: auto;\n        height: 26px;\n      }\n\n      .dcNButton {\n        padding: 0 20px;\n        display: table-cell;\n         min-width: 94px;\n        font-size: 14px;\n        height: 26px;\n        line-height: 26px;\n        border:0px;\n        border-radius:15px;\n        cursor: pointer;\n        vertical-align: top;\n        text-align: center;\n      }\n\n      .dcNButton:hover {\n        background: #edf0f5;\n        box-shadow: 0px 2px 15px 1px rgba(0, 0, 0, .2);\n      }\n\n      .dcNButton:active {\n        box-shadow: none\n      }\n\n      .cancelNButton {\n        padding: 0 20px;\n        color: #333;\n        display: table-cell;\n         min-width: 94px;\n        font-size: 14px;\n        height: 26px;\n        line-height: 26px;\n        border:0px;\n        border-radius:15px;\n        cursor: pointer;\n        vertical-align: top;\n        text-align: center;\n      }\n\n      .cancelNButton:hover {\n        color: #edf0f5;\n        box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, .2);\n      }\n\n      .cancelNButton:active {\n        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, .2) inset;\n      }\n\n      .dcNButton.disable, .cancelNButton.disable {\n        cursor: default;\n        color: #999;\n        background: #e2e2e2;\n        box-shadow: none\n      }\n\n      .dcNButton.icon, .cancelNButton.icon {\n        background-repeat: no-repeat;\n        background-size: 16px;\n        background-position: 10px 4px;\n        padding-left: 36px;\n      }"
                    ]
                },] },
    ];
    /** @nocollapse */
    NButtonComponent.ctorParameters = function () { return []; };
    NButtonComponent.propDecorators = {
        "icon": [{ type: core_1.Input },],
        "class": [{ type: core_1.Input },],
        "text": [{ type: core_1.Input },],
        "disable": [{ type: core_1.Input },],
        "type": [{ type: core_1.Input },],
    };
    return NButtonComponent;
}());
exports.NButtonComponent = NButtonComponent;
//# sourceMappingURL=nbutton.component.js.map
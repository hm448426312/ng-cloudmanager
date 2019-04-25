"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CheckboxComponent = (function () {
    function CheckboxComponent() {
        this.checkboxId = Math.random().toString().slice(2);
        this.checkboxChangeEvent = new core_1.EventEmitter();
    }
    Object.defineProperty(CheckboxComponent.prototype, "checkModel", {
        get: function () {
            return this._checkModel;
        },
        set: function (v) {
            this._checkModel = v;
        },
        enumerable: true,
        configurable: true
    });
    CheckboxComponent.prototype.ngOnInit = function () {
    };
    CheckboxComponent.prototype.checkModelChange = function (ev) {
        if (this.options && this.options.disabled) {
            return;
        }
        this.checkboxChangeEvent.emit(this.checkModel);
    };
    CheckboxComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-checkbox',
                    template: "\n    <div class=\"dc-checkbox\" *ngIf=\"checkModel\" [style.width]=\"options?.width\" [style.max-width]=\"options?.maxWidth\">\n      <div class=\"dc-checkbox-inner\">\n        <input #labelInput class=\"dc-checkbox-input\" [id]=\"'checkBox'+checkboxId\" [name]=\"'checkBox'+checkboxId\"\n               [disabled]=\"options?.disabled\" type=\"checkbox\"\n               [(ngModel)]=\"checkModel[options?.key || 'checked']\" (ngModelChange)=\"checkModelChange($event)\"/>\n        <label (click)=\"$event.stopPropagation()\" [for]=\"'checkBox'+checkboxId\" class=\"dc-checkbox-label\"></label>\n        <label (click)=\"$event.stopPropagation()\" [for]=\"'checkBox'+checkboxId\" *ngIf=\"options?.text\" class=\"dc-checkbox-text\"\n               [title]=\"options?.text\">{{options?.text}}</label>\n      </div>\n    </div>\n  ",
                    styles: ["\n    .dc-checkbox {\n      position: relative;\n      display: inline-block;\n      min-width: 20px;\n    }\n\n    .dc-checkbox-inner {\n      display: flex;\n      align-items: center;\n      height: 25px;\n      line-height: 25px;\n    }\n\n    .dc-checkbox-input {\n      visibility: hidden;\n      position: absolute;\n      width: 1px !important;\n      height: 1px !important;\n      overflow: hidden;\n    }\n\n    .dc-checkbox-label {\n      position: relative;\n      cursor: pointer;\n      width: 16px;\n      height: 16px;\n      background: #fff;\n      border: 1px solid #c8c8c8;\n      border-radius: 3px; /* W3C syntax */\n      margin: 0;\n      flex: 0 0 auto;\n    }\n\n    .dc-checkbox-label:not(disabled):hover {\n      background: #0081CC;\n    }\n\n    .dc-checkbox-input:disabled:hover + label:hover {\n      background: transparent;\n    }\n\n    .dc-checkbox-label:after {\n      opacity: 0;\n      content: '';\n      position: absolute;\n      top: 3px;\n      left: 3px;\n      width: 9px;\n      height: 5px;\n      background: transparent;\n      border: 2px solid #fff;\n      border-top: none;\n      border-right: none;\n      -webkit-transform: rotate(-45deg);\n      -moz-transform: rotate(-45deg);\n      -o-transform: rotate(-45deg);\n      -ms-transform: rotate(-45deg);\n      transform: rotate(-45deg);\n    }\n\n    .dc-checkbox-label:hover:after {\n      opacity: 0.6;\n    }\n\n    .dc-checkbox-input:disabled,\n    .dc-checkbox-input:disabled + label {\n      cursor: not-allowed;\n      background-color: #f5f5f5;\n      opacity: 0.4;\n    }\n\n    .dc-checkbox-input:disabled {\n      background: #ffffff;\n    }\n\n    .dc-checkbox-input:checked + label {\n      background: #0081CC;\n    }\n\n    .dc-checkbox-input:checked + label:after {\n      opacity: 1.0;\n    }\n\n    .dc-checkbox-text {\n      cursor: pointer;\n      padding: 0 5px;\n      margin: 0 0 0 5px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      flex: 1 1 auto;\n    }\n\n    .dc-checkbox-text:hover {\n      background-color: #edf0f5;\n      /*color: #fff;*/\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    CheckboxComponent.ctorParameters = function () { return []; };
    CheckboxComponent.propDecorators = {
        "options": [{ type: core_1.Input },],
        "checkModel": [{ type: core_1.Input },],
        "labelInput": [{ type: core_1.ViewChild, args: ['labelInput',] },],
        "checkboxChangeEvent": [{ type: core_1.Output },],
    };
    return CheckboxComponent;
}());
exports.CheckboxComponent = CheckboxComponent;
//# sourceMappingURL=checkbox.component.js.map
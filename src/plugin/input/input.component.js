"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var InputComponent = (function () {
    // 双向绑定 --end
    function InputComponent() {
        this.type = 'text';
        this.resize = 'none';
        this.dcBlur = new core_1.EventEmitter();
        this.dcFocus = new core_1.EventEmitter();
        this.dcClick = new core_1.EventEmitter();
        this.dcKeyup = new core_1.EventEmitter();
        this.dcKeyenter = new core_1.EventEmitter();
        this.dcModelChange = new core_1.EventEmitter();
        this.canNum = 0;
        // 双向绑定 --start
        this.onTouchedCallback = function () {
        };
        this.onChangeCallback = function () {
        };
    }
    Object.defineProperty(InputComponent.prototype, "value", {
        get: function () {
            return this.showValue;
        },
        set: function (v) {
            this.showValue = v;
            this.onChangeCallback(this.showValue);
            if (this.dcInput && this.autoFocus) {
                this.dcInput.nativeElement.focus();
            }
        },
        enumerable: true,
        configurable: true
    });
    InputComponent.prototype.ngOnInit = function () {
    };
    InputComponent.prototype.setInputValue = function (val) {
    };
    InputComponent.prototype.setInputValid = function (valid) {
        var classList = this.dcInput.nativeElement.classList;
        if (valid) {
            classList.add('dc-valid');
            classList.remove('dc-invalid');
        }
        else {
            classList.remove('dc-valid');
            classList.add('dc-invalid');
        }
    };
    // 双向绑定 --start
    // 双向绑定 --start
    InputComponent.prototype.registerOnChange = 
    // 双向绑定 --start
    function (fn) {
        this.onChangeCallback = fn;
    };
    InputComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    InputComponent.prototype.writeValue = function (val) {
        this.isNum = parseFloat(this.value);
        if (this.isNum || val == '0') {
            this.value = val || '0';
        }
        else {
            this.value = val || '';
        }
        if (this.type == 'textarea' && this.maxLength) {
            this.canNum = this.value.length;
        }
    };
    // 双向绑定 --end
    // 双向绑定 --end
    InputComponent.prototype.blurEvent = 
    // 双向绑定 --end
    function (ev) {
        this.dcBlur.emit(ev);
    };
    InputComponent.prototype.focusEvent = function (ev) {
        this.dcFocus.emit(ev);
    };
    InputComponent.prototype.clickEvent = function (ev) {
        this.dcClick.emit(ev);
    };
    InputComponent.prototype.keyupEvent = function (ev) {
        if (this.type == 'textarea' && this.maxLength) {
            this.canNum = this.value.length;
            var numtip = this.numtip.nativeElement.classList;
            if (this.canNum >= this.maxLength) {
                numtip.add('tip');
            }
            else {
                numtip.remove('tip');
            }
        }
        this.dcKeyup.emit(ev);
    };
    InputComponent.prototype.modelChange = function (ev) {
        this.dcModelChange.emit(ev);
    };
    InputComponent.prototype.keyenterEvent = function (ev) {
        this.dcKeyenter.emit(ev);
    };
    InputComponent.prototype.clearValue = function () {
        this.value = '';
        this.dcModelChange.emit('');
        this.dcInput.nativeElement.focus();
    };
    InputComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-input',
                    template: "\n    <div style=\"position: relative;\" [style.width]=\"width\">\n      <input *ngIf=\"type == 'text' || type == 'password'\" #dcInput class=\"dc-input-default\" [disabled]=\"disabled\" [readonly]=\"readonly\"\n             [maxlength]=\"maxLength\" [(ngModel)]=\"value\" [type]=\"type\"\n             (click)=\"clickEvent($event)\" (ngModelChange)=\"modelChange($event)\" [placeholder]=\"dcPlaceholder || ''\"\n             (blur)=\"blurEvent($event)\" (focus)=\"focusEvent($event)\" (keyup)=\"keyupEvent($event)\" (keyup.enter)=\"keyenterEvent($event)\"/>\n      <textarea *ngIf=\"type == 'textarea'\" #dcInput class=\"dc-input-default\" [disabled]=\"disabled\" [readonly]=\"readonly\" [(ngModel)]=\"value\"\n                (click)=\"clickEvent($event)\" (ngModelChange)=\"modelChange($event)\" [placeholder]=\"dcPlaceholder || ''\"\n                (blur)=\"blurEvent($event)\" (focus)=\"focusEvent($event)\" (keyup)=\"keyupEvent($event)\"\n                [style.height]=\"height\" [style.resize]=\"resize\" [maxlength]=\"maxLength\"></textarea>\n      <i [hidden]=\"noClear || !(value && !disabled && !readonly && type !== 'textarea')\" class=\"clear-input-value\"\n         (click)=\"clearValue()\"></i>\n      <div *ngIf=\"type=='textarea' && maxLength\" class=\"numtip\"><strong #numtip>{{canNum}}</strong>/<em>{{maxLength}}</em></div>\n    </div>\n  ",
                    styles: [
                        "\n      .dc-input-default {\n        height: 32px;\n        line-height: 30px;\n        padding: 0 30px 0 10px;\n        border-radius: 4px;\n        border: 1px solid #ccc;\n        font-size: 14px;\n        color: #333;\n        width: 100%;\n        box-shadow: none;\n      }\n\n      textarea.dc-input-default {\n        height: 50px;\n      }\n\n      .clear-input-value {\n        position: absolute;\n        right: 8px;\n        top: 0;\n        cursor: pointer;\n        width: 12px;\n        height: 32px;\n        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAOVJREFUKJF90DFKA1EQBuAvj2Cu8MBqe8FokedeQb2A6WzU0uN4gxTbxkM8CKKSfqvAXsAi2lj4dlkh5Icp5p9/Zv6ZSdM0Ck7whDucFW6LFV7wDdNSOMUac/9xVeIet9iFMvmQeIw5XjELeOzFdV2LMQ6qGKO6rvv0HA8By55p21ZKSYxRjFFKSdu2403LKS77rOs6OWcpJZBz1nXduOEiHPF9CD8Bb2PPKSU552HT+CZsg78/g6qqBhu9vaqqxg2rSdM0M+TyhWP4xCJgjxu8HxF/4Br7/ugdEp6xwVeJTeEWReMX1Y9FK/4RDOgAAAAASUVORK5CYII=) no-repeat center center transparent;\n      }\n\n      .clear-input-value:hover {\n        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAOtJREFUKJF90b1NAzEcBfBfriCVm2vR3S2ABFXYAViADACUjMMGWQCGQIoQWJngrLTXWBSBIhRxooBCnuTCz++9/4dHMUYFJ3jALc4Kt8AMT/iCUTGc4hkXDuMdN1hWJfmYWHl7wbjC/VbcdZ0Qwk4VQtB13fZ6jrsK0y0zDIO2bYUQhBA0TWMYhv1K01GMcVXa2qW2bWu9XkspyTnvG1bVkb4P4bvC29/0vu+llDRN82smLCqbPYO6rvV9L+cs5yylpK7rfcNsFGMc47Vs4RgiJhVWuLb5nP/wgSt7Qy9xiUfM8VnOvHCTovEDCGVJpA/ldQoAAAAASUVORK5CYII=) no-repeat center center transparent;\n      }\n\n      input.dc-input-default::placeholder,\n      textarea.dc-input-default::placeholder {\n        color: #bbb;\n        font-size: 12px;\n      }\n\n      .dc-input-default.dc-valid {\n        border-color: #3FB992;\n      }\n\n      .dc-input-default.dc-invalid {\n        border-color: #FF3B3B;\n      }\n\n      .dc-input-default:focus {\n        border-radius: 4px;\n        border-color: #2BB1FF;\n        transition: none;\n        background: none;\n        outline: none;\n      }\n\n      .dc-input-default[readonly],\n      .dc-input-default[disabled] {\n        background-color: #F0F0F0;\n      }\n\n      .numtip {\n        position: absolute;\n        right: 8px;\n        bottom: 8px;\n        color: #666;\n      }\n\n      .numtip strong {\n        color: #2bb1ff;\n        font-weight: normal;\n        margin-right: 2px;\n      }\n\n      .numtip em {\n        font-style: normal;\n        margin-left: 2px;\n      }\n\n      .numtip strong.tip {\n        color: #f95f5b;\n      }\n    "
                    ],
                    providers: [
                        { provide: forms_1.NG_VALUE_ACCESSOR, useExisting: core_1.forwardRef(function () { return InputComponent; }), multi: true }
                    ]
                },] },
    ];
    /** @nocollapse */
    InputComponent.ctorParameters = function () { return []; };
    InputComponent.propDecorators = {
        "autoFocus": [{ type: core_1.Input },],
        "type": [{ type: core_1.Input },],
        "disabled": [{ type: core_1.Input },],
        "readonly": [{ type: core_1.Input },],
        "dcPlaceholder": [{ type: core_1.Input },],
        "width": [{ type: core_1.Input },],
        "height": [{ type: core_1.Input },],
        "resize": [{ type: core_1.Input },],
        "maxLength": [{ type: core_1.Input },],
        "required": [{ type: core_1.Input },],
        "noClear": [{ type: core_1.Input },],
        "dcBlur": [{ type: core_1.Output },],
        "dcFocus": [{ type: core_1.Output },],
        "dcClick": [{ type: core_1.Output },],
        "dcKeyup": [{ type: core_1.Output },],
        "dcKeyenter": [{ type: core_1.Output },],
        "dcModelChange": [{ type: core_1.Output },],
        "dcInput": [{ type: core_1.ViewChild, args: ['dcInput',] },],
        "numtip": [{ type: core_1.ViewChild, args: ['numtip',] },],
    };
    return InputComponent;
}());
exports.InputComponent = InputComponent;
//# sourceMappingURL=input.component.js.map
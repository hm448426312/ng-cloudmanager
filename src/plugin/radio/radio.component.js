"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var RadioComponent = (function () {
    function RadioComponent() {
        this.checked = new core_1.EventEmitter();
    }
    Object.defineProperty(RadioComponent.prototype, "radioData", {
        get: function () {
            return this._radioData;
        },
        set: function (v) {
            this._radioData = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RadioComponent.prototype, "defaultData", {
        get: function () {
            return this._defaultData;
        },
        set: function (v) {
            this._defaultData = v;
            this.initCheck();
        },
        enumerable: true,
        configurable: true
    });
    RadioComponent.prototype.ngOnInit = function () {
    };
    // 初始化根据defaultData选中数据
    // 初始化根据defaultData选中数据
    RadioComponent.prototype.initCheck = 
    // 初始化根据defaultData选中数据
    function () {
        if (this.defaultData) {
            for (var _i = 0, _a = this.radioData; _i < _a.length; _i++) {
                var item = _a[_i];
                if (this.defaultData.id == item.id) {
                    item.checked = true;
                }
                else {
                    item.checked = false;
                }
            }
        }
    };
    // 单个radio改变事件
    // 单个radio改变事件
    RadioComponent.prototype.changeChecked = 
    // 单个radio改变事件
    function (ev) {
        for (var _i = 0, _a = this.radioData; _i < _a.length; _i++) {
            var item = _a[_i];
            item.checked = false;
        }
        ev.checked = true;
        this.checked.emit(ev);
    };
    // 选中某个radio
    // 选中某个radio
    RadioComponent.prototype.checkedRadio = 
    // 选中某个radio
    function (data) {
        for (var _i = 0, _a = this.radioData; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.id == data.name) {
                item.checked = true;
            }
            else {
                item.checked = false;
            }
        }
    };
    // 清除选中
    // 清除选中
    RadioComponent.prototype.clearChecked = 
    // 清除选中
    function () {
        for (var _i = 0, _a = this.radioData; _i < _a.length; _i++) {
            var item = _a[_i];
            item.checked = false;
        }
    };
    // 外部获取当前选中的radio
    // 外部获取当前选中的radio
    RadioComponent.prototype.getCheckedRadio = 
    // 外部获取当前选中的radio
    function () {
        var res = null;
        for (var _i = 0, _a = this.radioData; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.checked) {
                res = item;
                break;
            }
        }
        return res;
    };
    RadioComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-radio',
                    template: "\n    <div class=\"radio-box\" [style.flex-direction]=\"options?.direction || 'row'\" [style.flex-wrap]=\"options?.newLine?'wrap':'nowrap'\">\n      <ng-template ngFor let-item [ngForOf]=\"radioData\" let-i=\"index\">\n        <label [title]=\"item.name\" class=\"form-radio\" [class.radio-disabled]=\"item.disabled\" [style.min-width]=\"options?.minWidth || '80px'\"\n               [style.height]=\"options?.height || '30px'\"\n               [style.max-width]=\"options?.maxWidth\" [style.margin-right]=\"options?.direction === 'column'?'0px':'20px'\">\n          <input type=\"radio\" [disabled]=\"item.disabled\" (change)=\"changeChecked(item)\" [checked]=\"!!item.checked\"\n                 [name]=\"options?.name || ''\">\n          <div class=\"simulation\"></div>\n          <span class=\"form-radio-text\" [style.height]=\"options?.height || '30px'\"\n                [style.line-height]=\"options?.height || '30px'\">{{ item.name }}</span>\n        </label>\n      </ng-template>\n    </div>\n  ",
                    styles: ["\n    .radio-box {\n      display: flex;\n      justify-content: flex-start;\n    }\n\n    .form-radio {\n      margin: 0 20px 0 0;\n      font-size: 12px;\n      cursor: pointer;\n      display: flex;\n      align-items: center;\n    }\n\n    .form-radio.radio-disabled {\n      cursor: not-allowed;\n    }\n\n    .form-radio-text {\n      margin-left: 5px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      padding: 0 5px;\n      flex: 1;\n    }\n\n    .form-radio:hover .form-radio-text {\n      background: #edf0f5;\n      /*color: #fff;*/\n    }\n\n    .simulation {\n      width: 13px;\n      height: 13px;\n      border: 1px solid #cdcdcd;\n      border-radius: 50%;\n      vertical-align: middle;\n      position: relative;\n      flex-grow: 0;\n      flex-shrink: 0;\n    }\n\n    .simulation:after {\n      content: '';\n      width: 6px;\n      height: 6px;\n      background: #0081cc;\n      border-radius: 50%;\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      margin: auto;\n      opacity: 0;\n    }\n\n    input[type='radio'] {\n      vertical-align: middle;\n      display: none;\n    }\n\n    input[type='radio']:checked + .simulation {\n      border-color: #0081cc;\n    }\n\n    input[type='radio']:checked + .simulation:after {\n      opacity: 1;\n    }\n\n    input[type='radio']:disabled + .simulation,\n    input[type='radio']:disabled + .simulation:after {\n      opacity: 0.4;\n    }\n\n    .form-radio input[type='radio']:disabled + .simulation {\n      border-color: #cdcdcd;\n    }\n\n    .form-radio input[type='radio']:disabled + .simulation:after {\n      display: none;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    RadioComponent.ctorParameters = function () { return []; };
    RadioComponent.propDecorators = {
        "options": [{ type: core_1.Input },],
        "radioData": [{ type: core_1.Input },],
        "defaultData": [{ type: core_1.Input },],
        "checked": [{ type: core_1.Output },],
    };
    return RadioComponent;
}());
exports.RadioComponent = RadioComponent;
//# sourceMappingURL=radio.component.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DatePickerComponent = (function () {
    function DatePickerComponent() {
        this.dateChangeEvent = new core_1.EventEmitter();
        if (this.defaultShow === undefined) {
            this.defaultShow = false;
        }
    }
    Object.defineProperty(DatePickerComponent.prototype, "date", {
        get: function () {
            return this._date;
        },
        set: function (v) {
            this._date = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DatePickerComponent.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (v) {
            var temp = v;
            if (temp.minDate && typeof (temp.minDate) === 'string') {
                temp.minDate = new Date(temp.minDate);
            }
            if (temp.maxDate && typeof (temp.maxDate) === 'string') {
                temp.maxDate = new Date(temp.maxDate);
            }
            this._options = temp;
        },
        enumerable: true,
        configurable: true
    });
    DatePickerComponent.prototype.setDate = function (ev) {
        this.dateChangeEvent.emit(ev);
    };
    DatePickerComponent.prototype.clearDate = function () {
        this.DatePicker.clearDateByOther();
    };
    DatePickerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-date-picker',
                    template: "\n    <dc-ng-datepicker #DatePicker [defaultShow]=\"defaultShow\" [initDate]=\"date || ''\" [width]=\"options?.width\" [minDate]=\"options?.minDate\"\n                      [maxDate]=\"options?.maxDate\" [offset]=\"options?.offset\" [language]=\"options?.language\"\n                      [placeholder]=\"options?.placeholder\"\n                      (ngModelChange)=\"setDate($event)\"></dc-ng-datepicker>\n  ",
                    styles: ["\n  "],
                },] },
    ];
    /** @nocollapse */
    DatePickerComponent.ctorParameters = function () { return []; };
    DatePickerComponent.propDecorators = {
        "defaultShow": [{ type: core_1.Input },],
        "date": [{ type: core_1.Input },],
        "dateChangeEvent": [{ type: core_1.Output },],
        "DatePicker": [{ type: core_1.ViewChild, args: ['DatePicker',] },],
        "options": [{ type: core_1.Input },],
    };
    return DatePickerComponent;
}());
exports.DatePickerComponent = DatePickerComponent;
//# sourceMappingURL=date.picker.component.js.map
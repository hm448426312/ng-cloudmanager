"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TableColumnComponent = (function () {
    function TableColumnComponent() {
    }
    TableColumnComponent.prototype.ngOnInit = function () {
        if (this.header.field == this.field) {
            this.show = true;
        }
    };
    TableColumnComponent.prototype.setTdCenter = function (isCenter) {
        var center;
        if (isCenter) {
            center = {
                'display': 'flex',
                'justify-content': 'center'
            };
        }
        return center;
    };
    TableColumnComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-table-column',
                    template: "\n    <div *ngIf=\"show\" class=\"table-font\" [style.width]=\"width\" [ngStyle]=\"setTdCenter(isTdCenter)\"\n         [title]=\"(!header.hideTitle && data && data[field]) || ''\">\n      <ng-content></ng-content>\n    </div>\n  ",
                    styles: [
                        '.table-font {' +
                            'font-size: 12px;' +
                            'line-height: 18px;' +
                            'white-space: nowrap;' +
                            'overflow: hidden;' +
                            'text-overflow: ellipsis;}',
                    ]
                },] },
    ];
    /** @nocollapse */
    TableColumnComponent.ctorParameters = function () { return []; };
    TableColumnComponent.propDecorators = {
        "header": [{ type: core_1.Input },],
        "data": [{ type: core_1.Input },],
        "width": [{ type: core_1.Input },],
        "field": [{ type: core_1.Input },],
        "isTdCenter": [{ type: core_1.Input },],
    };
    return TableColumnComponent;
}());
exports.TableColumnComponent = TableColumnComponent;
//# sourceMappingURL=column.component.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ColumnNewComponent = (function () {
    function ColumnNewComponent() {
    }
    ColumnNewComponent.prototype.ngOnInit = function () {
        if (this.header.field == this.field) {
            this.show = true;
        }
    };
    ColumnNewComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-table-column-new',
                    template: "\n    <div *ngIf=\"show\" class=\"table-font\"  [title]=\"(!header.hideTitle && data && data[field]) || ''\">\n      <ng-content></ng-content>\n    </div>\n  ",
                    styles: ["\n    .table-font {\n      font-size: 14px;\n      line-height: 50px;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    ColumnNewComponent.ctorParameters = function () { return []; };
    ColumnNewComponent.propDecorators = {
        "header": [{ type: core_1.Input },],
        "data": [{ type: core_1.Input },],
        "width": [{ type: core_1.Input },],
        "field": [{ type: core_1.Input },],
    };
    return ColumnNewComponent;
}());
exports.ColumnNewComponent = ColumnNewComponent;
//# sourceMappingURL=column.new.component.js.map
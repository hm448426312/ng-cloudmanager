"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PopoverDirective = (function () {
    function PopoverDirective(el) {
        this.el = el;
    }
    PopoverDirective.prototype.onMouseEnter = function () {
        this.showTitle();
        // console.log(this.el.nativeElement.getBoundingClientRect());
    };
    PopoverDirective.prototype.onMouseLeave = function () {
        this.hideTitle();
    };
    PopoverDirective.prototype.showTitle = function () {
        if (!this.titleBox) {
            var ele = document.createElement('div');
            ele.className = 'dc-popover-tip';
            ele.style.position = 'absolute';
            this.titleBox = ele;
            this.titleBox.innerHTML = this.dcTitle;
            var rect = this.el.nativeElement.getBoundingClientRect();
            this.el.nativeElement.parentElement.appendChild(this.titleBox);
            //�ж�pop��ʾλ�ã�Ĭ��Ϊ�ұ�
            if (this.showDir) {
                console.log("������");
            }
            else {
                console.log("û����");
            }
            this.titleBox.style.left = rect.left + 'px';
            this.titleBox.style.top = rect.top - rect.height + 'px';
        }
        this.titleBox.innerHTML = this.dcTitle;
        this.titleBox.hidden = false;
    };
    PopoverDirective.prototype.hideTitle = function () {
        this.titleBox.hidden = true;
    };
    PopoverDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[dcPopover]',
                },] },
    ];
    /** @nocollapse */
    PopoverDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    PopoverDirective.propDecorators = {
        "dcPopover": [{ type: core_1.Input },],
        "dcTitle": [{ type: core_1.Input },],
        "showDir": [{ type: core_1.Input },],
        "onMouseEnter": [{ type: core_1.HostListener, args: ['mouseenter',] },],
        "onMouseLeave": [{ type: core_1.HostListener, args: ['mouseleave',] },],
    };
    return PopoverDirective;
}());
exports.PopoverDirective = PopoverDirective;
//# sourceMappingURL=popover.directive.js.map
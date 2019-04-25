"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WrapEllipsisComponent = (function () {
    function WrapEllipsisComponent(elm, renderer) {
        this.elm = elm;
        this.renderer = renderer;
        this.hasOverSurplusContent = false;
        this.hasOverContent = false;
        this.reg = new RegExp('[^\x00-\xff]');
    }
    Object.defineProperty(WrapEllipsisComponent.prototype, "weContent", {
        get: function () {
            return this._weContent;
        },
        set: function (text) {
            this._weContent = text;
            if (this.style) {
                this.originData = {
                    content: this._weContent || this.container.innerText,
                    width: this.weWidth || this.style['width'],
                    height: this.getMaxHeight(),
                    fontSize: this.weFontSize || this.style['fontSize'],
                    lineHeight: this.weLineHeight || this.style['lineHeight']
                };
                this.fontNum = Math.ceil(parseFloat(this.originData.width) / parseFloat(this.originData.fontSize));
                this.setContent();
            }
        },
        enumerable: true,
        configurable: true
    });
    WrapEllipsisComponent.prototype.ngOnInit = function () {
        this.container = this.wrapper.nativeElement;
        this.style = getComputedStyle(this.elm.nativeElement.parentNode);
        if (!this.originData) {
            this.originData = {
                content: this._weContent || this.container.innerText,
                width: this.weWidth || this.style['width'],
                height: this.getMaxHeight(),
                fontSize: this.weFontSize || this.style['fontSize'],
                lineHeight: this.weLineHeight || this.style['lineHeight']
            };
            this.fontNum = Math.ceil(parseFloat(this.originData.width) / parseFloat(this.originData.fontSize));
            this.setContent();
        }
    };
    WrapEllipsisComponent.prototype.setContent = function () {
        var tempDom = document.createElement('div');
        tempDom.style.width = this.originData.width;
        tempDom.style.fontSize = this.originData.fontSize;
        tempDom.style.lineHeight = this.originData.lineHeight;
        document.body.appendChild(tempDom);
        this.renderer.setElementClass(tempDom, 'wrap-ellipsis-div', true);
        this.getContent(tempDom);
    };
    WrapEllipsisComponent.prototype.getContent = function (dom) {
        dom.innerText = this.originData.content;
        var contentHeight = parseFloat(getComputedStyle(dom)['height']);
        if (contentHeight > this.originData.height) {
            var lineNum = (contentHeight - this.originData.height) / parseFloat(this.originData.lineHeight);
            var contentNum = this.originData.content.length - Math.ceil(this.fontNum * lineNum);
            if (!this.surplusContent) {
                this.surplusContent = this.originData.content.slice(0, contentNum);
            }
            if (!this.hasOverContent) {
                this.overContent = this.originData.content.slice(contentNum);
                this.hasOverContent = true;
            }
            else {
                if (lineNum >= 1 && this.overContent.length > this.fontNum) {
                    this.overContent = this.overContent.slice(0, Math.ceil(this.overContent.length / 2));
                }
                else {
                    this.overContent = this.overContent.slice(0, this.overContent.length - 1);
                }
            }
            this.originData.content = this.surplusContent + this.overContent;
            if (!this.hasOverSurplusContent) {
                this.getSurplusContent(dom);
            }
            else {
                this.getContent(dom);
            }
        }
        else {
            if (this.hasOverContent) {
                var pos = this.reg.test(this.originData.content.slice(-1)) ? -1 : -2;
                this.container.innerText = this.originData.content.slice(0, this.originData.content.length + pos) + '\u2026';
                document.body.removeChild(dom);
            }
            else {
                if (this._weContent) {
                    this.container.innerText = this.originData.content;
                }
            }
        }
    };
    WrapEllipsisComponent.prototype.getSurplusContent = function (dom) {
        dom.innerText = this.surplusContent + '\u2026';
        var contentHeight = parseFloat(getComputedStyle(dom)['height']);
        if (contentHeight > this.originData.height) {
            this.hasOverSurplusContent = true;
            this.surplusContent = this.surplusContent.slice(0, this.surplusContent.length - 1);
            this.originData.content = this.surplusContent;
            this.getSurplusContent(dom);
        }
        else {
            if (this.hasOverSurplusContent) {
                var pos = this.reg.test(this.originData.content.slice(-1)) ? -1 : -2;
                this.container.innerText = this.originData.content.slice(0, this.originData.content.length + pos) + '\u2026';
                document.removeChild(dom);
            }
            else {
                this.hasOverSurplusContent = true;
                this.getContent(dom);
            }
        }
    };
    WrapEllipsisComponent.prototype.getMaxHeight = function () {
        var arrh = ['maxHeight', 'height'];
        var arrp = [];
        var hgh = 0;
        if (!this.weHeight) {
            var h = void 0;
            for (var _i = 0, arrh_1 = arrh; _i < arrh_1.length; _i++) {
                h = arrh_1[_i];
                var rh = getComputedStyle(this.container)[h];
                if (rh.indexOf('px') > 0) {
                    hgh = parseFloat(rh);
                    break;
                }
            }
        }
        else {
            hgh = parseFloat(this.weHeight);
        }
        switch (this.container.style.boxSizing) {
            case 'border-box':
                arrp.push('borderTopWidth');
                arrp.push('borderBottomWidth');
            // tslint:disable-next-line:no-switch-case-fall-through
            case 'padding-box':
                arrp.push('paddingTop');
                arrp.push('paddingBottom');
                break;
        }
        var p;
        for (var _a = 0, arrp_1 = arrp; _a < arrp_1.length; _a++) {
            p = arrp_1[_a];
            var rp = window.getComputedStyle(this.container)[p];
            if (rp.indexOf('px') > 0) {
                hgh -= parseFloat(rp);
                break;
            }
        }
        return Math.max(hgh, 0);
    };
    WrapEllipsisComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-wrap-ellipsis',
                    template: "<div #wrapper class=\"wrapper\" [ngStyle]=\"{'width':originData?.width,'height':originData?.height+'px','font-size':originData?.fontSize,'line-height':originData?.lineHeight}\">\n  <ng-content></ng-content>\n</div>",
                    styles: [
                        ".wrapper {\n    word-wrap: break-word;\n    white-space: normal;\n    width: inherit;\n    height: inherit;\n    margin: 0;\n    padding: 0;\n    border: 0;\n    overflow: hidden;\n  }\n  .wrap-ellipsis-div {\n    position: fixed;\n    left: -100%;\n    bottom: -100%;\n  }"
                    ],
                    encapsulation: core_1.ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    WrapEllipsisComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.Renderer, },
    ]; };
    WrapEllipsisComponent.propDecorators = {
        "wrapper": [{ type: core_1.ViewChild, args: ['wrapper',] },],
        "weWidth": [{ type: core_1.Input },],
        "weHeight": [{ type: core_1.Input },],
        "weFontSize": [{ type: core_1.Input },],
        "weLineHeight": [{ type: core_1.Input },],
        "weContent": [{ type: core_1.Input },],
    };
    return WrapEllipsisComponent;
}());
exports.WrapEllipsisComponent = WrapEllipsisComponent;
//# sourceMappingURL=wrap-ellipsis.component.js.map
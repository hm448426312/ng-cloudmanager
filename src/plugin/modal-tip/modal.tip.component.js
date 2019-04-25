"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var _ = require("lodash");
var ModalTipComponent = (function () {
    function ModalTipComponent() {
        this.imgBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3RjdDQzE3MjMxOTgxMUU4QkE1MEQyQjQ1QkIzQjA3NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3RjdDQzE3MzMxOTgxMUU4QkE1MEQyQjQ1QkIzQjA3NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdGN0NDMTcwMzE5ODExRThCQTUwRDJCNDVCQjNCMDc3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjdGN0NDMTcxMzE5ODExRThCQTUwRDJCNDVCQjNCMDc3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+H4it5gAAAXpJREFUeNpifHmyjIEAUAPiACB2A2ItIBaGir8F4mtAvAuINwDxLXyGMOKxyB6Im4HYloE4cBiIa4H4IDZJJixiHEA8A4j3k2AJA1TtfqheDkIWCQHxPiBOB/mWgXTACNW7D2oWHLAgsbmAeBsQm+MyRcysE4X/6lQ5LqWWULOcgPgbuo8m4rOEDGAONRMl6EARn8xAfZAMNRtuUQuZcUJMnLXALNIHYhsG2gGQ2fogi4IYaA+CmEjMK+QCO5BFGnSwSJ0JqeyiJRBmYqATYIKWwrQGb0EW3aCDRTdZoMW7IzGq8ZRtBKsQkI/W0cFHa0E+ugjER4gpHUgovZEByOyLsFRXA8T/aeCT/9BaF16ogqrf2TSwCGTmAfT6qBCIT1LRkpNQM7E2TkClxFYqVIAgS7yR8yh6yfAWmtRnkhln/6F6ndALAmxF0HcgzoBaeIwES45BLciAtRNwNU7QASiBWENLd38gdgdiTbQG5HUg3gnEGwmVMAABBgBw8kt1MfPG3gAAAABJRU5ErkJggg==";
        this.defaultBtn = [
            {
                text: '取消',
                type: 2
            }, {
                text: '确认',
                type: 1
            }
        ];
    }
    ModalTipComponent.prototype.ngOnInit = function () {
    };
    ModalTipComponent.prototype.judgeMsg = function (msg) {
        if (_.isString(msg)) {
            return 'string';
        }
        else if (_.isArray(msg)) {
            return 'array';
        }
        else {
            return '';
        }
    };
    ModalTipComponent.prototype.btnEventClick = function (btn) {
        this.handler(btn);
    };
    ModalTipComponent.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <div class=\"title\">\n      <div class=\"tip-type\">\n        <img [src]=\"data?.icon || imgBase64\">\n        <b>{{data?.typeTitle || '\u786E\u8BA4'}}</b>\n      </div>\n      <div class=\"tip-msg\">\n        <ng-template [ngIf]=\"judgeMsg(data.msg) === 'array'\">\n          <div class=\"tip-msg-list\" *ngFor=\"let list of data.msg\">{{list}}</div>\n        </ng-template>\n        <ng-template [ngIf]=\"judgeMsg(data.msg) === 'string'\">\n          {{data.msg}}\n        </ng-template>\n        <ng-template [ngIf]=\"!judgeMsg(data.msg)\">\n          System error.\n        </ng-template>\n      </div>\n    </div>\n    <div class=\"tipBtn\">\n      <div *ngIf=\"data && data.button && data.button.length > 0\">\n        <ng-template ngFor let-btn [ngForOf]=\"data.button\">\n          <dc-button [hideTitle]=\"true\" [text]=\"btn.text\" (click)=\"btnEventClick(btn)\" [type]=\"btn.type || 1\"></dc-button>\n        </ng-template>\n      </div>\n      <div *ngIf=\"!data || !data.button || data.button.length == 0\">\n        <ng-template ngFor let-btn [ngForOf]=\"defaultBtn\">\n          <dc-button [hideTitle]=\"true\" [text]=\"btn.text\" (click)=\"btnEventClick(btn)\" [type]=\"btn.type || 1\"></dc-button>\n        </ng-template>\n      </div>\n    </div>\n  ",
                    styles: ["\n    .title {\n      padding: 30px 50px 30px;\n      min-height: 125px;\n      text-align: center;\n      display: block;\n      overflow: hidden;\n      font-size: 14px;\n      white-space: nowrap;\n      text-overflow: ellipsis;\n    }\n\n    img {\n      margin-right: 15px;\n      width: 30px;\n      height: 30px;\n    }\n\n    .tip-type {\n      text-align: left;\n      display: flex;\n      align-items: center;\n      justify-content: left;\n    }\n\n    .tip-type b {\n      font-size: 18px;\n      color: #333;\n    }\n\n    .tip-msg {\n      white-space: normal;\n      word-break: break-all;\n      font-size: 14px;\n      color: #333;\n      line-height: 30px;\n      padding-left: 45px;\n      margin-top: 5px;\n      text-align: left;\n      max-height: 200px;\n      overflow: auto;\n    }\n    .tip-msg-list{\n      white-space: normal;\n      text-indent: 0;\n    }\n\n    .tipBtn {\n      height: 70px;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px 0px;\n    }\n\n    dc-button:nth-child(2) {\n      margin-left: 15px;\n    }\n  "],
                },] },
    ];
    /** @nocollapse */
    ModalTipComponent.ctorParameters = function () { return []; };
    ModalTipComponent.propDecorators = {
        "data": [{ type: core_1.Input },],
        "handler": [{ type: core_1.Input },],
    };
    return ModalTipComponent;
}());
exports.ModalTipComponent = ModalTipComponent;
//# sourceMappingURL=modal.tip.component.js.map
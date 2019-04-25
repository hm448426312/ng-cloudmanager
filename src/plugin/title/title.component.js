"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TitleComponent = (function () {
    function TitleComponent() {
        this.titleChangeEvent = new core_1.EventEmitter();
    }
    Object.defineProperty(TitleComponent.prototype, "titleDatas", {
        get: function () {
            return this._titleDatas;
        },
        set: function (v) {
            this._titleDatas = v;
        },
        enumerable: true,
        configurable: true
    });
    TitleComponent.prototype.ngOnInit = function () {
        this.init();
    };
    TitleComponent.prototype.init = function () {
        if (this.titleDatas == null && this.titleDatas.length == 0) {
            return;
        }
        if (this.nowSelectTab == null) {
            this.titleDatas[0].select = true;
        }
    };
    TitleComponent.prototype.selectTitle = function (tab) {
        for (var _i = 0, _a = this.titleDatas; _i < _a.length; _i++) {
            var d = _a[_i];
            d.select = false;
        }
        tab.select = true;
        this.nowSelectTab = tab;
        this.titleChangeEvent.emit(tab);
        tab.loaded = true;
    };
    TitleComponent.prototype.changeTab = function (tab) {
        if (this.titleOption && this.titleOption.beforeChange) {
            if (this.titleOption.beforeChange(tab)) {
                this.selectTitle(tab);
            }
        }
        else {
            this.selectTitle(tab);
        }
    };
    TitleComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-title',
                    template: "\n    <div class=\"display-flex width-100 flex-direction-column\">\n      <div class=\"display-flex width-100 tabs\">\n        <div *ngFor=\"let d of titleDatas\">\n          <div class=\"title\" (click)=\"changeTab(d)\" [ngClass]=\"{'active':d.select}\" [style.border-bottom]=\"d.select && hasBottomLine?'solid 2px #333': ''\">\n            <div *ngIf=\"d.icon\" class=\"icon\"><img src=\"{{d.icon}}\"></div>\n            <div>{{d.title}}</div>\n            <i *ngIf=\"d.notify && d.notify>0\" [ngStyle]=\"{'background-color':d.notifyColor}\">{{d.notify}}</i>\n          </div>\n        </div>\n      </div>\n    </div>",
                    styles: [
                        ".tabs {\n      padding: 15px 20px 0;\n      border-bottom: solid 1px #d6d6d6\n    }\n\n    .tabs > div {\n      margin-right: 70px\n    }\n\n    .title {\n      cursor: pointer;\n      display: table;\n      position: relative;\n      bottom: 0;\n      font-size: 18px;\n      height: 36px;\n      color: #666;\n    }\n\n    .title.active {\n      font-weight: bold;\n      color: #333;\n      bottom: -1px;\n    }\n\n    .title > div {\n      display: table-cell;\n      vertical-align: middle;\n    }\n\n    .title.active > div {\n      padding-bottom: 3px\n    }\n\n    .title > div.icon {\n      padding: 0 10px 5px 0\n    }\n\n    .title > i {\n      font-size: 10px;\n      font-weight: 400;\n      position: absolute;\n      left: calc(100% + 7px);\n      top: 10px;\n      display: block;\n      padding: 0 8px;\n      line-height: 14px;\n      height: 16px;\n      color: #fff;\n      border-radius: 10px;\n      font-style: normal\n    }\n\n    .title.active > i {\n       top: 9px\n    }"
                    ]
                },] },
    ];
    /** @nocollapse */
    TitleComponent.ctorParameters = function () { return []; };
    TitleComponent.propDecorators = {
        "titleDatas": [{ type: core_1.Input },],
        "titleOption": [{ type: core_1.Input },],
        "hasBottomLine": [{ type: core_1.Input },],
        "titleChangeEvent": [{ type: core_1.Output },],
    };
    return TitleComponent;
}());
exports.TitleComponent = TitleComponent;
//# sourceMappingURL=title.component.js.map
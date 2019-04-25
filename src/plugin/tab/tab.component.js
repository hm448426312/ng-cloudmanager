"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var tab_directive_1 = require("./tab.directive");
var TabComponent = (function () {
    function TabComponent(resolver, router, changeRef) {
        this.resolver = resolver;
        this.router = router;
        this.changeRef = changeRef;
        this.tabChangeEvent = new core_1.EventEmitter();
    }
    Object.defineProperty(TabComponent.prototype, "tabDatas", {
        get: function () {
            return this._tabDatas;
        },
        set: function (v) {
            this._tabDatas = v;
        },
        enumerable: true,
        configurable: true
    });
    TabComponent.prototype.ngAfterViewInit = function () {
        this.init();
    };
    TabComponent.prototype.init = function () {
        var _this = this;
        if (this.tabDatas == null && this.tabDatas.length == 0) {
            return;
        }
        this.tabContents.map(function (content, index) {
            var tab = _this.tabDatas[index];
            if (tab.select) {
                tab.loaded = true;
                _this.nowSelectTab = tab;
            }
            if (tab.component) {
                var component = _this.resolver.resolveComponentFactory(tab.component);
                _this.ref = content.viewContainerRef.createComponent(component);
                if (tab.data) {
                    var instance = _this.ref.instance;
                    instance.data = tab.data;
                }
                _this.activeInstance = _this.ref.instance;
            }
            else if (tab.url) {
                // let params = tab.params == null ? {} : tab.params;
                // this.router.navigate([tab.url], { queryParams: params });
            }
        });
        if (this.nowSelectTab == null) {
            this.tabDatas[0].select = true;
        }
        this.changeRef.detectChanges();
    };
    /*  ngOnChanges(changes: SimpleChanges) {
        if (changes.tabDatas && !changes.tabDatas.firstChange) {
          this.init();
        }
      }*/
    /*  ngOnChanges(changes: SimpleChanges) {
          if (changes.tabDatas && !changes.tabDatas.firstChange) {
            this.init();
          }
        }*/
    TabComponent.prototype.changeTab = /*  ngOnChanges(changes: SimpleChanges) {
          if (changes.tabDatas && !changes.tabDatas.firstChange) {
            this.init();
          }
        }*/
    function (tab) {
        for (var _i = 0, _a = this.tabDatas; _i < _a.length; _i++) {
            var d = _a[_i];
            d.select = false;
        }
        tab.select = true;
        this.nowSelectTab = tab;
        this.tabChangeEvent.emit(tab);
        if (tab.initFn && this.activeInstance[tab.initFn] && !tab.loaded) {
            this.activeInstance[tab.initFn]();
        }
        tab.loaded = true;
        this.changeRef.detectChanges();
    };
    TabComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-tab',
                    template: "\n    <div *ngIf=\"likeButton\" class=\"display-flex width-100 flex-direction-column\">\n      <div class=\"display-flex width-100 tabs2\">\n        <div *ngFor=\"let d of tabDatas\">\n          <div class=\"title2\" (click)=\"changeTab(d)\" [ngClass]=\"{'active':d.select}\">\n            <div *ngIf=\"d.icon\" class=\"icon\"><img src=\"{{d.icon}}\"></div>\n            <div>{{d.title}}</div>\n          </div>\n        </div>\n      </div>\n      <div *ngFor=\"let c of tabDatas\" [hidden]=\"!c.select\">\n        <span dcTabContentHost></span>\n      </div>\n    </div>    \n  <div *ngIf=\"!likeButton\" class=\"display-flex width-100 flex-direction-column\">\n    <div class=\"display-flex width-100 tabs\">\n        <div *ngFor=\"let d of tabDatas\">\n            <div class=\"title\" (click)=\"changeTab(d)\" [ngClass]=\"{'active':d.select}\">\n                <div *ngIf=\"d.icon\" class=\"icon\"><img src=\"{{d.icon}}\"></div>\n                <div>{{d.title}}</div>\n                <i *ngIf=\"d.notify && d.notify>0\" [ngStyle]=\"{'background-color':d.notifyColor}\">{{d.notify}}</i>\n            </div>\n        </div>\n    </div>\n    <div *ngFor=\"let c of tabDatas\" [hidden]=\"!c.select\">\n      <span dcTabContentHost></span>\n    </div>\n  </div>\n  ",
                    styles: [
                        ".tabs {\n      padding: 15px 20px 0;\n      border-bottom: solid 1px #d6d6d6\n    }\n    .tabs2 {\n      padding: 15px 20px 0;\n    }\n    \n    .tabs>div {\n      margin-right: 70px\n    }\n    .tabs2>div {\n      margin-right: 20px;\n    }\n    \n    .title {\n      cursor: pointer;\n      display: table;\n      position: relative;\n      bottom: 0;\n      font-size: 18px;\n      height: 36px;\n      color: #666;\n    }\n\n    .title2 {\n      cursor: pointer;\n      display: flex;\n      position: relative;\n      bottom: 0;\n      justify-content: center;\n      border: solid 1px #e2e2e2;\n      font-size: 14px;\n      width: 110px;\n      border-radius: 2px;\n      height: 25px;\n      color: #0081cc;\n    }\n    .title2:hover {\n      border: solid 1px #0081cc;\n    }\n    \n    .title.active{\n      font-weight: bold;\n      color: #333;\n      border-bottom: solid 2px #333;\n      bottom: -1px;\n    }\n\n    .title2.active{\n      color: #ffffff;\n      background: #0081cc;\n      bottom: -1px;\n    }\n    \n    .title>div,.title2>div {\n      display: table-cell;\n      vertical-align: middle;\n    }\n    \n    .title.active>div,.title2.active>div {\n      padding-bottom: 3px\n    }\n    \n    .title>div.icon,.title2>div.icon {\n      padding: 0 10px 5px 0\n    }\n    \n    .title>i,.title2>i {\n      font-size: 10px;\n      font-weight: 400;\n      position: absolute;\n      left: calc(100% + 7px);\n      top: 10px;\n      display: block;\n      padding: 0 8px;\n      line-height: 14px;\n      height: 16px;\n      color: #fff;\n      border-radius: 10px;\n      font-style: normal\n    }\n    \n    .title.active>i,.title2.active>i {\n        top: 9px\n    }"
                    ],
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    TabComponent.ctorParameters = function () { return [
        { type: core_1.ComponentFactoryResolver, },
        { type: router_1.Router, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    TabComponent.propDecorators = {
        "likeButton": [{ type: core_1.Input },],
        "tabDatas": [{ type: core_1.Input },],
        "tabChangeEvent": [{ type: core_1.Output },],
        "tabContents": [{ type: core_1.ViewChildren, args: [tab_directive_1.TabContentDirective,] },],
    };
    return TabComponent;
}());
exports.TabComponent = TabComponent;
//# sourceMappingURL=tab.component.js.map
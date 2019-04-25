"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var broadcast_service_1 = require("../broadcast/broadcast.service");
var router_1 = require("@angular/router");
var _ = require("lodash");
var HeaderComponent = (function () {
    function HeaderComponent(renderer, broadcast, router, activeRoute) {
        this.renderer = renderer;
        this.broadcast = broadcast;
        this.router = router;
        this.activeRoute = activeRoute;
        this.toggleLeftMenuEvent = new core_1.EventEmitter();
        this.searchResult = new core_1.EventEmitter();
        this.userMenu = new core_1.EventEmitter();
        this.contactus = new core_1.EventEmitter();
        this.showResultFlag = false;
        this.isOpen = true;
        this.toggleUserMenu = false;
        this.searchKey = this.searchKey || 'name';
        if (!this.userMenuData) {
            this.userMenuData = [
                {
                    id: 1,
                    text: '个人资料',
                    url: '/IAMui/#/user/view'
                },
                {
                    id: 2,
                    text: '修改密码',
                    url: '/IAMui/#/user/reset'
                },
                {
                    id: 3,
                    text: '退出',
                    url: ''
                }
            ];
        }
    }
    Object.defineProperty(HeaderComponent.prototype, "searchResults", {
        get: function () {
            return this._searchResults;
        },
        set: function (v) {
            this._searchResults = _.cloneDeep(v);
        },
        enumerable: true,
        configurable: true
    });
    HeaderComponent.prototype.clickUs = function () {
        this.contactus.emit();
    };
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.broadcast.on('leftmenu_close').subscribe(function (event) {
            _this.isOpen = event;
            _this.toggleLeftMenuEvent.emit(_this.isOpen);
        });
    };
    HeaderComponent.prototype.toggleUserMenuEvent = function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.toggleUserMenu = !this.toggleUserMenu;
    };
    HeaderComponent.prototype.onDocumentClick = function (ev) {
        this.toggleUserMenu = false;
        this.hideSearchResultDrop();
    };
    HeaderComponent.prototype.showSearchResultDrop = function (ev) {
        if (this.hideSearchDropTimer) {
            clearTimeout(this.hideSearchDropTimer);
            this.hideSearchDropTimer = null;
        }
        ev.stopPropagation();
        this.showResultFlag = true;
    };
    HeaderComponent.prototype.hideSearchResultDrop = function () {
        var _this = this;
        if (this.hideSearchDropTimer) {
            clearTimeout(this.hideSearchDropTimer);
            this.hideSearchDropTimer = null;
        }
        this.hideSearchDropTimer = setTimeout(function () {
            _this.showResultFlag = false;
        }, 300);
    };
    HeaderComponent.prototype.selectResult = function (ev, res) {
        this.keyword = res[this.searchKey];
        this.showResultFlag = false;
        this.searchResult.emit(res);
    };
    HeaderComponent.prototype.sendToggleLeftMenu = function () {
        this.isOpen = !this.isOpen;
        this.broadcast.broadcast('leftmenu_close', this.isOpen);
        // this.toggleLeftMenuEvent.emit(this.isOpen);
    };
    HeaderComponent.prototype.sendSearchResult = function () {
        var _this = this;
        if (this.keyword) {
            var res = _.filter(this.searchResults, function (o) {
                return o[_this.searchKey].indexOf(_this.keyword) != -1;
            });
            if (res && res.length > 0) {
                this.keyword = res[0][this.searchKey];
                this.showResultFlag = false;
                this.searchResult.emit(res[0]);
            }
        }
    };
    HeaderComponent.prototype.sendUserMenu = function (menu) {
        /*const reg = new RegExp(/^\/[\da-zA-Z-]*\//gi);
            const menuFirstRoute = menu.url.match(reg);
            const currentpathname = location.pathname;
            if (currentpathname && menuFirstRoute && currentpathname != menuFirstRoute[0]) {
              location.href = location.origin + menu.url;
              if (menu.id == 1) {
                // 查看个人资料
                location.href = location.origin + menu.url;
              } else if (menu.id == 2) {
                // 修改密码
                location.href = location.origin + menu.url;
              } else if (menu.id == 3) {
                // 退出登陆
                // this.router.navigateByUrl('/IAM/user/update');
              }
            } else {
              const targetRout = menu.url.slice(menuFirstRoute[0].length + 1);
              if (menu.id == 1) {
                // 查看个人资料
                this.router.navigate([targetRout]);
              } else if (menu.id == 2) {
                // 修改密码
                this.router.navigate([targetRout]);
              } else if (menu.id == 3) {
                // 退出登陆
                // this.router.navigateByUrl('/IAM/user/update');
              }
            }*/
        this.userMenu.emit(menu);
    };
    HeaderComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-header',
                    template: "\n    <div class=\"dc-header-container\">\n      <div class=\"dc-header\" [ngClass]=\"{'zoomout':!isOpen}\" style=\"display: flex;align-items: center;\">\n        <div class=\"toggle-left-menu\" (click)=\"sendToggleLeftMenu()\">\n          <div class=\"toggle-arrow\" *ngIf=\"isOpen\"></div>\n          <div class=\"toggle-arrow2\" *ngIf=\"!isOpen\"></div>\n          <div class=\"toggle-square\">\n            <div></div>\n          </div>\n        </div>\n\n        <div class=\"search\">\n          <input type=\"text\" [(ngModel)]=\"keyword\" (click)=\"$event.stopPropagation()\" (blur)=\"hideSearchResultDrop()\"\n                 (focus)=\"showSearchResultDrop($event)\" (keyup)=\"showResultFlag = true;\" (keyup.enter)=\"sendSearchResult()\"\n                 placeholder=\"\u8BF7\u8F93\u5165\u8981\u641C\u7D22\u7684\u5185\u5BB9\">\n          <span (click)=\"sendSearchResult()\"></span>\n          <ul class=\"search-result\" *ngIf=\"searchResults && showResultFlag\">\n            <li class=\"search-result-li\" *ngFor=\"let list of (searchResults | arrFilter:searchKey:keyword)\"\n                (click)=\"selectResult($event, list)\" [title]=\"list[searchKey]\">{{list[searchKey]}}\n            </li>\n          </ul>\n        </div>\n        <div style=\"flex: 1;display: flex;justify-content: flex-end; margin-right: 20px;\">\n          <div style=\"color: #fff;cursor: pointer;margin-right: 20px;\" (click)=\"clickUs()\">\n            \u8054\u7CFB\u6211\u4EEC\n          </div>\n          <div class=\"user\" style=\"position: relative;\" (click)=\"toggleUserMenuEvent($event)\">\n            <div class=\"avatar\"></div>\n            <div class=\"user-menu\">\n              <div class=\"user-menu-name\" [title]=\"userInfo?.userName || ''\">{{userInfo?.userName || '\u672A\u767B\u5F55'}}</div>\n              <ul [hidden]=\"!toggleUserMenu\">\n                <li *ngFor=\"let menu of userMenuData\" (click)=\"sendUserMenu(menu)\">\n                  {{menu.text}}\n                </li>\n              </ul>\n            </div>\n            <div class=\"double-arrow\">\n              <div></div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>",
                    styles: [
                        ".dc-header-container {\n      height: 60px;\n    }\n\n    .dc-header {\n      position: fixed;\n      top: 0;\n      right: 0;\n      width: calc(100% - 249px);\n      height: 60px;\n      background: #1d2b40;\n      z-index: 1000;\n    }\n\n    .dc-header.zoomout {\n      width: calc(100% - 40px);\n    }\n\n    .toggle-left-menu {\n      width: 38px;\n      height: 18px;\n      cursor: pointer;\n    }\n\n    .toggle-arrow {\n      float: left;\n      border: solid 4px transparent;\n      border-right-width: 6px;\n      border-right-color: #fff;\n      width: 0;\n      height: 0;\n      margin: 5px 0 0 2px;\n    }\n\n    .toggle-arrow2 {\n      float: right;\n      border: solid 4px transparent;\n      border-left-width: 6px;\n      border-left-color: #fff;\n      width: 0;\n      height: 0;\n      margin: 5px 0 0 5px;\n    }\n\n    .toggle-square {\n      float: right;\n      width: 20px;\n      height: 18px;\n      border: solid 2px #fff;\n      border-left: none;\n      border-right: none;\n    }\n\n    .toggle-square > div {\n      width: 100%;\n      height: 8px;\n      border-bottom: solid 2px #fff\n    }\n\n    .search {\n      width: 310px;\n      height: 30px;\n      padding: 0 0 0 10px;\n      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAdVBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////li2ZAAAAAJnRSTlMA22og6OOkcfnfv7qylIh6Sxztx6ybmX49NDAl89TSYl5YRCsPA1oVtjUAAACeSURBVBjTbZBXDsQgDEQhPUBIr9vb3P+IGwiiSJkPa3gybkSrER1AqwtxikskWTQzoLLsjft2uAeoYS2E+wN2mKT0KyHXPRATTwNU5B3x9UWzxyLzmXkjCiFlCs4hTLkKfQj1AhMCtuKjZ39a4qae/EEjbKY07HVyDMb9eoytMgtFhpwY1QWuNAVuy55b21qvkQu56oRgG9dLnlCZ/AEG1Qm11McNegAAAABJRU5ErkJggg==) no-repeat 280px center #566070;\n      border-radius: 2px;\n      margin-left: 23px;\n      position: relative;\n    }\n\n    .search:hover {\n      background: url(data:image/png;base64,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) no-repeat 280px center #566070;\n    }\n\n    .search > input {\n      width: 260px;\n      height: 27px;\n      border: none;\n      transition: none;\n      background: none;\n      color: #fff;\n      opacity: 0.7;\n    }\n\n    .search > input:focus {\n      border: none;\n      transition: none;\n      background: none;\n    }\n\n    .search > span {\n      cursor: pointer;\n      display: block;\n      width: 30px;\n      height: 30px;\n      float: right;\n    }\n\n    li {\n      list-style: none;\n      margin: 0;\n      padding: 0;\n    }\n\n    .search-result {\n      position: absolute;\n      left: 0;\n      top: 29px;\n      width: 310px;\n      height: auto;\n      max-height: 200px;\n      overflow: auto;\n      border: 1px solid #ccc;\n      background: #fff;\n    }\n\n    .search-result > li {\n      cursor: pointer;\n      width: 100%;\n      height: 30px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      line-height: 30px;\n      text-indent: 10px;\n    }\n\n    .search-result > li:hover {\n      color: #fff;\n      background-color: #0081cc;\n    }\n\n    .user {\n      display: table;\n      color: #fff;\n      cursor: pointer;\n    }\n\n    .user > div {\n      display: table-cell;\n      vertical-align: middle;\n    }\n\n    .avatar {\n      width: 16px;\n      height: 16px;\n      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAYFBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////98JRy6AAAAIHRSTlMAri3+qMO1nYBz2NHMloRoQjoQ+PHnkl9YHBbfvVAlAp88q08AAABzSURBVBjTZY5XDoAgEESXDmIDe7//LS2Aor6fybxkNwMXg+BIwkNfi66YpzF0TMozhA6C5i7Z4gXHLmX2E9+T/v000xAwDVUqTe6OV9si1vDWD1FV57yoi6sTDJ6SHMZUFm4GYoDlECFTSGwstkNQFEH1DkU6BD+b1UMfAAAAAElFTkSuQmCC) no-repeat left 2px;\n    }\n\n    .user-menu {\n      padding: 0 7px 3px 7px;\n    }\n\n    .user-menu-name {\n      max-width: 150px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n    }\n\n    .user-menu > ul {\n      position: absolute;\n      right: 0;\n      top: 25px;\n      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);\n    }\n\n    .user-menu > ul > li {\n      min-width: 82px;\n      height: 30px;\n      padding: 8px 10px 0 10px;\n      color: #333;\n      font-size: 12px;\n      background: #fff;\n      list-style: none;\n      text-align: left;\n      line-height: 12px;\n      border-radius: 3px 3px 0 0\n    }\n\n    /*.user-menu > ul > li:nth-child(even) {*/\n    /*background: #edf0f5;*/\n    /*}*/\n\n    .user-menu > ul > li:hover {\n      background: #0081cc;\n      color: #fff;\n    }\n\n    .user-menu > ul > li:last-child {\n      border-radius: 3px\n    }\n\n    .double-arrow {\n      position: absolute;\n      right: -12px;\n      width: 10px;\n      height: 100%;\n      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAYAAAAxrNxjAAAAYElEQVQYlXXPUQ2AMAyE4UpAAhKQgAQkTAIScIAEpCABSR8vHVkW9tCkvV7+XgM7ZsSgNiyBFffA9O2qcCS5Nc14MLXGSHHJfkpSnaMn1AgXSnuhz1SSfPZ5/x7oswbiBUJg3DZWt/ucAAAAAElFTkSuQmCC) no-repeat center transparent;\n      z-index: 10;\n    }\n    "
                    ]
                },] },
    ];
    /** @nocollapse */
    HeaderComponent.ctorParameters = function () { return [
        { type: core_1.Renderer, },
        { type: broadcast_service_1.DcEventService, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
    ]; };
    HeaderComponent.propDecorators = {
        "userInfo": [{ type: core_1.Input },],
        "searchKey": [{ type: core_1.Input },],
        "userMenuData": [{ type: core_1.Input },],
        "leftMenuStatus": [{ type: core_1.Input },],
        "toggleLeftMenuEvent": [{ type: core_1.Output },],
        "searchResult": [{ type: core_1.Output },],
        "userMenu": [{ type: core_1.Output },],
        "contactus": [{ type: core_1.Output },],
        "searchResults": [{ type: core_1.Input },],
        "onDocumentClick": [{ type: core_1.HostListener, args: ['document:click', ['$event'],] },],
    };
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map
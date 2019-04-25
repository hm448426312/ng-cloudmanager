"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var _ = require("lodash");
var rxjs_1 = require("rxjs");
var ListShowComponent = (function () {
    function ListShowComponent() {
        this.itemWidth = 80;
        this.showKey = 'name';
        this.idKey = 'id';
        this.listActionFlag = false;
        this.removeItemEmit = new core_1.EventEmitter();
    }
    Object.defineProperty(ListShowComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (v) {
            this._data = _.cloneDeep(v);
        },
        enumerable: true,
        configurable: true
    });
    ListShowComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.resizeEvent = rxjs_1.Observable.fromEvent(window, 'resize').subscribe(function (event) {
            _this.calcIsShowAction();
        });
    };
    ListShowComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.calcIsShowAction();
        }, 10);
    };
    ListShowComponent.prototype.removeItemEvent = function (item, index, ev) {
        var _this = this;
        this.data.splice(index, 1);
        this.removeItemEmit.emit(item);
        setTimeout(function () {
            _this.calcIsShowAction();
        }, 10);
        setTimeout(function () {
            _this.isResetPostion();
        }, 20);
    };
    ListShowComponent.prototype.removeItems = function (items) {
        var _this = this;
        for (var i = 0; i < items.length; i++) {
            this.removeItem(items[i], true);
        }
        setTimeout(function () {
            _this.calcIsShowAction();
        }, 10);
        setTimeout(function () {
            _this.isResetPostion();
        }, 20);
    };
    ListShowComponent.prototype.removeItem = function (item, unRecount) {
        var _this = this;
        if (!item) {
            return;
        }
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i][this.idKey] == item[this.idKey]) {
                this.data.splice(i, 1);
            }
        }
        if (!unRecount) {
            setTimeout(function () {
                _this.calcIsShowAction();
            }, 10);
            setTimeout(function () {
                _this.isResetPostion();
            }, 20);
        }
    };
    ListShowComponent.prototype.addItem = function (item, unRecount) {
        var _this = this;
        this.data.push(_.cloneDeep(item));
        if (!unRecount) {
            setTimeout(function () {
                _this.calcIsShowAction();
            }, 10);
            setTimeout(function () {
                _this.showLastItem();
            }, 20);
        }
    };
    ListShowComponent.prototype.addItems = function (items) {
        var _this = this;
        for (var i = 0; i < items.length; i++) {
            this.addItem(items[i], true);
        }
        setTimeout(function () {
            _this.calcIsShowAction();
        }, 10);
        setTimeout(function () {
            _this.showLastItem();
        }, 20);
    };
    ListShowComponent.prototype.getData = function () {
        return _.cloneDeep(this.data);
    };
    ListShowComponent.prototype.isResetPostion = function () {
        if (!this.listBox || !this.listBoxP) {
            return false;
        }
        var listUl = this.listBox.nativeElement;
        var left = listUl.offsetLeft;
        var l = this.data.length;
        var ulWidth = l * this.itemWidth + l * 20;
        var ulPWidth = this.listBoxP.nativeElement.offsetWidth;
        if (left < 0) {
            if (ulWidth + this.itemWidth <= ulPWidth) {
                this.listBox.nativeElement.style.left = '0px';
            }
            else {
                this.listBox.nativeElement.style.left = left + this.itemWidth + 20 + 'px';
            }
        }
        if (ulWidth - Math.abs(left) < ulPWidth) {
        }
    };
    ListShowComponent.prototype.showLastItem = function () {
        if (!this.listBox || !this.listBoxP) {
            return false;
        }
        var l = this.data.length;
        var ulWidth = l * this.itemWidth + l * 20;
        var ulPWidth = this.listBoxP.nativeElement.offsetWidth;
        if (ulWidth > ulPWidth) {
            this.listBox.nativeElement.style.left = -(ulWidth - ulPWidth) + 'px';
        }
    };
    ListShowComponent.prototype.calcIsShowAction = function () {
        if (!this.listBox || !this.listBoxP) {
            return false;
        }
        var l = this.data.length;
        var ulWidth = l * this.itemWidth + l * 20;
        var ulPWidth = this.listBoxP.nativeElement.offsetWidth;
        if (ulWidth > ulPWidth) {
            this.listActionFlag = true;
        }
        else {
            this.listActionFlag = false;
        }
    };
    ListShowComponent.prototype.listActionHout = function () {
        if (this.hoverMoveTimer) {
            clearInterval(this.hoverMoveTimer);
            this.hoverMoveTimer = null;
        }
    };
    ListShowComponent.prototype.listActionHover = function (offset) {
        var _this = this;
        if (this.hoverMoveTimer) {
            clearInterval(this.hoverMoveTimer);
            this.hoverMoveTimer = null;
        }
        this.hoverMoveTimer = setInterval(function () {
            _this.listUlMove(offset, 2);
        }, 10);
    };
    ListShowComponent.prototype.listActionDown = function (offset) {
        var _this = this;
        if (this.hoverMoveTimer) {
            clearInterval(this.hoverMoveTimer);
            this.hoverMoveTimer = null;
        }
        this.hoverMoveTimer = setInterval(function () {
            _this.listUlMove(offset, 6);
        }, 10);
    };
    ListShowComponent.prototype.listActionUp = function (offset) {
        var _this = this;
        if (this.hoverMoveTimer) {
            clearInterval(this.hoverMoveTimer);
            this.hoverMoveTimer = null;
        }
        this.hoverMoveTimer = setInterval(function () {
            _this.listUlMove(offset, 1);
        }, 10);
    };
    ListShowComponent.prototype.listUlMove = function (offset, step) {
        var listUl = this.listBox.nativeElement;
        var left = listUl.offsetLeft;
        var l = this.data.length;
        var ulWidth = l * this.itemWidth + l * 20;
        var ulPWidth = this.listBoxP.nativeElement.offsetWidth;
        var leftRes = 0;
        if (offset === 'left') {
            if (ulWidth - Math.abs(left) <= ulPWidth) {
                leftRes = left;
            }
            else {
                if (ulWidth - Math.abs(left) - step <= ulPWidth) {
                    leftRes = -(ulWidth - ulPWidth);
                }
                else {
                    leftRes = left - step;
                }
            }
        }
        else if (offset === 'right') {
            if (left >= 0) {
                leftRes = 0;
            }
            else {
                if (left + step >= 0) {
                    leftRes = 0;
                }
                else {
                    leftRes = left + step;
                }
            }
        }
        listUl.style.left = leftRes + 'px';
    };
    ListShowComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-list-show',
                    template: "\n    <div>\n      <div class=\"show-box\">\n        <span class=\"show-action-left\" (mouseleave)=\"listActionHout()\" (mouseup)=\"listActionUp('right')\"\n              (mousedown)=\"listActionDown('right')\" (mouseenter)=\"listActionHover('right')\" *ngIf=\"listActionFlag\"></span>\n        <div class=\"show-ul-outer\" #listBoxP>\n          <div class=\"show-ul\" #listBox>\n            <ng-template ngFor let-item [ngForOf]=\"data\" let-i=\"index\">\n              <div class=\"show-item\" [class.no-del]=\"!canDelete\" [title]=\"item[showKey]\" [style.width]=\"itemWidth + 'px'\">\n                {{item[showKey] || item[idKey]}}\n                <span class=\"show-item-del\" title=\"Remove\" *ngIf=\"canDelete\" (click)=\"removeItemEvent(item, i, $event)\"></span>\n              </div>\n            </ng-template>\n          </div>\n        </div>\n        <span class=\"show-action-right\" (mouseleave)=\"listActionHout()\" (mouseup)=\"listActionUp('left')\"\n              (mousedown)=\"listActionDown('left')\" (mouseenter)=\"listActionHover('left')\" *ngIf=\"listActionFlag\"></span>\n      </div>\n    </div>\n  ",
                    styles: [
                        "\n      .show-box {\n        display: flex;\n        flex-direction: row;\n        height: 25px;\n      }\n\n      .show-action-left,\n      .show-action-right {\n        flex-shrink: 0;\n        flex-grow: 0;\n        width: 30px;\n        height: 25px;\n        cursor: pointer;\n      }\n\n      .show-action-left {\n        margin-right: 10px;\n        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAALCAYAAACzkJeoAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAHdJREFUGJV1ziEOAjEABMC5SxMMFscvTtSRYO4BBDSfIPcJHBZB8CBrEDwAwSeQWCw5VE1T1s5ms01KSSUTHEIF5rggtgUs8USEjA12uGGWmwFTnLAu9wPOWNVetdji+g8/2GDAt0QYsUePd4k5d3R41BBeWOD4A9jUEkm0prjHAAAAAElFTkSuQmCC) no-repeat center center transparent;\n      }\n\n      .show-action-left:hover {\n        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAALCAYAAACzkJeoAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAHdJREFUGJV1ziEOwkAABMBpc0kNFtdfIOpIMDyAgOYTDR6Nq60g+PIBBA8ghE9UYrGkqDOXY+1sNls4PmVSoQsZqDGgKRNY4YUGIhZoccM8NgNmOGOb7gdcsMm9KrHH9R9+sMMB3xRhwglrvFOMuWOBRw5hxBL9D9PvEXfEIYOZAAAAAElFTkSuQmCC) no-repeat center center transparent;\n      }\n\n      .show-action-right {\n        margin-left: 10px;\n        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAALCAYAAACzkJeoAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAHlJREFUGJVtz6EKwnAUhfHfxqJ1be9hE3yHKcbFRYM+hQ8g+AYD678YBqsGX8JotRiEFYVx2Vc/7jnnZimlM/b4CORoMaCak7DEA+s5CSVuOCCLEgqc0GFRxJ4fG+Tx8s8VTZRfHLHFexr7wg79dADcUeMZX7lgFQWMdzcTKv3OMggAAAAASUVORK5CYII=) no-repeat center center transparent;\n      }\n\n      .show-action-right:hover {\n        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAALCAYAAACzkJeoAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAHpJREFUGJVtzyEKwgAYhuFnY3HV5j1sgnfYxGhcNMwDmD2AsBsInmBBsIp4iUWrZWFgcTB+9taX//u+P3F6XXBAL5CiwgPLOQkrvLGZk7BAixpJlJDhjCvyLPb8KZHGy5Eb9lEOOGKL7zT2gx3u0wHwRIEuvtJgHQX8AHJSEliW6yLRAAAAAElFTkSuQmCC) no-repeat center center transparent;\n      }\n\n      .show-ul-outer {\n        flex: 1;\n        position: relative;\n        overflow: hidden;\n      }\n\n      .show-ul {\n        display: flex;\n        flex-direction: row;\n        align-items: center;\n        font-size: 14px;\n        position: absolute;\n      }\n\n      .show-item {\n        position: relative;\n        height: 25px;\n        line-height: 22px;\n        color: #333;\n        flex-shrink: 0;\n        flex-grow: 0;\n        background: #fff;\n        text-align: left;\n        padding: 0 20px 0 6px;\n        border: 1px solid #0081cc;\n        margin-right: 20px;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n        overflow: hidden;\n        border-radius: 3px;\n      }\n\n      .show-item.no-del {\n        padding: 0 6px;\n      }\n\n      .show-item-del {\n        position: absolute;\n        right: 6px;\n        width: 10px;\n        top: 0;\n        height: 25px;\n        cursor: pointer;\n        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAG1JREFUCJlNzrENwlAMhOGPF6bwGq9nCcIcoUAiFRPQZAuKvCXSIabIIojGEbnG1v2W7w611oYJi79OGEqCOY0NzJi6iFjxRsM3jy9YuoiANcETD7yg7F7dccO4RRxzaThnqU9m9gXDDsjZ4/oD2aAYLP0YveEAAAAASUVORK5CYII=) no-repeat center transparent;\n      }\n    "
                    ]
                },] },
    ];
    /** @nocollapse */
    ListShowComponent.ctorParameters = function () { return []; };
    ListShowComponent.propDecorators = {
        "data": [{ type: core_1.Input },],
        "itemWidth": [{ type: core_1.Input },],
        "showKey": [{ type: core_1.Input },],
        "idKey": [{ type: core_1.Input },],
        "canDelete": [{ type: core_1.Input },],
        "removeItemEmit": [{ type: core_1.Output },],
        "listBox": [{ type: core_1.ViewChild, args: ['listBox',] },],
        "listBoxP": [{ type: core_1.ViewChild, args: ['listBoxP',] },],
    };
    return ListShowComponent;
}());
exports.ListShowComponent = ListShowComponent;
//# sourceMappingURL=list.show.component.js.map
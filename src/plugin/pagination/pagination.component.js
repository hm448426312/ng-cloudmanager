"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PaginationComponent = (function () {
    function PaginationComponent() {
        this.pageSizeList = [20, 30, 50, 100];
        this.pageSize = 20;
        this.showAfterDot = false;
        this.showBeforeDot = false;
        this.nowPageChange = new core_1.EventEmitter();
        this.pageSizeChange = new core_1.EventEmitter();
        this.paginationEvent = new core_1.EventEmitter();
        this.showList = [];
    }
    Object.defineProperty(PaginationComponent.prototype, "total", {
        get: function () {
            return this._total;
        },
        set: function (v) {
            this._total = v;
            this.nowPageSize = this.pageSize;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "nowPage", {
        get: function () {
            return this._nowPage;
        },
        set: function (v) {
            if (this._nowPage != v) {
                this._nowPage = v;
            }
        },
        enumerable: true,
        configurable: true
    });
    PaginationComponent.prototype.ngOnInit = function () {
        // this.draw();
    };
    PaginationComponent.prototype.draw = function () {
        this.showList = [];
        this.showBeforeDot = false;
        this.showAfterDot = false;
        if (this.total == 0)
            return;
        this.maxPage = Math.ceil(this.total / this.nowPageSize);
        if (this.pageNum !== undefined && (this.pageNum === 3 || this.pageNum === 1)) {
            // 分页中间显示3或1
            if (this.nowPage <= 2) {
                if (this.maxPage <= 3) {
                    for (var i = 2; i <= this.maxPage - 1; i++) {
                        this.showList.push(i);
                    }
                }
                if (this.maxPage > 3) {
                    for (var i = 2; i <= 2; i++) {
                        this.showList.push(i);
                    }
                    this.showAfterDot = true;
                }
            }
            else {
                if (this.nowPage - 1 > 1) {
                    if (this.pageNum === 3) {
                        this.showList.push(this.nowPage - 1);
                    }
                    if (this.nowPage - 1 > 1) {
                        this.showBeforeDot = true;
                    }
                }
                if (this.nowPage != this.maxPage) {
                    this.showList.push(this.nowPage);
                }
                if (this.nowPage + 1 < this.maxPage) {
                    if (this.pageNum === 3) {
                        this.showList.push(this.nowPage + 1);
                    }
                    if (this.nowPage + 1 < this.maxPage - 1) {
                        this.showAfterDot = true;
                    }
                }
            }
        }
        else {
            if (this.nowPage <= 3) {
                if (this.maxPage <= 6) {
                    for (var i = 2; i <= this.maxPage - 1; i++) {
                        this.showList.push(i);
                    }
                }
                if (this.maxPage > 6) {
                    //6
                    for (var i = 2; i <= 5; i++) {
                        this.showList.push(i);
                    }
                    this.showAfterDot = true;
                }
            }
            else {
                if (this.nowPage - 2 > 1) {
                    this.showList.push(this.nowPage - 2);
                    if (this.nowPage - 2 > 2) {
                        this.showBeforeDot = true;
                    }
                }
                if (this.nowPage - 1 > 1) {
                    this.showList.push(this.nowPage - 1);
                }
                if (this.nowPage != this.maxPage) {
                    this.showList.push(this.nowPage);
                }
                if (this.nowPage + 1 < this.maxPage) {
                    this.showList.push(this.nowPage + 1);
                }
                if (this.nowPage + 2 < this.maxPage) {
                    this.showList.push(this.nowPage + 2);
                    if (this.nowPage + 2 < this.maxPage - 1) {
                        this.showAfterDot = true;
                    }
                }
            }
        }
    };
    PaginationComponent.prototype.jumpPage = function (page) {
        if (page == null) {
            this.nowPage = this.jump === 0 ? 1 : this.jump;
        }
        else {
            if (page == 'before') {
                if (this.nowPage == 1) {
                    return;
                }
                this.nowPage = this.nowPage - 1;
            }
            else if (page == 'after') {
                if (this.nowPage == this.maxPage) {
                    return;
                }
                this.nowPage = this.nowPage + 1;
            }
            else {
                this.nowPage = page;
            }
        }
        if (this.nowPage > this.maxPage) {
            this.nowPage = this.maxPage;
        }
        this.draw();
        this.nowPageChange.emit(this.nowPage);
        this.paginationEvent.emit();
    };
    PaginationComponent.prototype.pressInput = function (event) {
        if (event.key == 'Enter') {
            if (event.target.value !== undefined && event.target.value !== '') {
                this.jumpPage();
                this.jump = null;
            }
        }
        event = event || window.event;
        var keyCode = window.event ? event.keyCode : event.which;
        return keyCode >= 48 && keyCode <= 57 || keyCode === 8;
    };
    PaginationComponent.prototype.changeLimit = function (limit) {
        if (this.nowPageSize === limit) {
            return;
        }
        this.nowPageSize = limit;
        this.nowPage = 1;
        this.draw();
        this.pageSizeChange.emit(limit);
    };
    /*ngOnChanges(changes: SimpleChanges) {
        if (!changes.total.firstChange) {
          this.draw();
        }
      }*/
    PaginationComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-pagination',
                    template: "\n    <div class=\"display-flex width-100 flex-end\" *ngIf=\"total!=0\">\n\n      <div style=\"line-height:30px;font-size: 12px;color: #666666\">\n        \u5171{{total}}\u6761\n      </div>\n      <div class=\"display-flex\" style=\"margin-left:20px; height: 30px; align-items: center;\">\n        <div *ngIf=\"!hideSizeList\" style=\"margin-right: 10px;\">\n          <dc-select [width]=\"'80px'\" [dropUp]=\"true\" [optionList]=\"pageSizeList\" [currentSelect]=\"pageSize\"\n                     (changeValueEvent)=\"changeLimit($event)\"\n                     [isReadonly]=\"true\"></dc-select>\n        </div>\n        <div class=\"select-box left\" (click)=\"jumpPage('before')\" [ngClass]=\"{'cursor-pointer':nowPage!=1}\">\n          <div class=\"img\"></div>\n        </div>\n        <div class=\"cursor-pointer number\" style=\"margin-left:5px\" (click)=\"jumpPage(1)\" [ngClass]=\"{'selet':nowPage==1}\">1</div>\n        <div *ngIf=\"showBeforeDot\" style=\"margin-left:10px\">...</div>\n        <div class=\"cursor-pointer number\" style=\"margin-left:10px\" *ngFor=\"let c of showList\" (click)=\"jumpPage(c)\"\n             [ngClass]=\"{'selet':nowPage==c}\">{{c}}\n        </div>\n        <div *ngIf=\"showAfterDot\" style=\"margin-left:10px\">...</div>\n        <div class=\"cursor-pointer number\" *ngIf=\"maxPage!=1\" style=\"margin-left:10px\" (click)=\"jumpPage(maxPage)\"\n             [ngClass]=\"{'selet':nowPage==maxPage}\">{{maxPage}}\n        </div>\n        <div class=\"select-box right\" style=\"margin-left:5px\" (click)=\"jumpPage('after')\"\n             [ngClass]=\"{'cursor-pointer':nowPage!=maxPage}\">\n          <div class=\"img\"></div>\n        </div>\n      </div>\n      <div style=\"margin-left:20px;font-size: 12px;color: #666666;display: flex;flex-direction: row;align-items: center;\">\n        \u8DF3\u8F6C\u81F3\n        <input [(ngModel)]=\"jump\" type=\"number\" class=\"jump-input\"\n               (keypress)=\"pressInput($event)\">\n      </div>\n    </div>\n  ",
                    styles: [
                        "\n      .jump-input {\n        height: 17px;\n        width: 50px;\n        min-width: 30px;\n      }\n\n      input[type=number] {\n        border: solid 1px #ccc;\n        margin-left: 10px;\n        border-radius: 2px;\n        height: 22px;\n        ime-mode: Disabled;\n        -moz-appearance: textfield;\n      }\n\n      input[type=number]::-webkit-outer-spin-button,\n      input[type=number]::-webkit-inner-spin-button {\n        -webkit-appearance: none !important;\n        margin: 0;\n      }\n\n      .select-box {\n        display: flex;\n        justify-content: center;\n      }\n\n      .selet {\n        color: #0081cc !important;\n        background-color: #edf0f5;\n        width: 24px;\n        height: 24px;\n        border-radius: 2px;\n      }\n\n      .number {\n        width: auto;\n        height: 24px;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        font-size: 14px;\n        color: #666666;\n        padding: 0 8px;\n      }\n\n      .left {\n        width: 24px;\n        height: 24px\n      }\n\n      .right {\n        width: 24px;\n        height: 24px\n      }\n\n      .left .img:hover, .right .img:hover {\n        border: 0px;\n        background-color: rgba(237, 240, 245, 0.7);\n      }\n\n      .right .img {\n        width: 24px;\n        height: 24px;\n        background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAOCAYAAAD9lDaoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFQjQ2RTdENjM2NEQxMUU4Qjg0NUFGM0NBNEI1QTU5RiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFQjQ2RTdENzM2NEQxMUU4Qjg0NUFGM0NBNEI1QTU5RiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkVCNDZFN0Q0MzY0RDExRThCODQ1QUYzQ0E0QjVBNTlGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkVCNDZFN0Q1MzY0RDExRThCODQ1QUYzQ0E0QjVBNTlGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+9VfmmQAAAIFJREFUeNpinDlzJgMQyDFAwCMGLIAJiGWAeD8Uy+FS9BmI3wCxEi6FIEUfgdgNiE/hUsgEpfEqZELSAFN4El0hE5r1IIXu6AqZGPADRmwm8QPxTiA2B+L7QOwACjsmQgqQTcKpAKYIrwKYIl4gFgPie9gUgAALED+BSuKMYIAAAwDYWiOo8+PEvgAAAABJRU5ErkJggg==\") no-repeat center;\n        border: solid 1px rgba(204, 204, 204, 0.5);\n      }\n\n      .left .img {\n        width: 24px;\n        height: 24px;\n        background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAOCAYAAAD9lDaoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxNkU3NjQ3MTM2NEUxMUU4OTJDOTk0NTAxMEZCMzdDRSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxNkU3NjQ3MjM2NEUxMUU4OTJDOTk0NTAxMEZCMzdDRSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjE2RTc2NDZGMzY0RTExRTg5MkM5OTQ1MDEwRkIzN0NFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE2RTc2NDcwMzY0RTExRTg5MkM5OTQ1MDEwRkIzN0NFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+bs19ngAAAHhJREFUeNpinDlzJgMOIAelH7HgUbAfyrZnwqNACYhfA/FnJjwKTgKxOxB/ZCKkACTBREgBTBFeBcgmMULp/9i8ClL0CIgdgPg+EFsA8Q4g5sdmEkzhPWwKkX0HUuiITSF6OGFViC3EkRWKATEvrriDKQSBJwABBgAMTCQOrDj/SAAAAABJRU5ErkJggg==\") no-repeat center;\n        border: solid 1px rgba(204, 204, 204, 0.5);\n      }\n    "
                    ]
                },] },
    ];
    /** @nocollapse */
    PaginationComponent.ctorParameters = function () { return []; };
    PaginationComponent.propDecorators = {
        "pageSizeList": [{ type: core_1.Input },],
        "pageSize": [{ type: core_1.Input },],
        "pageNum": [{ type: core_1.Input },],
        "hideSizeList": [{ type: core_1.Input },],
        "nowPage": [{ type: core_1.Input },],
        "total": [{ type: core_1.Input },],
        "nowPageChange": [{ type: core_1.Output },],
        "pageSizeChange": [{ type: core_1.Output },],
        "paginationEvent": [{ type: core_1.Output },],
    };
    return PaginationComponent;
}());
exports.PaginationComponent = PaginationComponent;
//# sourceMappingURL=pagination.component.js.map
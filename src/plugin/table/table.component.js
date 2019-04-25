"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var _ = require("lodash");
var broadcast_service_1 = require("../broadcast/broadcast.service");
var TableComponent = (function () {
    function TableComponent(renderer, broadcast) {
        this.renderer = renderer;
        this.broadcast = broadcast;
        this.userPersentWidth = false;
        this.hasFilter = [];
        this.checkBox = false;
        this.sortEvent = new core_1.EventEmitter();
        this.checkEvent = new core_1.EventEmitter();
        this.nowSort = {};
        this.allSelect = false;
        this.checks = [];
        this.checks_data = [];
        this.scrollBarWidth = 0;
        this.showFilter = [];
    }
    Object.defineProperty(TableComponent.prototype, "datas", {
        get: function () {
            return this._datas;
        },
        set: function (v) {
            this.allSelect = false;
            this._datas = v;
            this.setDivWidth();
            this.initCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "parentHidden", {
        get: function () {
            return this._parentHidden;
        },
        set: function (v) {
            var _this = this;
            this._parentHidden = v;
            setTimeout(function () { return _this.setDivWidth(); });
        },
        enumerable: true,
        configurable: true
    });
    TableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.broadCastPromise = this.broadcast.on('leftmenu_close').subscribe(function (event) {
            setTimeout(function () {
                _this.setDivWidth();
            }, 100);
        });
        this.setDivWidth();
        this.resizeEvent = rxjs_1.Observable.fromEvent(window, 'resize').subscribe(function (event) {
            _this.setDivWidth();
        });
        // this.initCheck();
    };
    TableComponent.prototype.ngOnDestroy = function () {
        this.resizeEvent && this.resizeEvent.unsubscribe();
        this.broadCastPromise && this.broadCastPromise.unsubscribe();
    };
    TableComponent.prototype.setWidth = function (width, index) {
        if (this.userPersentWidth) {
            if (width.indexOf('%') <= 0) {
                width = width + '%';
                return width;
            }
        }
        else {
            if (width && width.indexOf('%') > 0) {
                // if (this.checkBox && index === 0) {
                //   return (parseInt(width) / 100 * this.initWidth) - 30 + 'px';
                // } else {
                var _w = void 0;
                if (this.checkBox) {
                    _w = this.initWidth - 35;
                }
                else {
                    _w = this.initWidth;
                }
                if (_w < 0) {
                    _w = 0;
                }
                return parseInt(width) / 100 * _w + 'px';
                // }
            }
            else {
                return width;
            }
        }
    };
    TableComponent.prototype.setDivWidth = function () {
        var parent = this.tableContainer.nativeElement.parentNode.parentNode;
        this.initWidth = parent.offsetWidth || this.initWidth;
        if (this.scrollHeight && this.overflowBox) {
            this.renderer.setElementStyle(this.overflowBox.nativeElement, 'width', this.initWidth + 'px');
        }
    };
    TableComponent.prototype.initCheck = function () {
        this.checks = [];
        for (var _i = 0, _a = this.datas; _i < _a.length; _i++) {
            var d = _a[_i];
            this.checks.push(false);
        }
    };
    TableComponent.prototype.allSelectCheck = function () {
        this.checks = [];
        if (this.radio) {
            return;
        }
        for (var _i = 0, _a = this.datas; _i < _a.length; _i++) {
            var d = _a[_i];
            if (d.readOnly) {
                this.checks.push(false);
            }
            else {
                this.checks.push(this.allSelect);
            }
        }
        this.sendCheckEvent();
    };
    TableComponent.prototype.checkSelect = function (index) {
        if (this.radio) {
            for (var i = 0; i < this.checks.length; i++) {
                if (!this.datas[i].readOnly && i !== index) {
                    this.checks[i] = false;
                }
            }
        }
        var allTrue = true;
        for (var i = 0; i < this.checks.length; i++) {
            if (!this.checks[i] && !this.datas[i].readOnly) {
                allTrue = false;
            }
        }
        if (allTrue) {
            this.allSelect = true;
        }
        else {
            this.allSelect = false;
        }
        this.sendCheckEvent();
    };
    TableComponent.prototype.checkOption = function (event, k, header) {
        header.filter.optionList[k].check = event;
    };
    TableComponent.prototype.sendCheckOption = function (header, index) {
        var result = header.filter.optionList.filter(function (item) { return item.check; });
        if (result.length === 0) {
            this.hasFilter[index] = false;
        }
        else {
            this.hasFilter[index] = true;
        }
        header.filter.fn(result);
    };
    TableComponent.prototype.sendCheckEvent = function () {
        this.checks_data = [];
        for (var i = 0; i < this.datas.length; i++) {
            if (this.checks[i]) {
                this.checks_data.push(this.datas[i]);
            }
        }
        this.checkEvent.emit(this.checks_data);
    };
    TableComponent.prototype.sort = function (header) {
        var _this = this;
        if (!header.canSort) {
            return;
        }
        if (this.nowSort.field == header.field) {
            if (this.nowSort.sort == 'desc') {
                this.nowSort.sort = 'asc';
            }
            else if (this.nowSort.sort == 'asc') {
                this.nowSort.sort = '';
            }
            else {
                this.nowSort.sort = 'desc';
            }
        }
        else {
            this.nowSort.field = header.field;
            this.nowSort.sort = 'desc';
        }
        if (this.sortEvent.observers.length) {
            this.sortEvent.emit(this.nowSort);
        }
        else {
            this.datas.sort(function (a, b) {
                var result = _this.nowSort.sort === 'asc' ? a[_this.nowSort.field] > b[_this.nowSort.field] : b[_this.nowSort.field] > a[_this.nowSort.field];
                return result ? 1 : 0;
            });
        }
    };
    TableComponent.prototype.showFilterBox = function (event, header) {
        this.hideFilter();
        event.stopPropagation();
        event.preventDefault();
        var filterBoxDom = event.target.nextElementSibling;
        filterBoxDom.style.display = 'block';
        var flag = false;
        for (var i = 0; i < this.showFilter.length; i++) {
            if (this.showFilter[i] == filterBoxDom) {
                flag = true;
                break;
            }
        }
        if (!flag) {
            this.showFilter.push(filterBoxDom);
        }
        this.currentField = header.field;
    };
    TableComponent.prototype.hideFilter = function () {
        for (var i = 0; i < this.showFilter.length; i++) {
            this.showFilter[i].style.display = 'none';
        }
        this.showFilter = [];
    };
    TableComponent.prototype.clickFilter = function (event, header, index) {
        if (event.target.value === '') {
        }
        else {
            this.hasFilter[index] = true;
            header.filter.fn(_.trim(event.target.value));
        }
        var filterBoxDom = event.target.parentNode;
        filterBoxDom.style.display = 'none';
    };
    TableComponent.prototype.checkEmpty = function (event, header, index) {
        if (event === '') {
            this.hasFilter[index] = false;
            header.filter.fn(event);
        }
    };
    // 设置th内容居中
    // 设置th内容居中
    TableComponent.prototype.setThCenter = 
    // 设置th内容居中
    function (isCenter) {
        var center;
        if (isCenter) {
            center = {
                'display': 'flex',
                'justify-content': 'center'
            };
        }
        return center;
    };
    TableComponent.prototype.onDocumentClick = function ($event) {
        var current = $event.target;
        for (var i = 0; i < this.showFilter.length; i++) {
            if (current.parentNode !== this.showFilter[i] && current !== this.showFilter[i].prevElementSibling && current !== this.showFilter[i])
                this.showFilter[i].style.display = 'none';
        }
    };
    TableComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-table',
                    template: "\n    <table class=\"table\" #table>\n      <thead>\n      <tr>\n        <th *ngIf=\"checkBox\" class=\"check-box\">\n          <input *ngIf=\"!radio\" id='hcheckbox{{tableId}}' type='checkbox' [(ngModel)]='allSelect' (ngModelChange)=\"allSelectCheck()\"><label\n          *ngIf=\"!radio\" for=\"hcheckbox{{tableId || ''}}\"></label>\n        </th>\n        <th class=\"table-title\" *ngFor=\"let header of headers; let j = index\"\n            title=\"{{header.hideTitle?'':header.title}}\" [style.width]=\"setWidth(header.width, j)\">\n          <div class=\"table-title-th\" [ngStyle]=\"setThCenter(header.isThCenter)\">\n            <div [ngStyle]=\"{'border-left':j===0?'none':'solid 0px #ccc'}\" class=\"text-over-flow\">{{header.title}}</div>\n            <div *ngIf=\"header.filter\" class=\"table-th-filter\" [ngClass]=\"{'hasFilter':hasFilter[j]}\">\n              <div class=\"filterBtn\" (click)=\"showFilterBox($event, header)\"></div>\n              <ng-container [ngTemplateOutlet]=\"filterTemplate\"\n                            [ngTemplateOutletContext]=\"{$implicit: {header: header,index:j}}\"></ng-container>\n            </div>\n            <div *ngIf=\"header.canSort\" class=\"table-th-sort\" (click)=\"sort(header)\"\n                 [ngClass]=\"{'asc':nowSort.field==header.field && nowSort.sort=='asc','desc':nowSort.field==header.field && nowSort.sort=='desc'}\">\n            </div>\n          </div>\n        </th>\n      </tr>\n      </thead>\n      <div *ngIf=\"!datas || datas.length == 0\" class=\"noDatas\" [style.height]=\"scrollHeight || 'auto'\">\n        <div style=\"text-align: center; height: 80px; line-height: 80px; font-size: 14px;\">\u6682\u65E0\u6570\u636E</div>\n      </div>\n      <div *ngIf=\"datas && datas.length != 0\" [style.height]=\"scrollHeight || 'auto'\" #overflowBox>\n        <tbody>\n        <tr *ngFor=\"let data of datas; let i = index\" [style.background-color]=\"checks[i]?'#edf0f5':''\" [class.bgc]=\"oddEven\">\n          <td *ngIf=\"checkBox\">\n            <input type='checkbox' id=\"checkbox{{tableId || ''}}{{i}}\" [disabled]=\"data.readOnly\" [(ngModel)]='checks[i]'\n                   (ngModelChange)=\"checkSelect(i)\"><label for=\"checkbox{{tableId || ''}}{{i}}\"></label>\n          </td>\n          <td *ngFor=\"let header of headers\">\n            <ng-container [ngTemplateOutlet]=\"template\"\n                          [ngTemplateOutletContext]=\"{$implicit: {d: data, h: header, w: setWidth(header.width)}}\"></ng-container>\n          </td>\n        </tr>\n        </tbody>\n      </div>\n    </table>\n\n    <ng-template #filterTemplate let-data>\n      <div *ngIf=\"data.header.filter.type === 'text'\" class=\"filter-box\" [class.offset-left]=\"data.header.filter.offsetLeft\">\n        <input type=\"text\" value=\"\" (keyup.enter)=\"clickFilter($event, data.header,data.index)\" [ngModel]=\"curSearchValue\"\n               (ngModelChange)=\"checkEmpty($event,data.header,data.index)\" placeholder=\"\u8BF7\u8F93\u5165\u7B5B\u9009\u5185\u5BB9\">\n      </div>\n      <div *ngIf=\"data.header.filter.type === 'checkList'\" class=\"filter-box\" [class.offset-left]=\"data.header.filter.offsetLeft\">\n        <ng-container *ngFor=\"let option of data.header.filter.optionList; let k = index\">\n          <input type='checkbox' id=\"fcheckbox{{tableId || ''}}{{k}}\" [(ngModel)]='option.check'\n                 (ngModelChange)=\"checkOption($event, k, data.header)\">\n          <label for=\"fcheckbox{{tableId || ''}}{{k}}\"></label>\n          <span>{{option.name}}</span>\n          <br/>\n        </ng-container>\n        <div>\n          <div class=\"filterSubmit\" (click)=\"sendCheckOption(data.header,data.index)\" [ngClass]=\"{'hasSubmit':hasFilter[data.index]}\">\u786E\u5B9A\n          </div>\n        </div>\n      </div>\n    </ng-template>",
                    styles: [
                        "\n      .canSort {\n        cursor: pointer\n      }\n\n      .table-title {\n        font-size: 14px;\n      }\n\n      table {\n        border: none;\n      }\n\n      table thead, table tbody {\n        display: table;\n      }\n\n      table > div {\n        display: block;\n        overflow-x: hidden;\n        overflow-y: auto;\n      }\n\n      table th {\n        color: #333;\n        background-color: #fff;\n        border-bottom: 1px solid #cccccc;\n      }\n\n      table td {\n        border-bottom: 1px solid #e2e2e2;\n        border-top: none;\n      }\n\n      .sort {\n        background-image: url(/assets/img/sort.png);\n        background-repeat: no-repeat;\n        background-position: center;\n        width: 20px;\n        height: 13px;\n        display: inline-block;\n      }\n\n      .sort-desc {\n        background-image: url(/assets/img/sort.png);\n        background-repeat: no-repeat;\n        background-position: center;\n        width: 20px;\n        height: 13px;\n        transform: rotate(180deg);\n      }\n\n      .table-title-th {\n        display: flex;\n      }\n\n      .table-title-th > div {\n        display: inline-block;\n        margin-right: 5px\n      }\n\n      .table {\n        font-size: 12px;\n        color: #666 !important;\n      }\n\n      .table th {\n        font-size: 14px;\n        color: #333 !important;\n        line-height: 13px;\n      }\n\n      .table-th-sort {\n        position: relative;\n        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAMBAMAAACtsOGuAAAAHlBMVEUAAABmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmbpCqcMAAAACXRSTlMA5sZkORkGnJnb+QAcAAAAMElEQVQI12NgYDZgYGDwnMLAwCo5MYAhaeZMNYbOmTNnMCBA5cyZ08ESYCVgxWBtAGv8DCictG4/AAAAAElFTkSuQmCC') no-repeat left center;\n        width: 8px;\n        height: 12px;\n        top: 1px;\n        cursor: pointer;\n      }\n\n      .table-th-sort.asc {\n        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFBAMAAACKv7BmAAAAG1BMVEUAAABmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZ8aTmeAAAACHRSTlMA5MaZYzkYBjL+0/MAAAAhSURBVAjXY2BgcWBgYIhoZWBgk2hMYCjq6FBnsOjoaAYAMaEFlaDQ04sAAAAASUVORK5CYII=') no-repeat left top;\n      }\n\n      .table-th-sort.desc {\n        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFBAMAAACKv7BmAAAAG1BMVEUAAABmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZ8aTmeAAAACHRSTlMA58acZjkbBtcF5e8AAAAhSURBVAjXY7Do6GhmKOroUGdgk2hMYGCIaGVgYGBxYAAAWCUFlY5P/qEAAAAASUVORK5CYII=') no-repeat left bottom;\n      }\n\n      .table-th-filter {\n        position: relative;\n        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOBAMAAAAGUYvhAAAAKlBMVEUAAABmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZY/DOeAAAADXRSTlMA7hHexqWBXTwhA65Xbt8TvwAAAEBJREFUCNdjiL0LAgEMyiDqsgIDB4i+wcDAkAukE4D0krt3rywA0pyydyUZQKD2bgGY5r3LgJfmkWWAAG0GBAAA/oQb9Q1/UEkAAAAASUVORK5CYII=') no-repeat left bottom;\n        width: 13px;\n        height: 14px;\n        top: 1px;\n        font-size: 12px;\n        color: #666;\n        font-weight: normal\n      }\n\n      .hasFilter {\n        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOCAYAAAD0f5bSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgV2luZG93cyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2QjVCMDc1RDQ4RkQxMUU4QkVBOTgyOUExQkY4MDU0MyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2QjVCMDc1RTQ4RkQxMUU4QkVBOTgyOUExQkY4MDU0MyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZCNUIwNzVCNDhGRDExRThCRUE5ODI5QTFCRjgwNTQzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZCNUIwNzVDNDhGRDExRThCRUE5ODI5QTFCRjgwNTQzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Z/aSswAAAIpJREFUeNpiZGg8s5SBgSGKgXiwjAlIZALxAyI1gNRlgTR9AuJoIP5LQMNfqLqPTFCBY0DcQkBTC1QdAxOSYDMQH8eh4ThUngFd019ogHxC0/AJKv4XmyaYRzPRxLLQA4oRGOTYnPMfRQ0aYGIgAwy8pnAgfkWqplVArAvEq7FJMv7//59k5wEEGACgyx6ML12vzAAAAABJRU5ErkJggg==') no-repeat left bottom;\n      }\n\n      .noDatas {\n        min-width: 100px;\n      }\n\n      .filterBtn {\n        width: 100%;\n        height: 100%;\n        display: block;\n        cursor: pointer;\n      }\n\n      .filter-box {\n        position: absolute;\n        left: 0;\n        top: 20px;\n        display: none;\n        background: #fff;\n        padding: 5px;\n        box-shadow: 0px 0px 2px 1px #ccc;\n        text-indent: 0;\n        border-radius: 2px;\n        white-space: nowrap;\n        z-index: 10;\n      }\n\n      .filter-box.offset-left {\n        right: 0;\n        left: auto;\n      }\n\n      .filter-box > input[type=text] {\n        width: 159px;\n        height: 26px;\n        border: solid 1px #ccc;\n        padding: 0;\n        margin: 0;\n        background: #fff;\n        transition: none;\n        text-indent: 5px;\n        font-size: 14px;\n        font-weight: normal;\n        color: #666;\n        border-radius: 2px;\n        font-size: 12px\n      }\n\n      .filter-box > input:focus {\n        border-color: #0081cc\n      }\n\n      .filter-box > span {\n        display: inline-block;\n        font-size: 14px;\n        line-height: 25px;\n        text-indent: 7px\n      }\n\n      .filter-box > input[type=checkbox] {\n        position: relative;\n        display: none;\n        bottom: -2px;\n        cursor: pointer;\n      }\n\n      .filterSubmit {\n        padding: 0 20px;\n        text-align: center;\n        margin: 5px auto;\n        color: #fff;\n        width: 94px;\n        height: 26px;\n        line-height: 23px;\n        font-size: 14px;\n        background: #0081cc;\n        border-radius: 10px;\n        box-shadow: 0px 0px 1px 1px #ccc;\n        cursor: pointer;\n      }\n\n      .filterSubmit:hover {\n        background: #0067a3\n      }\n\n      .filterSubmit:active {\n        box-shadow: none\n      }\n\n      .hasSubmit {\n        color: #000000;\n        background: #ccc;\n        box-shadow: 0px 0px 1px 1px #ccc;\n      }\n\n      th.check-box {\n        width: 33px;\n      }\n\n      .table th,\n      .table td {\n        text-align: left;\n        border-top: none;\n        padding: 18px 0 13px;\n        text-indent: 20px;\n        height: 14px;\n        line-height: 14px\n      }\n\n      .check-box, td {\n        position: relative;\n      }\n\n      input[type=checkbox] {\n        visibility: hidden;\n      }\n\n      .check-box label,\n      td label {\n        cursor: pointer;\n        position: absolute;\n        width: 18px;\n        height: 18px;\n        top: 18px;\n        left: 15px;\n        background: #fff;\n        border: 1px solid #c8c8c8;\n        -moz-border-radius: 3px; /* Gecko browsers */\n        -webkit-border-radius: 3px; /* Webkit browsers */\n        border-radius: 3px; /* W3C syntax */\n      }\n\n      .filter-box label {\n        display: inline-block;\n        position: relative;\n        cursor: pointer;\n        width: 16px;\n        height: 16px;\n        top: 10px;\n        left: 5px;\n        background: #fff;\n        border: 1px solid #c8c8c8;\n        -moz-border-radius: 3px; /* Gecko browsers */\n        -webkit-border-radius: 3px; /* Webkit browsers */\n        border-radius: 3px; /* W3C syntax */\n      }\n\n      .check-box label:hover,\n      .filter-box label:hover,\n      td label:hover {\n        background: #0081CC;\n      }\n\n      .check-box label:after,\n      td label:after {\n        opacity: 0;\n        content: '';\n        position: absolute;\n        width: 9px;\n        height: 5px;\n        background: transparent;\n        top: 4px;\n        left: 4px;\n        border: 2px solid #fff;\n        border-top: none;\n        border-right: none;\n        -webkit-transform: rotate(-45deg);\n        -moz-transform: rotate(-45deg);\n        -o-transform: rotate(-45deg);\n        -ms-transform: rotate(-45deg);\n        transform: rotate(-45deg);\n      }\n\n      .filter-box label:after {\n        opacity: 0;\n        content: '';\n        position: absolute;\n        width: 9px;\n        height: 5px;\n        background: transparent;\n        top: 3px;\n        left: 3px;\n        border: 2px solid #fff;\n        border-top: none;\n        border-right: none;\n        -webkit-transform: rotate(-45deg);\n        -moz-transform: rotate(-45deg);\n        -o-transform: rotate(-45deg);\n        -ms-transform: rotate(-45deg);\n        transform: rotate(-45deg);\n      }\n\n      .check-box label:hover::after,\n      .filter-box label:hover::after,\n      td label:hover::after {\n        opacity: 0.6;\n      }\n\n      input[type=checkbox]:disabled + label {\n        cursor: not-allowed;\n        background-color: #f5f5f5;\n        opacity: 0.4;\n      }\n\n      input[type=checkbox]:disabled + label:hover {\n        background: #ffffff;\n      }\n\n      input[type=checkbox]:checked + label {\n        background: #0081CC;\n      }\n\n      input[type=checkbox]:checked + label:after {\n        opacity: 1.0;\n      }\n\n      tbody tr.bgc:nth-child(odd) {\n        background-color: #f8f8f8;\n      }\n\n      tbody tr.bgc:nth-child(even) {\n        background-color: #ffffff;\n      }\n\n      tbody tr:hover {\n        background-color: #edf0f5;\n      }\n\n      tbody tr.bgc:hover {\n        background-color: #edf0f5;\n      }\n    "
                    ]
                },] },
    ];
    /** @nocollapse */
    TableComponent.ctorParameters = function () { return [
        { type: core_1.Renderer, },
        { type: broadcast_service_1.DcEventService, },
    ]; };
    TableComponent.propDecorators = {
        "template": [{ type: core_1.ContentChild, args: [core_1.TemplateRef,] },],
        "filterTemplate": [{ type: core_1.ViewChild, args: ['filterTemplate',] },],
        "tableContainer": [{ type: core_1.ViewChild, args: ['table',] },],
        "overflowBox": [{ type: core_1.ViewChild, args: ['overflowBox',] },],
        "headers": [{ type: core_1.Input },],
        "oddEven": [{ type: core_1.Input },],
        "isSmall": [{ type: core_1.Input },],
        "tableId": [{ type: core_1.Input },],
        "radio": [{ type: core_1.Input },],
        "userPersentWidth": [{ type: core_1.Input },],
        "datas": [{ type: core_1.Input },],
        "checkBox": [{ type: core_1.Input },],
        "sortEvent": [{ type: core_1.Output },],
        "checkEvent": [{ type: core_1.Output },],
        "scrollHeight": [{ type: core_1.Input },],
        "parentHidden": [{ type: core_1.Input },],
        "onDocumentClick": [{ type: core_1.HostListener, args: ['document:click', ['$event'],] },],
    };
    return TableComponent;
}());
exports.TableComponent = TableComponent;
//# sourceMappingURL=table.component.js.map
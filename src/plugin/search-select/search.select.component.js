"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var _ = require("lodash");
var SearchSelectComponent = (function () {
    function SearchSelectComponent(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        this.firstLoad = true;
        this.checkEvent = new core_1.EventEmitter();
        this.maxHeight = this.maxHeight || '300px';
        this.width = this.width || '150px';
        this.nameKey = this.nameKey || 'name';
        this.fieldKey = this.fieldKey || 'id';
        this.checkOptions = {
            key: 'checked',
        };
    }
    Object.defineProperty(SearchSelectComponent.prototype, "source", {
        get: function () {
            return this._source;
        },
        set: function (v) {
            if (!v) {
                this._source = [];
            }
            for (var i = 0; i < v.length; i++) {
                var vi = v[i];
                vi.checkModel = {
                    checked: false,
                    index: i,
                    field: vi[this.fieldKey]
                };
                if (this.currentValue && this.currentValue.length > 0) {
                    for (var j = 0; j < this.currentValue.length; j++) {
                        var cj = this.currentValue[j];
                        if (vi[this.fieldKey] == cj[this.fieldKey]) {
                            vi.checkModel.checked = true;
                        }
                    }
                }
                else {
                    this.currentValue = [];
                }
            }
            this._source = _.cloneDeep(v);
        },
        enumerable: true,
        configurable: true
    });
    SearchSelectComponent.prototype.ngOnInit = function () {
    };
    SearchSelectComponent.prototype.onDocumentClick = function (ev) {
        if (this.showDropFlag && !this.selectContainer.nativeElement.contains(ev.target)) {
            this.showDropFlag = false;
            this.keyword = '';
        }
    };
    SearchSelectComponent.prototype.searchMe = function (ev) {
        this.keyword = ev;
    };
    SearchSelectComponent.prototype.showCurrentTitle = function () {
        if (this.currentValue) {
            var res = [];
            for (var i = 0; i < this.currentValue.length; i++) {
                res.push(this.currentValue[i][this.nameKey]);
            }
            return res.join(',   ');
        }
        return '';
    };
    SearchSelectComponent.prototype.selectList = function (list, ev) {
        if (this.multiple) {
            // 复选
            ev && ev.stopPropagation();
            if (list.checkModel.checked) {
                list.checkModel.checked = false;
            }
            else {
                list.checkModel.checked = true;
            }
            this.checkboxChangeEvent(list.checkModel);
        }
        else {
            // 单选
            this.currentValue = [];
            for (var i = 0; i < this.source.length; i++) {
                this.source[i].checkModel.checked = false;
            }
            /*if (this.currentValue[this.fieldKey] == list[this.fieldKey]) {
                    list.checkModel.checked = false;
                    return;
                  } else {
                    list.checkModel.checked = true;
                    this.currentValue.push(list);
                  }*/
            list.checkModel.checked = true;
            this.currentValue.push(list);
            ev && this.checkEvent.emit(this.currentValue);
            this.showDropFlag = false;
            this.keyword = '';
        }
    };
    SearchSelectComponent.prototype.checkboxChangeEvent = function (ev) {
        var _this = this;
        var listItem = _.find(this.source, function (item) {
            return item[_this.fieldKey] == ev.field;
        });
        if (ev.checked) {
            var index = _.findIndex(this.currentValue, function (o) {
                return o[_this.fieldKey] == ev.field;
            });
            if (index == -1) {
                this.currentValue.push(listItem);
            }
        }
        else {
            for (var i = 0; i < this.currentValue.length; i++) {
                if (this.currentValue[i][this.fieldKey] == ev.field) {
                    this.currentValue.splice(i, 1);
                    break;
                }
            }
        }
        this.checkEvent.emit(this.currentValue);
    };
    SearchSelectComponent.prototype.showDropList = function (ev) {
        var _this = this;
        this.firstLoad = false;
        if (this.showDropFlag) {
            this.showDropFlag = false;
            this.keyword = '';
        }
        else {
            setTimeout(function () {
                _this.showDropFlag = true;
            }, 10);
        }
    };
    SearchSelectComponent.prototype.getCurrentVal = function () {
        return this.currentValue;
    };
    SearchSelectComponent.prototype.filter = function (data, keyword) {
        var _this = this;
        if (keyword) {
            return data.filter(function (item) { return (item[_this.nameKey].toLowerCase()).indexOf(keyword.toLowerCase()) > -1; });
        }
        else {
            return data || [];
        }
    };
    SearchSelectComponent.prototype.clearValue = function (ev) {
        this.firstLoad = false;
        this.currentValue = [];
        for (var i = 0; i < this.source.length; i++) {
            this.source[i].checkModel.checked = false;
        }
        this.checkEvent.emit(null);
        this.showDropFlag = true;
    };
    SearchSelectComponent.prototype.selectValue = function (item) {
        var tempList;
        for (var i = 0; i < this.source.length; i++) {
            if (this.fieldKey) {
                if (this.source[i][this.fieldKey] == item[this.fieldKey]) {
                    this.source[i].checkModel.checked = true;
                    tempList = this.source[i];
                }
                else {
                    this.source[i].checkModel.checked = false;
                }
            }
            else {
                if (this.source[i] == item) {
                }
            }
        }
        this.selectList(tempList);
    };
    SearchSelectComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-search-select',
                    template: "\n    <div #selectContainer [class.dc-valid]=\"currentValue && currentValue.length > 0\" class=\"dc-select-container\"\n         [ngClass]=\"{'disable':disable}\" [class.dc-invalid]=\"required && !firstLoad && (!currentValue || currentValue.length == 0)\"\n         [style.width]=\"width\">\n      <div class=\"dc-select-input\" [class.focus]=\"showDropFlag\" [class.dc-valid]=\"currentValue && currentValue.length > 0\"\n           [class.dc-invalid]=\"required && !firstLoad && (!currentValue || currentValue.length == 0)\">\n        <!--<input name=\"dcSelect\" [disabled]=\"disable\" [readonly]=\"true\" #inputSelect>-->\n        <ul class=\"dc-select-current\" [style.margin-right]=\"noClear?'':'30px'\" (click)=\"showDropList($event)\">\n          <li [title]=\"showCurrentTitle()\">\n            <span *ngFor=\"let list of currentValue; let i = index;\">{{list[nameKey]}}{{i == (currentValue.length - 1) ? '' : ','}}</span>\n          </li>\n        </ul>\n        <i [hidden]=\"noClear || !(currentValue && currentValue.length > 0)\" class=\"clear-input-value\" (click)=\"clearValue($event)\"></i>\n        <div (click)=\"showDropList($event)\" [class.showDropFlagBtn]=\"showDropFlag\" class=\"dc-select-btn\" #dropBtn>\n          <div class=\"dc-select-arrow\"></div>\n        </div>\n      </div>\n      <div *ngIf=\"showDropFlag\" class=\"dc-select-drop\" (click)=\"$event.stopPropagation()\" #dropList>\n        <div *ngIf=\"!noSearch\" style=\"margin-bottom: 10px;padding:0 10px;\">\n          <dc-search [width]=\"'100%'\" (search)=\"searchMe($event)\"\n                     [realTime]=\"true\"></dc-search>\n        </div>\n        <ul [style.maxHeight]=\"maxHeight\">\n          <ng-template ngFor let-list [ngForOf]=\"filter(source, keyword)\">\n            <li [class.checked]=\"list.checkModel?.checked\" [class.radioLi]=\"!multiple\">\n              <dc-checkbox *ngIf=\"multiple\" [options]=\"{text: list[nameKey], width: '100%'}\"\n                           (checkboxChangeEvent)=\"checkboxChangeEvent($event)\"\n                           [checkModel]=\"list.checkModel\"></dc-checkbox>\n              <span class=\"dc-search-select-text\" *ngIf=\"!multiple\" (click)=\"selectList(list, $event)\"\n                    [title]=\"list[nameKey]\">{{list[nameKey]}}</span>\n            </li>\n          </ng-template>\n          <div *ngIf=\"filter(source, keyword).length == 0\" style=\"text-align: center;\">No Data.</div>\n        </ul>\n      </div>\n    </div>\n  ",
                    styles: ["\n    ul, ol, li {\n      list-style: none;\n      margin: 0;\n      padding: 0;\n    }\n\n    .dc-select-container {\n      width: 160px;\n      height: 30px;\n      font-size: 12px;\n      color: #333;\n      background: #fff;\n      /*border: solid 1px #ccc;*/\n      /*border-radius: 3px;*/\n      /*margin: 0 10px;*/\n      padding: 0;\n      display: inline-block;\n      position: relative\n    }\n\n    .clear-input-value {\n      position: absolute;\n      right: 20px;\n      top: 0;\n      cursor: pointer;\n      width: 12px;\n      height: 32px;\n      z-index: 2;\n      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAOVJREFUKJF90DFKA1EQBuAvj2Cu8MBqe8FokedeQb2A6WzU0uN4gxTbxkM8CKKSfqvAXsAi2lj4dlkh5Icp5p9/Zv6ZSdM0Ck7whDucFW6LFV7wDdNSOMUac/9xVeIet9iFMvmQeIw5XjELeOzFdV2LMQ6qGKO6rvv0HA8By55p21ZKSYxRjFFKSdu2403LKS77rOs6OWcpJZBz1nXduOEiHPF9CD8Bb2PPKSU552HT+CZsg78/g6qqBhu9vaqqxg2rSdM0M+TyhWP4xCJgjxu8HxF/4Br7/ugdEp6xwVeJTeEWReMX1Y9FK/4RDOgAAAAASUVORK5CYII=) no-repeat center center transparent;\n    }\n\n    .clear-input-value:hover {\n      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAOtJREFUKJF90b1NAzEcBfBfriCVm2vR3S2ABFXYAViADACUjMMGWQCGQIoQWJngrLTXWBSBIhRxooBCnuTCz++9/4dHMUYFJ3jALc4Kt8AMT/iCUTGc4hkXDuMdN1hWJfmYWHl7wbjC/VbcdZ0Qwk4VQtB13fZ6jrsK0y0zDIO2bYUQhBA0TWMYhv1K01GMcVXa2qW2bWu9XkspyTnvG1bVkb4P4bvC29/0vu+llDRN82smLCqbPYO6rvV9L+cs5yylpK7rfcNsFGMc47Vs4RgiJhVWuLb5nP/wgSt7Qy9xiUfM8VnOvHCTovEDCGVJpA/ldQoAAAAASUVORK5CYII=) no-repeat center center transparent;\n    }\n\n    .dc-select-input {\n      padding: 0 10px;\n      width: 100%;\n      height: 32px;\n      line-height: 32px;\n      position: relative;\n      border-radius: 4px;\n      border: 1px solid #ccc;\n      font-size: 14px;\n      color: #333;\n      box-shadow: none;\n    }\n\n    .dc-select-input.dc-valid {\n      border-color: #3FB992;\n    }\n\n    .dc-select-input.dc-invalid {\n      border-color: #FF3B3B;\n    }\n\n    .dc-select-input.focus {\n      border-radius: 4px;\n      border-color: #2BB1FF;\n      transition: none;\n      background: none;\n      outline: none;\n    }\n\n    .dc-select-container.disable {\n      background: #f5f5f5;\n      border-color: #ccc;\n      color: #999\n    }\n\n    .dc-select-input > .dc-select-current {\n      background: none;\n      position: relative;\n      z-index: 1;\n      cursor: default;\n      display: flex;\n      height: 30px;\n    }\n\n    .dc-select-input > .dc-select-current li {\n      text-overflow: ellipsis;\n      overflow: hidden;\n      white-space: nowrap;\n      margin-right: 10px;\n    }\n\n    .dc-select-input > .dc-select-current li span {\n      margin-right: 10px;\n    }\n\n    .dc-select-btn {\n      width: 0;\n      height: 32px;\n      position: absolute;\n      right: 0;\n      top: 0;\n      padding: 12px 15px 0 5px;\n      cursor: pointer;\n    }\n\n    .dc-select-container.disable .dc-select-btn {\n      cursor: default;\n    }\n\n    .dc-select-arrow {\n      border: solid 4px transparent;\n      border-top-width: 6px;\n      border-top-color: #333;\n      width: 0;\n      height: 0;\n      position: relative;\n    }\n\n    .dc-select-container.disable .dc-select-arrow {\n      border-top-color: #ccc;\n    }\n\n    .showDropFlagBtn .dc-select-arrow {\n      top: -4px;\n      transform: rotate(180deg);\n      -ms-transform: rotate(180deg); /* Internet Explorer */\n      -moz-transform: rotate(180deg); /* Firefox */\n      -webkit-transform: rotate(180deg); /* Safari \u548C Chrome */\n      -o-transform: rotate(180deg); /* Opera */\n    }\n\n    .dc-select-drop {\n      position: absolute;\n      top: 30px;\n      left: -1px;\n      width: calc(100% + 2px);\n      box-shadow: 0 0 10px 2px rgba(0, 0, 0, .2);\n      background: #fff;\n      list-style: none;\n      border-radius: 3px;\n      z-index: 1000;\n      padding: 10px 0;\n    }\n\n    .dc-select-drop > ul {\n      margin: 0;\n      overflow-y: auto;\n      overflow-x: hidden;\n    }\n\n    .dc-select-drop > ul > li {\n      width: 100%;\n      height: 30px;\n      line-height: 26px;\n      cursor: pointer;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      padding: 3px 10px;\n      user-select: none;\n    }\n\n    .dc-select-drop > ul > li.radioLi {\n      display: flex;\n      flex-direction: row;\n    }\n\n    .dc-select-drop > ul > li:hover,\n    .dc-select-drop > ul > li.checked {\n      color: #333333;\n      background: #edf0f5;\n    }\n\n    .dc-search-select-text {\n      flex: 1;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    SearchSelectComponent.ctorParameters = function () { return [
        { type: core_1.ChangeDetectorRef, },
    ]; };
    SearchSelectComponent.propDecorators = {
        "disable": [{ type: core_1.Input },],
        "width": [{ type: core_1.Input },],
        "maxHeight": [{ type: core_1.Input },],
        "fieldKey": [{ type: core_1.Input },],
        "nameKey": [{ type: core_1.Input },],
        "currentValue": [{ type: core_1.Input },],
        "multiple": [{ type: core_1.Input },],
        "noSearch": [{ type: core_1.Input },],
        "required": [{ type: core_1.Input },],
        "noClear": [{ type: core_1.Input },],
        "source": [{ type: core_1.Input },],
        "checkEvent": [{ type: core_1.Output },],
        "dropList": [{ type: core_1.ViewChild, args: ['dropList',] },],
        "selectContainer": [{ type: core_1.ViewChild, args: ['selectContainer',] },],
        "onDocumentClick": [{ type: core_1.HostListener, args: ['document:click', ['$event'],] },],
    };
    return SearchSelectComponent;
}());
exports.SearchSelectComponent = SearchSelectComponent;
//# sourceMappingURL=search.select.component.js.map
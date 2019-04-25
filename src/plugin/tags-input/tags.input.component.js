"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var _ = require("lodash");
var TagsInputComponent = (function () {
    function TagsInputComponent() {
        this.dropList = [];
        this.showList = [];
        this.showDropFlag = false;
        this.defaultNameKey = 'name';
        this.defaultCheckedKey = 'checked';
    }
    Object.defineProperty(TagsInputComponent.prototype, "tagDatas", {
        get: function () {
            return this._tagDatas;
        },
        set: function (v) {
            var temp = _.cloneDeep(v || []);
            var tempShowList = [];
            var tempDropList = [];
            for (var i = 0; i < temp.length; i++) {
                var checkKey = 'checked';
                if (this.options && this.options.checkKey) {
                    checkKey = this.options.checkKey;
                }
                if (temp[i][checkKey]) {
                    tempShowList.push(temp[i]);
                }
                else {
                    tempDropList.push(temp[i]);
                }
            }
            this.dropList = tempDropList;
            this.showList = tempShowList;
            this._tagDatas = temp;
        },
        enumerable: true,
        configurable: true
    });
    TagsInputComponent.prototype.ngOnInit = function () {
        if (this.options && this.options.nameKey) {
            this.defaultNameKey = this.options.nameKey;
        }
        if (this.options && this.options.checkKey) {
            this.defaultCheckedKey = this.options.checkKey;
        }
    };
    TagsInputComponent.prototype.tagsInputFocus = function (ev) {
        this.tagsInput.nativeElement.focus();
        ev.stopPropagation();
    };
    TagsInputComponent.prototype.tagInputChange = function () {
        this.showDropFlag = true;
    };
    TagsInputComponent.prototype.removeTag = function (item, index) {
        item[this.defaultCheckedKey] = false;
        var temp = this.showList.splice(index, 1)[0];
        if (temp.type != 'add') {
            this.dropList.push(temp);
        }
    };
    // input点回车/下拉点击列表，插入到show中
    // input点回车/下拉点击列表，插入到show中
    TagsInputComponent.prototype.addTag = 
    // input点回车/下拉点击列表，插入到show中
    function (selectItem) {
        var _this = this;
        this.showDropFlag = false;
        var val = _.trim((selectItem && selectItem[this.defaultNameKey]) || this.inputValue);
        if (!val) {
            this.inputValue = '';
            return;
        }
        var dropIndex = _.findIndex(this.dropList, function (item) {
            return _.trim(item[_this.defaultNameKey]) === val;
        });
        var showIndex = _.findIndex(this.showList, function (item) {
            return _.trim(item[_this.defaultNameKey]) === val;
        });
        var item = {};
        // 在下拉列表中，不在showlist中，则将下拉的移入到showlist中
        if (dropIndex != -1 && showIndex == -1) {
            item = this.dropList.splice(dropIndex, 1)[0];
            item[this.defaultCheckedKey] = true;
            this.showList.push(item);
        }
        else if (dropIndex != -1 && showIndex != -1) {
            // 在下拉列表中，也在showlist中，则移除下拉列表的数据，不插入
            this.dropList.splice(dropIndex, 1);
        }
        else if (dropIndex == -1 && showIndex == -1) {
            // 不在下拉列表中，也不在showlist中，则插入数据到showlist中，无ID
            item[this.defaultNameKey] = val;
            item[this.defaultCheckedKey] = true;
            item['type'] = 'add';
            this.showList.push(item);
        }
        this.inputValue = '';
    };
    TagsInputComponent.prototype.showDropList = function (ev) {
        if (this.hideDropListTimer) {
            clearTimeout(this.hideDropListTimer);
            this.hideDropListTimer = null;
        }
        ev.stopPropagation();
        this.showDropFlag = true;
    };
    TagsInputComponent.prototype.hideDropList = function () {
        var _this = this;
        if (this.hideDropListTimer) {
            clearTimeout(this.hideDropListTimer);
            this.hideDropListTimer = null;
        }
        this.hideDropListTimer = setTimeout(function () {
            _this.showDropFlag = false;
        }, 300);
    };
    TagsInputComponent.prototype.onDocumentClick = function (ev) {
        this.hideDropList();
    };
    TagsInputComponent.prototype.getCheckedTags = function () {
        return this.showList;
    };
    TagsInputComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-tags-input',
                    template: "\n    <div class=\"tags-input-box\" (click)=\"tagsInputFocus($event)\" [style.width]=\"options?.width || '100%'\">\n      <ul class=\"tags-input-show clearFix\" *ngIf=\"showList && showList.length > 0\">\n        <li class=\"tags-input-show-list\" *ngFor=\"let item of showList; let i = index\">\n          <span (click)=\"$event.stopPropagation()\">{{item[defaultNameKey]}}</span>\n          <img class=\"tag-remove\" title=\"Remove\" (click)=\"removeTag(item, i)\"\n               src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1RDQ5NEIzNzI3NTUxMUU4OTgwOEJBMThGREI0Q0E3RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1RDQ5NEIzODI3NTUxMUU4OTgwOEJBMThGREI0Q0E3RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjVENDk0QjM1Mjc1NTExRTg5ODA4QkExOEZEQjRDQTdEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjVENDk0QjM2Mjc1NTExRTg5ODA4QkExOEZEQjRDQTdEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+y+qW+gAAAQRJREFUeNqckk9Kw0AYxSfBZdCNzgEStN15keAm2AN0L4pnENx3Xy9gsyn0FgE3XRQkc4Chqxo3uqjvDd+E6Sht8cEPkjffm79f0jSNCnQOHkEJrsRbgTmYgLUvPAlCFZiCM7Wra+EejEFNMw1Cr3+EQp1KTeWDF+AFJOqwEqnVDN7JbE55nqssy/pKftOLVn5g8CZ0rbV92IfoRSp5OcPQ6bpOGWNUURTuv21b50UapOp/+krlnX6diSuR+Mwik8rj9tJau61ye37b9CItEnQO3ffwZg9oAy65opWO2B4R2kqt9ZfDNhqBjz0hjt3GLUfN+P7gGSzBN/gEb+BJxmpf/CPAAIzBSre1IOOtAAAAAElFTkSuQmCC\">\n        </li>\n      </ul>\n      <div class=\"tags-input-content\">\n        <input #tagsInput class=\"tags-input-text\" type=\"text\" [(ngModel)]=\"inputValue\" (focus)=\"showDropList($event)\"\n               (ngModelChange)=\"tagInputChange()\" (click)=\"showDropList($event)\" (keyup.enter)=\"addTag()\" (blur)=\"hideDropList()\"/>\n        <ul class=\"tags-input-drop\" *ngIf=\"dropList && showDropFlag\">\n          <li class=\"tags-input-drop-list\" *ngFor=\"let item of (dropList | arrFilter:defaultNameKey:inputValue); let i = index\"\n              (click)=\"addTag(item)\">{{item[defaultNameKey]}}\n          </li>\n        </ul>\n      </div>\n    </div>\n  ",
                    styles: ["\n    ul, li {\n      list-style: none;\n      margin: 0;\n      padding: 0;\n    }\n\n    .clearFix {\n      zoom: 1;\n    }\n\n    .clearFix:after {\n      clear: both;\n      height: 0;\n      width: 100%;\n      overflow: hidden;\n      visibility: hidden;\n      display: block;\n      content: '.';\n    }\n\n    .tags-input-box {\n      border: 1px solid #ccc;\n      padding: 15px;\n      position: relative;\n    }\n\n    .tags-input-show-list {\n      display: inline-block;\n      max-width: 150px;\n      padding-right: 30px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      position: relative;\n      height: 30px;\n      line-height: 30px;\n      padding-left: 10px;\n      border: 1px solid #ccc;\n      margin-right: 15px;\n    }\n    .tags-input-content{\n      position: relative;\n    }\n    .tags-input-text{\n      height: 30px;\n      line-height: 30px;\n      width: 100%;\n    }\n    .tag-remove{\n      margin: 0;\n      padding: 0;\n      border: none;\n      width: 14px;\n      height: 14px;\n      overflow: hidden;\n      cursor: pointer;\n      position: absolute;\n      right: 5px;\n      top: 8px;\n    }\n    .tags-input-drop{\n      position: absolute;\n      left: 0;\n      top: 29px;\n      width: 100%;\n      height: auto;\n      max-height: 200px;\n      overflow: auto;\n      border: 1px solid #ccc;\n      background: #fff;\n    }\n    .tags-input-drop-list {\n      cursor: pointer;\n      width: 100%;\n      height: 30px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      line-height: 30px;\n      text-indent: 10px;\n    }\n\n    .tags-input-drop-list:hover {\n      color: #fff;\n      background-color: #0081cc;\n    }\n\n  "]
                },] },
    ];
    /** @nocollapse */
    TagsInputComponent.ctorParameters = function () { return []; };
    TagsInputComponent.propDecorators = {
        "options": [{ type: core_1.Input },],
        "tagDatas": [{ type: core_1.Input },],
        "tagsInput": [{ type: core_1.ViewChild, args: ['tagsInput',] },],
        "onDocumentClick": [{ type: core_1.HostListener, args: ['document:click', ['$event'],] },],
    };
    return TagsInputComponent;
}());
exports.TagsInputComponent = TagsInputComponent;
//# sourceMappingURL=tags.input.component.js.map
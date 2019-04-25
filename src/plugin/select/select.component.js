"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var tree_component_1 = require("../tree/tree.component");
var _ = require("lodash");
var SelectComponent = (function () {
    function SelectComponent(renderer, cdr) {
        this.renderer = renderer;
        this.cdr = cdr;
        this.firstLoad = true;
        this.firstLoadTree = true;
        this._treeParams = {
            treeDatas: null,
            keyId: null,
            keyName: null,
            keyChild: null,
            defaultCheckedNodes: null,
            defaultSelectedNode: null,
            options: null
        };
        this.treeCheckEvent = new core_1.EventEmitter();
        this.treeCheckData = new core_1.EventEmitter();
        this.treeClickEvent = new core_1.EventEmitter();
        this.changeValueEvent = new core_1.EventEmitter();
        this.selectBlurEvent = new core_1.EventEmitter();
        this.showThis = false;
        this.isFocus = false;
        this.showDropFlag = false;
        this.maxHeight = this.maxHeight || '300px';
        this.width = this.width || '150px';
    }
    Object.defineProperty(SelectComponent.prototype, "treeParams", {
        get: function () {
            return this.__treeParams;
        },
        set: function (v) {
            this.__treeParams = v;
            if (this.isTree) {
                this.treeParams.options.checkbox = this.isMultiple;
                this.treeParams.options.actionBtn = false;
                if (this.firstLoadTree) {
                    Object.assign(this._treeParams, this.treeParams);
                    this.firstLoadTree = false;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "currentSelect", {
        get: function () {
            return this._currentSelect;
        },
        set: function (v) {
            var _this = this;
            this._currentSelect = _.cloneDeep(v);
            if (!this.optionList) {
                return;
            }
            var result = this.optionList.find(function (item) {
                if (_this.currentSelect) {
                    return _this.displayField ? _this.currentSelect[_this.displayField] === item[_this.displayField] : _this.currentSelect == item;
                }
            });
            this.currentValue = result && (result[this.displayField] || result);
        },
        enumerable: true,
        configurable: true
    });
    SelectComponent.prototype.ngOnInit = function () {
    };
    SelectComponent.prototype.ngAfterViewInit = function () {
        this.afterViewInit();
    };
    SelectComponent.prototype.afterViewInit = function () {
        var _this = this;
        if (!this.tree) {
            setTimeout(function () {
                _this.afterViewInit();
            }, 100);
            return;
        }
        if (this._treeParams.defaultCheckedNodes && !_.isEmpty(this._treeParams.defaultCheckedNodes)) {
            var result = this._treeParams.defaultCheckedNodes.map(function (value) { return _this.tree.matchSearchNodesByKey(value, _this._treeParams.keyId)[0]; });
            this.currentValue = this.arrStringJoin(result);
        }
        if (this._treeParams.defaultSelectedNode && !_.isEmpty(this._treeParams.defaultSelectedNode)) {
            var result = this.tree.matchSearchNodesByKey(this._treeParams.defaultSelectedNode[this._treeParams.keyId], this._treeParams.keyId);
            if (result && result.length > 0) {
                this.currentValue = result[0][this.displayField];
            }
        }
        this.cdr.detectChanges();
    };
    SelectComponent.prototype.calcInvalid = function () {
        // !firstLoad && required && (!currentValue || currentValue.length == 0)
        if (!this.firstLoad && this.required) {
            if (this.isTree) {
                if (this.showDropFlag) {
                    if (!this.keyword) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    if (!this.currentValue || this.currentValue.length == 0) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
            else {
                if (!this.currentValue || this.currentValue.length == 0) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    };
    SelectComponent.prototype.searchTree = function (ev) {
        // this._treeParams.treeDatas = _.cloneDeep(this.treeParams.treeDatas);
        // if (ev) {
        // setTimeout(() => {
        var result = this.tree.fuzzySearchNodesByKey(ev, this._treeParams.keyName);
        // this._treeParams.treeDatas = _.cloneDeep(result);
        // }, 10);
        // }
    };
    SelectComponent.prototype.changeCurrentValue = function () {
        var _this = this;
        var result = this.optionList.find(function (item) { return _this.currentSelect === item; });
        this.currentValue = result && (result[this.displayField] || result);
    };
    SelectComponent.prototype.onDocumentClick = function (ev) {
        if (!this.disable) {
            if (this.showDropFlag && !this.selectContainer.nativeElement.contains(ev.target)) {
                this.showDropFlag = false;
                this.isFocus = false;
                if (this.keyword !== undefined) {
                    this.currentValue = this.keyword;
                    this.keyword = undefined;
                }
            }
            /*
                  if (event.target !== this.inputSelect.nativeElement &&
                    event.target !== this.dropBtn.nativeElement &&
                    event.target.parentNode !== this.dropBtn.nativeElement
                  ) {
                    if (this.dropList.nativeElement.style.display == 'none') {
                      return;
                    }
                    this.dropList.nativeElement.style.display = 'none';
                    this.isFocus = false;
                    if (this.keyword !== undefined) {
                      this.currentValue = this.keyword;
                      this.keyword = undefined;
                    }
                  } else {
                    const elm = this.dropList.nativeElement;
                    if (event.target === this.dropBtn.nativeElement ||
                      event.target.parentNode === this.dropBtn.nativeElement) {
                      elm.style.display = elm.style.display === 'block' ? 'none' : 'block';
                      this.isFocus = !this.isFocus;
                    } else {
                      if (this.tree) {
                        let result: Array<any> = [];
                        if (this.isMultiple) {
                          result = this.tree.getCheckedNodes();
                        } else {
                          if (this.tree.getSelectedNodes()) {
                            result = [this.tree.getSelectedNodes()];
                          }
                        }
                        this.keyword = this.arrStringJoin(result);
                      }
                      elm.style.display = 'block';
                      this.isFocus = true;
                    }
                  }*/
        }
    };
    SelectComponent.prototype.filter = function (data, keyword) {
        var _this = this;
        if (!this.isReadonly && keyword) {
            return data.filter(function (item) { return item[_this.displayField].indexOf(keyword) > -1; });
        }
        else {
            return data || [];
        }
    };
    SelectComponent.prototype.blurEvent = function (ev) {
        this.selectBlurEvent.emit({
            current: this.currentValue,
            val: this.keyword
        });
    };
    SelectComponent.prototype.confirm = function () {
        var _this = this;
        var result = this.optionList.filter(function (item) { return item[_this.displayField].indexOf(_this.keyword) > -1; });
        if (result && result.length > 0) {
            this.dropList.nativeElement.style.display = 'none';
            this.inputSelect.nativeElement.blur();
            this.currentValue = result[0][this.displayField] || result[0];
            this.keyword = '';
            this.isFocus = false;
            var value = result[0][this.outputField] || result[0];
            this.changeValueEvent.emit(value);
        }
    };
    SelectComponent.prototype.changeValue = function (option) {
        this.currentSelect = option;
        var value = option[this.outputField] || option;
        this.currentValue = option[this.displayField] || option;
        this.keyword = undefined;
        this.changeValueEvent.emit(value);
        this.showDropFlag = false;
        this.isFocus = false;
    };
    // 支持树/单选
    // 支持树/单选
    SelectComponent.prototype.selectValue = 
    // 支持树/单选
    function (item) {
        if (this.isTree) {
            if (!this.isMultiple) {
                this.tree.selectTreeNode(item);
                this.keyword = this.arrStringJoin([item]);
            }
        }
        else {
            this.changeValue(item);
        }
    };
    SelectComponent.prototype.clearValue = function () {
        this.firstLoad = false;
        this.currentValue = '';
        this.keyword = undefined;
        this.isFocus = false;
        if (!this.isTree) {
            this.currentSelect = null;
        }
        else {
            if (this.isMultiple) {
                var checkedNodes = this.tree.getCheckedNodes();
                var halfCheckedNodes = this.tree.getHalfCheckedNodes();
                if (checkedNodes && checkedNodes.length > 0) {
                    for (var i = 0; i < checkedNodes.length; i++) {
                        checkedNodes[i].checked = 0;
                    }
                }
                if (halfCheckedNodes && halfCheckedNodes.length > 0) {
                    for (var i = 0; i < halfCheckedNodes.length; i++) {
                        halfCheckedNodes[i].checked = 0;
                    }
                }
            }
            else {
                var selectedNode = this.tree.getSelectedNodes();
                if (selectedNode) {
                    this.tree.deSelectTreeNode(selectedNode);
                }
            }
        }
        this.changeValueEvent.emit(null);
    };
    SelectComponent.prototype.trackByIndex = function (index, value) {
        return index;
    };
    SelectComponent.prototype.treeCheck = function (event) {
        // if (result.length === 1 && event.hasOwnProperty(this._treeParams.keyChild) && event[this._treeParams.keyChild].length > 0) {
        //   this.keyword = event[this.displayField];
        // } else {
        var result = this.tree.getCheckedNodes();
        this.keyword = this.arrStringJoin(result);
        // }
        this.treeCheckEvent.emit(event);
        this.treeCheckData.emit(result);
    };
    SelectComponent.prototype.treeClick = function (event) {
        if (event) {
            this.keyword = event[this.displayField];
            this.treeClickEvent.emit(event);
        }
        else {
            this.keyword = '';
            this.treeClickEvent.emit(null);
        }
        this.hideSourceDrop();
    };
    SelectComponent.prototype.arrStringJoin = function (arr) {
        var _this = this;
        if (arr && arr.length == 0) {
            return '';
        }
        var str = arr.map(function (item) { return item[_this.displayField]; });
        return str.length > 1 ? str.join(',') : str[0];
    };
    SelectComponent.prototype.getSelectVal = function () {
        var res;
        if (this.isMultiple) {
            res = this.tree.getCheckedNodes();
        }
        else {
            res = this.tree.getSelectedNodes();
        }
        return res;
    };
    SelectComponent.prototype.showSourceDrop = function () {
        this.showDropFlag = true;
        this.isFocus = true;
    };
    SelectComponent.prototype.hideSourceDrop = function () {
        this.showDropFlag = false;
        this.isFocus = false;
    };
    SelectComponent.prototype.toggleSourceDrop = function () {
        this.firstLoad = false;
        this.showDropFlag = !this.showDropFlag;
        this.isFocus = this.showDropFlag;
        if (this.tree && this.showDropFlag) {
            var result = [];
            if (this.isMultiple) {
                result = this.tree.getCheckedNodes();
            }
            else {
                if (this.tree.getSelectedNodes()) {
                    result = [this.tree.getSelectedNodes()];
                }
            }
            this.keyword = this.arrStringJoin(result);
        }
    };
    SelectComponent.prototype.clearInputValue = function (ev) {
        this.clearValue();
        this.showDropFlag = true;
    };
    SelectComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-select',
                    template: "\n    <div #selectContainer class=\"dc-select-container\" [ngClass]=\"{'disable':disable}\" [style.width]=\"width\">\n      <div class=\"dc-select-input\" title=\"{{currentValue}}\">\n        <input [class.dc-valid]=\"currentValue\" [class.focus]='showDropFlag' [class.dc-invalid]=\"calcInvalid()\"\n               name=\"dcSelect\" [(ngModel)]=\"keyword\" [disabled]=\"disable\" [readonly]=\"isReadonly || isTree\"\n               (keyup.enter)=\"confirm()\" (click)=\"toggleSourceDrop()\" (blur)=\"blurEvent($event)\" #inputSelect>\n        <span (click)=\"toggleSourceDrop()\" [hidden]=\"(keyword && keyword.length>0) || isFocus\">{{currentValue}}</span>\n        <i [hidden]=\"!(!noClear && !disable && (keyword || (currentValue && currentValue.length > 0)))\" class=\"clear-input-value\"\n           (click)=\"clearInputValue($event)\"></i>\n        <div [hidden]=\"disable\" (click)=\"toggleSourceDrop()\" [class.showDropFlagBtn]=\"showDropFlag\" class=\"dc-select-btn\"\n             #dropBtn>\n          <div class=\"dc-select-arrow\"></div>\n        </div>\n      </div>\n      <ul *ngIf=\"!isTree\" [hidden]=\"!showDropFlag\" class=\"dc-select-drop\" [class.drop-up]=\"dropUp\" #dropList [style.maxHeight]=\"maxHeight\">\n        <li *ngFor=\"let option of filter(optionList, keyword); let i = index; trackBy: trackByIndex\"\n            (click)=\"changeValue(option)\" [class.selected]=\"displayField ? currentValue==option[displayField]: currentValue==option\"\n            [title]=\"option[displayField] || option\">\n          {{option[displayField] || option}}\n        </li>\n        <div *ngIf=\"filter(optionList, keyword).length == 0\" style=\"text-align: center; height: 30px; line-height: 30px;\">No Data.</div>\n      </ul>\n      <div (click)=\"$event.stopPropagation()\" style=\"padding: 10px 0;width:auto;min-width: 100%;\"\n           *ngIf=\"isTree && isMultiple && _treeParams.treeDatas\"\n           [hidden]=\"!showDropFlag\"\n           class=\"dc-select-drop\" #dropList>\n        <div *ngIf=\"treeSearch\" style=\"padding: 0 10px;\">\n          <dc-search [width]=\"'100%'\" (search)=\"searchTree($event)\"></dc-search>\n        </div>\n        <div [style.maxHeight]=\"maxHeight\">\n          <dc-tree [treeDatas]=\"_treeParams.treeDatas\" [keyId]=\"_treeParams.keyId\" [keyName]=\"_treeParams.keyName\"\n                   [defaultCheckedNodes]=\"_treeParams.defaultCheckedNodes\" [keyChild]=\"_treeParams.keyChild\" [options]=\"_treeParams.options\"\n                   (checkEvent)=\"treeCheck($event)\" #tree></dc-tree>\n        </div>\n      </div>\n      <div (click)=\"$event.stopPropagation()\" [hidden]=\"!showDropFlag\" style=\"padding: 10px 0;width:auto;min-width: 100%;\"\n           *ngIf=\"isTree && !isMultiple && _treeParams.treeDatas\"\n           class=\"dc-select-drop\" #dropList>\n        <div *ngIf=\"treeSearch\" style=\"padding: 0 10px;\" (click)=\"$event.stopPropagation()\">\n          <dc-search [width]=\"'100%'\" (search)=\"searchTree($event)\"></dc-search>\n        </div>\n        <div [style.maxHeight]=\"maxHeight\">\n          <dc-tree [treeDatas]=\"_treeParams.treeDatas\" [keyId]=\"_treeParams.keyId\" [keyName]=\"_treeParams.keyName\"\n                   [defaultSelectedNode]=\"_treeParams.defaultSelectedNode\" [keyChild]=\"_treeParams.keyChild\" [options]=\"_treeParams.options\"\n                   (clickEvent)=\"treeClick($event)\" #tree></dc-tree>\n        </div>\n      </div>\n    </div>",
                    styles: [
                        ".dc-select-container {\n      width: 160px;\n      height: 30px;\n      font-size: 14px;\n      color: #333;\n      background: #fff;\n      /*margin: 0 10px;*/\n      padding: 0;\n      display: inline-block;\n      position: relative\n    }\n\n    .dc-select-container:hover {\n      /*border-color: #3d70b2*/\n    }\n\n    .dc-select-container:active {\n      /*border-color: #0081cc*/\n    }\n\n    .dc-select-container.disable {\n      background: #f5f5f5;\n      border-color: #ccc;\n      color: #999\n    }\n\n    .dc-select-input {\n      /*padding: 5px 10px;*/\n      height: 30px;\n      position: relative;\n      /*display: flex;*/\n      /*flex-direction: row;*/\n    }\n\n    .dc-select-input > input {\n      outline: none;\n      width: 100%;\n      padding: 0 30px 0 10px;\n      height: 30px;\n      line-height: 30px;\n      background: none;\n      border: 1px solid #ccc;\n      border-radius: 4px;\n      position: relative;\n      z-index: 1;\n    }\n\n    .dc-select-input > input.dc-valid {\n      border-color: #3FB992;\n    }\n\n    .dc-select-input > input.dc-invalid {\n      border-color: #FF3B3B;\n    }\n\n    .dc-select-input > input.focus,\n    .dc-select-input > input:focus {\n      border-color: #2BB1FF;\n    }\n\n    .dc-select-input > input:read-only {\n      cursor: default\n    }\n\n    .dc-select-input > span {\n      display: block;\n      position: absolute;\n      width: calc(100% - 40px);\n      height: 18px;\n      left: 10px;\n      top: 5px;\n      line-height: 18px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      z-index: 0;\n    }\n\n    .clear-input-value {\n      position: absolute;\n      right: 20px;\n      top: 0;\n      cursor: pointer;\n      width: 12px;\n      height: 30px;\n      z-index: 2;\n      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAOVJREFUKJF90DFKA1EQBuAvj2Cu8MBqe8FokedeQb2A6WzU0uN4gxTbxkM8CKKSfqvAXsAi2lj4dlkh5Icp5p9/Zv6ZSdM0Ck7whDucFW6LFV7wDdNSOMUac/9xVeIet9iFMvmQeIw5XjELeOzFdV2LMQ6qGKO6rvv0HA8By55p21ZKSYxRjFFKSdu2403LKS77rOs6OWcpJZBz1nXduOEiHPF9CD8Bb2PPKSU552HT+CZsg78/g6qqBhu9vaqqxg2rSdM0M+TyhWP4xCJgjxu8HxF/4Br7/ugdEp6xwVeJTeEWReMX1Y9FK/4RDOgAAAAASUVORK5CYII=) no-repeat center center transparent;\n    }\n\n    .clear-input-value:hover {\n      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAOtJREFUKJF90b1NAzEcBfBfriCVm2vR3S2ABFXYAViADACUjMMGWQCGQIoQWJngrLTXWBSBIhRxooBCnuTCz++9/4dHMUYFJ3jALc4Kt8AMT/iCUTGc4hkXDuMdN1hWJfmYWHl7wbjC/VbcdZ0Qwk4VQtB13fZ6jrsK0y0zDIO2bYUQhBA0TWMYhv1K01GMcVXa2qW2bWu9XkspyTnvG1bVkb4P4bvC29/0vu+llDRN82smLCqbPYO6rvV9L+cs5yylpK7rfcNsFGMc47Vs4RgiJhVWuLb5nP/wgSt7Qy9xiUfM8VnOvHCTovEDCGVJpA/ldQoAAAAASUVORK5CYII=) no-repeat center center transparent;\n    }\n\n    .dc-select-btn {\n      width: 0;\n      height: 30px;\n      position: absolute;\n      right: 0;\n      top: 0;\n      padding: 12px 15px 0 5px;\n      cursor: pointer;\n      z-index: 3;\n    }\n\n    .dc-select-container.disable .dc-select-btn {\n      cursor: default;\n    }\n\n    .dc-select-arrow {\n      border: solid 4px transparent;\n      border-top-width: 6px;\n      border-top-color: #333;\n      width: 0;\n      height: 0;\n    }\n\n    .showDropFlagBtn .dc-select-arrow {\n      top: 0;\n      transform: rotate(180deg);\n      -ms-transform: rotate(180deg); /* Internet Explorer */\n      -moz-transform: rotate(180deg); /* Firefox */\n      -webkit-transform: rotate(180deg); /* Safari \u548C Chrome */\n      -o-transform: rotate(180deg); /* Opera */\n    }\n\n    .dc-select-container.disable .dc-select-arrow {\n      border-top-color: #ccc;\n    }\n\n    .dc-select-drop {\n      position: absolute;\n      top: 30px;\n      left: -1px;\n      width: calc(100% + 2px);\n      box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, .2);\n      background: #fff;\n      list-style: none;\n      border-radius: 3px;\n      overflow-y: auto;\n      overflow-x: hidden;\n      z-index: 1000;\n    }\n\n    .dc-select-drop.drop-up {\n      top: auto;\n      bottom: 25px;\n    }\n\n    .selected {\n      background-color: #0081cc;\n      color: #ffffff;\n    }\n\n    .dc-select-drop > li {\n      width: 100%;\n      height: 30px;\n      line-height: 26px;\n      cursor: pointer;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      padding: 0 11px\n    }\n\n    .dc-select-drop > li:hover {\n      color: #333333;\n      background: #edf0f5;\n    }\n\n    .dc-select-drop > li.selected {\n      background-color: #0081cc;\n      color: #ffffff;\n    }"
                    ]
                },] },
    ];
    /** @nocollapse */
    SelectComponent.ctorParameters = function () { return [
        { type: core_1.Renderer, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    SelectComponent.propDecorators = {
        "optionList": [{ type: core_1.Input },],
        "required": [{ type: core_1.Input },],
        "dropUp": [{ type: core_1.Input },],
        "disable": [{ type: core_1.Input },],
        "treeSearch": [{ type: core_1.Input },],
        "isReadonly": [{ type: core_1.Input },],
        "displayField": [{ type: core_1.Input },],
        "outputField": [{ type: core_1.Input },],
        "width": [{ type: core_1.Input },],
        "maxHeight": [{ type: core_1.Input },],
        "isMultiple": [{ type: core_1.Input },],
        "isTree": [{ type: core_1.Input },],
        "noClear": [{ type: core_1.Input },],
        "treeParams": [{ type: core_1.Input },],
        "treeCheckEvent": [{ type: core_1.Output },],
        "treeCheckData": [{ type: core_1.Output },],
        "treeClickEvent": [{ type: core_1.Output },],
        "changeValueEvent": [{ type: core_1.Output },],
        "selectBlurEvent": [{ type: core_1.Output },],
        "inputSelect": [{ type: core_1.ViewChild, args: ['inputSelect',] },],
        "dropBtn": [{ type: core_1.ViewChild, args: ['dropBtn',] },],
        "dropList": [{ type: core_1.ViewChild, args: ['dropList',] },],
        "tree": [{ type: core_1.ViewChild, args: ['tree',] },],
        "selectContainer": [{ type: core_1.ViewChild, args: ['selectContainer',] },],
        "currentSelect": [{ type: core_1.Input },],
        "onDocumentClick": [{ type: core_1.HostListener, args: ['document:click', ['$event'],] },],
    };
    return SelectComponent;
}());
exports.SelectComponent = SelectComponent;
//# sourceMappingURL=select.component.js.map
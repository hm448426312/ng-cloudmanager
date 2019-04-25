"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var pinyin_service_1 = require("../pinyin.service");
var _ = require("lodash");
var AutoCompleteComponent = (function () {
    function AutoCompleteComponent(resolver, router, pinyinService) {
        this.resolver = resolver;
        this.router = router;
        this.pinyinService = pinyinService;
        this.firstLoad = true;
        this.textChangeEvent = new core_1.EventEmitter();
        this.show_source = [];
        this.blurTimer = null;
    }
    Object.defineProperty(AutoCompleteComponent.prototype, "source", {
        get: function () {
            return this._source;
        },
        set: function (v) {
            if (!v) {
                this._source = [];
                return;
            }
            this.changeSourceData(_.cloneDeep(v));
        },
        enumerable: true,
        configurable: true
    });
    AutoCompleteComponent.prototype.ngOnInit = function () {
    };
    AutoCompleteComponent.prototype.ngOnChanges = function (changes) {
    };
    AutoCompleteComponent.prototype.changeSourceData = function (source) {
        var temp = [];
        for (var i = 0; i < source.length; i++) {
            temp.push({
                text: source[i],
                index: i
            });
        }
        this._source = temp;
    };
    AutoCompleteComponent.prototype.blur = function () {
        var _this = this;
        if (this.blurTimer) {
            clearTimeout(this.blurTimer);
            this.blurTimer = null;
        }
        this.blurTimer = setTimeout(function () {
            _this.showContainer = false;
        }, 200);
    };
    AutoCompleteComponent.prototype.focus = function () {
        this.firstLoad = false;
        this.changeText();
    };
    AutoCompleteComponent.prototype.press = function (event) {
        if (event.key == 'Tab') {
            event.preventDefault();
            for (var i = 0; i < this.show_source.length; i++) {
                if (this.show_source[i].show) {
                    this.show_source[i].show = false;
                    if (i == this.show_source.length - 1) {
                        this.show_source[0].show = true;
                    }
                    else {
                        this.show_source[i + 1].show = true;
                    }
                    break;
                }
            }
        }
        if (event.key == 'Enter') {
            for (var _a = 0, _b = this.show_source; _a < _b.length; _a++) {
                var _c = _b[_a];
                if (_c.show) {
                    this.text = _c.title;
                    this.textChangeEvent.emit(_c);
                }
            }
            this.showContainer = false;
        }
    };
    AutoCompleteComponent.prototype.changeText = function () {
        var _this = this;
        if (this.text == null) {
            this.text = '';
        }
        this.show_source = [];
        var tempSource = [];
        if (this.source && this.source.length > 0) {
            tempSource = this.source.filter(function (item) {
                var _i = item;
                if (item == null) {
                    _i = '';
                }
                else {
                    _i = item.text;
                }
                return _i.indexOf(_this.text) >= 0 || _this.pinyinService.toPinyin(_i).indexOf(_this.text) >= 0;
            });
        }
        var tempArr = [];
        for (var i = 0; i < tempSource.length; i++) {
            var _show = i == 0;
            tempArr.push({
                title: tempSource[i] == null ? '' : tempSource[i].text,
                index: tempSource[i].index,
                show: _show
            });
        }
        this.show_source = tempArr;
        this.showContainer = true;
        if (this.blurTimer) {
            clearTimeout(this.blurTimer);
            this.blurTimer = null;
        }
    };
    AutoCompleteComponent.prototype.selectText = function (t) {
        this.text = t.title;
        this.preText = this.text;
        this.myIndex = t.index;
        this.showContainer = false;
        this.textChangeEvent.emit(t);
    };
    AutoCompleteComponent.prototype.clearValue = function (dom) {
        this.text = '';
        dom.focus();
    };
    AutoCompleteComponent.prototype.setInputValid = function (valid) {
        var classList = this.autoInput.nativeElement.classList;
        if (valid) {
            classList.add('dc-valid');
            classList.remove('dc-invalid');
        }
        else {
            classList.remove('dc-valid');
            classList.add('dc-invalid');
        }
    };
    AutoCompleteComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-auto-component',
                    template: "\n    <div class=\"auto-component-box display-flex width-100 flex-direction-column\" [style.max-width]=\"width\">\n      <input #autoInput type=\"text\" [(ngModel)]=\"text\" (keydown)=\"press($event)\" (blur)=\"blur()\" (focus)=\"focus()\"\n             (ngModelChange)=\"changeText()\" [class.dc-valid]=\"text\" [class.dc-invalid]=\"!firstLoad && !text && required\">\n      <i [hidden]=\"!text\" class=\"clear-input-value\" (click)=\"clearValue(autoInput)\"></i>\n      <div class=\"complete-container width-100 flex-direction-column\" *ngIf=\"showContainer\">\n        <div *ngFor=\"let c of show_source\" class=\"source-title\" [class.selected]=\"myIndex==c.index\" (click)=\"selectText(c)\"\n             [title]=\"c.title\">\n          {{c.title}}\n        </div>\n        <div *ngIf=\"!show_source || show_source.length == 0\"\n             style=\"display: flex;align-items: center;justify-content: center; padding: 10px 0;\">\n          No Data.\n        </div>\n      </div>\n    </div>\n  ",
                    styles: ["\n    .title.active {\n      color: red\n    }\n\n    .auto-component-box {\n      position: relative;\n    }\n\n    .clear-input-value {\n      position: absolute;\n      right: 8px;\n      top: 0;\n      cursor: pointer;\n      width: 12px;\n      height: 30px;\n      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAOVJREFUKJF90DFKA1EQBuAvj2Cu8MBqe8FokedeQb2A6WzU0uN4gxTbxkM8CKKSfqvAXsAi2lj4dlkh5Icp5p9/Zv6ZSdM0Ck7whDucFW6LFV7wDdNSOMUac/9xVeIet9iFMvmQeIw5XjELeOzFdV2LMQ6qGKO6rvv0HA8By55p21ZKSYxRjFFKSdu2403LKS77rOs6OWcpJZBz1nXduOEiHPF9CD8Bb2PPKSU552HT+CZsg78/g6qqBhu9vaqqxg2rSdM0M+TyhWP4xCJgjxu8HxF/4Br7/ugdEp6xwVeJTeEWReMX1Y9FK/4RDOgAAAAASUVORK5CYII=) no-repeat center center transparent;\n    }\n\n    .clear-input-value:hover {\n      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAOtJREFUKJF90b1NAzEcBfBfriCVm2vR3S2ABFXYAViADACUjMMGWQCGQIoQWJngrLTXWBSBIhRxooBCnuTCz++9/4dHMUYFJ3jALc4Kt8AMT/iCUTGc4hkXDuMdN1hWJfmYWHl7wbjC/VbcdZ0Qwk4VQtB13fZ6jrsK0y0zDIO2bYUQhBA0TWMYhv1K01GMcVXa2qW2bWu9XkspyTnvG1bVkb4P4bvC29/0vu+llDRN82smLCqbPYO6rvV9L+cs5yylpK7rfcNsFGMc47Vs4RgiJhVWuLb5nP/wgSt7Qy9xiUfM8VnOvHCTovEDCGVJpA/ldQoAAAAASUVORK5CYII=) no-repeat center center transparent;\n    }\n\n    input[type=text] {\n      border: solid 1px #ccc;\n      height: 30px;\n      line-height: 30px;\n      padding: 0 30px 0 10px;\n      border-radius: 4px;\n      transition: none;\n      background: none;\n      outline: none;\n    }\n\n    input[type=text].dc-valid {\n      border-color: #3FB992;\n    }\n\n    input[type=text].dc-invalid {\n      border-color: #FF3B3B;\n    }\n\n    input[type=text]:focus {\n      border-color: #2BB1FF;\n    }\n\n    .title {\n      cursor: pointer;\n    }\n\n    .complete-container {\n      position: absolute;\n      top: 28px;\n      border: solid 1px #ccc;\n      background-color: #ffffff;\n      box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, .2);\n      z-index: 1100;\n      max-height: 200px;\n      overflow: auto;\n    }\n\n    .source-title {\n      max-width: 100%;\n      height: 30px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      cursor: pointer;\n    }\n\n    .source-title:hover {\n      background-color: #edf0f5;\n    }\n\n    .source-title.selected {\n      background-color: #0081cc;\n      color: #ffffff;\n    }\n\n    .source-title.source-title.active {\n      color: rebeccapurple;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    AutoCompleteComponent.ctorParameters = function () { return [
        { type: core_1.ComponentFactoryResolver, },
        { type: router_1.Router, },
        { type: pinyin_service_1.PinyinService, },
    ]; };
    AutoCompleteComponent.propDecorators = {
        "autoInput": [{ type: core_1.ViewChild, args: ['autoInput',] },],
        "required": [{ type: core_1.Input },],
        "source": [{ type: core_1.Input },],
        "width": [{ type: core_1.Input },],
        "text": [{ type: core_1.Input },],
        "textChangeEvent": [{ type: core_1.Output },],
    };
    return AutoCompleteComponent;
}());
exports.AutoCompleteComponent = AutoCompleteComponent;
//# sourceMappingURL=auto.component.component.js.map
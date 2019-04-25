"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var _ = require("lodash");
var AsyncComponentComponent = (function () {
    function AsyncComponentComponent() {
        this.firstLoad = true;
        this.selectItem = new core_1.EventEmitter();
    }
    Object.defineProperty(AsyncComponentComponent.prototype, "source", {
        get: function () {
            return this._source;
        },
        set: function (v) {
            var temp = [];
            if (v) {
                temp = _.cloneDeep(v);
                for (var i = 0; i < temp.length; i++) {
                    temp[i]['index'] = i;
                }
            }
            this._source = temp;
        },
        enumerable: true,
        configurable: true
    });
    AsyncComponentComponent.prototype.ngOnInit = function () {
    };
    AsyncComponentComponent.prototype.hideDrop = function () {
        var _this = this;
        if (this.hideTimer) {
            clearTimeout(this.hideTimer);
            this.hideTimer = null;
        }
        this.hideTimer = setTimeout(function () {
            _this.showContainer = false;
        }, 100);
    };
    AsyncComponentComponent.prototype.focus = function () {
        this.firstLoad = false;
        this.changeText();
        // this.showContainer = true;
    };
    AsyncComponentComponent.prototype.onDocumentClick = function (ev) {
        this.hideDrop();
    };
    AsyncComponentComponent.prototype.selectText = function (ev, item) {
        ev.stopPropagation();
        if (this.hideTimer) {
            clearTimeout(this.hideTimer);
            this.hideTimer = null;
        }
        this.text = item.title;
        this.selectItem.emit(item);
        this.hideDrop();
    };
    AsyncComponentComponent.prototype.changeText = function () {
        var _this = this;
        if (this.asyncTimer) {
            clearTimeout(this.asyncTimer);
            this.asyncTimer = null;
        }
        this.source = [];
        this.asyncTimer = setTimeout(function () {
            var filterPromise = _this.options.asyncFilter(_this.text);
            filterPromise.then(function (res) {
                _this.source = _.cloneDeep(res || []);
                _this.showContainer = true;
            }).catch(function (e) {
                _this.source = [];
                _this.showContainer = true;
            });
        }, (this.options && this.options.asyncSpace) || 300);
    };
    AsyncComponentComponent.prototype.clearValue = function (dom) {
        this.showContainer = false;
        this.text = '';
        // this.changeText();
        dom.focus();
    };
    AsyncComponentComponent.prototype.setInputValid = function (valid) {
        var classList = this.asyncInput.nativeElement.classList;
        if (valid) {
            classList.add('dc-valid');
            classList.remove('dc-invalid');
        }
        else {
            classList.remove('dc-valid');
            classList.add('dc-invalid');
        }
    };
    AsyncComponentComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-async-component',
                    template: "\n    <div class=\"async-component-box display-flex width-100 flex-direction-column\" [style.max-width]=\"width\">\n      <input #asyncInput type=\"text\" [class.dc-valid]=\"text\" [(ngModel)]=\"text\" (click)=\"$event.stopPropagation()\"\n             (ngModelChange)=\"changeText()\" (focus)=\"focus()\" [class.dc-invalid]=\"!firstLoad && !text && required\">\n      <i [hidden]=\"!text\" class=\"clear-input-value\" (click)=\"clearValue(asyncInput)\"></i>\n      <div class=\"complete-container width-100 flex-direction-column\" *ngIf=\"showContainer\">\n        <div *ngFor=\"let c of source\" class=\"source-title\" (click)=\"selectText($event, c)\"\n             [title]=\"c.title\">\n          {{c.title}}\n        </div>\n        <div *ngIf=\"!source || source.length == 0\"\n             style=\"display: flex;align-items: center;justify-content: center; padding: 10px 0;\">\n          No Data.\n        </div>\n      </div>\n    </div>\n  ",
                    styles: ["\n    .title.active {\n      color: red\n    }\n\n    .async-component-box {\n      position: relative;\n    }\n\n    .clear-input-value {\n      position: absolute;\n      right: 8px;\n      top: 0;\n      cursor: pointer;\n      width: 12px;\n      height: 30px;\n      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAOVJREFUKJF90DFKA1EQBuAvj2Cu8MBqe8FokedeQb2A6WzU0uN4gxTbxkM8CKKSfqvAXsAi2lj4dlkh5Icp5p9/Zv6ZSdM0Ck7whDucFW6LFV7wDdNSOMUac/9xVeIet9iFMvmQeIw5XjELeOzFdV2LMQ6qGKO6rvv0HA8By55p21ZKSYxRjFFKSdu2403LKS77rOs6OWcpJZBz1nXduOEiHPF9CD8Bb2PPKSU552HT+CZsg78/g6qqBhu9vaqqxg2rSdM0M+TyhWP4xCJgjxu8HxF/4Br7/ugdEp6xwVeJTeEWReMX1Y9FK/4RDOgAAAAASUVORK5CYII=) no-repeat center center transparent;\n    }\n\n    .clear-input-value:hover {\n      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAOtJREFUKJF90b1NAzEcBfBfriCVm2vR3S2ABFXYAViADACUjMMGWQCGQIoQWJngrLTXWBSBIhRxooBCnuTCz++9/4dHMUYFJ3jALc4Kt8AMT/iCUTGc4hkXDuMdN1hWJfmYWHl7wbjC/VbcdZ0Qwk4VQtB13fZ6jrsK0y0zDIO2bYUQhBA0TWMYhv1K01GMcVXa2qW2bWu9XkspyTnvG1bVkb4P4bvC29/0vu+llDRN82smLCqbPYO6rvV9L+cs5yylpK7rfcNsFGMc47Vs4RgiJhVWuLb5nP/wgSt7Qy9xiUfM8VnOvHCTovEDCGVJpA/ldQoAAAAASUVORK5CYII=) no-repeat center center transparent;\n    }\n\n    input[type=text] {\n      border: solid 1px #ccc;\n      height: 30px;\n      line-height: 30px;\n      padding: 0 30px 0 10px;\n      border-radius: 4px;\n      transition: none;\n      background: none;\n      outline: none;\n    }\n\n    input[type=text].dc-valid {\n      border-color: #3FB992;\n    }\n\n    input[type=text].dc-invalid {\n      border-color: #FF3B3B;\n    }\n\n    input[type=text]:focus {\n      border-color: #2BB1FF;\n    }\n\n    .title {\n      cursor: pointer;\n    }\n\n    .complete-container {\n      position: absolute;\n      top: 28px;\n      border: solid 1px #ccc;\n      background-color: #ffffff;\n      box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, .2);\n      z-index: 1100;\n      max-height: 200px;\n      overflow: auto;\n    }\n\n    .source-title {\n      max-width: 100%;\n      height: 30px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      cursor: pointer;\n      padding: 0 8px;\n    }\n\n    .source-title:hover {\n      background-color: #edf0f5;\n    }\n\n    .source-title.selected {\n      background-color: #0081cc;\n      color: #ffffff;\n    }\n\n    .source-title.source-title.active {\n      color: rebeccapurple;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    AsyncComponentComponent.ctorParameters = function () { return []; };
    AsyncComponentComponent.propDecorators = {
        "asyncInput": [{ type: core_1.ViewChild, args: ['asyncInput',] },],
        "text": [{ type: core_1.Input },],
        "required": [{ type: core_1.Input },],
        "options": [{ type: core_1.Input },],
        "width": [{ type: core_1.Input },],
        "source": [{ type: core_1.Input },],
        "selectItem": [{ type: core_1.Output },],
        "onDocumentClick": [{ type: core_1.HostListener, args: ['document:click', ['$event'],] },],
    };
    return AsyncComponentComponent;
}());
exports.AsyncComponentComponent = AsyncComponentComponent;
//# sourceMappingURL=async.component.component.js.map
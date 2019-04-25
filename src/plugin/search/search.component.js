"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var _ = require("lodash");
var SearchComponent = (function () {
    function SearchComponent() {
        this.search = new core_1.EventEmitter();
    }
    SearchComponent.prototype.ngOnInit = function () {
    };
    SearchComponent.prototype.modelChange = function () {
        if (this.realTime) {
            this.sendSearchResult();
        }
    };
    SearchComponent.prototype.sendSearchResult = function () {
        this.search.emit(_.trim(this.keyword));
    };
    SearchComponent.prototype.setSearchText = function (text) {
        this.keyword = text || '';
    };
    SearchComponent.prototype.clearValue = function (dom) {
        this.setSearchText();
        this.sendSearchResult();
        dom.focus();
    };
    SearchComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-search',
                    template: "\n    <div class=\"search\" [style.width]=\"width || ''\">\n      <input #searchInput [class.dc-valid]=\"keyword\" type=\"text\" [(ngModel)]=\"keyword\" (ngModelChange)=\"modelChange()\"\n             (click)=\"$event.stopPropagation()\" (keyup.enter)=\"sendSearchResult()\"\n             [placeholder]=\" placeholder || '\u8BF7\u8F93\u5165\u8981\u641C\u7D22\u7684\u5185\u5BB9'\">\n      <i [hidden]=\"!keyword\" class=\"clear-input-value\" (click)=\"clearValue(searchInput)\"></i>\n      <span (click)=\"sendSearchResult()\"></span>\n    </div>\n  ",
                    styles: ["\n\n    .search {\n      width: 310px;\n      height: 30px;\n      line-height: 30px;\n      background-color: #fff;\n      position: relative;\n    }\n\n    .search:hover {\n\n    }\n\n    .clear-input-value {\n      position: absolute;\n      right: 50px;\n      top: 0;\n      cursor: pointer;\n      width: 12px;\n      height: 30px;\n      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAOVJREFUKJF90DFKA1EQBuAvj2Cu8MBqe8FokedeQb2A6WzU0uN4gxTbxkM8CKKSfqvAXsAi2lj4dlkh5Icp5p9/Zv6ZSdM0Ck7whDucFW6LFV7wDdNSOMUac/9xVeIet9iFMvmQeIw5XjELeOzFdV2LMQ6qGKO6rvv0HA8By55p21ZKSYxRjFFKSdu2403LKS77rOs6OWcpJZBz1nXduOEiHPF9CD8Bb2PPKSU552HT+CZsg78/g6qqBhu9vaqqxg2rSdM0M+TyhWP4xCJgjxu8HxF/4Br7/ugdEp6xwVeJTeEWReMX1Y9FK/4RDOgAAAAASUVORK5CYII=) no-repeat center center transparent;\n    }\n\n    .clear-input-value:hover {\n      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAOtJREFUKJF90b1NAzEcBfBfriCVm2vR3S2ABFXYAViADACUjMMGWQCGQIoQWJngrLTXWBSBIhRxooBCnuTCz++9/4dHMUYFJ3jALc4Kt8AMT/iCUTGc4hkXDuMdN1hWJfmYWHl7wbjC/VbcdZ0Qwk4VQtB13fZ6jrsK0y0zDIO2bYUQhBA0TWMYhv1K01GMcVXa2qW2bWu9XkspyTnvG1bVkb4P4bvC29/0vu+llDRN82smLCqbPYO6rvV9L+cs5yylpK7rfcNsFGMc47Vs4RgiJhVWuLb5nP/wgSt7Qy9xiUfM8VnOvHCTovEDCGVJpA/ldQoAAAAASUVORK5CYII=) no-repeat center center transparent;\n    }\n\n    .search > input {\n      width: 100%;\n      height: 30px;\n      transition: none;\n      background: none;\n      color: #333;\n      font-size: 12px;\n      border-radius: 4px;\n      border: 1px solid #ccc;\n      padding-right: 60px;\n    }\n\n    .search > input::placeholder {\n      color: #bbb;\n      font-size: 12px;\n    }\n\n    .search > input.dc-valid {\n      transition: none;\n      background: none;\n      border-color: #3FB992;\n    }\n\n    .search > input:focus {\n      transition: none;\n      background: none;\n      border-color: #2BB1FF;\n    }\n\n    .search > span {\n      cursor: pointer;\n      display: block;\n      width: 30px;\n      height: 22px;\n      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABlUlEQVQ4jaXUz4tNUQAH8M+V5i8Q8iNDipXStUB5xUiz8GNhQRZEShoLYme68Sg1i5kaQ35EWVlNirGQLOyIV0rys2bMYy1ZmRrX4t5bZ27vvd7c+a5O597z6XRO5xu5/FaL7MNJbMeSfO4bnmEUX4of0ySes3BRCVqLSTzGVrzAAC6hmY8/42arXcDiYLwbz/Eem/GuzZoTuIdd2Fj+WOxwVY49waYOGNzHOmzAy3bgG0xhfwcozCR6UYvqjXNlsB/LsbNLrMh3PMJwGTyPX/kO55vjENUbe0OwhokKGPzGDA6FYA9eVQThB1aEICxdANiD2RD8iT0LAFfiUwg+xbaK2BZEuB2CV/Px0QrgBKbTJP4Qgk3cwQOsmQd2BstwIJwsLuWU7LamsL4L7CyuYzxN4jnPNGybXrzGV9yVve9yarLqGsFDHGz19IrMyirrouw8m/gj68Fp/JOVwQx24AguYDiqNwYLJGpTsHAYfViNv/iIcVmRhBnEFZxOk/hWJ7CrpEksqjcGMIahcmNXRW/gGo79B+9PXu4lS/dFAAAAAElFTkSuQmCC) no-repeat center center transparent;\n      position: absolute;\n      right: 15px;\n      top: 5px;\n    }\n\n  "]
                },] },
    ];
    /** @nocollapse */
    SearchComponent.ctorParameters = function () { return []; };
    SearchComponent.propDecorators = {
        "placeholder": [{ type: core_1.Input },],
        "width": [{ type: core_1.Input },],
        "realTime": [{ type: core_1.Input },],
        "search": [{ type: core_1.Output },],
    };
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var DrawComponent = (function () {
    function DrawComponent(router, resolver, elementRef, injector, applicationRef) {
        this.router = router;
        this.resolver = resolver;
        this.elementRef = elementRef;
        this.injector = injector;
        this.applicationRef = applicationRef;
        this.show = false;
        this.firstInit = true;
    }
    DrawComponent.prototype.onClick = function (event) {
        var _this = this;
        // 第一次点击无效
        if (this.firstInit) {
            this.firstInit = false;
            return;
        }
        // 如果点击的是mark背景div则关闭组件
        if (this.elementRef.nativeElement.querySelector('.draw-back') === event.target) {
            var result = this.componentRef.instance.beforeLeave();
            if (typeof (result) == 'boolean' && result) {
                this.closeComponent();
            }
            if (typeof (result) == 'object' && result.then) {
                result.then(function (r) {
                    if (r) {
                        _this.closeComponent();
                    }
                });
            }
        }
        if (!document.getElementsByTagName('app-root')[0].contains(event.target)
            && !event.target.contains(document.getElementsByTagName('app-root')[0])) {
            return;
        }
        if (!this.elementRef.nativeElement.contains(event.target)) {
            var result = this.componentRef.instance.beforeLeave();
            if (typeof (result) == 'boolean' && result) {
                this.closeComponent();
            }
            if (typeof (result) == 'object' && result.then) {
                result.then(function (r) {
                    if (r) {
                        _this.closeComponent();
                    }
                });
            }
        }
    };
    DrawComponent.prototype.calcHeight = function () {
        if (this.top) {
            return 'calc( 100vh - ' + this.top + ' )';
        }
        else {
            return '100vh';
        }
    };
    DrawComponent.prototype.closeComponent = function () {
        var _this = this;
        this.show = false;
        setTimeout(function () {
            _this.container.clear();
            _this.closeResolve('close');
            document.body.style.overflow = 'auto';
        }, 500);
    };
    DrawComponent.prototype.getOverFlow = function () {
        if (this.hiddenScroll == null || !this.hiddenScroll) {
            return 'auto';
        }
        if (this.hiddenScroll) {
            return 'hidden';
        }
    };
    //关闭drawer
    //关闭drawer
    DrawComponent.prototype.onHidden = 
    //关闭drawer
    function () {
        this.closeComponent();
    };
    DrawComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.show = true;
        });
    };
    DrawComponent.prototype.ngOnDestroy = function () {
        this.container.clear();
        if (this.routerChangeEvent) {
        }
        this.routerChangeEvent = null;
    };
    DrawComponent.prototype.ngDoCheck = function () {
    };
    //判断是否出现滚动条
    //判断是否出现滚动条
    DrawComponent.prototype.isScrollY = 
    //判断是否出现滚动条
    function () {
        return document.documentElement.offsetHeight > document.documentElement.clientHeight;
    };
    DrawComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.container.clear();
        this.componentRef = this.container.createComponent(this.resolver.resolveComponentFactory(this.injectComponet));
        this.instance = this.componentRef.instance;
        this.instance.data = this.data;
        this.instance.handler = this.handler;
        if (this.isScrollY()) {
            document.body.style.overflow = 'hidden';
        }
        this.routerChangeEvent = this.router.events.subscribe(function (ev) {
            _this.closeComponent();
        });
    };
    DrawComponent.prototype.ngOnChanges = function (changes) {
    };
    DrawComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'drawer',
                    template: "\n    <div *ngIf=\"mark === undefined ? true : mark\" class=\"draw-back\"></div>\n    <div class=\"draw-container\" [style.top]=\"top\" [style.height]=\"calcHeight()\" [ngClass]=\"{'show':show}\"\n         [style.width]=\"width ? width : '66%'\">\n      <div *ngIf=\"title\" class=\"dc-draw-header\">\n        <div class=\"dc-draw-title\"><img *ngIf=\"iconCls\" class=\"draw-img\" [src]=\"iconCls\"/>{{title}}</div>\n        <div class=\"dc-draw-close\" (click)=\"onHidden()\"></div>\n      </div>\n      <div class=\"dc-draw-content\" [style.overflow]=\"getOverFlow()\" [style.padding]=\"padding? padding : '20px'\">\n        <ng-template #componentContainer></ng-template>\n      </div>\n    </div>\n  ",
                    styles: [
                        "\n      .draw-back {\n        position: fixed;\n        width: 100%;\n        height: 100%;\n        opacity: 0.2;\n        background: #000;\n        z-index: 1002;\n      }\n\n      .draw-container {\n        opacity: 1;\n        width: 66%;\n        position: fixed;\n        height: 100vh;\n        right: 0;\n        max-width: 0;\n        transition: max-width 0.5s ease-in, color 0.3s ease-out;\n        box-shadow: -2px 0px 15px 0px #888888;\n        background: #fcfcfc;\n        overflow-x: hidden;\n        overflow-y: auto;\n        z-index: 1003;\n        display: flex;\n        flex-direction: column;\n      }\n\n      .dc-draw-header {\n        /*box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, .1);*/\n        padding: 0 20px;\n        font-size: 18px;\n        font-weight: bold;\n        height: 50px;\n        line-height: 50px;\n        flex-grow: 0;\n        flex-shrink: 0;\n        position: relative;\n        border-bottom: solid 1px #ccc;\n      }\n\n      .draw-img {\n        margin: 0 5px 4px 0;\n      }\n\n      .dc-draw-title {\n        text-overflow: ellipsis;\n        overflow: hidden;\n        white-space: nowrap;\n        width: calc(100% - 46px);\n      }\n\n      .dc-draw-close {\n        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAMAAAAocOYLAAAATlBMVEUAAAAAAAAAAAAAAAAAAACcnJzw8PDk5OT+/v7W1tb+/v78/Pz4+Pj29vb09PTm5ub9/f3R0dGVlZX////x8fF9fX1mZmZ/f3/5+fmJiYmRqov8AAAAE3RSTlMABgkOES6kevRd+ufSw7+F8lgpV5JIPgAAAOBJREFUKM+lk+kSgyAMhAsRj3obz/d/0UYUVoszdKb7Qxm+TSaE8PpdSiktkt8z1USJiEgsT9RkTcVcNZkJHEKHlL3SQRx33Od8Ud5bA3DGX8ouBkUFBypI+XDTycY6OjSu8umMVi483fG2jCdett2QknLhdneaxWDxPNnFmUBRyzAAc0sHT2qGAZjrg+ukZG+YJo+5TPTB3wwDML/jHPld5bZI5Ed9Z+UjDDW58wGjDzifNsDumOgP+muxNaC/Z4I8vJ9cwiP3G58PGIr7fBXBAJrrfBrgyHxH3kfkff2vD54SI6E1SleBAAAAAElFTkSuQmCC) no-repeat center;\n        width: 31px;\n        height: 31px;\n        position: absolute;\n        right: 15px;\n        top: 10px;\n        cursor: pointer;\n      }\n\n      .draw-container.show {\n        max-width: 100%;\n      }\n\n      .dc-draw-content {\n        flex: 1;\n        height: 100px;\n      }\n\n      ::-webkit-scrollbar {\n        width: 8px;\n        height: 8px;\n      }\n\n      ::-webkit-scrollbar-track,\n      ::-webkit-scrollbar-thumb {\n        border-radius: 999px;\n        border: 0 solid transparent;\n      }\n\n      ::-webkit-scrollbar-thumb {\n        min-height: 20px;\n        max-height: 100px;\n        box-shadow: 0 0 0 5px rgba(201, 201, 201, 1) inset;\n      }\n\n      ::-webkit-scrollbar-corner {\n        background: transparent;\n      }\n    "
                    ]
                },] },
    ];
    /** @nocollapse */
    DrawComponent.ctorParameters = function () { return [
        { type: router_1.Router, },
        { type: core_1.ComponentFactoryResolver, },
        { type: core_1.ElementRef, },
        { type: core_1.Injector, },
        { type: core_1.ApplicationRef, },
    ]; };
    DrawComponent.propDecorators = {
        "data": [{ type: core_1.Input },],
        "handler": [{ type: core_1.Input },],
        "padding": [{ type: core_1.Input },],
        "title": [{ type: core_1.Input },],
        "iconCls": [{ type: core_1.Input },],
        "width": [{ type: core_1.Input },],
        "mark": [{ type: core_1.Input },],
        "hiddenScroll": [{ type: core_1.Input },],
        "top": [{ type: core_1.Input },],
        "container": [{ type: core_1.ViewChild, args: ['componentContainer', { read: core_1.ViewContainerRef },] },],
        "onClick": [{ type: core_1.HostListener, args: ['document:click', ['$event'],] },],
    };
    return DrawComponent;
}());
exports.DrawComponent = DrawComponent;
//# sourceMappingURL=draw.component.js.map
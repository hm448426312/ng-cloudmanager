"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var draw_component_1 = require("./draw.component");
var DrawService = (function () {
    function DrawService(resolver, applicationRef, injector) {
        this.resolver = resolver;
        this.applicationRef = applicationRef;
        this.injector = injector;
    }
    DrawService.prototype.open = function (data) {
        var _this = this;
        if (this.component != null) {
            return;
        }
        this.component = this.resolver.resolveComponentFactory(draw_component_1.DrawComponent);
        var node = document.body.insertBefore(document.createElement(this.component.selector), document.body.firstChild);
        this.ref = this.component.create(this.injector, [], node);
        var instance = this.ref.instance;
        instance.injectComponet = data.component;
        instance.data = data.data;
        instance.handler = data.handler;
        instance.padding = data.padding;
        instance.title = data.title;
        instance.iconCls = data.iconCls;
        instance.width = data.width;
        instance.mark = data.mark;
        instance.top = data.top;
        instance.hiddenScroll = data.hiddenScroll;
        this.applicationRef.attachView(this.ref.hostView);
        this.promise = new Promise(function (resolve) {
            instance.closeResolve = resolve;
        });
        this.promise.then(function (r) {
            _this.ref.destroy();
            _this.component = null;
            _this.ref = null;
            _this.promise = null;
        });
        return instance;
    };
    DrawService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DrawService.ctorParameters = function () { return [
        { type: core_1.ComponentFactoryResolver, },
        { type: core_1.ApplicationRef, },
        { type: core_1.Injector, },
    ]; };
    return DrawService;
}());
exports.DrawService = DrawService;
//# sourceMappingURL=draw.service.js.map
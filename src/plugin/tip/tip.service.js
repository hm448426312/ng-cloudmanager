"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var tip_component_1 = require("./tip.component");
var TipService = (function () {
    function TipService(resolver, applicationRef, injector) {
        this.resolver = resolver;
        this.applicationRef = applicationRef;
        this.injector = injector;
    }
    TipService.prototype.show = function (data) {
        var _this = this;
        if (this.component != null) {
            this.close();
        }
        this.component = this.resolver.resolveComponentFactory(tip_component_1.TipComponent);
        this.node = document.body.insertBefore(document.createElement('tip'), document.body.firstChild);
        this.node.style.width = '100%';
        this.node.style.display = 'flex';
        this.node.style.flexDirection = 'row-reverse';
        this.ref = this.component.create(this.injector, [], this.node);
        var instance = this.ref.instance;
        instance.data = data;
        this.applicationRef.attachView(this.ref.hostView);
        // this.promise = new Promise(resolve => {
        //   instance.closeResolve = resolve;
        // });
        // this.promise.then(r => {
        //   this.close();
        // });
        setTimeout(function () {
            _this.close();
        }, 3000);
    };
    TipService.prototype.close = function () {
        if (this.ref) {
            this.ref.destroy();
        }
        this.component = null;
        this.ref = null;
        this.promise = null;
    };
    TipService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    TipService.ctorParameters = function () { return [
        { type: core_1.ComponentFactoryResolver, },
        { type: core_1.ApplicationRef, },
        { type: core_1.Injector, },
    ]; };
    return TipService;
}());
exports.TipService = TipService;
//# sourceMappingURL=tip.service.js.map
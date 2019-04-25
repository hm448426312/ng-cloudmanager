"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var core_1 = require("@angular/core");
var modal_component_1 = require("./modal.component");
var document_ref_service_1 = require("../document-ref/document-ref.service");
var ModalService = (function () {
    function ModalService(cfr, appRef, doc, injector) {
        this.cfr = cfr;
        this.appRef = appRef;
        this.doc = doc;
        this.injector = injector;
    }
    ModalService.prototype.insert = function (viewRef) {
        this.appRef.attachView(viewRef);
        this.doc.body.insertBefore(viewRef.rootNodes[0], this.doc.body.childNodes[0]);
        return viewRef;
    };
    ModalService.prototype.createComponent = function (cf) {
        var componentRef = cf.create(this.injector);
        this.insert(componentRef.hostView);
        return componentRef;
    };
    ModalService.prototype.open = function (_a) {
        var id = _a.id, title = _a.title, component = _a.component, width = _a.width, data = _a.data, handler = _a.handler, noHeaderShadow = _a.noHeaderShadow, iconCls = _a.iconCls, backdropCloseable = _a.backdropCloseable, onClose = _a.onClose, hideClose = _a.hideClose, hideTitle = _a.hideTitle, beforeHidden = _a.beforeHidden;
        var modalRef = this.createComponent(this.cfr.resolveComponentFactory(modal_component_1.ModalComponent));
        _.assign(modalRef.instance, {
            id: id,
            title: title,
            width: width,
            noHeaderShadow: noHeaderShadow,
            iconCls: iconCls,
            beforeHidden: beforeHidden,
            hideClose: hideClose,
            hideTitle: hideTitle,
            backdropCloseable: _.isUndefined(backdropCloseable) ? true : backdropCloseable
        });
        var modalContentInstance = modalRef.instance.modalContainerHost.viewContainerRef.createComponent(this.cfr.resolveComponentFactory(component));
        _.assign(modalContentInstance.instance, { data: data, handler: handler });
        modalRef.instance.onHidden = function () {
            if (onClose) {
                onClose();
            }
            modalRef.hostView.destroy();
        };
        modalRef.instance.show();
        return {
            modalInstance: modalRef.instance,
            modalContentInstance: modalContentInstance.instance
        };
    };
    ModalService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ModalService.ctorParameters = function () { return [
        { type: core_1.ComponentFactoryResolver, },
        { type: core_1.ApplicationRef, },
        { type: document_ref_service_1.DocumentRef, },
        { type: core_1.Injector, },
    ]; };
    return ModalService;
}());
exports.ModalService = ModalService;
//# sourceMappingURL=modal.service.js.map
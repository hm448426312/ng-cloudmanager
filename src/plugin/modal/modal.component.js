"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var core_1 = require("@angular/core");
var modal_directive_1 = require("./modal.directive");
var document_ref_service_1 = require("../document-ref/document-ref.service");
var router_1 = require("@angular/router");
var ModalComponent = (function () {
    function ModalComponent(doc, renderer, router) {
        var _this = this;
        this.doc = doc;
        this.renderer = renderer;
        this.router = router;
        this.onModalClick = function ($event) {
            if (_this.backdropCloseable && !_this.mdalOuter.nativeElement.contains($event.target)) {
                _this.hide();
            }
        };
        this.backdropCloseable = _.isUndefined(this.backdropCloseable) ? true : this.backdropCloseable;
    }
    ModalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.routerChangeEvent = this.router.events.subscribe(function (ev) {
            _this.hide();
        });
    };
    ModalComponent.prototype.ngOnDestroy = function () {
        if (this.routerChangeEvent) {
        }
        this.routerChangeEvent = null;
    };
    ModalComponent.prototype.onHidden = function () {
    };
    ModalComponent.prototype.canHideModel = function () {
        var hiddenResult = Promise.resolve(true);
        if (this.beforeHidden) {
            var result = this.beforeHidden();
            if (typeof result !== undefined) {
                if (result.then) {
                    hiddenResult = result;
                }
                else if (result.subscribe) {
                    hiddenResult = result.toPromise();
                }
                else {
                    hiddenResult = Promise.resolve(result);
                }
            }
        }
        return hiddenResult;
    };
    ModalComponent.prototype.setHeaderShadow = function (has) {
        var boxShadow;
        if (!has) {
            boxShadow = {
                'box-shadow': '0px 0px 40px 0px rgba(0, 0, 0, .1)'
            };
        }
        return boxShadow;
    };
    ModalComponent.prototype.hide = function () {
        var _this = this;
        this.canHideModel().then(function (canHide) {
            if (!canHide) {
                return;
            }
            _this.renderer.setElementClass(_this.doc.body, 'modal-open', false);
            _this.onHidden();
        });
    };
    ModalComponent.prototype.show = function () {
        this.renderer.setElementClass(this.doc.body, 'modal-open', true);
    };
    ModalComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-modal',
                    template: "\n    <div class=\"dc-modal-backdrop\"></div>\n    <div class=\"dc-modal-click\" (click)=\"onModalClick($event)\">\n      <div #mdalOuter class=\"dc-modal-box\" tabindex=\"1\" [style.width]=\"width\">\n        <div *ngIf=\"title && !hideTitle\" class=\"dc-modal-header\" [ngStyle]=\"setHeaderShadow(noHeaderShadow)\">\n          <div class=\"dc-modal-title\">\n            <img *ngIf=\"iconCls\" src=\"{{iconCls}}\">\n            {{title}}\n          </div>\n          <div *ngIf=\"!hideClose\" class=\"dc-modal-close\" (click)=\"onHidden()\"></div>\n        </div>\n        <div class=\"dc-modal-content\">\n          <template dcModalContainerHost></template>\n        </div>\n      </div>\n    </div>\n  ",
                    styles: [
                        ".dc-modal-backdrop,\n    .dc-modal-click {\n      position: fixed;\n      width: 100%;\n      height: 100%;\n      opacity: 0.2;\n      background: #000;\n      left: 0;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      z-index: 1004;\n    }\n\n    .dc-modal-click {\n      opacity: 1;\n      background: transparent;\n      z-index: 1010;\n      overflow-y: auto;\n      display: block;\n      display: -ms-flexbox;\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      align-items: center\n    }\n\n    .dc-modal-box {\n      width: 60%;\n      box-shadow: 5px 5px 20px 0 rgba(0, 0, 0, .2);\n      margin: 0 auto;\n      background: #fff;\n    }\n\n    .dc-modal-header {\n      /*box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, .1);*/\n      padding: 0 20px;\n      font-size: 18px;\n      font-weight: bold;\n      height: 50px;\n      line-height: 50px;\n      position: relative;\n    }\n\n    .dc-modal-title {\n      text-overflow: ellipsis;\n      overflow: hidden;\n      white-space: nowrap;\n      width: calc(100% - 46px);\n      display: flex;\n      align-items: center;\n    }\n\n    .dc-modal-title img {\n      margin-right: 5px;\n    }\n\n    .dc-modal-close {\n      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAfCAMAAAAocOYLAAAATlBMVEUAAAAAAAAAAAAAAAAAAACcnJzw8PDk5OT+/v7W1tb+/v78/Pz4+Pj29vb09PTm5ub9/f3R0dGVlZX////x8fF9fX1mZmZ/f3/5+fmJiYmRqov8AAAAE3RSTlMABgkOES6kevRd+ufSw7+F8lgpV5JIPgAAAOBJREFUKM+lk+kSgyAMhAsRj3obz/d/0UYUVoszdKb7Qxm+TSaE8PpdSiktkt8z1USJiEgsT9RkTcVcNZkJHEKHlL3SQRx33Od8Ud5bA3DGX8ouBkUFBypI+XDTycY6OjSu8umMVi483fG2jCdett2QknLhdneaxWDxPNnFmUBRyzAAc0sHT2qGAZjrg+ukZG+YJo+5TPTB3wwDML/jHPld5bZI5Ed9Z+UjDDW58wGjDzifNsDumOgP+muxNaC/Z4I8vJ9cwiP3G58PGIr7fBXBAJrrfBrgyHxH3kfkff2vD54SI6E1SleBAAAAAElFTkSuQmCC) no-repeat center;\n      width: 31px;\n      height: 31px;\n      position: absolute;\n      right: 15px;\n      top: 10px;\n      cursor: pointer;\n    }\n\n    .dc-modal-content {\n      min-height: 100px;\n    }"
                    ]
                },] },
    ];
    /** @nocollapse */
    ModalComponent.ctorParameters = function () { return [
        { type: document_ref_service_1.DocumentRef, },
        { type: core_1.Renderer, },
        { type: router_1.Router, },
    ]; };
    ModalComponent.propDecorators = {
        "modalContainerHost": [{ type: core_1.ViewChild, args: [modal_directive_1.ModalContainerDirective,] },],
        "mdalOuter": [{ type: core_1.ViewChild, args: ['mdalOuter',] },],
        "id": [{ type: core_1.Input },],
        "title": [{ type: core_1.Input },],
        "width": [{ type: core_1.Input },],
        "hideClose": [{ type: core_1.Input },],
        "hideTitle": [{ type: core_1.Input },],
        "backdropCloseable": [{ type: core_1.Input },],
        "beforeHidden": [{ type: core_1.Input },],
        "noHeaderShadow": [{ type: core_1.Input },],
        "iconCls": [{ type: core_1.Input },],
    };
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=modal.component.js.map
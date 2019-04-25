"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DocumentRef = (function () {
    function DocumentRef() {
    }
    Object.defineProperty(DocumentRef.prototype, "body", {
        get: function () { return document.body; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DocumentRef.prototype, "documentElement", {
        get: function () {
            return document.documentElement;
        },
        enumerable: true,
        configurable: true
    });
    DocumentRef.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DocumentRef.ctorParameters = function () { return []; };
    return DocumentRef;
}());
exports.DocumentRef = DocumentRef;
//# sourceMappingURL=document-ref.service.js.map
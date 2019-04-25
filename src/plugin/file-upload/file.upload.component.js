"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng2_file_upload_1 = require("ng2-file-upload");
var _ = require("lodash");
var FileUploadComponent = (function () {
    function FileUploadComponent() {
        this.selectedFiles = [];
        this.fileAcceptType = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.csv': 'text/csv',
            '.doc': 'application/msword',
            '.png': 'image/png',
            '.ppt': 'application/vnd.ms-powerpoint',
            '.wps': 'application/vnd.ms-works',
            '.xls': 'application/vnd.ms-excel',
            '.xml': 'text/xml,application/xml',
            '.zip': 'application/zip',
            '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            '.xltx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
            '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        };
        this.fileChangeEvent = new core_1.EventEmitter();
        this.beforeUpload = new core_1.EventEmitter();
        this.success = new core_1.EventEmitter();
        this.error = new core_1.EventEmitter();
        this.progress = new core_1.EventEmitter();
    }
    Object.defineProperty(FileUploadComponent.prototype, "acceptType", {
        get: function () {
            return this._acceptType;
        },
        set: function (v) {
            var temp = [];
            this.acceptTypeArr = v || null;
            if (v && v.length > 0) {
                for (var i = 0; i < v.length; i++) {
                    if (this.fileAcceptType[v[i]] !== undefined) {
                        temp.push(this.fileAcceptType[v[i]]);
                    }
                }
            }
            if (temp.length > 0) {
                this._acceptType = temp.join(',');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileUploadComponent.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (v) {
            var _this = this;
            this._options = v;
            this.uploader = new ng2_file_upload_1.FileUploader(this._options);
            this.uploader.onAfterAddingFile = function (item) {
                if (_this._options.encodeFilename) {
                    item.file.name = encodeURIComponent(item.file.name);
                }
            };
            this.uploader.onBeforeUploadItem = this.beforeUploadItem.bind(this);
            this.uploader.onSuccessItem = this.successItem.bind(this);
            this.uploader.onErrorItem = this.errorItem.bind(this);
            this.uploader.onProgressItem = this.progressItem.bind(this);
        },
        enumerable: true,
        configurable: true
    });
    FileUploadComponent.prototype.ngOnInit = function () {
    };
    FileUploadComponent.prototype.selectedFileOnChanged = function (event) {
        if (!this.uploader.queue || this.uploader.queue.length == 0) {
            return;
        }
        var fileItem = this.uploader.queue;
        if (this.multiple) {
            for (var i = 0; i < fileItem.length; i++) {
                this.checkFileItem(fileItem[i]);
            }
        }
        else {
            for (var i = 0; i < fileItem.length - 1; i++) {
                this.clearFileItem(fileItem[i]);
            }
            if (this.options.selfCheck) {
                var flag = this.options.selfCheck(this.uploader.queue[0], this.checkBak);
                if (!flag) {
                    this.clearFileItem(this.uploader.queue[0]);
                }
            }
            else {
                this.checkFileItem(this.uploader.queue[0]);
            }
            // this.checkFileItem(this.uploader.queue[0]);
        }
    };
    FileUploadComponent.prototype.checkFileItem = function (fileItem) {
        if (!fileItem.file) {
            return;
        }
        var fileSize = fileItem.file.size;
        if (this.fileMaxSize && fileSize > this.fileMaxSize) {
            this.error.emit('overSize');
            this.clearFileItem(fileItem);
        }
        else {
            if (fileItem.file.name.lastIndexOf('.') === -1) {
                this.error.emit('errorType');
                this.clearFileItem(fileItem);
            }
            else {
                var fileSuffix_1 = fileItem.file.name.slice(fileItem.file.name.lastIndexOf('.'));
                if (this.acceptTypeArr && this.acceptTypeArr.length > 0) {
                    var index = _.findIndex(this.acceptTypeArr, function (o) {
                        return o.toLowerCase() === fileSuffix_1.toLowerCase();
                    });
                    if (index === -1) {
                        this.error.emit('errorType');
                        this.clearFileItem(fileItem);
                    }
                    else {
                        this.outputFileChangeEvent(fileItem);
                    }
                }
                else {
                    this.outputFileChangeEvent(fileItem);
                }
            }
        }
    };
    FileUploadComponent.prototype.outputFileChangeEvent = function (fileItem) {
        if (this.multiple) {
            var flag = false;
            for (var i = 0; i < this.selectedFiles.length; i++) {
                if (this.selectedFiles[i] == fileItem) {
                    flag = true;
                }
            }
            if (!flag) {
                this.selectedFiles.push(fileItem);
            }
        }
        else {
            this.selectedFiles = [fileItem];
        }
        this.fileChangeEvent.emit(fileItem);
    };
    FileUploadComponent.prototype.clearFileItem = function (fileItem) {
        if (fileItem) {
            this.uploader.removeFromQueue(fileItem);
        }
        if (this.uploader.queue && this.uploader.queue.length > 0) {
        }
        this.fileUploadInput.nativeElement.value = '';
    };
    FileUploadComponent.prototype.beforeUploadItem = function (fileItem) {
        this.beforeUpload.emit(fileItem);
    };
    FileUploadComponent.prototype.successItem = function (event, res) {
        this.success.emit({
            fileitem: event,
            response: res
        });
        if (this.uploader.queue && this.uploader.queue.length > 0) {
            for (var _i = 0, _a = this.uploader.queue; _i < _a.length; _i++) {
                var f = _a[_i];
                this.clearFileItem(f);
            }
        }
    };
    FileUploadComponent.prototype.errorItem = function (event, res) {
        this.error.emit(res);
        if (this.uploader.queue && this.uploader.queue.length > 0) {
            for (var _i = 0, _a = this.uploader.queue; _i < _a.length; _i++) {
                var f = _a[_i];
                this.clearFileItem(f);
            }
        }
    };
    FileUploadComponent.prototype.progressItem = function (fileItem, progress) {
        this.progress.emit(progress);
    };
    FileUploadComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-file-upload',
                    template: "\n    <a href=\"javascript:;\" class=\"a-upload\">\n      <input #fileUploadInput type=\"file\" ng2FileSelect [uploader]=\"uploader\" [accept]=\"acceptType\"\n             (change)=\"selectedFileOnChanged($event)\" [multiple]=\"multiple\"/>\u4E0A\u4F20\u6587\u4EF6\n    </a>\n    <div *ngIf=\"showList\">\n      <p *ngFor=\"let item of selectedFiles\">{{item.file.name}}</p>\n    </div>\n  ",
                    styles: [
                        "\n      .a-upload {\n        position: relative;\n        display: inline-block;\n        background: #D0EEFF;\n        border: 1px solid #99D3F5;\n        border-radius: 4px;\n        padding: 4px 12px;\n        overflow: hidden;\n        color: #1E88C7;\n        text-decoration: none;\n        text-indent: 0;\n        line-height: 20px;\n      }\n\n      .a-upload input {\n        position: absolute;\n        font-size: 100px;\n        right: 0;\n        top: 0;\n        opacity: 0;\n        cursor: pointer;\n      }\n\n      .a-upload:hover {\n        background: #AADFFD;\n        border-color: #78C3F3;\n        color: #004974;\n        text-decoration: none;\n      }\n    "
                    ]
                },] },
    ];
    /** @nocollapse */
    FileUploadComponent.ctorParameters = function () { return []; };
    FileUploadComponent.propDecorators = {
        "multiple": [{ type: core_1.Input },],
        "fileMaxSize": [{ type: core_1.Input },],
        "showList": [{ type: core_1.Input },],
        "checkBak": [{ type: core_1.Input },],
        "acceptType": [{ type: core_1.Input },],
        "fileChangeEvent": [{ type: core_1.Output },],
        "beforeUpload": [{ type: core_1.Output },],
        "success": [{ type: core_1.Output },],
        "error": [{ type: core_1.Output },],
        "progress": [{ type: core_1.Output },],
        "options": [{ type: core_1.Input },],
        "fileUploadInput": [{ type: core_1.ViewChild, args: ['fileUploadInput',] },],
    };
    return FileUploadComponent;
}());
exports.FileUploadComponent = FileUploadComponent;
//# sourceMappingURL=file.upload.component.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var _ = require("lodash");
var NodeComponent = (function () {
    function NodeComponent(resolver, router) {
        this.resolver = resolver;
        this.router = router;
        this.checkboxId = Math.random().toString().slice(2);
        this.treeMoreBtn = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAECAYAAACHtL/sAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCRDEwRjY5RTJDRTIxMUU4OUMyREI1RjcxNzRFQUIzMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCRDEwRjY5RjJDRTIxMUU4OUMyREI1RjcxNzRFQUIzMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkJEMTBGNjlDMkNFMjExRTg5QzJEQjVGNzE3NEVBQjMxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkJEMTBGNjlEMkNFMjExRTg5QzJEQjVGNzE3NEVBQjMxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8++bDpOgAAAEZJREFUeNpiSUtL82RgYJjLAAHJQLwdyiZKnBFowDMgQxIq8ByIpaBsosSZGFABIwN2gFMcZEAKEL8A4qdQp8IAUeIAAQYAecgVXM6QXfYAAAAASUVORK5CYII=';
        this.clickEvent = new core_1.EventEmitter();
        this.extendEvent = new core_1.EventEmitter();
        this.checkEvent = new core_1.EventEmitter();
        this.isFirst = true;
        this.nodeChangeEvent = new core_1.EventEmitter();
    }
    Object.defineProperty(NodeComponent.prototype, "nodeData", {
        get: function () {
            return this._nodeData;
        },
        set: function (v) {
            this.isFirst = false;
            v.treeDom = this.treeNode;
            this._nodeData = v;
            this.init();
        },
        enumerable: true,
        configurable: true
    });
    NodeComponent.prototype.init = function () {
        if (this.needShow(this.nodeData)) {
            this.nodeData.show = true;
        }
    };
    NodeComponent.prototype.needShow = function (node) {
        if (node.show) {
            return true;
        }
        if (node.subNode == null || node.subNode.length == 0) {
            return false;
        }
        var result = false;
        for (var _i = 0, _a = node.subNode; _i < _a.length; _i++) {
            var n = _a[_i];
            if (this.needShow(n)) {
                result = true;
            }
        }
        return result;
    };
    NodeComponent.prototype.ngOnInit = function () {
        this.initClsObj();
    };
    NodeComponent.prototype.initClsObj = function () {
        if (this.options && this.options.iconCls) {
            this.iconClsFolder = this.options.iconCls.folder;
            this.iconClsFile = this.options.iconCls.file;
            this.iconClsExpand = this.options.iconCls.expand;
        }
    };
    NodeComponent.prototype.getFileIcon = function () {
        if (this.iconClsFile && (!this.nodeData[this.keyChild] || this.nodeData[this.keyChild].length == 0)) {
            return this.iconClsFile;
        }
        return '';
    };
    NodeComponent.prototype.getFolderIcon = function () {
        if (this.iconClsFolder && this.nodeData[this.keyChild] && this.nodeData[this.keyChild].length > 0) {
            return this.iconClsFolder;
        }
        return '';
    };
    NodeComponent.prototype.getExpandIcon = function () {
        if (this.iconClsExpand && this.nodeData.show) {
            return this.iconClsExpand;
        }
        return '';
    };
    NodeComponent.prototype.clickNode = function (event, nodeData) {
        event.stopPropagation();
        this.clickEvent.emit(this.nodeData);
    };
    NodeComponent.prototype.changeShow = function (event) {
        event.stopPropagation();
        if (!(this.nodeData[this.keyChild] == null || this.nodeData[this.keyChild].length > 0)) {
            return;
        }
        this.nodeData.show = !this.nodeData.show;
        this.extendEvent.emit(this.nodeData);
    };
    NodeComponent.prototype.doNodeFn = function (option) {
        if (option.fn) {
            option.fn(this.nodeData);
        }
    };
    NodeComponent.prototype._clickNode = function (event) {
        this.clickEvent.emit(event);
    };
    NodeComponent.prototype._extendNode = function (event) {
        this.extendEvent.emit(event);
    };
    NodeComponent.prototype._checkNode = function (event) {
        this.checkEvent.emit(event);
    };
    NodeComponent.prototype.checkNodeEvent = function (event) {
        var _this = this;
        event.stopPropagation();
        setTimeout(function () {
            _this.checkEvent.emit(_this.nodeData);
        }, 1);
    };
    NodeComponent.prototype.shouwMoreActionBtn = function (ev) {
        ev.stopPropagation();
        ev.preventDefault();
        var target = ev.target;
        target.nextElementSibling.style.display = 'block';
    };
    NodeComponent.prototype.hideMe = function (ev) {
        ev.target.style.display = 'none';
    };
    NodeComponent.prototype.hideMoreBtn = function (ev) {
        if (this.actionBtnDom) {
            var btnArr = this.actionBtnDom.nativeElement.children;
            if (btnArr[btnArr.length - 1].className == 'tree-more-btn-box') {
                btnArr[btnArr.length - 1].style.display = 'none';
            }
        }
    };
    // 设置树节点长度
    // 设置树节点长度
    NodeComponent.prototype.setNodeWidth = 
    // 设置树节点长度
    function (icon, deep) {
        var nodeWidth;
        var icons = 25; // 树节点图标个数,默认1图标距离右边距1*25px
        if (icon) {
            icons += 30; // 树节点复选框中间图标宽度
        }
        if (this.options && this.options.actionBtn && !this.options.moreActionBtn) {
            icons += this.options.actionBtn.length * 25;
            nodeWidth = {
                'width': 'calc(100% - ' + icons + 'px - 35px)'
            };
        }
        else if (this.options && this.options.moreActionBtn) {
            icons += (this.options.actionBtn.length + 1) * 25;
            nodeWidth = {
                'width': 'calc(100% - ' + icons + 'px - 35px)'
            };
        }
        else {
            nodeWidth = {
                'width': '100%'
            };
        }
        return nodeWidth;
    };
    // 判断按钮是否需要展示 true展示false隐藏
    // 判断按钮是否需要展示 true展示false隐藏
    NodeComponent.prototype.showActionBtn = 
    // 判断按钮是否需要展示 true展示false隐藏
    function (btn, data) {
        if (this.root && btn.rootHide) {
            return false;
        }
        if (btn.belongs) {
            if (_.indexOf(btn.belongs.value, this.nodeData[btn.belongs.key]) == -1) {
                return false;
            }
        }
        return true;
    };
    NodeComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-node',
                    template: "\n    <div #treeNode class=\"display-flex flex-direction-column node-container\" *ngIf=\"!nodeData.isHide\">\n      <div class=\"display-flex tree-node-list\" [class.tree-node-selected]=\"nodeData.selected\" (mouseleave)=\"hideMoreBtn($event)\"\n           [style.padding-left]=\"(((options && options.paddingLeft)? (options.paddingLeft - 0) : 20) + deepIndex*15) + 'px'\">\n        <div class=\"tree-expand\" (click)=\"changeShow($event)\"\n             [class.tree-expanded]=\"nodeData.show\" [class.tree-no-child]=\"!(nodeData[keyChild]!=null && nodeData[keyChild].length>0)\">\n        </div>\n        <label *ngIf=\"options && options['checkbox']\" class=\"tree-checkbox-box\">\n          <input type=\"checkbox\" [class.half-checked]=\"nodeData.checked == 2\" id=\"checkbox{{(checkboxId || '')+''+myIndex+''+deepIndex}}\"\n                 [(ngModel)]=\"nodeData.checked\"\n                 (click)=\"checkNodeEvent($event)\">\n          <label (click)=\"$event.stopPropagation()\" class=\"clabel\" for=\"checkbox{{(checkboxId || '')+''+myIndex+''+deepIndex}}\"></label>\n        </label>\n        <div class=\"tree-icon\" *ngIf=\"options && options['iconCls']\"\n             [ngClass]=\"[getFileIcon(),getFolderIcon(),getExpandIcon()]\">\n        </div>\n        <div class=\"tree-icon-config\" *ngIf=\"nodeData.icon && options.iconDataKey && nodeData.icon[options.iconDataKey]\"\n             [ngStyle]=\"{'background-image':'url('+nodeData.icon[options.iconDataKey]+')'}\">\n        </div>\n        <div class=\"cursor-pointer tree-node-text {{nodeData.cls || ''}}\" style=\"margin-left:10px;line-height: 30px;\"\n             [ngStyle]=\"setNodeWidth(nodeData.icon,deepIndex)\"\n             (click)=\"clickNode($event,nodeData)\" [class.active]=\"nodeData.lighthight\" [class.selected]=\"nodeData.selected\"\n             [title]=\"nodeData[keyName]\">\n          {{nodeData[keyName]}}\n        </div>\n        <div class=\"tree-option-box\" *ngIf=\"options && options.actionBtn\">\n          <div #actionBtnDom style=\"display: flex; flex-direction: row;height:30px;\">\n            <ng-template ngFor let-actbtn [ngForOf]=\"options.actionBtn\">\n              <i *ngIf=\"showActionBtn(actbtn)\" class=\"{{actbtn.cls}} tree-options-btn\" (click)=\"doNodeFn(actbtn)\"\n                 [ngStyle]=\"{'background-image':'url('+actbtn.icon+')'}\" [title]=\"actbtn.text\">{{actbtn.showText ? actbtn.text : ''}}</i>\n            </ng-template>\n            <ng-template [ngIf]=\"options.moreActionBtn\">\n              <i class=\"tree-options-btn tree-more-btn\" [title]=\"'more'\" [ngStyle]=\"{'background-image':'url('+treeMoreBtn+')'}\"\n                 (click)=\"shouwMoreActionBtn($event)\">.</i>\n              <ul class=\"tree-more-btn-box\" (mouseleave)=\"hideMe($event)\">\n                <ng-template ngFor let-list [ngForOf]=\"options.moreActionBtn\">\n                  <li *ngIf=\"showActionBtn(list)\" [title]=\"list.text\" (click)=\"doNodeFn(list)\">{{list.text}}</li>\n                </ng-template>\n              </ul>\n            </ng-template>\n          </div>\n        </div>\n      </div>\n\n      <div *ngIf=\"nodeData[keyChild]!=null && nodeData[keyChild].length>0 && nodeData.show\"\n           class=\"display-flex flex-direction-column sub-node-container\">\n        <div *ngFor=\"let node of nodeData[keyChild]; let i = index;\">\n          <div>\n            <dc-node [nodeData]=\"node\" [keyChild]=\"keyChild\" [keyId]=\"keyId\" [treeId]=\"treeId + myIndex\"\n                     [options]=\"options\" [keyName]=\"keyName\" [parentNode]=\"nodeData\" [myIndex]=\"i\"\n                     (clickEvent)=\"_clickNode($event)\" [deepIndex]=\"deepIndex+1\" (checkEvent)=\"_checkNode($event)\"\n                     (extendEvent)=\"_extendNode($event)\"></dc-node>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
                    styles: [
                        "\n      li {\n        list-style: none;\n        margin: 0;\n        padding: 0;\n      }\n\n      .sub-node-container {\n      }\n\n      .before-node {\n      }\n\n      .left-line {\n        position: absolute;\n        width: 1px;\n        height: 100000px;\n        border-left: 1px solid red;\n      }\n\n      .node-container {\n        /*position: relative;*/\n      }\n\n      .tree-expand {\n        cursor: pointer;\n        min-width: 20px;\n        flex-grow: 0;\n        background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBRjI2RjgxNDJCNDYxMUU4QUIxNkRENDdDRTFGOURBRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBRjI2RjgxNTJCNDYxMUU4QUIxNkRENDdDRTFGOURBRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkFGMjZGODEyMkI0NjExRThBQjE2REQ0N0NFMUY5REFGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkFGMjZGODEzMkI0NjExRThBQjE2REQ0N0NFMUY5REFGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+bQubIwAAAFxJREFUeNpiDImI8WRgYJgLxJIMhMFzIE5mIkEDA1TdXCZcGlYvX4xTIxMDGYB+mljw+QFdLDQyFlUTTABZA7oY/f1Etqbn2CRw+QcIXoA0pYAYRFryFJT2AAIMAFsOFXDcTQR2AAAAAElFTkSuQmCC\") no-repeat center transparent;\n      }\n\n      .tree-expand.tree-no-child {\n        cursor: default;\n        background: none;\n      }\n\n      .tree-expanded {\n        background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2OUQ2NjIwMTJCNDYxMUU4OTQyOUNGRTMyODY0NTA2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2OUQ2NjIwMjJCNDYxMUU4OTQyOUNGRTMyODY0NTA2NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjY5RDY2MUZGMkI0NjExRTg5NDI5Q0ZFMzI4NjQ1MDY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY5RDY2MjAwMkI0NjExRTg5NDI5Q0ZFMzI4NjQ1MDY3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Fve+rwAAAFRJREFUeNpiDImI8WRgYJgLxJIMhMFzIE5mIkEDA1TdXCYSNMA1MjGQAeiniQXGWL18MUHFoZGxqJpgAoPLT2Rrek6inhcgTSkgBpEanoLSHkCAAQDBsw17IO7pLwAAAABJRU5ErkJggg==\") no-repeat center transparent;\n      }\n\n      .noIcon {\n        margin-left: 10px;\n      }\n\n      .tree-icon {\n        display: inline-block;\n        min-width: 20px;\n        height: 20px;\n        flex-grow: 0;\n      }\n\n      .tree-icon-config {\n        min-width: 20px;\n        margin: 0 0 0 10px;\n        background-repeat: no-repeat;\n        background-position: center;\n        background-size: contain;\n        flex-grow: 0;\n      }\n\n      .tree-checkbox-box {\n        display: block;\n        position: relative;\n        min-width: 20px;\n        margin: 0;\n        text-align: center;\n        flex-grow: 0;\n      }\n\n      .tree-checkbox-box input {\n        margin-top: 10px;\n      }\n\n      .tree-option-box {\n        position: absolute;\n        right: 20px;\n        height: 30px;\n        display: none;\n      }\n\n      .tree-node-list {\n        position: relative;\n        height: 30px;\n        line-height: 30px;\n      }\n\n      .tree-node-list:hover,\n      .tree-node-list.tree-node-selected {\n        color: #0081cc;\n        background-color: #edf0f5;\n      }\n\n      .tree-node-list:hover .tree-option-box {\n        display: block;\n      }\n\n      .tree-node-list .tree-node-text.active{\n        color: #0067A3;\n      }\n      input[type=checkbox] {\n        visibility: hidden;\n      }\n\n      .clabel {\n        cursor: pointer;\n        position: absolute;\n        width: 18px;\n        height: 18px;\n        top: 7px;\n        left: 4px;\n        background: #fff;\n        border: 1px solid #c8c8c8;\n        -moz-border-radius: 3px; /* Gecko browsers */\n        -webkit-border-radius: 3px; /* Webkit browsers */\n        border-radius: 3px; /* W3C syntax */\n      }\n\n      .clabel:hover {\n        background: #0081CC;\n      }\n\n      .clabel:after {\n        opacity: 0;\n        content: '';\n        position: absolute;\n        width: 9px;\n        height: 5px;\n        background: transparent;\n        top: 4px;\n        left: 4px;\n        border: 2px solid #fff;\n        border-top: none;\n        border-right: none;\n        -webkit-transform: rotate(-45deg);\n        -moz-transform: rotate(-45deg);\n        -o-transform: rotate(-45deg);\n        -ms-transform: rotate(-45deg);\n        transform: rotate(-45deg);\n      }\n\n      .clabel:hover:after {\n        opacity: 0.6;\n      }\n\n      input.half-checked[type=checkbox] + .clabel {\n        background: #fff;\n      }\n\n      input.half-checked[type=checkbox] + .clabel:after {\n        opacity: 1;\n        content: '';\n        position: absolute;\n        width: 11px;\n        height: 7px;\n        background: #0081CC;\n        top: 3px;\n        left: 3px;\n        border: 5px solid #0081CC;\n        -webkit-transform: none;\n        -moz-transform: none;\n        -o-transform: none;\n        -ms-transform: none;\n        transform: none;\n      }\n\n      input[type=checkbox]:checked + label {\n        background: #0081CC;\n      }\n\n      input[type=checkbox]:checked + label:after {\n        opacity: 1.0;\n      }\n\n      .tree-options-btn {\n        overflow: hidden;\n        cursor: pointer;\n        margin-left: 5px;\n        text-align: center;\n        min-width: 20px;\n        white-space: nowrap;\n        background-repeat: no-repeat;\n        background-position: center;\n      }\n\n      .tree-more-btn-box {\n        display: none;\n        position: absolute;\n        right: 1px;\n        top: 30px;\n        background-color: #fff;\n        z-index: 20;\n        box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, .2);\n      }\n\n      .tree-more-btn {\n        text-indent: -999px;\n      }\n\n      .tree-more-btn-box li {\n        padding: 0 10px;\n        white-space: nowrap;\n        text-align: center;\n        color: #565656;\n        cursor: pointer;\n      }\n\n      .cursor-pointer {\n        overflow: hidden;\n        white-space: nowrap;\n        text-overflow: ellipsis;\n      }\n\n      .tree-more-btn-box li:first-child {\n        border-radius: 3px 3px 0 0;\n      }\n\n      .tree-more-btn-box li:last-child {\n        border-radius: 0 0 3px 3px;\n      }\n\n      .tree-more-btn-box li:hover {\n        background-color: #0081cc;\n        color: #fff;\n      }\n    "
                    ]
                },] },
    ];
    /** @nocollapse */
    NodeComponent.ctorParameters = function () { return [
        { type: core_1.ComponentFactoryResolver, },
        { type: router_1.Router, },
    ]; };
    NodeComponent.propDecorators = {
        "deepIndex": [{ type: core_1.Input },],
        "parentNode": [{ type: core_1.Input },],
        "myIndex": [{ type: core_1.Input },],
        "root": [{ type: core_1.Input },],
        "keyId": [{ type: core_1.Input },],
        "keyName": [{ type: core_1.Input },],
        "keyChild": [{ type: core_1.Input },],
        "options": [{ type: core_1.Input },],
        "treeId": [{ type: core_1.Input },],
        "clickEvent": [{ type: core_1.Output },],
        "extendEvent": [{ type: core_1.Output },],
        "checkEvent": [{ type: core_1.Output },],
        "actionBtnDom": [{ type: core_1.ViewChild, args: ['actionBtnDom',] },],
        "treeNode": [{ type: core_1.ViewChild, args: ['treeNode',] },],
        "nodeData": [{ type: core_1.Input },],
        "nodeChangeEvent": [{ type: core_1.Output },],
    };
    return NodeComponent;
}());
exports.NodeComponent = NodeComponent;
//# sourceMappingURL=node.component.js.map
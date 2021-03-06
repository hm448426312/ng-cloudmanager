"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var StepComponent = (function () {
    function StepComponent() {
        this.showKey = 'name';
        this.idKey = 'id';
        this.currentIndex = 0;
        this.showActionFlag = false;
        this.itemWidth = 12;
    }
    StepComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.findCurrentIndex();
        this.resizeEvent = rxjs_1.Observable.fromEvent(window, 'resize').subscribe(function (event) {
            _this.calcIsShowStepAction();
        });
    };
    StepComponent.prototype.ngOnDestroy = function () {
        if (this.resizeEvent) {
            this.resizeEvent.unsubscribe();
        }
    };
    StepComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.calcIsShowStepAction();
        }, 10);
        setTimeout(function () {
            _this.showActionItem();
        }, 20);
    };
    StepComponent.prototype.showActionItem = function () {
        var i = this.currentIndex;
        if (i * 100 + i * this.itemWidth + 120 > this.stepUlP.nativeElement.offsetWidth) {
            if (i === this.stepData.length - 1) {
                // 最后一个
                this.stepUl.nativeElement.style.left = -(i * 100 + i * this.itemWidth + 120 - this.stepUlP.nativeElement.offsetWidth) + 'px';
            }
            else {
                // 非最后一个
                this.stepUl.nativeElement.style.left = -(i * 100 + i * this.itemWidth + 220 - this.stepUlP.nativeElement.offsetWidth) + 'px';
            }
        }
    };
    StepComponent.prototype.calcIsShowStepAction = function () {
        if (!this.stepUl || !this.stepUlP) {
            return false;
        }
        var l = this.stepData.length;
        var ulWidth = (l - 1) * 100 + l * this.itemWidth;
        var ulPWidth = this.stepUlP.nativeElement.offsetWidth;
        if (ulWidth + 120 > ulPWidth) {
            this.showActionFlag = true;
        }
        else {
            this.showActionFlag = false;
        }
    };
    StepComponent.prototype.findCurrentIndex = function () {
        if (this.currentData) {
            var flag = true;
            for (var i = 0; i < this.stepData.length; i++) {
                if (this.stepData[i][this.idKey] == this.currentData[this.idKey]) {
                    this.currentIndex = i;
                    flag = false;
                    break;
                }
            }
            if (flag) {
                this.currentIndex = this.stepData.length;
            }
        }
        else {
            this.currentIndex = this.stepData.length;
        }
    };
    StepComponent.prototype.stepActionHout = function () {
        if (this.hoverMoveTimer) {
            clearInterval(this.hoverMoveTimer);
            this.hoverMoveTimer = null;
        }
    };
    StepComponent.prototype.stepActionHover = function (offset) {
        var _this = this;
        if (this.hoverMoveTimer) {
            clearInterval(this.hoverMoveTimer);
            this.hoverMoveTimer = null;
        }
        this.hoverMoveTimer = setInterval(function () {
            _this.stepUlMove(offset, 2);
        }, 10);
    };
    StepComponent.prototype.stepActionDown = function (offset) {
        var _this = this;
        if (this.hoverMoveTimer) {
            clearInterval(this.hoverMoveTimer);
            this.hoverMoveTimer = null;
        }
        this.hoverMoveTimer = setInterval(function () {
            _this.stepUlMove(offset, 6);
        }, 10);
    };
    StepComponent.prototype.stepActionUp = function (offset) {
        var _this = this;
        if (this.hoverMoveTimer) {
            clearInterval(this.hoverMoveTimer);
            this.hoverMoveTimer = null;
        }
        this.hoverMoveTimer = setInterval(function () {
            _this.stepUlMove(offset, 1);
        }, 10);
    };
    StepComponent.prototype.stepUlMove = function (offset, step) {
        var stepUl = this.stepUl.nativeElement;
        var left = stepUl.offsetLeft - 70;
        var l = this.stepData.length;
        var ulWidth = (l - 1) * 100 + l * this.itemWidth + 120;
        var ulPWidth = this.stepUlP.nativeElement.offsetWidth;
        var leftRes = 0;
        if (offset === 'left') {
            if (ulWidth - Math.abs(left) <= ulPWidth) {
                leftRes = left;
            }
            else {
                if (ulWidth - Math.abs(left) - step <= ulPWidth) {
                    leftRes = -(ulWidth - ulPWidth);
                }
                else {
                    leftRes = left - step;
                }
            }
        }
        else if (offset === 'right') {
            if (left >= 0) {
                leftRes = 0;
            }
            else {
                if (left + step >= 0) {
                    leftRes = 0;
                }
                else {
                    leftRes = left + step;
                }
            }
        }
        stepUl.style.left = leftRes + 'px';
    };
    StepComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-step',
                    template: "\n    <div [ngClass]=\"{'step-new':newStep}\">\n      <div *ngIf=\"stepData && stepData.length > 0\" class=\"step-box\">\n        <span class=\"step-action-left\" (mouseleave)=\"stepActionHout()\" (mouseup)=\"stepActionUp('right')\"\n              (mousedown)=\"stepActionDown('right')\" (mouseenter)=\"stepActionHover('right')\" *ngIf=\"showActionFlag\"></span>\n        <div class=\"step-ul-outer\" #stepUlP>\n          <div class=\"step-ul\" #stepUl>\n            <ng-template ngFor let-item [ngForOf]=\"stepData\" let-i=\"index\">\n              <div class=\"step-item\"\n                   [ngClass]=\"{stepDone:(i < currentIndex),stepDoing: (i == currentIndex), stepUndo: (i > currentIndex)}\">\n                <div [title]=\"item[showKey]\" class=\"step-desc\">{{item[showKey]}}</div>\n              </div>\n              <div *ngIf=\"i !== stepData.length-1\" class=\"step-line\"\n                   [ngClass]=\"{stepDone:(i < currentIndex),stepDoing: (i == currentIndex), stepUndo: (i > currentIndex)}\"></div>\n            </ng-template>\n          </div>\n        </div>\n        <span class=\"step-action-right\" (mouseleave)=\"stepActionHout()\" (mouseup)=\"stepActionUp('left')\"\n              (mousedown)=\"stepActionDown('left')\" (mouseenter)=\"stepActionHover('left')\"\n              *ngIf=\"showActionFlag\"></span>\n      </div>\n    </div>\n  ",
                    styles: [
                        "\n      ul, li {\n        list-style: none;\n        margin: 0;\n        padding: 0;\n      }\n\n      .step-box {\n        display: flex;\n        flex-direction: row;\n        height: 55px;\n      }\n\n      .step-action-left,\n      .step-action-right {\n        flex-shrink: 0;\n        flex-grow: 0;\n        width: 30px;\n        height: 30px;\n        cursor: pointer;\n      }\n\n      .step-action-left {\n        margin-right: 10px;\n        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk5ODM3NTJGOEYwNjExRThBQTU5QURDMjEzMEIxMTExIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk5ODM3NTMwOEYwNjExRThBQTU5QURDMjEzMEIxMTExIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTk4Mzc1MkQ4RjA2MTFFOEFBNTlBREMyMTMwQjExMTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4Mzc1MkU4RjA2MTFFOEFBNTlBREMyMTMwQjExMTEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5Yp4h0AAAC6ElEQVR42sxXvasaQRDf+4iXh+g1QSuRpEi0MZA2qQQrg6DYvlajYB3SPEiRP8JKLERECSKIhWBSJLVoF5WAogiSxq9CvY/sXvbM6vO82yMPsjDs6c7Mb2d2dmaWAdYHYzCrBrMlZWbrLP7WZ+YMWCeFmK9ugjEBZQniMLHEBgABhEjGpBCk0rgUKeYhCZCckMRCoRAaj8fvt9vtF0mS5oqi7CFt9/v9T/hfZzKZfEA8iBfLCFgHa8GzJ6CPIbmLxeLL1Wr1WVVVSTUfEuJFMkgW67AEroPeoJ0PBoOULMsblXJAT2ygbBpbf0OAG1qrWyrOZrM7pEO1P5TpdHqHwXXLmUugHD4X93A4fEcDul6vDcGRLux2AWMw58CPUFCg80Gusgra6/XUXC6nzUZux2fuxBgMIPyuXxE+Ho9/ZBjGaSX8+/0+yOfzYLfbgdFodPn8oC6kkzhnFpwlBA7u7KnL5XpLAwqvFohEIiCRSBjyIp2lUukZ4WqGtJiDCpJ4kQo0mUyaiXDhcDhJJKATi1lRFN88AKg23G7360sWa8AOh+P5Q4CiIQjCCzLP8+QPjuOeGAk2Gg3QarUAjFJqUM3Xf3QfiwtvRWixWIBms6l9+/1+alCjFHksazA9/rrE5PF4QDQaBSzLAlgoQK1WowbCunWs4z3WShusNAMjwVgsBjKZDOB5HrTbbWpweNd/kEaSFivL5fLbNeFQKATS6bQtcFi1vuNafQQGehGHymp48V+Dy51Op0Y0CX+DDidxEe6sbjVHZ7NZNZVKqdVq9Sov0omrlF4oTrKUFuqBQKAPrbqFOdZxzQSv1wt8Ph/odrtanj4cDiAYDN7jg7jbSqVyW6/XUXBJ5x61XRZNqpNpWbzXCKAibhV8s9nYbgSMWp80TW222/qYNXuyBUwZBZKdZs+wvS2Xy6/m8/kn2Mp+JdrbPfpG/6E1xGO1vbXT0HMGLwmZpqH/L58w1x5t53Iq7aPttwADAHRPvaTBT/N4AAAAAElFTkSuQmCC) no-repeat center center transparent;\n      }\n\n      .step-action-right {\n        margin-left: 10px;\n        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjk5MkFENTc3OEYwNjExRThBOUVFQjkzOTI3NTUyM0YyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjk5MkFENTc4OEYwNjExRThBOUVFQjkzOTI3NTUyM0YyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTkyQUQ1NzU4RjA2MTFFOEE5RUVCOTM5Mjc1NTIzRjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTkyQUQ1NzY4RjA2MTFFOEE5RUVCOTM5Mjc1NTIzRjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6pBYSXAAAC7klEQVR42sxXvYsaQRSf3fXcnIJ25zUiCJdgYyDYJZVgIYIg+DdoEKxDmgsp0uUfsBILsVDUxkowV1xq0S4qAUWRSCD4RdC4u3lPZi+juDprLpCBx6zue7/fvJl5HysQ/iEYzJrBzAV26r1In/VZ2CPWRWXmo4sQTpCKjEhURGYBhCFCUaiojGhmthSBLSAyiB3Emc1m/YPB4O1yuWys1+uvqqouQdabzWYM/33q9/tvUAd1qY1MMUSOnd0hfQLiyOVyz2ezWVnTtI12emxQF23QlmJwkeukl7jyTqeTBK8WmsmhKMoCbBPU+0uG3NBb3VPncDi8BQxVO3+oo9HolpLrnguHSCV6Lo5ut/vaiHQ+n5siRyy67TLlEPaJL/BS4PkYbW+r1dLS6fR25mYGLHrmdsohEGbf9RCxxGKx94Ig2A+dRa/XI6vVimQyGdJut/lCBLAQkznnLafE3OSLfD5/EwgEPhpdBJ/PtyXGBTSbTeJ2u4nL5TpJLsvyjdfrLVar1R96bLMeS8FgME4XYzji8TgJhUIE4teM5xLYxJkEtJMCJYfD8ZIH5Rxyp9P5iuXbyb2wJc9405tZcqvV+pRNJHoYWTHQ4RJ+o5eAe5RKJVKv14koiiQcDpNoNHpQD7B/gc41PP4EWYvkLwd67vF4CIQNqdVqZDKZcNmJbGmDVPfdLDF6DAVi63EkEiFXV1cH9Sj2Qwm1sD8gVL7YbLZrs9tssVhIMpkkfr/fUBcqWoctkyJDrEBl+fwvSHFMp9N7hvghjrdFvNFolGghf1RSxAT9EtMk/AlwmsSd4HX1WO4tFotaIpHQUqkUd85GTFql9EJBWI9RNpVK5R3oLg8tu1wum/UUw2iJmIjN8Jgri2dUp5NlkbsRWCy4GxIVMU41Ao/a+qAN2vK2PseaPbxwCk+7dW6zZ9jeFgqFF+Px+AO0snfY0mJry7S3d/gOdXjb23MaesngS0Ix09D/l58wxz7a9u00sx9tvwUYAP+6zi4St3UbAAAAAElFTkSuQmCC) no-repeat center center transparent;\n      }\n\n      .step-ul-outer {\n        flex: 1;\n        position: relative;\n        overflow: hidden;\n      }\n\n      .step-ul {\n        display: flex;\n        flex-direction: row;\n        align-items: center;\n        font-size: 14px;\n        position: absolute;\n        padding: 5px 0;\n        margin-left: 70px;\n      }\n\n      .step-item {\n        position: relative;\n        width: 12px;\n        height: 12px;\n        color: #0081cc;\n        flex-shrink: 0;\n        flex-grow: 0;\n        background: #fff;\n        border-radius: 6px;\n        text-align: center;\n      }\n\n      .step-desc {\n        position: absolute;\n        top: 23px;\n        left: -50px;\n        width: 100px;\n        overflow: hidden;\n        text-align: center;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n        font-size: 12px;\n        color: #333;\n      }\n\n      .step-item.stepDone {\n        background: #0081cc;\n        color: #fff;\n      }\n\n      .step-item.stepDoing {\n        background: #0081cc;\n        box-shadow: 0 0 0 3px rgba(0, 129, 204, 0.3);\n      }\n\n      .step-item.stepUndo {\n        background: #c1c0c1;\n      }\n\n      .step-line {\n        height: 1px;\n        width: 100px;\n        background-color: #ccc;\n        flex-shrink: 0;\n        flex-grow: 0;\n      }\n\n      .step-line.stepDone {\n        background-color: #0081cc;\n      }\n      .step-new .step-item.stepDone {\n        background: #3fb992;\n        color: #fff;\n      }\n      .step-new .step-line.stepDone{\n        background-color: #3fb992;\n      }\n      .step-new .step-item.stepDoing {\n        background: #2bb1ff;\n        box-shadow: 0 0 0 3px rgba(43, 177, 255, 0.3);\n      }\n      .step-new .step-item.stepUndo {\n        background: #e1e1e1;\n      }\n      .step-new .step-line{\n        background-color: #e1e1e1;\n      }\n    "
                    ],
                },] },
    ];
    /** @nocollapse */
    StepComponent.ctorParameters = function () { return []; };
    StepComponent.propDecorators = {
        "stepUl": [{ type: core_1.ViewChild, args: ['stepUl',] },],
        "stepUlP": [{ type: core_1.ViewChild, args: ['stepUlP',] },],
        "stepData": [{ type: core_1.Input },],
        "showKey": [{ type: core_1.Input },],
        "idKey": [{ type: core_1.Input },],
        "currentData": [{ type: core_1.Input },],
        "newStep": [{ type: core_1.Input },],
    };
    return StepComponent;
}());
exports.StepComponent = StepComponent;
//# sourceMappingURL=step.component.js.map
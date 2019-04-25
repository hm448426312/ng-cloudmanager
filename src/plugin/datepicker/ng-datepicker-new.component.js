"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NgDatepickerNewComponent = (function () {
    function NgDatepickerNewComponent() {
        this.ngModelChange = new core_1.EventEmitter();
        this.canClear = false;
        this.displayDate = '';
        this.isHidden = true;
        this.language = 'zh';
        this.weekTitleEn = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        this.weekTitleZh = ['日', '一', '二', '三', '四', '五', '六'];
        this.monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.dates = [[]];
        this.monthArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]];
        this.quarterArray = [[1, 2], [3, 4]];
        this.yearArray = [];
        if (!this.type) {
            this.type = 'day';
        }
        this.showType = this.type || 'day';
        this.createEmptyDatePicker();
    }
    Object.defineProperty(NgDatepickerNewComponent.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (v) {
            this._type = v;
            this.showType = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgDatepickerNewComponent.prototype, "date", {
        get: function () {
            return this._date;
        },
        set: function (v) {
            this._date = v;
            if (this._date) {
                var _initDate = new Date(this._date);
                this.initDatePicker(_initDate);
                this.selectionEmitter({
                    date: _initDate.getDate()
                }, true);
            }
            else {
                this.initDatePicker(new Date());
                this.selectionEmitter({
                    date: ''
                }, true);
            }
        },
        enumerable: true,
        configurable: true
    });
    NgDatepickerNewComponent.prototype.ngOnInit = function () {
        // this.minDate = this.minDate || new Date('1900/01/01');
        // this.maxDate = this.maxDate || new Date(Date.now());
        this.initDatePicker(this.date ? new Date(this.date) : new Date());
    };
    NgDatepickerNewComponent.prototype.ngOnDestroy = function () {
    };
    NgDatepickerNewComponent.prototype.ngOnChanges = function () {
    };
    NgDatepickerNewComponent.prototype.clearDate = function () {
        this.selectionEmitter({ date: '' }, true);
        this.outputEvent();
    };
    NgDatepickerNewComponent.prototype.initDatePicker = function (date) {
        var today = date;
        this.actYear = today.getFullYear();
        this.actMonth = today.getMonth() + 1;
        this.actDay = today.getDay();
        this.renderTitle();
        if (this.type === 'day') {
            this.selectedDate = {
                year: today.getFullYear(),
                month: today.getMonth() + 1,
                day: today.getDate(),
            };
        }
        else if (this.type === 'month') {
            this.selectedDate = {
                year: today.getFullYear(),
                month: today.getMonth() + 1,
            };
        }
        else if (this.type === 'year') {
            this.createYearArray(today.getFullYear());
            this.selectedDate = {
                year: today.getFullYear(),
            };
        }
        this.calCalendar();
        this.initInput();
    };
    NgDatepickerNewComponent.prototype.resetCalendar = function (year, month) {
        this.actMonth = month;
        this.actYear = year;
        this.renderTitle();
        this.calCalendar();
    };
    NgDatepickerNewComponent.prototype.calCalendar = function () {
        if (this.showType === 'day') {
            this.clearCalendar();
            var startTime = new Date(this.actMonth + '/01/' + this.actYear);
            var startDay = startTime.getDay();
            var monthDays = this.calMonthEndDay(this.actYear, this.actMonth, 0);
            for (var i = 0, k = 1, l = 1; i < 6; i++) {
                if (i === 0) {
                    for (var j = 0; j < 7; j++) {
                        var temp = null;
                        if (j < startDay) {
                            var lastMonthEndDay = this.calMonthEndDay(this.actYear, this.actMonth, -1);
                            var lastDay = lastMonthEndDay - startDay + j + 1;
                            temp = {
                                date: lastDay,
                                isInMonth: false,
                                isSelected: this.isSelectedDay(this.actYear, this.actMonth, lastDay, -1),
                            };
                            if (this.actMonth === 1) {
                                temp['year'] = this.actYear - 1;
                                temp['month'] = 12;
                                temp['num'] = 0;
                            }
                            else {
                                temp['num'] = -1;
                                temp['year'] = this.actYear;
                                temp['month'] = this.actMonth;
                            }
                            this.dates[i][j] = temp;
                        }
                        else {
                            temp = {
                                date: k,
                                isInMonth: true,
                                num: 0,
                                isSelected: this.isSelectedDay(this.actYear, this.actMonth, k, 0),
                                year: this.actYear,
                                month: this.actMonth
                            };
                            this.dates[i][j] = temp;
                            k++;
                        }
                    }
                }
                else {
                    for (var j = 0; j < 7; j++, k++) {
                        var temp = null;
                        if (k > monthDays) {
                            temp = {
                                date: l,
                                isInMonth: false,
                                isSelected: this.isSelectedDay(this.actYear, this.actMonth, l, 1),
                            };
                            if (this.actMonth === 12) {
                                temp['year'] = this.actYear + 1;
                                temp['month'] = 1;
                                temp['num'] = 0;
                            }
                            else {
                                temp['num'] = 1;
                                temp['year'] = this.actYear;
                                temp['month'] = this.actMonth;
                            }
                            this.dates[i][j] = temp;
                            l++;
                        }
                        else {
                            temp = {
                                date: k,
                                num: 0,
                                isInMonth: true,
                                isSelected: this.isSelectedDay(this.actYear, this.actMonth, k, 0),
                                year: this.actYear,
                                month: this.actMonth
                            };
                            this.dates[i][j] = temp;
                        }
                    }
                }
            }
        }
        else if (this.showType === 'year') {
            if (this.yearArray.length === 0) {
                this.createYearArray(this.actYear);
            }
            else {
                if (this.actYear < this.yearArray[0][0] || this.actYear > this.yearArray[3][2]) {
                    this.clearYearArray();
                    this.createYearArray(this.actYear);
                }
            }
        }
    };
    NgDatepickerNewComponent.prototype.initInput = function () {
        this.maxYear = this.maxDate && this.maxDate.getFullYear();
        this.maxMonth = this.maxDate && this.maxDate.getMonth() + 1;
        this.minYear = this.minDate && this.minDate.getFullYear();
        this.minMonth = this.minDate && this.minDate.getMonth() + 1;
    };
    NgDatepickerNewComponent.prototype.calMonthEndDay = function (y, m, num) {
        var year = y;
        var month = m + num;
        if (month === 0) {
            year--;
            month = 12;
        }
        if (month === 13) {
            year++;
            month = 1;
        }
        return (year % 4 === 0) && (month === 2) ? this.monthDays[month - 1] + 1 : this.monthDays[month - 1];
    };
    NgDatepickerNewComponent.prototype.clearCalendar = function () {
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 7; j++) {
                this.dates[i][j] = null;
            }
        }
    };
    NgDatepickerNewComponent.prototype.renderTitle = function () {
        this.showYear = this.actYear;
        if (this.type !== 'year') {
            this.showMonth = this.actMonth;
        }
    };
    NgDatepickerNewComponent.prototype.onDocumentClick = function (ev) {
        if (!this.DatePickerBox.nativeElement.contains(ev.target)) {
            if (!this.isHidden) {
                this.toggleCalendar(true);
            }
        }
    };
    NgDatepickerNewComponent.prototype.toggleCalendar = function (isHidden) {
        this.isHidden = isHidden ? isHidden : !this.isHidden;
        this.showType = this.type;
        this.resetCalendar(this.showYear, this.showMonth);
    };
    NgDatepickerNewComponent.prototype.toggleYearDrop = function () {
        // this.clearYearArray();
        if (this.yearArray.length === 0) {
            this.createYearArray(this.actYear);
        }
        else {
            if (this.actYear < this.yearArray[0][0] || this.actYear > this.yearArray[3][2]) {
                this.clearYearArray();
                this.createYearArray(this.actYear);
            }
        }
        if (this.type !== 'year') {
            if (this.showType !== 'year') {
                this.showType = 'year';
            }
            else {
                this.showType = this.type;
            }
        }
    };
    NgDatepickerNewComponent.prototype.toggleMonthDrop = function () {
        if (this.type === 'day') {
            if (this.showType !== 'month') {
                this.showType = 'month';
            }
            else {
                this.showType = this.type;
            }
        }
    };
    NgDatepickerNewComponent.prototype.selectYear = function (ev, year) {
        if (ev.target.classList.contains('disabled')) {
            return;
        }
        this.actYear = year;
        if (this.type === 'year') {
            this.selectionEmitter({
                year: this.actYear,
            });
        }
        else {
            this.showType = this.type;
        }
        this.renderTitle();
        this.calCalendar();
    };
    NgDatepickerNewComponent.prototype.selectMonth = function (ev, month) {
        if (ev.target.classList.contains('disabled')) {
            return;
        }
        this.actMonth = month;
        if (this.type === 'month') {
            this.selectionEmitter({
                year: this.actYear,
                month: this.actMonth,
            });
        }
        else {
            this.showType = this.type;
        }
        this.renderTitle();
        this.calCalendar();
    };
    NgDatepickerNewComponent.prototype.selectQuarter = function (quarter) {
        this.showQuarter = quarter;
        console.log('季度', quarter);
    };
    NgDatepickerNewComponent.prototype.selectDate = function (d) {
        if (!d.isDisabled) {
            if (d.num > 0) {
                this.increaseMonth();
            }
            if (d.num < 0) {
                this.decreaseMonth();
            }
            this.selectionEmitter(d);
        }
    };
    NgDatepickerNewComponent.prototype.increaseYear = function () {
        if (this.showType === 'day' || this.showType === 'month') {
            this.actYear++;
            this.renderTitle();
            this.calCalendar();
        }
        else if (this.showType === 'year') {
            var maxYear = void 0;
            if (this.yearArray.length > 0) {
                maxYear = this.yearArray[3][2];
            }
            else {
                maxYear = this.actYear + 5;
            }
            this.createYearArray(maxYear + 7);
        }
    };
    NgDatepickerNewComponent.prototype.increaseMonth = function () {
        this.actMonth++;
        if (this.actMonth === 13) {
            this.actYear++;
            this.actMonth = 1;
        }
        this.renderTitle();
        this.calCalendar();
    };
    NgDatepickerNewComponent.prototype.decreaseYear = function () {
        if (this.showType === 'day' || this.showType === 'month') {
            this.actYear--;
            this.renderTitle();
            this.calCalendar();
        }
        else if (this.showType === 'year') {
            var minYear = void 0;
            if (this.yearArray.length > 0) {
                minYear = this.yearArray[0][0];
            }
            else {
                minYear = this.actYear - 6;
            }
            this.createYearArray(minYear - 6);
        }
    };
    NgDatepickerNewComponent.prototype.decreaseMonth = function () {
        this.actMonth--;
        if (this.actMonth === 0) {
            this.actYear--;
            this.actMonth = 12;
        }
        this.renderTitle();
        this.calCalendar();
    };
    NgDatepickerNewComponent.prototype.selectionEmitter = function (d, isInit) {
        this.isHidden = true;
        if (this.type === 'day') {
            this.selectedDate = {
                year: this.actYear,
                month: this.actMonth,
                day: d.date || 1,
            };
            if (isInit && !d.date) {
                this.displayDate = '';
            }
            else {
                this.displayDate = this.selectedDate.year + "-" + this.selectedDate.month
                    + ("-" + (this.selectedDate.day < 10 ? ('0' + this.selectedDate.day) : this.selectedDate.day));
            }
        }
        else if (this.type === 'month') {
            this.selectedDate = {
                year: this.actYear,
                month: this.actMonth,
                day: 1,
            };
            if (isInit && !d.date) {
                this.displayDate = '';
            }
            else {
                this.displayDate = this.selectedDate.year + "-" + this.selectedDate.month;
            }
        }
        else if (this.type === 'year') {
            this.selectedDate = {
                year: this.actYear,
                month: 1,
                day: 1,
            };
            if (isInit && !d.date) {
                this.displayDate = '';
            }
            else {
                this.displayDate = "" + this.selectedDate.year;
            }
        }
        this.renderTitle();
        if (!isInit) {
            this.outputEvent();
        }
    };
    NgDatepickerNewComponent.prototype.outputEvent = function () {
        if (this.displayDate) {
            this.ngModelChange.emit(this.selectedDate);
        }
        else {
            this.ngModelChange.emit('');
        }
    };
    NgDatepickerNewComponent.prototype.getCurrentDate = function () {
        return this.selectedDate;
    };
    NgDatepickerNewComponent.prototype.isSelectedDay = function (y, m, d, num) {
        var year = y;
        var month = m + num;
        if (month === 0) {
            year--;
            month = 12;
        }
        if (month === 13) {
            year++;
            month = 1;
        }
        if (year !== this.selectedDate.year) {
            return false;
        }
        if (month !== this.selectedDate.month) {
            return false;
        }
        if (d !== this.selectedDate.day) {
            return false;
        }
        return true;
    };
    NgDatepickerNewComponent.prototype.createEmptyDatePicker = function () {
        for (var i = 0; i < 6; i++) {
            this.dates.push([]);
            for (var j = 0; j < 7; j++) {
                this.dates[i].push();
            }
        }
    };
    NgDatepickerNewComponent.prototype.clearYearArray = function () {
        this.yearArray = [];
    };
    NgDatepickerNewComponent.prototype.createYearArray = function (year) {
        var minY = year - 6;
        var temp = [];
        for (var i = 0; i < 4; i++) {
            temp.push([]);
            for (var j = 0; j < 3; j++) {
                temp[i].push(minY);
                minY++;
            }
        }
        this.yearArray = temp;
    };
    NgDatepickerNewComponent.prototype.isDataDisabled = function (date) {
        var theDate = new Date(date.year + "/" + (date.month + (date.num || 0)) + "/" + date.date);
        if (this.maxDate && (theDate.getTime() > this.maxDate.getTime()) || (this.minDate && theDate.getTime() < this.minDate.getTime())) {
            date.isDisabled = true;
            return true;
        }
        date.isDisabled = false;
        return false;
    };
    NgDatepickerNewComponent.prototype.isDisabledMonth = function (month) {
        // 有最小日期
        if (this.minDate && this.minYear && this.minMonth) {
            if (this.showYear < this.minYear) {
                return true;
            }
            else if (this.showYear === this.minYear) {
                if (this.minMonth > month) {
                    return true;
                }
            }
        }
        // 有最大日期
        if (this.maxDate && this.maxYear && this.maxMonth) {
            if (this.showYear > this.maxYear) {
                return true;
            }
            else if (this.showYear === this.maxYear) {
                if (this.maxMonth < month) {
                    return true;
                }
            }
        }
        return false;
    };
    NgDatepickerNewComponent.prototype.isDisabledYear = function (year) {
        // 有最小日期
        if (this.minDate && this.minYear) {
            if (year < this.minYear) {
                return true;
            }
        }
        // 有最大日期
        if (this.maxDate && this.maxYear) {
            if (year > this.maxYear) {
                return true;
            }
        }
        return false;
    };
    NgDatepickerNewComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-ng-datepicker-new',
                    template: "\n    <div #DatePickerBox class=\"date-picker-box\" [style.width]=\"width\">\n      <div class=\"date-picker-outer\">\n        <input type=\"text\" class=\"date-picker-input\" [placeholder]=\"placeholder || '\u8BF7\u9009\u62E9\u65E5\u671F'\" (click)=\"toggleCalendar()\"\n               readonly [value]=\"displayDate\"/>\n        <i *ngIf=\"displayDate && canClear\" class=\"clear\" title=\"\u6E05\u9664\u65E5\u671F\" (click)=\"clearDate()\"></i>\n        <i class=\"show\" [class.active]=\"!isHidden\" (click)=\"toggleCalendar()\"></i>\n      </div>\n      <div class=\"date-picker-drop\" [class.showToday]=\"showTodayBtn\" [class.offset-left]=\"offset == 'left'\"\n           [style.display]=\"!isHidden? 'block' : 'none'\">\n        <div class=\"control-bar\">\n          <span class=\"material-icon de-year\" (click)=\"decreaseYear()\"></span>\n          <span class=\"material-icon de-month\" [hidden]=\"showType === 'year' || showType === 'month'\" (click)=\"decreaseMonth()\"></span>\n          <div class=\"control-title\">\n            <span class=\"title-icon title-year\" (click)=\"toggleYearDrop()\"\n                  [class.has-icon]=\"type !== 'year'\">{{showYear + '\u5E74'}}</span>\n            <span class=\"title-icon title-month\" *ngIf=\"type === 'day'\" (click)=\"toggleMonthDrop()\"\n                  [class.has-icon]=\"type=='day'\">{{(showMonth || '-') + '\u6708'}}</span>\n          </div>\n          <span class=\"material-icon in-month\" [hidden]=\"showType === 'year' || showType === 'month'\" (click)=\"increaseMonth()\"></span>\n          <span class=\"material-icon in-year\" (click)=\"increaseYear()\"></span>\n        </div>\n        <div class=\"date-drop-content\" [class.active]=\"showType === 'day'\">\n          <table class=\"table-day\">\n            <thead>\n            <ng-template [ngIf]=\"!language || language === 'zh'\">\n              <th *ngFor=\"let d of weekTitleZh\">{{d}}</th>\n            </ng-template>\n            <ng-template [ngIf]=\"language === 'en'\">\n              <th *ngFor=\"let d of weekTitleEn\">{{d}}</th>\n            </ng-template>\n            </thead>\n            <tbody>\n            <tr *ngFor=\"let week of dates\">\n              <td *ngFor=\"let day of week\">\n                    <span class=\"date\" *ngIf=\"day != null\" [class.inMonth]=\"day?.isInMonth\"\n                          [class.active]=\"day?.isSelected\" [class.disabled]=\"isDataDisabled(day)\" (click)=\"selectDate(day)\">\n                      {{day.date}}\n                    </span>\n              </td>\n            </tr>\n            </tbody>\n          </table>\n        </div>\n        <div class=\"date-drop-content\" [class.active]=\"showType === 'month'\">\n          <table class=\"table-month\">\n            <tbody>\n            <tr *ngFor=\"let months of monthArray\">\n              <td *ngFor=\"let month of months\">\n                <span class=\"month\" [class.disabled]=\"isDisabledMonth(month)\"\n                      [class.active]=\"month === showMonth && showYear === selectedDate?.year\" (click)=\"selectMonth($event, month)\">\n                  {{month}} \u6708\n                </span>\n              </td>\n            </tr>\n            </tbody>\n          </table>\n        </div>\n        <div class=\"date-drop-content\" [class.active]=\"showType === 'quarter'\">\n          <table class=\"table-quarter\">\n            <tbody>\n            <tr *ngFor=\"let quarters of quarterArray\">\n              <td *ngFor=\"let quarter of quarters\">\n                <span class=\"quarter\" [class.active]=\"quarter === showQuarter && showYear === selectedDate?.year\"\n                      (click)=\"selectQuarter(quarter)\">\n                  \u7B2C {{month}} \u5B63\u5EA6\n                </span>\n              </td>\n            </tr>\n            </tbody>\n          </table>\n        </div>\n        <div class=\"date-drop-content\" [class.active]=\"showType === 'year'\">\n          <table class=\"table-year\">\n            <tbody>\n            <tr *ngFor=\"let years of yearArray\">\n              <td *ngFor=\"let year of years\">\n                <span class=\"year\" [class.disabled]=\"isDisabledYear(year)\" [class.active]=\"year === showYear\"\n                      (click)=\"selectYear($event, year)\">\n                  {{year}} \u5E74\n                </span>\n              </td>\n            </tr>\n            </tbody>\n          </table>\n        </div>\n      </div>\n    </div>\n  ",
                    styles: ["\n    .date-picker-box {\n      position: relative;\n      display: inline-block;\n      width: 150px;\n    }\n\n    .date-picker-outer {\n      display: flex;\n      align-items: center;\n      flex-direction: row;\n      height: 32px;\n      border: 1px solid #ccc;\n      border-radius: 2px;\n    }\n\n    .date-picker-outer .date-picker-input {\n      flex: 1;\n      text-overflow: ellipsis;\n      overflow: hidden;\n      white-space: nowrap;\n      height: 32px;\n      cursor: pointer;\n    }\n\n    .date-picker-outer .show {\n      border: solid 4px transparent;\n      border-top-width: 6px;\n      border-top-color: #333;\n      width: 0;\n      height: 0;\n      flex: none;\n      cursor: pointer;\n      margin-right: 8px;\n      margin-top: 4px;\n    }\n\n    .date-picker-outer .show.active {\n      border: solid 4px transparent;\n      border-bottom-width: 6px;\n      border-bottom-color: blue;\n      border-top-width: 0;\n      width: 0;\n      height: 0;\n      flex: none;\n      margin-top: 0;\n    }\n\n    .date-picker-outer .clear {\n      flex: none;\n      cursor: pointer;\n      width: 20px;\n      height: 30px;\n      margin-right: 4px;\n      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAOVJREFUKJF90DFKA1EQBuAvj2Cu8MBqe8FokedeQb2A6WzU0uN4gxTbxkM8CKKSfqvAXsAi2lj4dlkh5Icp5p9/Zv6ZSdM0Ck7whDucFW6LFV7wDdNSOMUac/9xVeIet9iFMvmQeIw5XjELeOzFdV2LMQ6qGKO6rvv0HA8By55p21ZKSYxRjFFKSdu2403LKS77rOs6OWcpJZBz1nXduOEiHPF9CD8Bb2PPKSU552HT+CZsg78/g6qqBhu9vaqqxg2rSdM0M+TyhWP4xCJgjxu8HxF/4Br7/ugdEp6xwVeJTeEWReMX1Y9FK/4RDOgAAAAASUVORK5CYII=) no-repeat center center transparent;\n    }\n\n    .date-picker-outer .clear:hover {\n      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAOtJREFUKJF90b1NAzEcBfBfriCVm2vR3S2ABFXYAViADACUjMMGWQCGQIoQWJngrLTXWBSBIhRxooBCnuTCz++9/4dHMUYFJ3jALc4Kt8AMT/iCUTGc4hkXDuMdN1hWJfmYWHl7wbjC/VbcdZ0Qwk4VQtB13fZ6jrsK0y0zDIO2bYUQhBA0TWMYhv1K01GMcVXa2qW2bWu9XkspyTnvG1bVkb4P4bvC29/0vu+llDRN82smLCqbPYO6rvV9L+cs5yylpK7rfcNsFGMc47Vs4RgiJhVWuLb5nP/wgSt7Qy9xiUfM8VnOvHCTovEDCGVJpA/ldQoAAAAASUVORK5CYII=) no-repeat center center transparent;\n    }\n\n    .date-picker-drop {\n      position: absolute;\n      width: 280px;\n      min-height: 254px;\n      background-color: white;\n      box-shadow: 0 0 5px gray;\n      z-index: 1000;\n      right: 0;\n      user-select: none;\n    }\n\n    /*.date-picker-drop.showToday{\n      \n    }*/\n\n    .date-picker-drop.offset-left {\n      right: auto;\n      left: 0;\n    }\n\n    .control-bar {\n      display: flex;\n      padding: 0 6px;\n      height: 40px;\n      align-items: center;\n      justify-content: center;\n      background-color: #fff;\n      border-bottom: 1px solid #eee;\n    }\n\n    .control-title {\n      display: flex;\n      flex: 1;\n      align-items: center;\n      justify-content: center;\n    }\n\n    .title-icon {\n      cursor: pointer;\n      height: 40px;\n      line-height: 40px;\n      margin-right: 8px;\n      font-weight: 500;\n    }\n\n    .title-icon.has-icon {\n      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAXNSR0IArs4c6QAAAKtJREFUCB1jzM3NZX/37l3AkiVLVjEyMv5nQAINDQ0sd+7cCVVRUVnJ9P79e6H////PjoqKmgmkGWHqVq1axXzr1q3Ff//+nfLs2TNesERkZKQN0LQdQLxw6dKl2UCTmG7evLkQyPdhYmJyBtp2Dm5CTEyMw79//7YCTZwDxHxA0wOBilyBGk+DbIErBHGio6OdgQq2AJm/gaa5ARWdAIljBUDFpnFxcXrokgBsVUivS45SVAAAAABJRU5ErkJggg==') no-repeat right center transparent;\n      padding-right: 11px;\n    }\n\n    .title-icon.has-icon.active {\n      background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACtSURBVBhXY2ZAA3FxcXo6Ojpyly9ffgYVAgMmKA0G0dHRFn/+/Dny////Q0C2M1QYDOAKgRKm//792wFkrgXiWUDFm2JiYhzAkkAAVggUMAJK7AIyN6upqSUvW7Ysn5GRcQFQ45bIyEgbkBrGtLQ0/s+fP98DSuwKCAiICQsL+wuSAGpkjIqKmgkUj2BiYlJnkpKS+szMzJwDNCkWpggEgAr+A01OB9KpgoKC7wBJ9EC/L/4JsQAAAABJRU5ErkJggg==\");\n    }\n\n    .material-icon {\n      cursor: pointer;\n      width: 20px;\n      height: 40px;\n      opacity: 0.8;\n    }\n\n    .material-icon:hover {\n      opacity: 1;\n    }\n\n    .material-icon.de-year {\n      background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAALdJREFUKBWVkTsKAjEUReOvsHFAxN7WysLSwmamcgOWFm7WDfhFUQS3oDI4njdJTHxq4YVD3rkkhMkY82dqX/ZX6VLowhnevE4Rp4FM4A4L0E4V0mScwhgqoJ0qpMU4g6GrtIedTAnMoe9a7a62i3yQXC8p7PLhrraLvNIVdpCB+EH5BX/FP+uNZg0jaMMWVpGfmMv4AyI5yKYB9GADy8j3zEV8ADcPkJvkQAeOyuVH/ox/DL+h9Cf3pCF6rPdPKwAAAABJRU5ErkJggg==\") no-repeat center transparent;\n    }\n\n    .material-icon.in-year {\n      background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAALFJREFUKBWdkT0KAkEMRkdF0MbWg1iIlYWgWNnbeUZv4QVE/K28w6qo72OSdTalgUfyspPZDZvSnzFhbg5tm49eX+sHdnS6sLIcvR7oWPUhn2AIYzjCvvAz9QuSD6hW3KAHM9ChQ+EX6ioO0Et3eMASNHQt3Xeg1wh9oqKVU4pu7ZxGpA0MrBvd2vm2KbaGPuj20tHfK7XLArTwFt7Bn3gj9KM04DtFbxyW+HL+ILr30xd6jB3xq0tEFgAAAABJRU5ErkJggg==\") no-repeat center transparent;\n    }\n\n    .material-icon.de-month {\n      background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAMCAYAAABfnvydAAAAAXNSR0IArs4c6QAAAIpJREFUGBljYCAAmHHIcwHFw4D4PTZ5fqBgEhAbYZMUAwqmAbE6Nkk5oGA6EINoDKAEFEkFYpAJKIAJymOE0v9RZIEcmC9Arn0LxL5A/AqIPwExGMAUgDgfgfgJEPsA8WcgBmmAmwBig8BXIL4LxO5ADLLuBbIJQD4Y/ACSN4HYHojfgUVwEGCHAwDJMBPs3WRuzQAAAABJRU5ErkJggg==\") no-repeat center transparent;\n    }\n\n    .material-icon.in-month {\n      background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAMCAYAAABfnvydAAAAAXNSR0IArs4c6QAAAIlJREFUGBljYCASWALVuQExE7p6mMApoAQrEPtDabg6ZijrP5C+A8TiQGwOxHeB+A8QM8AUgNgg8ACIOYDYGYjvAfFPdAVAMYZnQPwLiD2B+C7MDUA2CgBZCQKMEAqVNAZyE4GYD1UYotoeKBgFxJzokiC3eAFxEBCDvIsBQAHlDsS43ITdMSBjAGiLDyi3RK/8AAAAAElFTkSuQmCC\") no-repeat center transparent;\n    }\n\n    .date-drop-content {\n      align-items: center;\n      justify-content: center;\n      display: none;\n      margin-top: 13px;\n    }\n\n    .date-drop-content.active {\n      display: flex;\n    }\n\n    .date-drop-content table {\n      border-spacing: 0;\n      border: none;\n    }\n\n    .table-day {\n    }\n\n    .table-day th, td {\n      text-align: center;\n      position: relative;\n      font-weight: normal;\n    }\n\n    .date {\n      display: block;\n      width: 24px;\n      height: 24px;\n      text-align: center;\n      line-height: 24px;\n      margin: 2px 6px;\n      cursor: pointer;\n      border-radius: 2px;\n      background-color: #fff;\n      opacity: 0.3;\n    }\n\n    .month {\n      display: block;\n      width: 45px;\n      height: 24px;\n      line-height: 24px;\n      margin: 11px 18px;\n      text-align: center;\n      cursor: pointer;\n      border-radius: 2px;\n    }\n\n    .year {\n      display: block;\n      width: 60px;\n      height: 24px;\n      line-height: 24px;\n      margin: 11px 10px;\n      text-align: center;\n      cursor: pointer;\n      border-radius: 2px;\n    }\n\n    .date.inMonth {\n      opacity: 1;\n    }\n\n    .date:hover,\n    .month:hover,\n    .year:hover {\n      background-color: #eeeeee;\n    }\n\n    .date.active,\n    .month.active,\n    .year.active {\n      background-color: #1890ff;\n      color: #fff;\n    }\n\n    .date.disabled {\n      cursor: not-allowed;\n      text-decoration: line-through;\n    }\n\n    .month.disabled {\n      cursor: not-allowed;\n      text-decoration: line-through;\n    }\n\n    .year.disabled {\n      cursor: not-allowed;\n      text-decoration: line-through;\n    }\n\n  "],
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    NgDatepickerNewComponent.ctorParameters = function () { return []; };
    NgDatepickerNewComponent.propDecorators = {
        "DatePickerBox": [{ type: core_1.ViewChild, args: ['DatePickerBox',] },],
        "ngModelChange": [{ type: core_1.Output },],
        "canClear": [{ type: core_1.Input },],
        "offset": [{ type: core_1.Input },],
        "displayDate": [{ type: core_1.Input },],
        "isHidden": [{ type: core_1.Input },],
        "showTodayBtn": [{ type: core_1.Input },],
        "placeholder": [{ type: core_1.Input },],
        "width": [{ type: core_1.Input },],
        "type": [{ type: core_1.Input },],
        "date": [{ type: core_1.Input },],
        "language": [{ type: core_1.Input },],
        "minDate": [{ type: core_1.Input },],
        "maxDate": [{ type: core_1.Input },],
        "onDocumentClick": [{ type: core_1.HostListener, args: ['document:click', ['$event'],] },],
    };
    return NgDatepickerNewComponent;
}());
exports.NgDatepickerNewComponent = NgDatepickerNewComponent;
//# sourceMappingURL=ng-datepicker-new.component.js.map
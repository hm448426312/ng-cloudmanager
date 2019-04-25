"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var NgDatepickerComponent = (function () {
    function NgDatepickerComponent() {
        this.daysOfWeekDisabled = [];
        this.ngModelChange = new core_1.EventEmitter();
        this.changeDateFlag = false;
        this.weekTitleEn = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        this.weekTitleZh = ['日', '一', '二', '三', '四', '五', '六'];
        this.showYearMonth = false;
        this.monthArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        this.yearArray = [];
        this.displayDate = null;
        this.dates = [[]];
        this.monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.monthFullName = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this._minDate = new Date('01/01/1900');
        this._maxDate = new Date('12/31/2117');
        if (this.isHidden === undefined) {
            this.isHidden = true;
        }
        this.createEmptyDatePicker();
    }
    NgDatepickerComponent.prototype.ngOnInit = function () {
        this.minDate = this.minDate || new Date('1900/01/01');
        this.maxDate = this.maxDate || new Date('2117/12/31');
        if (!this.isInited) {
            this.initDatePicker(new Date());
        }
    };
    NgDatepickerComponent.prototype.onDocumentClick = function (ev) {
        if (!this.datePickerBox.nativeElement.contains(ev.target)) {
            if (!this.isHidden) {
                this.toggleCalendar(true);
            }
        }
    };
    NgDatepickerComponent.prototype.ngOnChanges = function (changes) {
        if (changes['selectedQuickDateBar'])
            this.hasSelectedBar = true;
        if (changes['initDate'])
            this.hasInitDate = true;
        if (changes['selectedQuickDateBar'] && changes['selectedQuickDateBar'].currentValue) {
            if (!this.hasInitDate && !this.isInited) {
                this.initDatePicker(new Date());
            }
            if (this.hasInitDate) {
                this.setAvailableDates(this.selectedQuickDateBar);
            }
            else {
                this.selectBar(this.selectedQuickDateBar);
            }
        }
        if (changes['maxDate'] && changes['maxDate'].currentValue) {
            this._maxDate = this.maxDate;
        }
        if (changes['minDate'] && changes['minDate'].currentValue) {
            this._minDate = this.minDate;
        }
        if (changes['availableDates'] && changes['availableDates'].currentValue) {
            this._availableDates = this.availableDates;
        }
        if (changes['disabledDates'] && changes['disabledDates'].currentValue) {
            this._disabledDates = this.disabledDates;
        }
        if (changes['daysOfWeekDisabled'] && changes['daysOfWeekDisabled'].currentValue) {
            this._daysOfWeekDisabled = this.daysOfWeekDisabled;
        }
        if (changes['initDate'] && changes['initDate'].currentValue) {
            this.changeDateFlag = true;
            var _initDate = new Date(this.initDate);
            this.initDatePicker(_initDate);
            this.selectionEmitter(new Day(_initDate.getDate()));
        }
    };
    NgDatepickerComponent.prototype.decreaseYear = function () {
        // 向前推年份
        this.yearArray = this.calcYear(this.yearArray[0] - 12);
    };
    NgDatepickerComponent.prototype.increaseYear = function () {
        // 向后推年份
        this.yearArray = this.calcYear(this.yearArray[this.yearArray.length - 1] + 1);
    };
    NgDatepickerComponent.prototype.selectMonth = function (ev, month) {
        this.titleMonth = month;
        this.showYearMonth = false;
        this.pickerTitle = this.renderTitle();
        this.calCalendar();
    };
    NgDatepickerComponent.prototype.selectYear = function (ev, year) {
        this.titleYear = year;
        this.pickerTitle = this.renderTitle();
    };
    NgDatepickerComponent.prototype.calcYear = function (minYear) {
        var tempArray = [minYear];
        for (var i = 0; i < 11; i++) {
            tempArray.push(minYear + i + 1);
        }
        return tempArray;
    };
    NgDatepickerComponent.prototype.clearDate = function () {
        this.selectionEmitter(new Day(Date.now()), true);
    };
    NgDatepickerComponent.prototype.selectYearMonth = function () {
        this.yearArray = this.calcYear(this.titleYear - 5);
        this.showYearMonth = !this.showYearMonth;
        // todo 设置年月
        // this.titleYear = 2017;
        // this.titleMonth = 7;
        //
        // this.pickerTitle = this.renderTitle();
        // this.calCalendar();
    };
    NgDatepickerComponent.prototype.createEmptyDatePicker = function () {
        for (var i = 0; i < 6; i++) {
            this.dates.push([]);
            for (var j = 0; j < 7; j++) {
                this.dates[i].push();
            }
        }
    };
    NgDatepickerComponent.prototype.initDatePicker = function (date) {
        var today = date;
        this.titleYear = today.getFullYear();
        this.titleMonth = today.getMonth() + 1;
        this.pickerTitle = this.renderTitle();
        this.selectedDate = new SelectedDate(today.getFullYear(), today.getMonth() + 1, today.getDate());
        this.calCalendar();
        this.initInput();
        if (!this.hasInitDate && !this.hasSelectedBar) {
            this.selectionEmitter(new Day(today.getDate()), true);
        }
        this.isInited = true;
    };
    NgDatepickerComponent.prototype.clearDateByOther = function () {
        this.changeDateFlag = true;
        this.selectionEmitter(new Day(Date.now()), true);
    };
    NgDatepickerComponent.prototype.selectionEmitter = function (d, isInit) {
        this.isHidden = true;
        this.startDate = new Date(this.titleMonth + '/' + d.date + '/' + this.titleYear);
        this.endDate = null;
        this.selectedDate = new SelectedDate(this.titleYear, this.titleMonth, d.date);
        if (isInit) {
            this.displayDate = '';
        }
        else {
            /*this.displayDate = (this.displayDateType && this.selectedQuickDateBar ? this.selectedQuickDateBar.value : '')
                    + (this.selectedDate.day < 10 ? ('0' + this.selectedDate.day) : this.selectedDate.day)
                    + '-' + this.monthName[this.selectedDate.month - 1] + '-' + this.selectedDate.year;*/
            this.displayDate = (this.displayDateType && this.selectedQuickDateBar ? this.selectedQuickDateBar.value : '')
                + this.selectedDate.year + '-' + (this.selectedDate.month) + '-'
                + (this.selectedDate.day < 10 ? ('0' + this.selectedDate.day) : this.selectedDate.day);
        }
        this.outputEvent();
    };
    NgDatepickerComponent.prototype.selectDate = function (d) {
        this.showYearMonth = false;
        if (!d.isDisabled) {
            if (d.num > 0)
                this.increaseMonth();
            if (d.num < 0)
                this.decreaseMonth();
            this.selectionEmitter(d);
        }
    };
    NgDatepickerComponent.prototype.isDateSelected = function (d) {
        // const date: Date = new Date((this.titleMonth + (d.num | 0)) + '/' + d.date + '/' + this.titleYear);
        var date = new Date((d.month + (d.num || 0)) + '/' + d.date + '/' + d.year);
        d.isSelected = (this.startDate && this.startDate.getTime() === date.getTime()) || (this.endDate && this.endDate.getTime() === date.getTime());
        d.isInRange = (this.startDate && this.startDate.getTime() < date.getTime()) && (this.endDate && this.endDate.getTime() > date.getTime());
        d.isDisabled = this.isDateDisbalbed(date);
        return d.isSelected;
    };
    NgDatepickerComponent.prototype.isDateDisbalbed = function (date) {
        if (date.getTime() > this.maxDate.getTime() || date.getTime() < this.minDate.getTime()) {
            return true;
        }
        if (this.disabledDates && this.disabledDates.length > 0
            && this.disabledDates.filter(function (disabledDate) { return date.getTime() === new Date(disabledDate).getTime(); }).length > 0) {
            return true;
        }
        if (this.availableDates && this.availableDates.length > 0
            && this.availableDates.filter(function (availableDate) { return date.getTime() === new Date(availableDate).getTime(); }).length === 0) {
            return true;
        }
        if (this.daysOfWeekDisabled && this.daysOfWeekDisabled.length > 0
            && this.daysOfWeekDisabled.indexOf(date.getDay()) > -1) {
            return true;
        }
        return false;
    };
    /**
     * Formate displaying month to full name
     */
    /**
       * Formate displaying month to full name
       */
    NgDatepickerComponent.prototype.renderTitle = /**
       * Formate displaying month to full name
       */
    function () {
        return this.titleYear + '年 ' + this.titleMonth + '月';
    };
    NgDatepickerComponent.prototype.initInput = function () {
        this.maxYear = this.maxDate && this.maxDate.getFullYear();
        this.maxMonth = this.maxDate && this.maxDate.getMonth() + 1;
        this.minYear = this.minDate && this.minDate.getFullYear();
        this.minMonth = this.minDate && this.minDate.getMonth() + 1;
    };
    NgDatepickerComponent.prototype.calCalendar = function () {
        this.clearCalendar();
        var startTime = new Date(this.titleMonth + '/01/' + this.titleYear);
        var startDay = startTime.getDay();
        var monthDays = this.calMonthEndDay(this.titleYear, this.titleMonth, 0);
        for (var i = 0, k = 1, l = 1; i < 6; i++) {
            if (i === 0) {
                for (var j = 0; j < 7; j++) {
                    var temp = null;
                    if (j < startDay) {
                        var lastMonthEndDay = this.calMonthEndDay(this.titleYear, this.titleMonth, -1);
                        var lastDay = lastMonthEndDay - startDay + j + 1;
                        temp = new Day(lastDay, -1, this.isHoliday(this.titleYear, this.titleMonth, lastDay, -1), false, this.isSelectedDay(this.titleYear, this.titleMonth, lastDay, -1));
                        if (this.titleMonth == 1) {
                            temp.year = this.titleYear - 1;
                            temp.month = 12;
                            temp.num = 0;
                        }
                        else {
                            temp.year = this.titleYear;
                            temp.month = this.titleMonth;
                        }
                        this.dates[i][j] = temp;
                    }
                    else {
                        temp = new Day(k, 0, this.isHoliday(this.titleYear, this.titleMonth, k, 0), true, this.isSelectedDay(this.titleYear, this.titleMonth, k, 0));
                        temp.year = this.titleYear;
                        temp.month = this.titleMonth;
                        this.dates[i][j] = temp;
                        k++;
                    }
                }
            }
            else {
                for (var j = 0; j < 7; j++, k++) {
                    var temp = null;
                    if (k > monthDays) {
                        temp = new Day(l, 1, this.isHoliday(this.titleYear, this.titleMonth, l, 1), false, this.isSelectedDay(this.titleYear, this.titleMonth, l, 1));
                        if (this.titleMonth == 12) {
                            temp.year = this.titleYear + 1;
                            temp.month = 1;
                            temp.num = 0;
                        }
                        else {
                            temp.year = this.titleYear;
                            temp.month = this.titleMonth;
                        }
                        this.dates[i][j] = temp;
                        l++;
                    }
                    else {
                        temp = new Day(k, 0, this.isHoliday(this.titleYear, this.titleMonth, k, 0), true, this.isSelectedDay(this.titleYear, this.titleMonth, k, 0));
                        temp.year = this.titleYear;
                        temp.month = this.titleMonth;
                        this.dates[i][j] = temp;
                    }
                }
            }
        }
    };
    NgDatepickerComponent.prototype.increaseMonth = function () {
        this.titleMonth++;
        if (this.titleMonth === 13) {
            this.titleYear++;
            this.titleMonth = 1;
        }
        this.pickerTitle = this.renderTitle();
        this.calCalendar();
    };
    NgDatepickerComponent.prototype.decreaseMonth = function () {
        this.titleMonth--;
        if (this.titleMonth === 0) {
            this.titleYear--;
            this.titleMonth = 12;
        }
        this.pickerTitle = this.renderTitle();
        this.calCalendar();
    };
    NgDatepickerComponent.prototype.isSelectedDay = function (y, m, d, num) {
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
        if (year !== this.selectedDate.year)
            return false;
        if (month !== this.selectedDate.month)
            return false;
        if (d !== this.selectedDate.day)
            return false;
        return true;
    };
    NgDatepickerComponent.prototype.isHoliday = function (y, m, d, num) {
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
        var day = new Date(month + '/' + d + '/' + year);
        if (day.getDay() === 0 || day.getDay() === 6)
            return true;
        return false;
    };
    NgDatepickerComponent.prototype.calMonthEndDay = function (y, m, num) {
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
    NgDatepickerComponent.prototype.clearCalendar = function () {
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < 7; j++) {
                this.dates[i][j] = null;
            }
        }
    };
    NgDatepickerComponent.prototype.resetCalendar = function (year, month) {
        this.titleMonth = month;
        this.titleYear = year;
        if (this.titleMonth === 12) {
            this.titleYear++;
            this.titleMonth = 1;
        }
        if (this.titleMonth === 0) {
            this.titleYear--;
            this.titleMonth = 12;
        }
        this.pickerTitle = this.renderTitle();
        this.calCalendar();
    };
    NgDatepickerComponent.prototype.selectBar = function (bar) {
        if (bar.startDate && bar.endDate) {
            this.startDate = bar.startDate;
            this.endDate = bar.endDate;
            this.displayDate = (this.displayDateType ? bar.value : '')
                + this.renderDisplayDate(this.startDate) + ' - ' + this.renderDisplayDate(this.endDate);
        }
        else {
            this.startDate = bar.date || bar.startDate || bar.endDate;
            this.endDate = null;
            this.displayDate = (this.displayDateType ? bar.value : '') + this.renderDisplayDate(this.startDate);
        }
        this.isHidden = true;
        this.resetCalendar(this.startDate.getFullYear(), this.startDate.getMonth() + 1);
        this.selectedQuickDateBar = bar;
        this.outputEvent();
    };
    NgDatepickerComponent.prototype.setAvailableDates = function (bar) {
        this.maxDate = (bar && bar.maxDate) ? bar.maxDate : this._maxDate;
        this.minDate = (bar && bar.minDate) ? bar.minDate : this._minDate;
        this.disabledDates = (bar && bar.disabledDates) ? bar.disabledDates : this._disabledDates;
        this.availableDates = (bar && bar.availableDates) ? bar.availableDates : this._availableDates;
        this._daysOfWeekDisabled = (bar && bar.daysOfWeekDisabled) ? bar.daysOfWeekDisabled : this._daysOfWeekDisabled;
        this.initInput();
    };
    NgDatepickerComponent.prototype.isBarSelected = function (bar) {
        return this.selectedQuickDateBar === bar;
    };
    NgDatepickerComponent.prototype.renderDisplayDate = function (date) {
        if (date)
            return (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()) + '-' + this.monthName[date.getMonth()] + '-' + date.getFullYear();
    };
    NgDatepickerComponent.prototype.toggleCalendar = function (isHidden) {
        if (this.showYearMonth) {
            this.showYearMonth = false;
        }
        this.isHidden = isHidden ? isHidden : !this.isHidden;
        if (this.isHidden && this.startDate && this.startDate.toString() !== 'Invalid Date') {
            this.resetCalendar(this.startDate.getFullYear(), this.startDate.getMonth() + 1);
        }
    };
    NgDatepickerComponent.prototype.outputEvent = function () {
        this.outputDate = {
            date: this.startDate,
            startDate: this.startDate,
            endDate: this.endDate,
            dateType: this.selectedQuickDateBar
        };
        if (!this.changeDateFlag) {
            this.ngModelChange.emit(this.outputDate);
        }
        this.changeDateFlag = false;
    };
    NgDatepickerComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-ng-datepicker',
                    template: "\n    <div #datePickerBox class=\"date-picker-box\" [style.width]=\"width\">\n      <div class=\"date-picker-input\">\n        <input type=\"text\" class=\"form-control pointer\" [placeholder]=\"placeholder || '\u8BF7\u9009\u62E9\u65E5\u671F'\" (click)=\"toggleCalendar()\" readonly\n               [value]=\"displayDate\"/>\n        <i class=\"show\" (click)=\"toggleCalendar()\"></i>\n        <i *ngIf=\"displayDate\" class=\"clear\" title=\"\u6E05\u9664\u65E5\u671F\" (click)=\"clearDate()\"></i>\n      </div>\n      <div class=\"date-picker\" [class.offset-left]=\"offset == 'left'\" style=\"user-select: none;\"\n           [style.display]=\"(defaultShow || !isHidden)? 'block' : 'none'\"\n           (click)=\"$event.stopPropagation()\">\n        <div class=\"nav-bar pull-left\">\n          <ul *ngIf=\"quickDateBars\">\n            <li class=\"pointer\" [class.active]=\"isBarSelected(bar)\" (click)=\"selectBar(bar)\" *ngFor=\"let bar of quickDateBars\">\n              {{bar.label}}\n            </li>\n          </ul>\n        </div>\n        <div class=\"calendar pull-left\">\n          <div class=\"control-bar\">\n            <!--<span *ngIf=\"titleMonth <= maxMonth && titleYear < maxYear\" class=\"material-icons\" (click)=\"decreaseMonth()\"> \u2039 </span>-->\n            <span *ngIf=\"showYearMonth\" class=\"material-icons de-year\" (click)=\"decreaseYear()\"></span>\n            <span class=\"material-icons de-month\" (click)=\"decreaseMonth()\"></span>\n            <span class=\"monthTitle\" (click)=\"selectYearMonth()\" [class.showYearMonthMore]=\"showYearMonth\" [style.width]=\"showYearMonth?'92px' : '160px'\"> {{pickerTitle}}<i\n              class=\"date-more\"></i> </span>\n            <ul *ngIf=\"showYearMonth\" class=\"years-month-ul\">\n              <li *ngFor=\"let list of monthArray; let i = index\">\n                <span *ngIf=\"yearArray[i] != undefined\" (click)=\"selectYear($event, yearArray[i])\"\n                      [class.selected]=\"titleYear == yearArray[i]\">{{yearArray[i]}}\u5E74</span>\n                <span (click)=\"selectMonth($event, list)\" [class.selected]=\"titleMonth == list\">{{list}}\u6708</span>\n              </li>\n            </ul>\n            <!--<span *ngIf=\"titleMonth >= minMonth && titleYear > minYear\" class=\"material-icons\" (click)=\"increaseMonth()\"> \u203A </span>-->\n            <span class=\"material-icons in-month\" (click)=\"increaseMonth()\"></span>\n            <span *ngIf=\"showYearMonth\" class=\"material-icons in-year\" (click)=\"increaseYear()\"></span>\n          </div>\n          <div class=\"days\">\n            <table>\n              <thead>\n              <ng-template [ngIf]=\"!language || language === 'zh'\">\n                <th *ngFor=\"let d of weekTitleZh\">{{d}}</th>\n              </ng-template>\n              <ng-template [ngIf]=\"language === 'en'\">\n                <th *ngFor=\"let d of weekTitleEn\">{{d}}</th>\n              </ng-template>\n              </thead>\n              <tr *ngFor=\"let week of dates\">\n                <td class=\"pointer\" *ngFor=\"let day of week\"\n                    [class.active]=\"day != null && day.isSelected\" [class.disabled]=\"day != null && day.isDisabled\"\n                    [class.range]=\"day !=null && !day.isSelected && day.isInRange\"\n                    (click)=\"selectDate(day)\">\n                            <span class=\"date\" *ngIf=\"day != null\"\n                                  [ngStyle]=\"{'display': day ? 'block' : 'none', 'color': isDateSelected(day) ? 'white' : day.isInMonth ? '' : '#999999'}\">\n                                {{day.date}}\n                            </span>\n                </td>\n              </tr>\n            </table>\n          </div>\n        </div>\n      </div>\n    </div>\n    <!--<div class=\"cancelArea\" (click)=\"toggleCalendar(true)\"></div>-->\n  ",
                    styles: ["\n    ul, li {\n      list-style: none;\n      margin: 0;\n      padding: 0;\n    }\n\n    .date-more {\n      display: inline-block;\n      width: 8px;\n      height: 10px;\n      border: solid 4px transparent;\n      border-top-width: 6px;\n      border-top-color: #666;\n      position: relative;\n      top: 3px;\n    }\n    .showYearMonthMore .date-more{\n      top: 0;\n      transform:rotate(180deg);\n      -ms-transform:rotate(180deg); /* Internet Explorer */\n      -moz-transform:rotate(180deg); /* Firefox */\n      -webkit-transform:rotate(180deg); /* Safari \u548C Chrome */\n      -o-transform:rotate(180deg); /* Opera */\n    }\n\n    .form-control {\n      display: block;\n      width: 100%;\n      height: 34px;\n      padding: 0 0 0 5px;\n      font-size: inherit;\n      line-height: 1.42857143;\n      color: #555;\n      background-color: #fff;\n      background-image: none;\n      border: 1px solid #ccc;\n      border-radius: 4px;\n      -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);\n      box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);\n      -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;\n      -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\n      transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\n    }\n\n    input.form-control {\n      border: 1px solid #ccc;\n    }\n\n    input::placeholder {\n      color: #bbb\n    }\n\n    div.date-picker-box {\n      position: relative;\n      display: inline-block;\n      width: 150px;\n    }\n\n    div.date-picker-input {\n      position: relative;\n      display: inline-block;\n      width: 100%;\n      background-color: white;\n      color: #333;\n      font-size: 12px;\n    }\n\n    div.date-picker-input input {\n      height: 30px;\n      border-radius: 3px;\n    }\n\n    div.date-picker-input i.show {\n      position: absolute;\n      right: 2px;\n      top: 0;\n      font-size: inherit;\n      cursor: pointer;\n      width: 20px;\n      height: 30px;\n      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAYklEQVQokdWQUQrAIAxDU9m/O6XHn97A/awQ2w4s+1qgIA3h1UhrDaQB4ESsxSsA5jOsSTNoX3VfTOCN5rzDUCLVyLPEbSlRkjn3Ry6DS3MFfj5VJRvvkPijU1PEDuBK5voNJIwdJa4Jkp0AAAAASUVORK5CYII=) no-repeat center center transparent;\n    }\n\n    div.date-picker-input i.clear {\n      position: absolute;\n      right: 22px;\n      top: 0;\n      font-size: inherit;\n      cursor: pointer;\n      width: 20px;\n      height: 30px;\n      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAOVJREFUKJF90DFKA1EQBuAvj2Cu8MBqe8FokedeQb2A6WzU0uN4gxTbxkM8CKKSfqvAXsAi2lj4dlkh5Icp5p9/Zv6ZSdM0Ck7whDucFW6LFV7wDdNSOMUac/9xVeIet9iFMvmQeIw5XjELeOzFdV2LMQ6qGKO6rvv0HA8By55p21ZKSYxRjFFKSdu2403LKS77rOs6OWcpJZBz1nXduOEiHPF9CD8Bb2PPKSU552HT+CZsg78/g6qqBhu9vaqqxg2rSdM0M+TyhWP4xCJgjxu8HxF/4Br7/ugdEp6xwVeJTeEWReMX1Y9FK/4RDOgAAAAASUVORK5CYII=) no-repeat center center transparent;\n    }\n    div.date-picker-input i.clear:hover{\n      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAOtJREFUKJF90b1NAzEcBfBfriCVm2vR3S2ABFXYAViADACUjMMGWQCGQIoQWJngrLTXWBSBIhRxooBCnuTCz++9/4dHMUYFJ3jALc4Kt8AMT/iCUTGc4hkXDuMdN1hWJfmYWHl7wbjC/VbcdZ0Qwk4VQtB13fZ6jrsK0y0zDIO2bYUQhBA0TWMYhv1K01GMcVXa2qW2bWu9XkspyTnvG1bVkb4P4bvC29/0vu+llDRN82smLCqbPYO6rvV9L+cs5yylpK7rfcNsFGMc47Vs4RgiJhVWuLb5nP/wgSt7Qy9xiUfM8VnOvHCTovEDCGVJpA/ldQoAAAAASUVORK5CYII=) no-repeat center center transparent;\n    }\n\n    div.date-picker {\n      position: absolute;\n      width: auto;\n      min-height: 220px;\n      background-color: white;\n      box-shadow: 0px 0px 5px gray;\n      z-index: 1000;\n      right: 0;\n    }\n\n    div.date-picker.offset-left {\n      right: auto;\n      left: 0;\n    }\n\n    .years-month-ul {\n      position: absolute;\n      width: 150px;\n      top: 30px;\n      right: 0;\n      margin-right: 40px;\n      background-color: white;\n      box-shadow: 0 0 5px gray;\n      z-index: 1001;\n    }\n\n    .years-month-ul li {\n      height: 22px;\n      display: flex;\n    }\n\n    .years-month-ul li span {\n      width: 50%;\n      align-items: center;\n      justify-content: center;\n      text-align: center;\n      cursor: pointer;\n      font-size: 12px;\n      border-radius: 3px;\n    }\n\n    .years-month-ul li span:hover {\n      background-color: #eeeeee;\n    }\n\n    .years-month-ul li span.selected {\n      background-color: #0081cc;\n      color: #fff;\n    }\n\n    .nav-bar ul {\n      list-style: none;\n      padding-top: 10px;\n      padding-left: 10px;\n    }\n\n    .nav-bar ul li {\n      font-size: 13px;\n      background: #f5f5f5;\n      border: 1px solid #f5f5f5;\n      border-radius: 4px;\n      color: #1165E5;\n      padding: 3px 12px;\n      margin-bottom: 8px;\n    }\n\n    .nav-bar ul li.active, .nav-bar ul li:hover {\n      background: #0081cc;\n      border: 1px solid #0081cc;\n      color: #ffffff;\n    }\n\n    div.calendar .control-bar {\n      width: 100%;\n      display: flex;\n      height: 35px;\n      align-items: center;\n      justify-content: center;\n      background-color: #eeeeee;\n    }\n\n    div.calendar .control-bar .material-icons {\n      cursor: pointer;\n      font-size: 21px;\n      margin: 2px;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 30px;\n      height: 30px;\n      font-weight: bold;\n      opacity: 0.7;\n    }\n    div.calendar .control-bar .material-icons:hover{\n      opacity: 1;\n    }\n\n    div.calendar .control-bar .material-icons.de-year {\n      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAqklEQVQYlW3QMWoCURAG4G/XxSIg4h28hGCRRNDUogFJq2trZZPC2hMIgpUgSLC2EPQCuUFay1QpA0GbffBYMt3H/DMwk+R5LqoHfGCBz9hZFKrigBc08Bg7LUIVbNHDFaOSX1MkWGGIb3TwHvkZ1xRLTPCDLsYlf0HYGOr2j4XgHBvUccK65CZkxdS0aAxwRjvyBa3wnj+8oVZcusNT5H14D/yijyNmZd8B9VwntmAoiDcAAAAASUVORK5CYII=) no-repeat center center transparent;\n    }\n\n    div.calendar .control-bar .material-icons.de-month {\n      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAgUlEQVQImU3OIQ9BcRiF8d/9M8FmJmiiTyIg2yiyq0qq7BNIkmTIguCDqDdKos2uct/tPunsnJ3tyfI8V6ONC3bNWtnCDVP0UlU2cMIEBRYJGQ6Y440RioQ9VvhgjBfEIygjJGxxRBcPDGMoscYVfTwxCN0fluhUZufQhS9muGPzB2YAFnw+Bp0mAAAAAElFTkSuQmCC) no-repeat center center transparent;\n    }\n\n    div.calendar .control-bar .material-icons.in-month {\n      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAYAAACXDi8zAAAAhElEQVQImU3OoQ5BYQDF8d/9mCppokfwBIKZaENRfZuo6B5BEkTFZjoTeA/1NkUSbHaV+839p7P9d3ZOFmPsYo0x3koCNhjihEZVTJFjgD1qSeTo4YkJtsjqZfOBPu6Y4xX8KSo5S6KDK5rYYRXQxg0tHLFAEXAo5QUzfNOrJc4Y4ZNGfuOgGIESFz17AAAAAElFTkSuQmCC) no-repeat center center transparent;\n    }\n\n    div.calendar .control-bar .material-icons.in-year {\n      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAyUlEQVQYlXXQIUtDARTF8d/eHtYlEcSiwbjy8BuoIDNMBhNNG4wHfgCx2cVk0qJrgguCZawMg34Ag2VtYUnDsAyLzHK3pZ32v5xz7uUW8jzfwSWOMUEZ1zgKBglucIgOVoL38RI8N9YxQgVtNDDELh5RnBlHMfzGKS6why/UcIdCGs0DHKCPM/xE+A0tjBMLTS1XMmvcRg8l3OIe78EPOE+xEStX4/grvGINz8gxTfEU5i6a0bwZ4RP8QTHLsk+sx5t+8YEtVIPBPx+JKzLiZB3cAAAAAElFTkSuQmCC) no-repeat center center transparent;\n    }\n\n    div.calendar .control-bar .monthTitle {\n      font-size: inherit;\n      font-weight: normal;\n      width: 160px;\n      color: #333;\n      text-align: center;\n      cursor: pointer;\n      height: 30px;\n      line-height: 30px;\n    }\n\n    div.calendar .control-bar .monthTitle:hover {\n      color: #0081cc;\n    }\n\n    div.calendar .control-bar .monthTitle:hover .date-more {\n      color: #0081cc;\n      border-top-color: #0081cc;\n    }\n\n    div.calendar .days {\n      width: 100%;\n      align-items: center;\n      justify-content: center;\n      display: flex;\n      font-size: inherit;\n    }\n\n    table {\n      border-spacing: 0;\n    }\n\n    th, td {\n      text-align: center;\n      position: relative;\n      font-weight: normal;\n    }\n\n    th {\n      color: #333;\n    }\n\n    tr > td.disabled {\n      color: #999999;\n      text-decoration: line-through;\n      cursor: not-allowed;\n    }\n\n    tr > td.range {\n      background-color: #ebf4f8;\n      border-color: transparent;\n    }\n\n    tr > td.active, tr > td.active:hover {\n      border-radius: 4px;\n      background-color: #0081cc !important;\n      color: white;\n    }\n\n    tr > td:hover, .control-bar .material-icons:hover {\n      background-color: #eeeeee !important;\n      border-radius: 4px;\n    }\n\n    .date {\n      width: 30px;\n      height: 30px;\n      text-align: center;\n      line-height: 30px;\n    }\n\n    .cancelArea {\n      position: fixed;\n      width: 100vw;\n      height: 100vh;\n      top: 0;\n      left: 0;\n      z-index: 9;\n    }\n\n    .pointer {\n      cursor: pointer;\n    }\n\n    .pull-left {\n      float: left !important;\n    }\n  "],
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    NgDatepickerComponent.ctorParameters = function () { return []; };
    NgDatepickerComponent.propDecorators = {
        "width": [{ type: core_1.Input },],
        "initDate": [{ type: core_1.Input },],
        "isHidden": [{ type: core_1.Input },],
        "defaultShow": [{ type: core_1.Input },],
        "minDate": [{ type: core_1.Input },],
        "maxDate": [{ type: core_1.Input },],
        "disabledDates": [{ type: core_1.Input },],
        "availableDates": [{ type: core_1.Input },],
        "displayDateType": [{ type: core_1.Input },],
        "quickDateBars": [{ type: core_1.Input },],
        "selectedQuickDateBar": [{ type: core_1.Input },],
        "daysOfWeekDisabled": [{ type: core_1.Input },],
        "language": [{ type: core_1.Input },],
        "placeholder": [{ type: core_1.Input },],
        "offset": [{ type: core_1.Input },],
        "datePickerBox": [{ type: core_1.ViewChild, args: ['datePickerBox',] },],
        "ngModelChange": [{ type: core_1.Output },],
        "onDocumentClick": [{ type: core_1.HostListener, args: ['document:click', ['$event'],] },],
    };
    return NgDatepickerComponent;
}());
exports.NgDatepickerComponent = NgDatepickerComponent;
var Day = (function () {
    function Day(date, num, isHoliday, isInMonth, isSelected, isInRange, isDisabled, year, month) {
        this.date = date;
        this.num = num;
        this.isHoliday = isHoliday;
        this.isInMonth = isInMonth;
        this.isSelected = isSelected;
        this.isInRange = isInRange;
        this.isDisabled = isDisabled;
        this.year = year;
        this.month = month;
    }
    return Day;
}());
exports.Day = Day;
var SelectedDate = (function () {
    function SelectedDate(year, month, day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }
    return SelectedDate;
}());
exports.SelectedDate = SelectedDate;
//# sourceMappingURL=ng-datepicker.component.js.map
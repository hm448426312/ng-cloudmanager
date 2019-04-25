"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var _ = require("lodash");
var tip_service_1 = require("../tip/tip.service");
var TableNewComponent = (function () {
    function TableNewComponent(tipService, cdr) {
        this.tipService = tipService;
        this.cdr = cdr;
        this.radioName = Math.random().toString();
        this.nowSort = {};
        this.allCheck = {
            checked: false,
        };
        this.expandAllFlag = false;
        this.defaultShowFilterDropIndex = -1;
        this.checkEvent = new core_1.EventEmitter();
        this.radioEvent = new core_1.EventEmitter();
        this.expandAllEvent = new core_1.EventEmitter();
        this.expandItemEvent = new core_1.EventEmitter();
        this.sortEvent = new core_1.EventEmitter();
        this.filterToggleEvent = new core_1.EventEmitter();
    }
    Object.defineProperty(TableNewComponent.prototype, "headers", {
        get: function () {
            return this._headers;
        },
        set: function (v) {
            this._headers = _.cloneDeep(v || []);
            this.filterDrop = [];
            for (var i = 0; i < this.headers.length; i++) {
                var temp = {
                    show: false
                };
                if (this.headers[i].filter) {
                    if (this.headers[i].filter.type == 'text') {
                        temp.searchModel = this.headers[i].filter.defaultText == null ? '' :
                            this.headers[i].filter.defaultText;
                        if (this.headers[i].filter.defaultText &&
                            this.headers[i].filter.defaultText.trim().length > 0) {
                            this.headers[i].filter.hasFilter = true;
                        }
                        if (this.headers[i].filter.showFilterDrop) {
                            this.defaultShowFilterDropIndex = i;
                        }
                    }
                    else if (this.headers[i].filter.type == 'checkList') {
                        var allCheckFlag = true;
                        for (var j = 0; j < this.headers[i].filter.optionList.length; j++) {
                            this.headers[i].filter.optionList[j].index = i;
                            if (!this.headers[i].filter.optionList[j].checked) {
                                allCheckFlag = false;
                            }
                        }
                        this.headers[i].filter.filterAllCheck = {
                            checked: allCheckFlag,
                            header: this.headers[i]
                        };
                    }
                    else if (this.headers[i].filter.type == 'radio') {
                        var defaultRadio = this.headers[i].filter.defaultRadio || null;
                        for (var j = 0; j < this.headers[i].filter.optionList.length; j++) {
                            var theI = this.headers[i].filter.optionList[j];
                            if (defaultRadio && defaultRadio['id'] == theI['id']) {
                                theI.checked = true;
                                this.headers[i].filter.hasFilter = true;
                            }
                            else {
                                theI.checked = false;
                            }
                        }
                    }
                }
                if (this.headers[i].canSort && this.headers[i].defaultSort) {
                    this.nowSort.field = this.headers[i].field;
                    this.nowSort.sort = this.headers[i].defaultSort;
                }
                this.filterDrop.push(temp);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableNewComponent.prototype, "datas", {
        get: function () {
            return this._datas;
        },
        set: function (v) {
            if (!v) {
                v = [];
            }
            var temp = _.cloneDeep(v);
            this.allCheckFlag = true;
            this.initDatas(temp);
            this._datas = temp;
        },
        enumerable: true,
        configurable: true
    });
    TableNewComponent.prototype.ngOnInit = function () {
    };
    TableNewComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.defaultShowFilterDropIndex !== -1) {
                var index = 0;
                if (_this.options && _this.options.checkbox) {
                    index++;
                }
                if (_this.options && _this.options.showIndex) {
                    index++;
                }
                // this.tableHead.nativeElement
                var head = _this.tableHead;
                var box = head.nativeElement.children[_this.defaultShowFilterDropIndex + index];
                var filterIcon_1 = box.getElementsByClassName('table-filter-icon');
                if (filterIcon_1 && filterIcon_1.length > 0) {
                    filterIcon_1 = filterIcon_1[0];
                }
                setTimeout(function () {
                    _this.showFilterDrop(_this.defaultShowFilterDropIndex, { target: filterIcon_1 });
                }, 100);
            }
        }, 10);
    };
    TableNewComponent.prototype.initAllCheckStatus = function (checked, source) {
        this.allCheck.checked = checked;
        var tmpArr = source || this.datas;
        if (tmpArr && tmpArr.length > 0) {
            for (var i = 0; i < tmpArr.length; i++) {
                var dataI = tmpArr[i];
                if (dataI.checkModel && !dataI.readonly) {
                    dataI.checkModel.checked = checked;
                }
                if (dataI.children && dataI.children.length > 0) {
                    this.initAllCheckStatus(checked, dataI.children);
                }
            }
        }
        this.cdr.detectChanges();
    };
    TableNewComponent.prototype.calcTheadPadding = function () {
        var userAgent = navigator.userAgent;
        var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; //判断是否IE<11浏览器
        var isEdge = userAgent.indexOf('Edge') > -1 && !isIE; //判断是否IE的Edge浏览器
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
        var isFF = userAgent.indexOf('Firefox') > -1;
        if (isIE || isEdge || isIE11 || isFF) {
            return '18px';
        }
        else {
            return '8px';
        }
    };
    TableNewComponent.prototype.calcBodyHeight = function (height) {
        var temp = height;
        if (!height) {
            return '';
        }
        if (temp.indexOf('px') != -1) {
            temp = parseInt(temp.slice(0, temp.indexOf('px')));
        }
        if (temp - 40 <= 0) {
            return temp + 'px';
        }
        else {
            return (temp - 40) + 'px';
        }
    };
    TableNewComponent.prototype.deleteDefaultFilter = function (filed) {
        if (!this.headers || !filed) {
            return;
        }
        for (var i = 0; i < this.headers.length; i++) {
            var theI = this.headers[i];
            if (theI.field == filed) {
                if (theI.filter.type == 'text') {
                    if (theI.filter.defaultText) {
                        delete theI.filter.defaultText;
                    }
                    this.filterDrop[i].searchModel = '';
                    theI.filter.hasFilter = false;
                    break;
                }
                else if (theI.filter.type == 'checkList') {
                    theI.filter.hasFilter = false;
                    for (var j = 0; j < theI.filter.optionList.length; j++) {
                        theI.filter.optionList[j].index = i;
                        theI.filter.optionList[j].checked = true;
                    }
                    theI.filter.filterAllCheck = {
                        checked: true,
                        header: this.headers[i]
                    };
                }
            }
        }
    };
    TableNewComponent.prototype.onDocumentClick = function (ev) {
        this.hideFilterDrop();
    };
    TableNewComponent.prototype.sort = function (header) {
        var _this = this;
        if (!header.canSort) {
            return;
        }
        if (this.nowSort.field == header.field) {
            if (this.nowSort.sort == 'desc') {
                this.nowSort.sort = 'asc';
            }
            else if (this.nowSort.sort == 'asc') {
                this.nowSort.sort = '';
            }
            else {
                this.nowSort.sort = 'desc';
            }
        }
        else {
            this.nowSort.field = header.field;
            this.nowSort.sort = 'desc';
        }
        if (this.sortEvent.observers.length) {
            this.sortEvent.emit(this.nowSort);
        }
        else {
            if (this.nowSort.sort) {
                this.datas.sort(function (a, b) {
                    var result = _this.nowSort.sort === 'asc' ? a[_this.nowSort.field] > b[_this.nowSort.field] : b[_this.nowSort.field] > a[_this.nowSort.field];
                    return result ? 1 : 0;
                });
            }
        }
    };
    TableNewComponent.prototype.hideFilterDrop = function () {
        var index;
        for (var i = 0; i < this.filterDrop.length; i++) {
            if (this.filterDrop[i].show) {
                index = i;
            }
            this.filterDrop[i].show = false;
        }
        if (index !== undefined) {
            this.filterToggleEvent.emit({
                index: index,
                showFilter: false
            });
        }
    };
    TableNewComponent.prototype.filterCheckAllEvent = function (ev) {
        var listArr = ev.header.filter.optionList;
        for (var i = 0; i < listArr.length; i++) {
            listArr[i].checked = ev.checked;
        }
    };
    TableNewComponent.prototype.filterRadioCheckEvent = function (ev, header) {
        var list = [];
        if (header.filter) {
            if (header.filter.optionList) {
                list = header.filter.optionList;
            }
        }
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var item = list_1[_i];
            if (ev.id == item.id) {
                item.checked = true;
            }
            else {
                item.checked = false;
            }
        }
    };
    TableNewComponent.prototype.filterCheckItemEvent = function (ev) {
        if (!ev.checked) {
            this.headers[ev.index].filter.filterAllCheck.checked = false;
        }
        else {
            var list = this.headers[ev.index].filter.optionList;
            var flag = true;
            for (var i = 0; i < list.length; i++) {
                if (!list[i].checked) {
                    flag = false;
                    break;
                }
            }
            if (!flag) {
                this.headers[ev.index].filter.filterAllCheck.checked = false;
            }
            else {
                this.headers[ev.index].filter.filterAllCheck.checked = true;
            }
        }
    };
    TableNewComponent.prototype.showFilterDrop = function (index, ev) {
        if (ev.stopPropagation) {
            ev.stopPropagation();
        }
        this.dropLeft = ev.target.offsetLeft;
        if (this.filterDrop[index] && this.filterDrop[index].show) {
            this.filterDrop[index].show = false;
        }
        else {
            for (var i = 0; i < this.filterDrop.length; i++) {
                this.filterDrop[i].show = false;
            }
            this.filterDrop[index].show = true;
        }
        if (this.filterDrop[index].searchModel !== undefined) {
            var sibling_1 = ev.target.nextElementSibling;
            while (!sibling_1.classList.contains('table-filter-drop')) {
                sibling_1 = sibling_1.nextElementSibling;
            }
            setTimeout(function () {
                var inputs = sibling_1.getElementsByTagName('input');
                inputs && inputs.length > 0 && inputs[0].focus();
            }, 10);
        }
        this.filterToggleEvent.emit({
            index: index,
            showFilter: this.filterDrop[index].show
        });
    };
    TableNewComponent.prototype.clickFilter = function (ev, header, index) {
        var _this = this;
        var val = _.trim(ev.target.value);
        var execute = function () {
            if (header.filter.fn && val) {
                header.filter.fn(val);
            }
            if (val) {
                header.filter.hasFilter = true;
            }
            else {
                header.filter.hasFilter = false;
            }
            ev.target.blur();
            _this.hideFilterDrop();
        };
        if (header.filter.selfCheck) {
            var filterPromise = header.filter.selfCheck(val);
            filterPromise.then(function (res) {
                if (res) {
                    execute();
                }
            });
        }
        else {
            execute();
        }
    };
    TableNewComponent.prototype.checkEmpty = function (ev, header, index) {
        var val = _.trim(ev);
        if (val == '' && header.filter.fn) {
            header.filter.fn(val);
            header.filter.hasFilter = false;
        }
    };
    TableNewComponent.prototype.calcPaddingLeft = function (header, row) {
        // header.isGroup && (row.deep*20 + 7) + 'px'
        if (header.isGroup) {
            if (row.isParent) {
                return (row.deep * 20 + 7) + 'px';
            }
            else {
                return (row.deep * 20 + 27) + 'px';
            }
        }
        else {
            return '7px';
        }
    };
    TableNewComponent.prototype.clearRadioCheckOption = function (ev, header, list) {
        for (var i = 0; i < list.length; i++) {
            list[i].checked = false;
        }
    };
    TableNewComponent.prototype.sendRadioCheckOption = function (ev, header, list) {
        var res = null;
        if (header.filter.fn) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].checked) {
                    res = list[i];
                    break;
                }
            }
            header.filter.fn(res);
        }
        if (res) {
            header.filter.hasFilter = true;
        }
        else {
            header.filter.hasFilter = false;
        }
        this.hideFilterDrop();
    };
    TableNewComponent.prototype.sendCheckOption = function (ev, header, list) {
        var res = [];
        if (header.filter.fn) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].checked) {
                    res.push(list[i]);
                }
            }
            header.filter.fn(res);
        }
        if (res.length === list.length) {
            header.filter.hasFilter = false;
        }
        else {
            header.filter.hasFilter = true;
        }
        this.hideFilterDrop();
    };
    TableNewComponent.prototype.insertData = function (datas, parent, index) {
        var parentChildren;
        if (parent) {
            if (!parent.children) {
                parent.children = [];
                parent.isParent = true;
            }
            if (!parent.expanded) {
                parent.expanded = true;
                parent.expand = true;
            }
            else {
                if (!parent.expand) {
                    parent.expand = true;
                }
            }
            parentChildren = parent.children;
        }
        else {
            parentChildren = this.datas;
        }
        this.initDatas(datas, parent);
        if (index !== undefined) {
            parentChildren.splice.apply(parentChildren, [index, 0].concat(datas));
        }
        else {
            for (var i = 0; i < datas.length; i++) {
                parentChildren.push(datas[i]);
            }
        }
    };
    TableNewComponent.prototype.deleteDataByKey = function (key, val) {
        var item = this.findItemByKey(key, val);
        if (!item) {
            return false;
        }
        var parent = this.findParentByKey(key, val);
        if (parent) {
            parent = parent.children;
        }
        else {
            parent = this.datas;
        }
        for (var i = 0; i < parent.length; i++) {
            if (parent[i][key] == val) {
                parent.splice(i, 1);
                break;
            }
        }
    };
    TableNewComponent.prototype.updateDataByKey = function (key, val, data) {
        var item = this.findItemByKey(key, val);
        if (!item || _.isEmpty(data)) {
            return false;
        }
        for (var d in data) {
            if (d !== 'children') {
                item[d] = data[d];
            }
        }
    };
    TableNewComponent.prototype.checkedDataByIndex = function (index, checked) {
        this.datas[index].checked = checked;
        this.datas[index].checkModel.checked = checked;
        var allCheckFlag = true;
        var readonlyL = 0;
        for (var i = 0; i < this.datas.length; i++) {
            var dataI = this.datas[i];
            if (dataI.readonly) {
                readonlyL++;
            }
            else {
                if (!dataI.checkModel || !dataI.checkModel.checked) {
                    allCheckFlag = false;
                }
            }
        }
        if (readonlyL == this.datas.length - 1) {
            allCheckFlag = false;
        }
        this.allCheck.checked = allCheckFlag;
    };
    TableNewComponent.prototype.initDatas = function (datas, parent) {
        var checked = this.allCheck.checked;
        var readonlyL = 0;
        for (var i = 0; i < datas.length; i++) {
            if (datas[i].readonly) {
                readonlyL++;
                datas[i].checkModel = {
                    checked: false,
                    index: i,
                };
            }
            else {
                if (!datas[i].checked) {
                    this.allCheckFlag = false;
                }
                datas[i].checkModel = {
                    checked: datas[i].checked === undefined ? checked : datas[i].checked,
                    index: i,
                };
            }
            datas[i].checkOption = {
                disabled: datas[i].readonly
            };
            if (parent) {
                datas[i].deep = parent.deep + 1;
            }
            else {
                datas[i].deep = 0;
            }
            if (datas[i].children && datas[i].children.length > 0) {
                if (this.expandAllFlag) {
                    datas[i].expand = true;
                }
                datas[i].expanded = true;
                this.initDatas(datas[i].children, datas[i]);
            }
        }
        if (this.allCheckFlag && datas && datas.length > 0 && readonlyL !== datas.length && this.options && this.options.checkbox) {
            this.allCheck.checked = true;
        }
        else {
            this.allCheck.checked = false;
        }
    };
    TableNewComponent.prototype.expandAll = function (header, ev) {
        var target = ev.target;
        if (header.expand) {
            this.expandAllFlag = false;
            header.expand = false;
        }
        else {
            this.expandAllFlag = true;
            header.expand = true;
        }
        this.expandAllEvent.emit({
            expand: header.expand,
            header: header,
        });
    };
    TableNewComponent.prototype.expandItem = function (header, data, ev) {
        var flag = true;
        if (data.expanded) {
            flag = false;
        }
        else {
            data.expanded = true;
        }
        if (data.expand) {
            data.expand = false;
        }
        else {
            data.expand = true;
        }
        flag && this.expandItemEvent.emit({
            expand: data.expand,
            header: header,
            parent: data,
        });
    };
    TableNewComponent.prototype.checkRows = function (datas, check) {
        for (var i = 0; i < datas.length; i++) {
            var dataI = datas[i];
            if (!dataI.readonly) {
                dataI.checkModel.checked = check;
            }
            if (dataI.children && dataI.children.length > 0) {
                this.checkRows(dataI.children, check);
            }
        }
    };
    TableNewComponent.prototype.deepGetAllChecked = function (source, result) {
        for (var i = 0; i < source.length; i++) {
            var dataI = source[i];
            if (dataI.checkModel.checked && !dataI.readonly) {
                result.push(dataI);
            }
            if (dataI.children && dataI.children.length > 0) {
                this.deepGetAllChecked(dataI.children, result);
            }
        }
    };
    TableNewComponent.prototype.allCheckEvent = function (ev) {
        this.checkRows(this.datas, ev.checked);
        var checkedArr = [];
        if (ev.checked) {
            this.deepGetAllChecked(this.datas, checkedArr);
        }
        this.checkEvent.emit({
            type: 'all',
            data: this.datas,
            checked: _.cloneDeep(checkedArr),
        });
    };
    TableNewComponent.prototype.deepCheckBoxChange = function (checkedArr, source, flag) {
        for (var i = 0; i < source.length; i++) {
            var dataI = source[i];
            if (!dataI.checkModel.checked && !dataI.readonly) {
                flag.allCheck = false;
            }
            else if (dataI.checkModel.checked && !dataI.readonly) {
                checkedArr.push(dataI);
            }
            var keyId = (this.options && this.options.keyId) || 'id';
            if (dataI.children && dataI.children.length > 0) {
                this.deepCheckBoxChange(checkedArr, dataI.children, flag);
            }
        }
    };
    TableNewComponent.prototype.deepUnCheck = function (source, expRow) {
        var keyId = (this.options && this.options.keyId) || 'id';
        for (var i = 0; i < source.length; i++) {
            var dataI = source[i];
            if (!dataI.readonly && dataI[keyId] != expRow[keyId]) {
                dataI.checkModel.checked = false;
            }
            if (dataI.children && dataI.children.length > 0) {
                this.deepUnCheck(dataI.children, expRow);
            }
        }
    };
    TableNewComponent.prototype.checkBoxChange = function (ev, row) {
        if (this.options && this.options.multiple) {
            var flag = {
                allCheck: true
            };
            var checkedArr = [];
            this.deepCheckBoxChange(checkedArr, this.datas, flag);
            if (flag.allCheck) {
                this.allCheck.checked = true;
            }
            else {
                this.allCheck.checked = false;
            }
            this.checkEvent.emit({
                type: 'single',
                data: row,
                checked: _.cloneDeep(checkedArr),
            });
        }
        else {
            var checkedItem = null;
            if (ev.checked) {
                checkedItem = row;
            }
            this.deepUnCheck(this.datas, row);
            this.checkEvent.emit({
                type: 'single',
                data: row,
                checked: _.cloneDeep(checkedItem)
            });
        }
    };
    TableNewComponent.prototype._findItemByKey = function (key, val, datas) {
        for (var i = 0; i < datas.length; i++) {
            if (datas[i][key] == val) {
                return datas[i];
            }
            else {
                if (datas[i].children && datas[i].children.length > 0) {
                    var res = this._findItemByKey(key, val, datas[i].children);
                    if (res) {
                        return res;
                    }
                }
            }
        }
    };
    TableNewComponent.prototype._findParentsByItem = function (result, key, val, datas) {
        for (var i = 0; i < datas.length; i++) {
            var theI = datas[i];
            if (theI[key] == val) {
                result.push(theI);
                return theI;
            }
            if (theI.children && theI.children.length > 0) {
                var res = this._findParentsByItem(result, key, val, theI.children);
                if (res) {
                    result.push(theI);
                    return res;
                }
            }
        }
    };
    TableNewComponent.prototype._findParentByKey = function (key, val, datas, parent) {
        for (var i = 0; i < datas.length; i++) {
            var theI = datas[i];
            if (theI[key] == val) {
                return parent;
            }
            if (theI.children && theI.children.length > 0) {
                var res = this._findParentByKey(key, val, theI.children, theI);
                if (res) {
                    return res;
                }
            }
        }
    };
    TableNewComponent.prototype.findParentsByKey = function (key, val) {
        var result = [];
        this._findParentsByItem(result, key, val, this.datas);
        return result;
    };
    TableNewComponent.prototype.findParentByKey = function (key, val) {
        return this._findParentByKey(key, val, this.datas);
    };
    TableNewComponent.prototype.findItemByKey = function (key, val) {
        if (this.datas && this.datas.length > 0) {
            return this._findItemByKey(key, val, this.datas);
        }
        else {
            return null;
        }
    };
    TableNewComponent.prototype.getCheckedsItem = function () {
        var result = [];
        if (!this.datas) {
            return result;
        }
        this.getCheckedsItemByDatas(result, this.datas);
        return result;
    };
    TableNewComponent.prototype.getCheckedsItemByDatas = function (result, source) {
        for (var i = 0; i < source.length; i++) {
            var theI = source[i];
            if (theI.checkModel && theI.checkModel.checked) {
                result.push(theI);
            }
            if (theI.children && theI.children.length > 0) {
                this.getCheckedsItemByDatas(result, theI.children);
            }
        }
    };
    TableNewComponent.prototype.toggleItemByItem = function (item) {
        if (item.isParent) {
            // 是否有子节点
            if (item.expanded) {
                // 是否展开过
                if (!item.expand) {
                    // 是否展开状态
                    item.expand = true;
                }
                else {
                    item.expand = false;
                }
            }
            else {
                item.expanded = true;
                item.expand = true;
                var header = void 0;
                for (var i = 0; i < this.headers.length; i++) {
                    if (this.headers[i].isGroup) {
                        header = this.headers[i];
                    }
                }
                this.expandItemEvent.emit({
                    expand: item.expand,
                    header: header,
                    parent: item,
                });
            }
        }
    };
    TableNewComponent.prototype.dateChangeEvent = function (ev, filter, type) {
        if (!filter.result) {
            filter.result = {};
        }
        if (type === 'start') {
            filter.result['start'] = ev.date.toString() === 'Invalid Date' ? '' : ev.date;
        }
        else if (type === 'end') {
            filter.result['end'] = ev.date.toString() === 'Invalid Date' ? '' : ev.date;
        }
        else {
            filter.result['date'] = ev.date.toString() === 'Invalid Date' ? '' : ev.date;
        }
    };
    TableNewComponent.prototype.checkDate = function (filter) {
        if (filter.result && filter.result['start'] && filter.result['end']) {
            if (new Date(filter.result['end']).getTime() < new Date(filter.result['start']).getTime()) {
                return false;
            }
        }
        return true;
    };
    TableNewComponent.prototype.sendDateCheckEvent = function (ev, filter, header) {
        var result = null;
        var hasFilter = false;
        if (filter.result) {
            result = {};
            if (filter.result.start) {
                hasFilter = true;
                result['start'] = filter.result.start;
            }
            if (filter.result.end) {
                hasFilter = true;
                result['end'] = filter.result.end;
            }
            if (filter.result.date) {
                hasFilter = true;
                result['date'] = filter.result.date;
            }
            if (!this.checkDate(filter)) {
                this.tipService.show({
                    type: 'error',
                    title: '开始时间不能大于结束时间'
                });
                return false;
            }
        }
        header.filter.hasFilter = hasFilter;
        if (filter.fn) {
            filter.fn(result);
        }
        this.hideFilterDrop();
    };
    TableNewComponent.prototype.raDioChange = function (ev, row) {
        this.checkEvent.emit({
            type: 'single',
            data: row,
            checked: _.cloneDeep(row)
        });
    };
    TableNewComponent.prototype.clearValue = function (ev, filter, header) {
        filter.searchModel = '';
        if (header.filter.fn) {
            header.filter.fn('');
            header.filter.hasFilter = false;
        }
        ev.target.parentElement.children[0].focus();
    };
    TableNewComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-table-new',
                    template: "\n    <div class=\"table-box\">\n      <div #tableHead class=\"table-head\" [style.padding-right]=\"calcTheadPadding()\">\n        <div *ngIf=\"options && options.checkbox\" class=\"table-head-th table-checkbox\">\n          <dc-checkbox *ngIf=\"options?.multiple && !options?.hideAllCheck\" [checkModel]=\"allCheck\"\n                       (checkboxChangeEvent)=\"allCheckEvent($event)\"></dc-checkbox>\n        </div>\n        <div *ngIf=\"options && options.showIndex\" class=\"table-head-th table-index\">\n          <span>\u5E8F\u53F7</span>\n        </div>\n        <div class=\"table-head-th\" *ngFor=\"let header of headers;let i = index;\" [title]=\"header.hideTitle?'':header.title\"\n             [style.width]=\"header.width\" [style.min-width]=\"header.width\"\n             [style.flex-grow]=\"header.flex\" [style.text-align]=\"header.alignTh\">\n          <div class=\"table-head-th-inner\">\n            <span *ngIf=\"header.isGroup && !header.hideHeaderGroup\" (click)=\"expandAll(header, $event)\" class=\"table-expand\"\n                  [class.table-expanded]=\"expandAllFlag\"></span>\n            <span style=\"overflow: hidden; text-overflow: ellipsis; white-space: nowrap;\">{{header.title}}</span>\n            <span class=\"table-filter-icon\" [class.has-filter]=\"header.filter?.hasFilter\" *ngIf=\"header.filter\"\n                  (click)=\"showFilterDrop(i, $event)\"></span>\n            <div *ngIf=\"header.canSort\" class=\"table-th-sort\" (click)=\"sort(header)\"\n                 [ngClass]=\"{'asc':nowSort.field==header.field && nowSort.sort=='asc','desc':nowSort.field==header.field && nowSort.sort=='desc'}\">\n            </div>\n            <div class=\"table-filter-drop\" *ngIf=\"header.filter\" [class.filter-date-drop]=\"header.filter.type === 'date'\"\n                 [class.filter-radio-drop]=\"header.filter.type === 'radio'\" [class.show-filter-drop]=\"filterDrop && filterDrop[i]?.show\"\n                 (click)=\"$event.stopPropagation()\" [style.left]=\"dropLeft + 'px'\" [class.offset-left]=\"header.filter.offset == 'left'\"\n                 [class.offset-right]=\"header.filter.offset == 'right'\">\n              <div style=\"padding: 5px 10px; font-weight: normal;\">\n                <ng-container [ngTemplateOutlet]=\"filterTemplate\"\n                              [ngTemplateOutletContext]=\"{$implicit: {header: header, index: i, filter: filterDrop[i]}}\"></ng-container>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div *ngIf=\"!options?.loading && datas && datas.length > 0\" class=\"table-body\"\n           [style.max-height]=\"options && calcBodyHeight(options.maxHeight)\"\n           [style.min-height]=\"options && calcBodyHeight(options.minHeight)\">\n        <ng-container [ngTemplateOutlet]=\"tableBodyTemplate\"\n                      [ngTemplateOutletContext]=\"{$implicit: datas}\"></ng-container>\n      </div>\n      <div *ngIf=\"(!datas || datas.length == 0) && !options?.loading\" class=\"table-body\"\n           [style.max-height]=\"options && calcBodyHeight(options.maxHeight)\"\n           [style.min-height]=\"options && calcBodyHeight(options.minHeight)\">\n        <div style=\"text-align: center; height: 80px; line-height: 80px; font-size: 14px;\">\u6682\u65E0\u6570\u636E</div>\n      </div>\n      <div *ngIf=\"options?.loading && (datas || datas.length == 0)\" class=\"table-body\"\n           [style.max-height]=\"options && calcBodyHeight(options.maxHeight)\"\n           [style.min-height]=\"options && calcBodyHeight(options.minHeight)\">\n        <div style=\"text-align: center; height: 80px; line-height: 80px; font-size: 14px;\">Loading......</div>\n      </div>\n    </div>\n    <ng-template #filterTemplate let-data>\n      <div *ngIf=\"data.header.filter.type === 'radio'\" class=\"filter-box\" title=\"\">\n        <div style=\"overflow: auto; max-height: 150px;\" [style.max-height]=\"data.header.filter.option?.maxHeight\">\n          <dc-radio (checked)=\"filterRadioCheckEvent($event, data.header)\" [radioData]=\"data.header.filter?.optionList || []\"\n                    [options]=\"data.header.filter?.option\" [defaultData]=\"data.header.filter?.defaultRadio\"></dc-radio>\n        </div>\n        <!--<ul style=\"overflow: auto; max-height: 150px;\" [style.max-height]=\"data.header.filter.option?.maxHeight\">\n          <ng-container *ngFor=\"let list of data.header.filter.optionList;\">\n            <li>\n              <dc-checkbox [checkModel]=\"list\"\n                           [options]=\"{text: (list[data.header.filter.option?.filterKey] || 'name'), width: '100%'}\"\n                           (checkboxChangeEvent)=\"filterCheckItemEvent($event)\"></dc-checkbox>\n            </li>\n          </ng-container>\n        </ul>-->\n        <div style=\"display: flex; justify-content: center; height: 40px; border-top: 1px solid #ccc; margin-top: 5px;\">\n          <dc-button (click)=\"clearRadioCheckOption($event, data.header, data.header.filter.optionList)\"\n                     style=\"margin: 8px 15px 0 0;\" [text]=\"'\u6E05\u9664'\" [type]=\"2\"></dc-button>\n          <dc-button (click)=\"sendRadioCheckOption($event, data.header, data.header.filter.optionList)\" style=\"margin-top: 8px;\"\n                     [text]=\"'\u786E\u5B9A'\"></dc-button>\n        </div>\n      </div>\n      <div *ngIf=\"data.header.filter.type === 'text'\" class=\"filter-box\" title=\"\">\n        <!--<dc-input (dcKeyenter)=\"\"></dc-input>-->\n        <input type=\"text\" (keyup.enter)=\"clickFilter($event, data.header, data.index)\" [(ngModel)]=\"data.filter.searchModel\"\n               (ngModelChange)=\"checkEmpty($event, data.header, data.index)\" [placeholder]=\"data.header.filter?.placeholder || '\u8BF7\u8F93\u5165\u7B5B\u9009\u5185\u5BB9'\">\n        <i [hidden]=\"!data.filter.searchModel\" class=\"clear-input-value\" (click)=\"clearValue($event, data.filter, data.header)\"></i>\n      </div>\n      <div *ngIf=\"data.header.filter.type === 'date'\" class=\"filter-box\" title=\"\">\n        <ng-template [ngIf]=\"data.header.filter.isCross\">\n          <div>\n            <div class=\"flex-box\" style=\"margin-bottom: 5px;\">\n              <span style=\"margin-right: 5px;\">\u5F00\u59CB</span>\n              <dc-date-picker [options]=\"data.header.filter.option\"\n                              (dateChangeEvent)=\"dateChangeEvent($event, data.header.filter, 'start')\"></dc-date-picker>\n            </div>\n            <div class=\"flex-box\">\n              <span style=\"margin-right: 5px;\">\u7ED3\u675F</span>\n              <dc-date-picker [options]=\"data.header.filter.option\"\n                              (dateChangeEvent)=\"dateChangeEvent($event, data.header.filter, 'end')\"></dc-date-picker>\n            </div>\n            <div style=\"display: flex; justify-content: center; height: 40px; border-top: 1px solid #ccc; margin-top: 5px;\">\n              <dc-button [text]=\"'\u786E\u8BA4'\" (click)=\"sendDateCheckEvent($event, data.header.filter, data.header)\" [type]=\"1\"\n                         style=\"margin-top: 8px;\"></dc-button>\n            </div>\n          </div>\n        </ng-template>\n        <ng-template [ngIf]=\"!data.header.filter.isCross\">\n          <div>\n            <div class=\"flex-box\" style=\"margin-bottom: 5px;\">\n              <dc-date-picker [options]=\"data.header.filter.option\"\n                              (dateChangeEvent)=\"dateChangeEvent($event, data.header.filter)\"></dc-date-picker>\n            </div>\n            <div style=\"display: flex; justify-content: center; height: 40px; border-top: 1px solid #ccc; margin-top: 5px;\">\n              <dc-button [text]=\"'\u786E\u8BA4'\" (click)=\"sendDateCheckEvent($event, data.header.filter, data.header)\" [type]=\"1\"\n                         style=\"margin-top: 8px;\"></dc-button>\n            </div>\n          </div>\n        </ng-template>\n      </div>\n      <div *ngIf=\"data.header.filter.type === 'checkList'\" class=\"filter-box\" title=\"\">\n        <ul style=\"overflow: auto; max-height: 150px;\" [style.max-height]=\"data.header.filter.option?.maxHeight\">\n          <li>\n            <dc-checkbox [checkModel]=\"data.header.filter.filterAllCheck\"\n                         [options]=\"{text: '\u5168\u9009', width: '100%'}\" (checkboxChangeEvent)=\"filterCheckAllEvent($event)\"></dc-checkbox>\n          </li>\n          <ng-container *ngFor=\"let list of data.header.filter.optionList;\">\n            <li>\n              <dc-checkbox [checkModel]=\"list\"\n                           [options]=\"{text: (list[data.header.filter.option?.filterKey] || 'name'), width: '100%'}\"\n                           (checkboxChangeEvent)=\"filterCheckItemEvent($event)\"></dc-checkbox>\n            </li>\n          </ng-container>\n        </ul>\n        <div style=\"display: flex; justify-content: center; height: 40px; border-top: 1px solid #ccc; margin-top: 5px;\">\n          <dc-button (click)=\"sendCheckOption($event, data.header, data.header.filter.optionList)\" style=\"margin-top: 8px;\"\n                     [text]=\"'\u786E\u5B9A'\"></dc-button>\n        </div>\n      </div>\n    </ng-template>\n    <ng-template #tableBodyTemplate let-rows>\n      <ng-template ngFor let-row [ngForOf]=\"rows\" let-i=\"index\">\n        <div class=\"table-body-tr\" [class.table-body-tr-checked]=\"row.checkModel?.checked\">\n          <div *ngIf=\"options && options.checkbox && options.multiple\" class=\"table-body-td table-checkbox\">\n            <dc-checkbox [checkModel]=\"row?.checkModel\" [options]=\"row?.checkOption\"\n                         (checkboxChangeEvent)=\"checkBoxChange($event, row)\"></dc-checkbox>\n          </div>\n          <div *ngIf=\"options && options.checkbox && !options.multiple\" class=\"table-body-td table-radiobox\">\n            <label class=\"radioLabel\" [class.radioDisable]=\"row?.readonly\">\n              <input type=\"radio\" [disabled]=\"row?.readonly\" [checked]=\"row?.checkModel?.checked\" (change)=\"raDioChange($event, row)\"\n                     name=\"radio_{{radioName}}\">\n              <div class=\"simulation\"></div>\n            </label>\n          </div>\n          <div *ngIf=\"options && options.showIndex\" class=\"table-body-td table-index\">\n            {{i - 0 + 1 }}\n          </div>\n          <ng-template ngFor let-header [ngForOf]=\"headers\">\n            <div *ngIf=\"!header.isGroup\" [class.overShow]=\"header.overShow\" class=\"table-body-td\" [style.width]=\"header.width\"\n                 [style.min-width]=\"header.width\" [style.flex-grow]=\"header.flex\" [style.text-align]=\"header.alignTd\"\n                 [style.padding-left]=\"calcPaddingLeft(header, row)\">\n              <ng-container [ngTemplateOutlet]=\"cloumnTemplate\"\n                            [ngTemplateOutletContext]=\"{$implicit: {d: row, h: header, i: i}}\"></ng-container>\n            </div>\n            <div *ngIf=\"header.isGroup\" [class.overShow]=\"header.overShow\" class=\"table-body-td\" [style.width]=\"header.width\"\n                 [style.min-width]=\"header.width\" [style.flex-grow]=\"header.flex\" [style.text-align]=\"header.alignTd\"\n                 [style.padding-left]=\"calcPaddingLeft(header, row)\">\n              <span *ngIf=\"row.isParent\" class=\"table-expand\" [class.table-expanded]=\"row.expand\"\n                    (click)=\"expandItem(header, row, $event)\"></span>\n              <ng-container [ngTemplateOutlet]=\"cloumnTemplate\"\n                            [ngTemplateOutletContext]=\"{$implicit: {d: row, h: header}}\"></ng-container>\n            </div>\n          </ng-template>\n        </div>\n        <ng-container *ngIf=\"row.children && row.expand\" [ngTemplateOutlet]=\"tableBodyTemplate\"\n                      [ngTemplateOutletContext]=\"{$implicit: row.children}\"></ng-container>\n      </ng-template>\n    </ng-template>\n  ",
                    styles: ["\n    * {\n      margin: 0;\n      padding: 0;\n    }\n\n    ul, li {\n      list-style: none;\n    }\n\n    .flex-box {\n      display: flex;\n      flex-direction: row;\n      align-items: center;\n    }\n\n    .table-box {\n      position: relative;\n    }\n\n    .table-expand {\n      cursor: pointer;\n      display: inline-block;\n      width: 20px;\n      flex: 0 0 auto;\n      background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBRjI2RjgxNDJCNDYxMUU4QUIxNkRENDdDRTFGOURBRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBRjI2RjgxNTJCNDYxMUU4QUIxNkRENDdDRTFGOURBRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkFGMjZGODEyMkI0NjExRThBQjE2REQ0N0NFMUY5REFGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkFGMjZGODEzMkI0NjExRThBQjE2REQ0N0NFMUY5REFGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+bQubIwAAAFxJREFUeNpiDImI8WRgYJgLxJIMhMFzIE5mIkEDA1TdXCZcGlYvX4xTIxMDGYB+mljw+QFdLDQyFlUTTABZA7oY/f1Etqbn2CRw+QcIXoA0pYAYRFryFJT2AAIMAFsOFXDcTQR2AAAAAElFTkSuQmCC\") no-repeat left center transparent;\n    }\n\n    .table-head-th-inner .table-expand {\n      height: 20px;\n    }\n\n    .table-expanded {\n      background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2OUQ2NjIwMTJCNDYxMUU4OTQyOUNGRTMyODY0NTA2NyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2OUQ2NjIwMjJCNDYxMUU4OTQyOUNGRTMyODY0NTA2NyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjY5RDY2MUZGMkI0NjExRTg5NDI5Q0ZFMzI4NjQ1MDY3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY5RDY2MjAwMkI0NjExRTg5NDI5Q0ZFMzI4NjQ1MDY3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Fve+rwAAAFRJREFUeNpiDImI8WRgYJgLxJIMhMFzIE5mIkEDA1TdXCYSNMA1MjGQAeiniQXGWL18MUHFoZGxqJpgAoPLT2Rrek6inhcgTSkgBpEanoLSHkCAAQDBsw17IO7pLwAAAABJRU5ErkJggg==\") no-repeat left center transparent;\n    }\n\n    .table-box * {\n      box-sizing: border-box;\n    }\n\n    .table-box .table-checkbox,\n    .table-box .table-radiobox {\n      width: 30px;\n      min-width: 30px;\n    }\n\n    .table-radiobox {\n      display: flex;\n      justify-content: center;\n      align-items: center;\n    }\n\n    .table-box .table-index {\n      width: 40px;\n      min-width: 40px;\n      justify-content: center;\n    }\n\n    .table-head, .table-body-tr {\n      width: 100%;\n      display: flex;\n    }\n\n    .table-head {\n      background-color: #fff;\n      border-bottom: 1px solid #ccc;\n    }\n\n    .table-body {\n      min-width: 100px;\n      overflow-y: scroll;\n      overflow-x: hidden;\n    }\n\n    .table-head-th, .table-body-td {\n      flex-grow: 0;\n      height: 50px;\n      line-height: 50px;\n      padding-left: 5px;\n      font-size: 14px;\n      color: #3A3E55;\n      white-space: nowrap;\n      display: flex;\n    }\n\n    .table-head-th {\n      background-color: #fff;\n      border-left: 2px solid #fff;\n      align-items: center;\n      font-weight: bold;\n    }\n\n    .table-head-th-inner {\n      white-space: nowrap;\n      display: flex;\n      position: relative;\n      align-items: center;\n      width: 100%;\n    }\n\n    .table-th-sort {\n      position: relative;\n      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAMBAMAAACtsOGuAAAAHlBMVEUAAABmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmbpCqcMAAAACXRSTlMA5sZkORkGnJnb+QAcAAAAMElEQVQI12NgYDZgYGDwnMLAwCo5MYAhaeZMNYbOmTNnMCBA5cyZ08ESYCVgxWBtAGv8DCictG4/AAAAAElFTkSuQmCC') no-repeat center center;\n      width: 8px;\n      margin-left: 5px;\n      flex: 0 0 auto;\n      cursor: pointer;\n      margin-right: 20px;\n      height: 20px;\n    }\n\n    .table-th-sort.asc {\n      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFBAMAAACKv7BmAAAAG1BMVEUAAABmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZ8aTmeAAAACHRSTlMA5MaZYzkYBjL+0/MAAAAhSURBVAjXY2BgcWBgYIhoZWBgk2hMYCjq6FBnsOjoaAYAMaEFlaDQ04sAAAAASUVORK5CYII=') no-repeat center center;\n    }\n\n    .table-th-sort.desc {\n      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFBAMAAACKv7BmAAAAG1BMVEUAAABmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZ8aTmeAAAACHRSTlMA58acZjkbBtcF5e8AAAAhSURBVAjXY7Do6GhmKOroUGdgk2hMYGCIaGVgYGBxYAAAWCUFlY5P/qEAAAAASUVORK5CYII=') no-repeat center center;\n    }\n\n    .table-filter-icon {\n      position: relative;\n      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOBAMAAAAGUYvhAAAAKlBMVEUAAABmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZY/DOeAAAADXRSTlMA7hHexqWBXTwhA65Xbt8TvwAAAEBJREFUCNdjiL0LAgEMyiDqsgIDB4i+wcDAkAukE4D0krt3rywA0pyydyUZQKD2bgGY5r3LgJfmkWWAAG0GBAAA/oQb9Q1/UEkAAAAASUVORK5CYII=') no-repeat left bottom;\n      width: 13px;\n      height: 14px;\n      cursor: pointer;\n      top: 1px;\n      font-size: 12px;\n      color: #666;\n      font-weight: normal;\n      flex: 0 0 auto;\n      margin-left: 5px;\n    }\n\n    .has-filter {\n      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOCAYAAAD0f5bSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgV2luZG93cyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2QjVCMDc1RDQ4RkQxMUU4QkVBOTgyOUExQkY4MDU0MyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2QjVCMDc1RTQ4RkQxMUU4QkVBOTgyOUExQkY4MDU0MyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZCNUIwNzVCNDhGRDExRThCRUE5ODI5QTFCRjgwNTQzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZCNUIwNzVDNDhGRDExRThCRUE5ODI5QTFCRjgwNTQzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Z/aSswAAAIpJREFUeNpiZGg8s5SBgSGKgXiwjAlIZALxAyI1gNRlgTR9AuJoIP5LQMNfqLqPTFCBY0DcQkBTC1QdAxOSYDMQH8eh4ThUngFd019ogHxC0/AJKv4XmyaYRzPRxLLQA4oRGOTYnPMfRQ0aYGIgAwy8pnAgfkWqplVArAvEq7FJMv7//59k5wEEGACgyx6ML12vzAAAAABJRU5ErkJggg==') no-repeat left bottom;\n    }\n\n    .table-filter-drop {\n      position: absolute;\n      z-index: 10;\n      top: 40px;\n      width: 150px;\n      background: #fff;\n      max-height: 0;\n      visibility: hidden;\n      margin-left: -75px;\n    }\n\n    .table-filter-drop.offset-left {\n      margin-left: -150px;\n    }\n\n    .table-filter-drop.offset-right {\n      margin-left: 0;\n    }\n\n    .table-filter-drop.filter-date-drop {\n      width: 200px;\n      margin-left: -100px;\n    }\n\n    .table-filter-drop.filter-date-drop.offset-left {\n      margin-left: -200px;\n    }\n\n    .table-filter-drop.filter-radio-drop {\n      width: 250px;\n    }\n\n    .table-filter-drop.show-filter-drop {\n      box-shadow: 0 0 2px 1px #ccc;\n      border-radius: 2px;\n      max-height: none;\n      visibility: visible;\n    }\n\n    .table-head .table-head-th:first-child {\n      border-left: none;\n    }\n\n    .table-body .table-body-tr:nth-child(odd) {\n      background-color: #f8f8f8;\n    }\n\n    .table-body .table-body-tr:nth-child(even) {\n      background-color: #ffffff;\n    }\n\n    .table-box .table-body .table-body-tr:hover,\n    .table-box .table-body .table-body-tr-checked {\n      background-color: #edf0f5;\n    }\n\n    .table-body-td {\n      padding-left: 7px;\n      padding-right: 5px;\n      border-bottom: 1px solid #ccc;\n      overflow: hidden;\n    }\n\n    .table-body-td.overShow {\n      overflow: visible;\n    }\n\n    :host /deep/ .table-body-td dc-table-column-new {\n      overflow: hidden;\n    }\n\n    :host /deep/ .table-body-td.overShow dc-table-column-new {\n      overflow: visible;\n    }\n\n    :host /deep/ .table-body-td.overShow dc-table-column-new .table-font {\n      overflow: visible;\n    }\n\n    .filter-box {\n      line-height: normal;\n      position: relative;\n    }\n\n    .filter-box input[type=text],\n    .filter-box input[type=number] {\n      height: 30px;\n      line-height: 30px;\n      border: solid 1px #ccc;\n      padding: 0 30px 0 10px;\n      margin: 0;\n      background: #fff;\n      transition: none;\n      font-weight: normal;\n      color: #666;\n      border-radius: 4px;\n      font-size: 12px;\n      width: 100%;\n    }\n\n    .filter-box input:focus {\n      border-color: #2BB1FF\n    }\n\n    .clear-input-value {\n      position: absolute;\n      right: 8px;\n      top: 0;\n      cursor: pointer;\n      width: 12px;\n      height: 30px;\n      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAOVJREFUKJF90DFKA1EQBuAvj2Cu8MBqe8FokedeQb2A6WzU0uN4gxTbxkM8CKKSfqvAXsAi2lj4dlkh5Icp5p9/Zv6ZSdM0Ck7whDucFW6LFV7wDdNSOMUac/9xVeIet9iFMvmQeIw5XjELeOzFdV2LMQ6qGKO6rvv0HA8By55p21ZKSYxRjFFKSdu2403LKS77rOs6OWcpJZBz1nXduOEiHPF9CD8Bb2PPKSU552HT+CZsg78/g6qqBhu9vaqqxg2rSdM0M+TyhWP4xCJgjxu8HxF/4Br7/ugdEp6xwVeJTeEWReMX1Y9FK/4RDOgAAAAASUVORK5CYII=) no-repeat center center transparent;\n    }\n\n    .clear-input-value:hover {\n      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAAOtJREFUKJF90b1NAzEcBfBfriCVm2vR3S2ABFXYAViADACUjMMGWQCGQIoQWJngrLTXWBSBIhRxooBCnuTCz++9/4dHMUYFJ3jALc4Kt8AMT/iCUTGc4hkXDuMdN1hWJfmYWHl7wbjC/VbcdZ0Qwk4VQtB13fZ6jrsK0y0zDIO2bYUQhBA0TWMYhv1K01GMcVXa2qW2bWu9XkspyTnvG1bVkb4P4bvC29/0vu+llDRN82smLCqbPYO6rvV9L+cs5yylpK7rfcNsFGMc47Vs4RgiJhVWuLb5nP/wgSt7Qy9xiUfM8VnOvHCTovEDCGVJpA/ldQoAAAAASUVORK5CYII=) no-repeat center center transparent;\n    }\n\n    dc-checkbox {\n      display: flex;\n      align-items: center;\n    }\n\n    .table-radiobox .radioLabel {\n      font-size: 12px;\n      cursor: pointer;\n      display: inline-block;\n    }\n\n    .simulation {\n      width: 13px;\n      height: 13px;\n      border: 1px solid #cdcdcd;\n      border-radius: 50%;\n      vertical-align: middle;\n      margin-right: 5px;\n      position: relative;\n    }\n\n    .simulation:after {\n      content: '';\n      width: 6px;\n      height: 6px;\n      background: #0081cc;\n      border-radius: 50%;\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      margin: auto;\n      opacity: 0;\n    }\n\n    label.radioDisable .simulation {\n      opacity: .4 !important;\n    }\n\n    input[type='radio'] {\n      vertical-align: middle;\n      display: none;\n    }\n\n    .radioLabel:hover .simulation {\n      border-color: #0081cc;\n      opacity: 0.5;\n    }\n\n    .radioLabel:hover .simulation:after {\n      opacity: .5;\n    }\n\n    .radioLabel.radioDisable:hover .simulation {\n      border-color: #cdcdcd;\n    }\n\n    .radioLabel.radioDisable:hover .simulation:after {\n      opacity: 0;\n    }\n\n    .radioLabel input[type='radio']:checked + .simulation,\n    .radioLabel:hover input[type='radio']:checked + .simulation {\n      border-color: #0081cc;\n      opacity: 1;\n    }\n\n    .radioLabel input[type='radio']:checked + .simulation:after,\n    .radioLabel:hover input[type='radio']:checked + .simulation:after {\n      opacity: 1;\n    }\n\n    ::-webkit-scrollbar {\n      width: 8px;\n    }\n\n    ::-webkit-scrollbar-track,\n    ::-webkit-scrollbar-thumb {\n      border-radius: 999px;\n      border: 0 solid transparent;\n    }\n\n    ::-webkit-scrollbar-thumb {\n      min-height: 20px;\n      box-shadow: 0 0 0 5px rgba(0, 0, 0, .5) inset;\n      /*box-shadow: 0 0 0 15px rgba(0, 0, 0, .5) inset;*/\n      opacity: 0.2;\n    }\n\n    ::-webkit-scrollbar-corner {\n      background: transparent;\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    TableNewComponent.ctorParameters = function () { return [
        { type: tip_service_1.TipService, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    TableNewComponent.propDecorators = {
        "cloumnTemplate": [{ type: core_1.ContentChild, args: [core_1.TemplateRef,] },],
        "options": [{ type: core_1.Input },],
        "headers": [{ type: core_1.Input },],
        "datas": [{ type: core_1.Input },],
        "checkEvent": [{ type: core_1.Output },],
        "radioEvent": [{ type: core_1.Output },],
        "expandAllEvent": [{ type: core_1.Output },],
        "expandItemEvent": [{ type: core_1.Output },],
        "sortEvent": [{ type: core_1.Output },],
        "filterToggleEvent": [{ type: core_1.Output },],
        "tableHead": [{ type: core_1.ViewChild, args: ['tableHead',] },],
        "onDocumentClick": [{ type: core_1.HostListener, args: ['document:click', ['$event'],] },],
    };
    return TableNewComponent;
}());
exports.TableNewComponent = TableNewComponent;
//# sourceMappingURL=table.new.component.js.map
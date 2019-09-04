"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var _ = require("lodash");
var TreeComponent = (function () {
    function TreeComponent(resolver, router) {
        this.resolver = resolver;
        this.router = router;
        this.clickEvent = new core_1.EventEmitter();
        this.extendEvent = new core_1.EventEmitter();
        this.checkEvent = new core_1.EventEmitter();
        this.treeNoData = false;
        this.tempSearch = [];
    }
    Object.defineProperty(TreeComponent.prototype, "treeDatas", {
        get: function () {
            return this._treeDatas;
        },
        set: function (v) {
            if (this.defaultCheckedNodes && !_.isEmpty(this.defaultCheckedNodes)) {
                this.initCheckNodes(this.defaultCheckedNodes, v);
                this.defaultCheckedNodes = null;
            }
            if (this.defaultSelectedNode && !_.isEmpty(this.defaultSelectedNode)) {
                var selectNode = this.initSelectNode(this.defaultSelectedNode, v);
                this.selectedNode = selectNode;
                this.defaultSelectedNode = null;
            }
            if (this.defaultHalfCheckedNodes && !_.isEmpty(this.defaultHalfCheckedNodes)) {
                this.initHalfCheckNodes(this.defaultHalfCheckedNodes, v);
                this.defaultHalfCheckedNodes = null;
            }
            this._treeDatas = v;
        },
        enumerable: true,
        configurable: true
    });
    TreeComponent.prototype.ngOnInit = function () {
        if (!this.keyId) {
            this.keyId = 'id';
        }
        if (!this.keyName) {
            this.keyName = 'title';
        }
        if (!this.keyChild) {
            this.keyChild = 'subNode';
        }
    };
    TreeComponent.prototype.initHalfCheckNodes = function (checkedNodes, source) {
        for (var i = checkedNodes.length - 1; i >= 0; i--) {
            this._initHalfCheckNodes(checkedNodes[i], source);
        }
    };
    TreeComponent.prototype._initHalfCheckNodes = function (checkedNode, source) {
        for (var j = 0; j < source.length; j++) {
            if (source[j][this.keyId] == checkedNode) {
                source[j].checked = 2;
                return;
            }
            if (source[j][this.keyChild] && source[j][this.keyChild].length > 0) {
                this._initHalfCheckNodes(checkedNode, source[j][this.keyChild]);
            }
        }
    };
    TreeComponent.prototype.initCheckNodes = function (checkedNodes, source) {
        for (var i = checkedNodes.length - 1; i >= 0; i--) {
            this._initCheckNodes(checkedNodes[i], source);
        }
    };
    TreeComponent.prototype._initCheckNodes = function (checkedNode, source) {
        for (var j = 0; j < source.length; j++) {
            if (source[j][this.keyId] == checkedNode) {
                source[j].checked = 1;
                return;
            }
            if (source[j][this.keyChild] && source[j][this.keyChild].length > 0) {
                this._initCheckNodes(checkedNode, source[j][this.keyChild]);
            }
        }
    };
    TreeComponent.prototype.initSelectNode = function (selectNode, source) {
        for (var j = 0; j < source.length; j++) {
            if (source[j][this.keyId] == selectNode[this.keyId]) {
                source[j].selected = true;
                return source[j];
            }
            if (source[j][this.keyChild] && source[j][this.keyChild].length > 0) {
                var res = this.initSelectNode(selectNode, source[j][this.keyChild]);
                if (res) {
                    return res;
                }
            }
        }
    };
    TreeComponent.prototype.clickNode = function (event) {
        var _this = this;
        this.selectTreeNode(event);
        setTimeout(function () {
            _this.defaultSelectedNode = null;
        }, 10);
        if (this.options.unSelect && !event.selected) {
            this.clickEvent.emit(null);
        }
        else {
            this.clickEvent.emit(event);
        }
    };
    TreeComponent.prototype.extendNode = function (event) {
        this.extendEvent.emit(event);
    };
    TreeComponent.prototype.checkNode = function (event) {
        if (this.options && this.options.unLinkage) {
            this.checkEvent.emit(event);
            return false;
        }
        var childs = event[this.keyChild];
        var parents = this.findParentsNodeById(event[this.keyId]);
        if (event.checked) {
            /**
                   * 复选框选中该节点
                   * 1/所有子节点选中
                   * 2/父节点判断
                   *  2.1/父节点为false
                   *    2.1.1/父节点下的所有兄弟节点全部checked  >   父节点为true(继续判断父)
                   */
            childs && this._checkChildrenNode(childs, true);
            this._checkParentNode(parents);
        }
        else {
            /**
                   * 复选框移除该选中状态
                   * 1/所有子节点移除选中状态
                   * 2/父节点判断
                   *  2.1/父节点为true
                   *    2.1.1/父节点改为false（继续判断父）
                   *  2.2/父节点为false
                   *    2.2.1/不做处理
                   */
            childs && this._checkChildrenNode(childs, false);
            this._unCheckParentNode(parents);
        }
        this.checkEvent.emit(event);
    };
    // 移除父节点选中状态
    // 移除父节点选中状态
    TreeComponent.prototype._unCheckParentNode = 
    // 移除父节点选中状态
    function (parents) {
        if (parents.length > 1) {
            // 非根节点
            var parent_1 = parents[1];
            if (parent_1.checked) {
                var brothers = parent_1[this.keyChild];
                var broChecked = false;
                for (var _i = 0, brothers_1 = brothers; _i < brothers_1.length; _i++) {
                    var bro = brothers_1[_i];
                    if (bro.checked === 1 || bro.checked === true || bro.checked === 2) {
                        broChecked = true;
                        break;
                    }
                }
                if (broChecked) {
                    parent_1.checked = 2;
                }
                else {
                    parent_1.checked = 0;
                }
                this._unCheckParentNode(parents.slice(1, parents.length));
            }
        }
    };
    // 判断父节点状态并确认是否选中
    // 判断父节点状态并确认是否选中
    TreeComponent.prototype._checkParentNode = 
    // 判断父节点状态并确认是否选中
    function (parents) {
        if (parents.length > 1) {
            // 非根节点
            var parent_2 = parents[1];
            var brothers = parent_2[this.keyChild];
            var flag = true; // 兄弟节点有一个没有选中，则为false
            var broChecked = false; // 兄弟节点是否有选中的
            var half = false;
            for (var _i = 0, brothers_2 = brothers; _i < brothers_2.length; _i++) {
                var bro = brothers_2[_i];
                if (bro.checked === undefined || bro.checked === false || bro.checked === 2) {
                    if (bro.checked === 2) {
                        half = true;
                    }
                    flag = false;
                }
                else {
                    broChecked = true;
                }
            }
            if (flag) {
                parents[1].checked = 1;
                this._checkParentNode(parents.splice(1, parents.length));
            }
            else {
                if (broChecked || half) {
                    parents[1].checked = 2;
                    this._checkParentNode(parents.splice(1, parents.length));
                }
            }
        }
    };
    // 选中/取消选中子节点
    // 选中/取消选中子节点
    TreeComponent.prototype._checkChildrenNode = 
    // 选中/取消选中子节点
    function (children, checkType) {
        var _this = this;
        var _loop_1 = function (child) {
            child.checked = (checkType && 1);
            if (!checkType && this_1.defaultCheckedNodes) {
                var theIndex = _.findIndex(this_1.defaultCheckedNodes, function (o) {
                    return o == child[_this.keyId];
                });
                if (theIndex != -1) {
                    child.checked = 0;
                    this_1.defaultCheckedNodes.splice(theIndex, 1);
                }
            }
            if (child[this_1.keyChild]) {
                this_1._checkChildrenNode(child[this_1.keyChild], checkType);
            }
        };
        var this_1 = this;
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var child = children_1[_i];
            _loop_1(child);
        }
    };
    // 根据keyId查找节点
    // 根据keyId查找节点
    TreeComponent.prototype._findNodeById = 
    // 根据keyId查找节点
    function (id, source) {
        for (var i = 0; i < source.length; i++) {
            var theI = source[i];
            if (theI[this.keyId] == id) {
                return theI;
            }
            if (theI[this.keyChild]) {
                var res = this._findNodeById(id, theI[this.keyChild]);
                if (res) {
                    return res;
                }
            }
        }
    };
    // 根据名称keyName全匹配查找节点
    // 根据名称keyName全匹配查找节点
    TreeComponent.prototype._findNodeByAllName = 
    // 根据名称keyName全匹配查找节点
    function (result, name, source) {
        for (var i = 0; i < source.length; i++) {
            var theI = source[i];
            if (theI[this.keyName] == name) {
                result.push(theI);
            }
            if (theI[this.keyChild]) {
                this._findNodeByAllName(result, name, theI[this.keyChild]);
            }
        }
    };
    // 根据名称keyName模糊查找节点
    // 根据名称keyName模糊查找节点
    TreeComponent.prototype._findNodeByName = 
    // 根据名称keyName模糊查找节点
    function (result, name, source) {
        for (var i = 0; i < source.length; i++) {
            var theI = source[i];
            if (theI[this.keyName].toLowerCase().indexOf(name.toLowerCase()) != -1) {
                result.push(theI);
            }
            if (theI[this.keyChild]) {
                this._findNodeByName(result, name, theI[this.keyChild]);
            }
        }
    };
    // 获取选中的节点列表
    // 获取选中的节点列表
    TreeComponent.prototype._getCheckedNodes = 
    // 获取选中的节点列表
    function (result, source) {
        for (var _i = 0, source_1 = source; _i < source_1.length; _i++) {
            var item = source_1[_i];
            if (item.checked === 1 || item.checked === true) {
                result.push(item);
            }
            if (item[this.keyChild]) {
                this._getCheckedNodes(result, item[this.keyChild]);
            }
        }
    };
    // 获半选中的节点列表
    // 获半选中的节点列表
    TreeComponent.prototype._getHalfCheckedNodes = 
    // 获半选中的节点列表
    function (result, source) {
        for (var _i = 0, source_2 = source; _i < source_2.length; _i++) {
            var item = source_2[_i];
            if (item.checked === 2) {
                result.push(item);
            }
            if (item[this.keyChild]) {
                this._getHalfCheckedNodes(result, item[this.keyChild]);
            }
        }
    };
    TreeComponent.prototype._getSelectedNodes = function (source) {
        for (var _i = 0, source_3 = source; _i < source_3.length; _i++) {
            var item = source_3[_i];
            if (item.selected) {
                return item;
            }
            if (item[this.keyChild]) {
                var res = this._getSelectedNodes(item[this.keyChild]);
                if (res) {
                    return res;
                }
            }
        }
    };
    // 获取父节点
    // 获取父节点
    TreeComponent.prototype._findParentNodeById = 
    // 获取父节点
    function (id, source, parent) {
        for (var i = 0; i < source.length; i++) {
            var theI = source[i];
            if (theI[this.keyId] == id) {
                return parent;
            }
            if (theI[this.keyChild]) {
                var res = this._findParentNodeById(id, theI[this.keyChild], theI);
                if (res) {
                    return res;
                }
            }
        }
    };
    // 获取父节点链，当前节点为第一个
    // 获取父节点链，当前节点为第一个
    TreeComponent.prototype._findParentsNodeById = 
    // 获取父节点链，当前节点为第一个
    function (result, id, source) {
        for (var i = 0; i < source.length; i++) {
            var theI = source[i];
            if (theI[this.keyId] == id) {
                result.push(theI);
                return theI;
            }
            if (theI[this.keyChild]) {
                var res = this._findParentsNodeById(result, id, theI[this.keyChild]);
                if (res) {
                    result.push(theI);
                    return res;
                }
            }
        }
    };
    // 获取子节点列表格式
    // 获取子节点列表格式
    TreeComponent.prototype._findChildrensNodeByNode = 
    // 获取子节点列表格式
    function (result, source) {
        result.push(source);
        if (source[this.keyChild]) {
            for (var i = 0; i < source[this.keyChild].length; i++) {
                this._findChildrensNodeByNode(result, source[this.keyChild][i]);
            }
        }
    };
    // 匹配搜索
    // 匹配搜索
    TreeComponent.prototype._matchSearchNodesByKey = 
    // 匹配搜索
    function (result, val, key, source) {
        for (var i = 0; i < source.length; i++) {
            var theI = source[i];
            if (theI[key] == val) {
                result.push(source[i]);
            }
            if (theI[this.keyChild]) {
                this._matchSearchNodesByKey(result, val, key, theI[this.keyChild]);
            }
        }
    };
    // 模糊搜索
    // 模糊搜索
    TreeComponent.prototype._fuzzySearchNodesByKey = 
    // 模糊搜索
    function (result, val, key, source, findFlag) {
        var hasFlag = false;
        for (var i = 0; i < source.length; i++) {
            var theI = source[i];
            if (theI[key].toLowerCase().indexOf(val.toLowerCase()) != -1) {
                result.push(source[i]);
                theI.isHide = false;
                hasFlag = true;
            }
            else {
                if (!theI[this.keyChild]) {
                    theI.isHide = true;
                }
            }
            if (theI[this.keyChild]) {
                var flag = {
                    hasFlag: true
                };
                this._fuzzySearchNodesByKey(result, val, key, theI[this.keyChild], flag);
                if (!flag.hasFlag && theI.isHide === undefined) {
                    theI.isHide = true;
                }
                else {
                    hasFlag = true;
                    theI.show = true;
                }
            }
        }
        if (findFlag) {
            findFlag.hasFlag = hasFlag;
        }
    };
    // 根据ID的数组checked节点
    // 根据ID的数组checked节点
    TreeComponent.prototype._checkNodesByIds = 
    // 根据ID的数组checked节点
    function (ids, source) {
        if (!ids || ids.length == 0) {
            return;
        }
        for (var _i = 0, source_4 = source; _i < source_4.length; _i++) {
            var item = source_4[_i];
            var index = _.indexOf(ids, item[this.keyId]);
            if (index != -1) {
                item.checked = 1;
                ids.splice(index, 1);
            }
            if (item[this.keyChild] && item[this.keyChild].length > 0) {
                this._checkNodesByIds(ids, item[this.keyChild]);
            }
        }
    };
    // 根据ID查询节点
    // 根据ID查询节点
    TreeComponent.prototype.findNodeById = 
    // 根据ID查询节点
    function (id) {
        return this._findNodeById(id, this.treeDatas);
    };
    // 根据名称查询全匹配节点
    // 根据名称查询全匹配节点
    TreeComponent.prototype.findNodeByName = 
    // 根据名称查询全匹配节点
    function (name) {
        var result = [];
        this._findNodeByName(result, name, this.treeDatas);
        return result;
    };
    // 根据名称模糊查询节点
    // 根据名称模糊查询节点
    TreeComponent.prototype.findNodeByAllName = 
    // 根据名称模糊查询节点
    function (name) {
        var result = [];
        this._findNodeByAllName(result, name, this.treeDatas);
        return result;
    };
    // 获取父节点
    // 获取父节点
    TreeComponent.prototype.findParentNodeById = 
    // 获取父节点
    function (id) {
        return this._findParentNodeById(id, this.treeDatas);
    };
    //获取父节点链
    //获取父节点链
    TreeComponent.prototype.findParentsNodeById = 
    //获取父节点链
    function (id) {
        var result = [];
        this._findParentsNodeById(result, id, this.treeDatas);
        return result;
    };
    TreeComponent.prototype.findChildrensNodeByNode = function (node) {
        var result = [];
        this._findChildrensNodeByNode(result, node);
        return result;
    };
    // 插入单个节点
    // 插入单个节点
    TreeComponent.prototype.insertNode = 
    // 插入单个节点
    function (child, parent) {
        var targetData;
        var parents;
        if (parent) {
            parents = this.findParentsNodeById(parent[this.keyId]);
            if (parents && parents.length > 0) {
                if (!parents[0][this.keyChild]) {
                    parents[0][this.keyChild] = [];
                }
                targetData = parents[0][this.keyChild];
                for (var i = 0; i < parents.length; i++) {
                    parents[i].show = true;
                }
                if (this.options.checkbox && parents[0].checked) {
                    child.checked = 1;
                }
            }
        }
        else {
            // 在根节点下插入
            targetData = this.treeDatas;
        }
        targetData.push(child);
        return child;
    };
    // 插入多个节点
    // 插入多个节点
    TreeComponent.prototype.insertNodes = 
    // 插入多个节点
    function (children, parent) {
        var targetData;
        var parents;
        if (parent) {
            parents = this.findParentsNodeById(parent[this.keyId]);
            if (parents && parents.length > 0) {
                if (!parents[0][this.keyChild]) {
                    parents[0][this.keyChild] = [];
                }
                targetData = parents[0][this.keyChild];
                for (var i = 0; i < parents.length; i++) {
                    parents[i].show = true;
                }
                if (this.options.checkbox && parents[0].checked) {
                    for (var _i = 0, children_2 = children; _i < children_2.length; _i++) {
                        var item = children_2[_i];
                        item.checked = 1;
                    }
                }
            }
        }
        else {
            // 在根节点下插入
            targetData = this.treeDatas;
        }
        for (var _a = 0, children_3 = children; _a < children_3.length; _a++) {
            var item = children_3[_a];
            targetData.push(item);
        }
        return children;
    };
    //更新节点数据
    //更新节点数据
    TreeComponent.prototype.updateNodeData = 
    //更新节点数据
    function (data, keys) {
        if (!keys) {
            return;
        }
        var targetNode = this.findNodeById(data[this.keyId]);
        for (var i = 0; i < keys.length; i++) {
            if (keys[i] == this.keyChild) {
                continue;
            }
            targetNode[keys[i]] = data[keys[i]];
        }
    };
    //删除节点
    //删除节点
    TreeComponent.prototype.deleteNodeById = 
    //删除节点
    function (id) {
        var parentNode = this.findParentNodeById(id);
        if (!parentNode) {
            parentNode = this.treeDatas;
        }
        else {
            parentNode = parentNode[this.keyChild];
        }
        for (var i = 0; i < parentNode.length; i++) {
            if (parentNode[i][this.keyId] == id) {
                parentNode.splice(i, 1);
                break;
            }
        }
    };
    // 匹配搜索
    // 匹配搜索
    TreeComponent.prototype.matchSearchNodesByKey = 
    // 匹配搜索
    function (val, key) {
        var result = [];
        this._matchSearchNodesByKey(result, val, key, this.treeDatas);
        return result;
    };
    TreeComponent.prototype.removeHideNodes = function (nodes) {
        for (var i = 0; i < nodes.length; i++) {
            delete nodes[i].isHide;
            if (nodes[i][this.keyChild]) {
                this.removeHideNodes(nodes[i][this.keyChild]);
            }
        }
    };
    // 模糊搜索
    // 模糊搜索
    TreeComponent.prototype.fuzzySearchNodesByKey = 
    // 模糊搜索
    function (val, key) {
        this.removeLighthightNodes(this.treeDatas);
        this.treeNoData = false;
        this.removeHideNodes(this.treeDatas);
        var result = [];
        if (val == '') {
            result = [];
            this.collspanAllNodes();
        }
        else {
            this._fuzzySearchNodesByKey(result, val, key, this.treeDatas);
            if (!result || result.length == 0) {
                this.treeNoData = true;
            }
            // this.expandNodes(result);
            this.lighthightNodes(result);
        }
        this.treeBox.nativeElement.scrollTop = 0;
        /*if (result && result.length > 0) {
              setTimeout(() => {
                const domOffsetTop = result[0].treeDom.nativeElement.offsetTop;
                this.treeBox.nativeElement.scrollTop = domOffsetTop;
              }, 100);
            } else {
              this.treeBox.nativeElement.scrollTop = 0;
            }*/
        return result;
    };
    //展开节点
    //展开节点
    TreeComponent.prototype.expandNode = 
    //展开节点
    function (node) {
        var parents = this.findParentsNodeById(node[this.keyId]);
        if (parents && parents.length > 0) {
            if (!parents[0][this.keyChild]) {
                parents[0][this.keyChild] = [];
            }
            for (var i = 0; i < parents.length; i++) {
                parents[i].show = true;
            }
        }
    };
    // 展开节点s
    // 展开节点s
    TreeComponent.prototype.expandNodes = 
    // 展开节点s
    function (nodes) {
        for (var i = 0; i < nodes.length; i++) {
            this.expandNode(nodes[i]);
        }
    };
    TreeComponent.prototype.collspanAllNodes = function (node) {
        var temp = node || this.treeDatas;
        if (Array.isArray(temp)) {
            //  temp为数组，则递归
            for (var i = 0; i < temp.length; i++) {
                temp[i].show = false;
                if (temp[i].children && temp[i].children.length > 0) {
                    this.collspanAllNodes(temp[i].children);
                }
            }
        }
        else {
            temp.show = false;
            if (temp.children && temp.children.length > 0) {
                this.collspanAllNodes(temp.children);
            }
        }
    };
    TreeComponent.prototype.expandAllNodes = function (node) {
        var temp = node || this.treeDatas;
        if (Array.isArray(temp)) {
            //  temp为数组，则递归
            for (var i = 0; i < temp.length; i++) {
                temp[i].show = true;
                if (temp[i].children && temp[i].children.length > 0) {
                    this.expandAllNodes(temp[i].children);
                }
            }
        }
        else {
            temp.show = true;
            if (temp.children && temp.children.length > 0) {
                this.expandAllNodes(temp.children);
            }
        }
    };
    // 高亮节点s
    // 高亮节点s
    TreeComponent.prototype.lighthightNodes = 
    // 高亮节点s
    function (nodes) {
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].lighthight = true;
        }
    };
    // 移除高亮s
    // 移除高亮s
    TreeComponent.prototype.removeLighthightNodes = 
    // 移除高亮s
    function (nodes) {
        for (var i = 0; i < nodes.length; i++) {
            delete nodes[i].lighthight;
            if (nodes[i][this.keyChild]) {
                this.removeLighthightNodes(nodes[i][this.keyChild]);
            }
        }
    };
    // 选中节点
    // 选中节点
    TreeComponent.prototype.selectTreeNode = 
    // 选中节点
    function (node) {
        if (this.selectedNode && this.selectedNode == node && this.options.unSelect) {
            this.deSelectTreeNode(this.selectedNode);
            return;
        }
        this.selectedNode && this.deSelectTreeNode(this.selectedNode);
        var item = this.findNodeById(node[this.keyId]);
        if (item) {
            item.selected = true;
            this.selectedNode = item;
        }
    };
    // 移除选中
    // 移除选中
    TreeComponent.prototype.deSelectTreeNode = 
    // 移除选中
    function (node) {
        var item = this.findNodeById(node[this.keyId]);
        if (item) {
            delete item.selected;
        }
        this.selectedNode = null;
    };
    // 获取选中节点 check
    // 获取选中节点 check
    TreeComponent.prototype.getCheckedNodes = 
    // 获取选中节点 check
    function () {
        var result = [];
        this._getCheckedNodes(result, this.treeDatas);
        return result;
    };
    // 获取半选节点 halfcheck
    // 获取半选节点 halfcheck
    TreeComponent.prototype.getHalfCheckedNodes = 
    // 获取半选节点 halfcheck
    function () {
        var result = [];
        this._getHalfCheckedNodes(result, this.treeDatas);
        return result;
    };
    // 获取选中节点 select
    // 获取选中节点 select
    TreeComponent.prototype.getSelectedNodes = 
    // 获取选中节点 select
    function () {
        return this._getSelectedNodes(this.treeDatas);
    };
    // 节点上移，顶层不可移动
    // 节点上移，顶层不可移动
    TreeComponent.prototype.moveUpwardsNode = 
    // 节点上移，顶层不可移动
    function (node) {
        var _this = this;
        var brothers;
        var parent = this.findParentNodeById(node[this.keyId]);
        if (!parent) {
            parent = this.treeDatas;
            brothers = parent;
        }
        else {
            brothers = parent[this.keyChild];
        }
        var theIndex = _.findIndex(brothers, function (o) {
            return o[_this.keyId] == node[_this.keyId];
        });
        if (theIndex == 0) {
            return;
        }
        brothers.splice(theIndex, 1);
        brothers.splice(theIndex - 1, 0, node);
    };
    // 节点下移，底层不可移动
    // 节点下移，底层不可移动
    TreeComponent.prototype.moveDownNode = 
    // 节点下移，底层不可移动
    function (node) {
        var _this = this;
        var brothers;
        var parent = this.findParentNodeById(node[this.keyId]);
        if (!parent) {
            parent = this.treeDatas;
            brothers = parent;
        }
        else {
            brothers = parent[this.keyChild];
        }
        var theIndex = _.findIndex(brothers, function (o) {
            return o[_this.keyId] == node[_this.keyId];
        });
        if (theIndex == (brothers.length - 1)) {
            return;
        }
        brothers.splice(theIndex, 1);
        brothers.splice(theIndex + 1, 0, node);
    };
    // 根据id数组check节点
    // 根据id数组check节点
    TreeComponent.prototype.checkNodesByIds = 
    // 根据id数组check节点
    function (ids) {
        this._checkNodesByIds(ids, this.treeDatas);
    };
    // 根据node查找前面的兄弟节点 type = after || prev
    // 根据node查找前面的兄弟节点 type = after || prev
    TreeComponent.prototype.findBrotherNodeByNode = 
    // 根据node查找前面的兄弟节点 type = after || prev
    function (node, type) {
        var _this = this;
        var brothers;
        var parent = this._findParentNodeById(node[this.keyId], this.treeDatas);
        if (!parent) {
            brothers = this.treeDatas;
        }
        else {
            brothers = parent[this.keyChild];
        }
        var index = _.findIndex(brothers, function (o) {
            return o[_this.keyId] == node[_this.keyId];
        });
        if (type == 'after') {
            if (index != (brothers.length - 1)) {
                return brothers[index - 0 + 1];
            }
            else {
                return null;
            }
        }
        else {
            if (index != 0) {
                return brothers[index - 1];
            }
            else {
                return null;
            }
        }
    };
    TreeComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dc-tree',
                    template: "\n    <div #treeBox class=\"display-flex width-100 flex-direction-column tree-box\" [style.max-height]=\"options?.maxHeight\">\n      <div *ngFor=\"let node of treeDatas;let i = index\">\n        <div class=\"node-container\">\n          <dc-node [nodeData]=\"node\" [root]=\"true\" [treeId]=\"treeId\" [keyChild]=\"keyChild\" [keyId]=\"keyId\" [keyName]=\"keyName\"\n                   [options]=\"options\"\n                   (clickEvent)=\"clickNode($event)\" (checkEvent)=\"checkNode($event)\" (extendEvent)=\"extendNode($event)\"\n                   [myIndex]=\"i\" [deepIndex]=\"0\"></dc-node>\n        </div>\n      </div>\n      <div *ngIf=\"treeNoData\" style=\"line-height: 40px; text-align: center\">\n        No Data.\n      </div>\n    </div>\n\n  ",
                    styles: ["\n    .tree-box {\n      position: relative;\n      overflow-y: auto;\n      padding: 5px 0;\n      min-height: 100%;\n    }\n\n  "]
                },] },
    ];
    /** @nocollapse */
    TreeComponent.ctorParameters = function () { return [
        { type: core_1.ComponentFactoryResolver, },
        { type: router_1.Router, },
    ]; };
    TreeComponent.propDecorators = {
        "treeBox": [{ type: core_1.ViewChild, args: ['treeBox',] },],
        "clickEvent": [{ type: core_1.Output },],
        "extendEvent": [{ type: core_1.Output },],
        "checkEvent": [{ type: core_1.Output },],
        "options": [{ type: core_1.Input },],
        "defaultCheckedNodes": [{ type: core_1.Input },],
        "defaultSelectedNode": [{ type: core_1.Input },],
        "defaultHalfCheckedNodes": [{ type: core_1.Input },],
        "keyId": [{ type: core_1.Input },],
        "keyName": [{ type: core_1.Input },],
        "keyChild": [{ type: core_1.Input },],
        "treeId": [{ type: core_1.Input },],
        "treeDatas": [{ type: core_1.Input },],
    };
    return TreeComponent;
}());
exports.TreeComponent = TreeComponent;
//# sourceMappingURL=tree.component.js.map
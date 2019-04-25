import { OnInit, EventEmitter, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
export declare class TreeComponent implements OnInit {
    private resolver;
    private router;
    treeBox: ElementRef;
    clickEvent: EventEmitter<{}>;
    extendEvent: EventEmitter<{}>;
    checkEvent: EventEmitter<{}>;
    options: any;
    defaultCheckedNodes: any[];
    defaultSelectedNode: any;
    defaultHalfCheckedNodes: any[];
    treeNoData: boolean;
    tempSearch: any;
    selectedNode: any;
    keyId: any;
    keyName: any;
    keyChild: any;
    treeId: string;
    _treeDatas: any;
    treeDatas: any;
    constructor(resolver: ComponentFactoryResolver, router: Router);
    ngOnInit(): void;
    initHalfCheckNodes(checkedNodes: any[], source: any): void;
    _initHalfCheckNodes(checkedNode: any, source: any): void;
    initCheckNodes(checkedNodes: any[], source: any): void;
    _initCheckNodes(checkedNode: any, source: any): void;
    initSelectNode(selectNode: any, source: any): any;
    clickNode(event: any): void;
    extendNode(event: any): void;
    checkNode(event: any): boolean;
    private _unCheckParentNode(parents);
    private _checkParentNode(parents);
    private _checkChildrenNode(children, checkType);
    private _findNodeById(id, source);
    private _findNodeByAllName(result, name, source);
    private _findNodeByName(result, name, source);
    private _getCheckedNodes(result, source);
    private _getHalfCheckedNodes(result, source);
    private _getSelectedNodes(source);
    private _findParentNodeById(id, source, parent?);
    private _findParentsNodeById(result, id, source);
    private _findChildrensNodeByNode(result, source);
    private _matchSearchNodesByKey(result, val, key, source);
    private _fuzzySearchNodesByKey(result, val, key, source, findFlag?);
    private _checkNodesByIds(ids, source);
    findNodeById(id: any): any;
    findNodeByName(name: any): any[];
    findNodeByAllName(name: any): any[];
    findParentNodeById(id: any): any;
    findParentsNodeById(id: any): any;
    findChildrensNodeByNode(node: any): any;
    insertNode(child: any, parent?: any): any;
    insertNodes(children: any[], parent?: any): any[];
    updateNodeData(data: any, keys: any): void;
    deleteNodeById(id: any): void;
    matchSearchNodesByKey(val: any, key: any): any;
    removeHideNodes(nodes: any): void;
    fuzzySearchNodesByKey(val: any, key: any): any;
    expandNode(node: any): void;
    expandNodes(nodes: any): void;
    collspanAllNodes(node?: any): void;
    expandAllNodes(node?: any): void;
    lighthightNodes(nodes: any): void;
    removeLighthightNodes(nodes: any): void;
    selectTreeNode(node: any): void;
    deSelectTreeNode(node: any): void;
    getCheckedNodes(): any[];
    getHalfCheckedNodes(): any[];
    getSelectedNodes(): any;
    moveUpwardsNode(node: any): void;
    moveDownNode(node: any): void;
    checkNodesByIds(ids: any[]): void;
    findBrotherNodeByNode(node: any, type?: string): any;
}

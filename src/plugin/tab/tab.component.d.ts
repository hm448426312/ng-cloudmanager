import { EventEmitter, ComponentFactoryResolver, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { TabContentDirective } from './tab.directive';
export declare class TabComponent implements AfterViewInit {
    private resolver;
    private router;
    private changeRef;
    _tabDatas: any;
    likeButton: boolean;
    tabDatas: any;
    activeInstance: any;
    ref: any;
    tabChangeEvent: EventEmitter<{}>;
    nowSelectTab: any;
    tabContents: QueryList<TabContentDirective>;
    constructor(resolver: ComponentFactoryResolver, router: Router, changeRef: ChangeDetectorRef);
    ngAfterViewInit(): void;
    init(): void;
    changeTab(tab: any): void;
}

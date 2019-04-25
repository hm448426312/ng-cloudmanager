import { OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DcEventService } from '../broadcast/broadcast.service';
export declare class LeftMenuComponent implements OnInit {
    private broadcast;
    private router;
    private activeRoute;
    isOpen: boolean;
    currentMenu: any;
    _menus: any;
    menus: any;
    _selectMenu: any;
    selectMenu: any;
    menuEvent: EventEmitter<{}>;
    currentSubMenu: any;
    currentThreeLevelMenu: any;
    currentThreeLevelMenus: Array<any>;
    constructor(broadcast: DcEventService, router: Router, activeRoute: ActivatedRoute);
    selectTheMenu(menu: any): void;
    setMenuActive(menus: Array<any>): void;
    findTheMenu(result: Array<any>, menu: any, datas: Array<any>): boolean;
    menuClick(ev: any, menu: any, type: number, isopen?: boolean): void;
    ngOnInit(): void;
    getIconStyle(menu: any): {
        'background-image': string;
    };
}

import { OnInit, EventEmitter } from '@angular/core';
export declare class PaginationComponent implements OnInit {
    pageSizeList: Array<number>;
    pageSize: number;
    pageNum: any;
    hideSizeList: boolean;
    showAfterDot: boolean;
    showBeforeDot: boolean;
    maxPage: number;
    jump: number;
    showList: Array<number>;
    nowPageSize: number;
    total: number;
    _nowPage: any;
    nowPage: any;
    _total: number;
    nowPageChange: EventEmitter<{}>;
    pageSizeChange: EventEmitter<{}>;
    paginationEvent: EventEmitter<{}>;
    constructor();
    ngOnInit(): void;
    private draw();
    jumpPage(page?: any): void;
    pressInput(event: any): boolean;
    changeLimit(limit: number): void;
}

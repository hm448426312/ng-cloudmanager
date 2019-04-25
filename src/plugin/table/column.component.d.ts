import { OnInit } from '@angular/core';
export declare class TableColumnComponent implements OnInit {
    header: any;
    data: any;
    width: any;
    field: string;
    isTdCenter: boolean;
    show: boolean;
    constructor();
    ngOnInit(): void;
    setTdCenter(isCenter: boolean): any;
}

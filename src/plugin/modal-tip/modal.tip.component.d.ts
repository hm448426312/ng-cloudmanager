import { OnInit } from '@angular/core';
export declare class ModalTipComponent implements OnInit {
    imgBase64: string;
    data: any;
    handler: any;
    defaultBtn: any[];
    constructor();
    ngOnInit(): void;
    judgeMsg(msg: any): "" | "string" | "array";
    btnEventClick(btn: any): void;
}

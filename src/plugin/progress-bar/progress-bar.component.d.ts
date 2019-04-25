import { OnInit } from '@angular/core';
export declare class ProgressBarComponent implements OnInit {
    width: string;
    _progress: number;
    progress: number;
    option: {
        showText?: boolean;
    };
    constructor();
    ngOnInit(): void;
    setWidth(target: any): string;
}

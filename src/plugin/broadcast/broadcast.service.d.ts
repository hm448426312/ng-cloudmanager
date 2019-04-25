import { Observable } from 'rxjs';
export declare class DcEventService {
    private _eventBus;
    constructor();
    broadcast(key: any, data?: any): void;
    on(key: any): Observable<any>;
}
